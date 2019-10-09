
import GridFsStorage from 'multer-gridfs-storage';
import express from 'express';
import dotenv from 'dotenv';
import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

import Laptop from '../mongo/products-models/laptop.model';
import Monitor from '../mongo/products-models/monitor.model';
import PC from '../mongo/products-models/pc-model';
import Admin from '../mongo/admin.model';
import { gfs } from '../app';
import { 
  ROUTES, 
  TYPE_NAMES, 
  CRYPTO_IMAGE_NAME_LENGTH,
  MESSAGES,
} from '../constants';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const imagesRoutes = express.Router();
const storage = new GridFsStorage({
  url: process.env.DB,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(CRYPTO_IMAGE_NAME_LENGTH, (error, buf) => {
        if (error) {
          return reject(error);
        }
        const filename = `${buf.toString('hex')}${path.extname(file.originalname)}`;
        const fileInfo = {
          filename: filename,
          bucketName: TYPE_NAMES.images
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });


/**
 * Upload Image for Admin
 * @param {file: jpeg/png} file?
 * @param {email: String} email
 */
imagesRoutes.post(ROUTES.IMAGES.uploadAdmin, upload.single('file'), (request, response) => {
  Admin.findOne({ email: request.body.email })
  .then(admin => {
    if (admin.avatarId) {
      gfs.remove({ _id: admin.avatarId, root: TYPE_NAMES.images }, (error, gridStore) => {
          if (error) {
            return response.status(404).json({ status: false, error });
          } 
        });
    }
    admin.avatar = request.file ? `${ROUTES.IMAGES.main}${ROUTES.IMAGES.getImage}/${request.file.filename}` : null;
    admin.avatarId = request.file ? request.file.id: null;
    admin.save()
      .then(newAdmin => response.status(200).json({ status: true, file: request.file ? request.file : null, admin: newAdmin }))
      .catch(error => response.status(400).json({ status: false, error }))
  })
  .catch(error => response.status(400).json({ status: false, error }))
});


/**
 * Get image
 * @param {string} filename
 * @example
 * api/url/filename.png
 * api/url/filename.jpeg
 * @return {png/jpg}
 */
imagesRoutes.get(`${ROUTES.IMAGES.getImage}/:${ROUTES.IMAGES.paramFileName}`, (request, response) => {
  gfs.files.findOne({ filename: request.params[ROUTES.IMAGES.paramFileName] }, (error, file) => {
    if (!file || file.length === 0) {
      return response.status(404).json({error: MESSAGES.noFileErr});
    }
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(response);
    } else {
      response.status(404).json({error: MESSAGES.noImgeErr});
    }
  });
});


/**
 * Get all images
 * @return {[png/jpg]}
 */
imagesRoutes.get(ROUTES.IMAGES.allImages, (request, response) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return response.status(404).json({error: MESSAGES.noFilesErr});
    }
    return response.status(200).json(files);
  });
});


/**
 * Delete image
 * @param {string} id
 * @example 
 * api/url/some_id
 */
imagesRoutes.delete(`${ROUTES.IMAGES.delImage}/:${ROUTES.IMAGES.paramId}`, (request, response) => {
  gfs.remove({ _id: request.params[ROUTES.IMAGES.paramId], root: TYPE_NAMES.images }, (error, gridStore) => {
    if (error) {
      return response.status(404).json({ error });
    } 
    return response.status(200).json({ msg: MESSAGES.success });
  });
});


/**
 * Add images array to product
 * @param {string} id
 * @param {jpeg/png} [files]
 */
imagesRoutes.post(ROUTES.IMAGES.massAdd, upload.array('files'), (request, response) => { 
  const query = { _id: request.body.id };
  const laptop = Laptop.findOne(query);
  const monitor = Monitor.findOne(query);
  const pc = PC.findOne(query);
  Promise.all([laptop, monitor, pc])
    .then((result) => { 
      const product = result.find(el=> !!el);
      const images = request.files.map(file => {
        return {
          name: file.filename,
          id: file.id,
          path: `${ROUTES.IMAGES.main}${ROUTES.IMAGES.getImage}/${file.filename}`
        };       
      });
      product.images = (product.images && product.images.length) ? [...product.images, ...images] : images;      
      product.save()
        .then(newProduct => response.status(200).json({ status: true, product: newProduct }))
        .catch(error => response.status(400).json({ status: false, error }));
    })
    .catch((error) => response.status(400).json({ status: false, error }));  
});


/**
 * Remove images array from product
 * @param {string} [imageNames]
 * @param {string} productId
 */
imagesRoutes.delete(ROUTES.IMAGES.delMassImage, (request, response) => {
  const imgIds = request.body.imageNames.map(el => el.id);
  imgIds.forEach(el => {
    gfs.remove({_id: el, root: TYPE_NAMES.images }, (error, gridStore) => {})
  })
  const query = { _id: request.body.productId };
  const laptop = Laptop.findOne(query);
  const monitor = Monitor.findOne(query);
  const pc = PC.findOne(query);
  Promise.all([laptop, monitor, pc])
    .then((result) => { 
      const product = result.find(el=> !!el);
      if (product.images && product.images.length) {
        product.images = product.images.filter(img => imgIds.includes(img.id));
        product.save()
        .then(newProduct => response.status(200).json({ status: true, product: newProduct }))
        .catch(error => response.status(400).json({ status: false, error }));       
      } else {
        response.status(404).json({ status: false, msg: MESSAGES.noImgeErr });
      }
    })
    .catch((error) => response.status(400).json({ status: false, error })); 
});


/**
 * Set product's  head image 
 * @param {string} product_id
 * @param {{string} image_id
 */
imagesRoutes.post(ROUTES.IMAGES.setHeadImage, (request, response) => {   
  const query = { _id: request.body.product_id };
  const laptop = Laptop.findOne(query);
  const monitor = Monitor.findOne(query);
  const pc = PC.findOne(query);
  Promise.all([laptop, monitor, pc])
    .then((result) => { 
      const product = result.find(el=> !!el);
      const imageHead = product.images.find(image => image.id.toString() === request.body.image_id.toString()); 
      if (!imageHead) {
        response.status(400).json({ status: false, msg: MESSAGES.noImgeErr })
      }    
      product.imageHead = imageHead;   
      product.save()
        .then(newProduct => response.status(200).json({ status: true, product: newProduct }))
        .catch(error => response.status(400).json({ status: false, error }));
    })
    .catch((error) => response.status(400).json({ status: false, error }));  
});


export default imagesRoutes;