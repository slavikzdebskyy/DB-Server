
import GridFsStorage from 'multer-gridfs-storage';
import express from 'express';
import dotenv from 'dotenv';
import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

import Admin from '../mongo/admin.model';
import Laptop from '../mongo/products-models/laptop.model';
import Monitor from '../mongo/products-models/monitor.model';
import PC from '../mongo/products-models/pc-model';
import { gfs } from '../app';
import { conn } from '../app.js';
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
      crypto.randomBytes(CRYPTO_IMAGE_NAME_LENGTH, (err, buf) => {
        if (err) {
          return reject(err);
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
 * @param {email: String, file: jpeg/png}
 */

imagesRoutes.post(ROUTES.IMAGES.uploadAdmin, upload.single('file'), (req, res) => {
  Admin.findOne({ email: req.body.email })
  .then(admin => {
    if (admin.avatarId) {
      gfs.remove({ _id: admin.avatarId, root: TYPE_NAMES.images }, (error, gridStore) => {
          if (error) {
            return res.status(404).json({ status: false, error });
          } 
        });
    }
    admin.avatar = `${ROUTES.IMAGES.main}${ROUTES.IMAGES.getImage}/${req.file.filename}`;
    admin.avatarId = req.file.id;
    admin.save()
      .then(newAdmin => res.status(200).json({ status: true, file: req.file, admin: newAdmin }))
      .catch(error => res.status(400).json({ status: false, error }))
  })
  .catch(error => res.status(400).json({ status: false, error }))
});


/**
 * Get image
 * @param filename: String
 * @example
 * api/url/filename.png
 * api/url/filename.jpeg
 */

imagesRoutes.get(`${ROUTES.IMAGES.getImage}/:${ROUTES.IMAGES.paramFileName}`, (req, res) => {
  gfs.files.findOne({ filename: req.params[ROUTES.IMAGES.paramFileName] }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({error: MESSAGES.noFileErr});
    }
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({error: MESSAGES.noImgeErr});
    }
  });
});


/**
 * Get all images
 */

imagesRoutes.get(ROUTES.IMAGES.allImages, (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({error: MESSAGES.noFilesErr});
    }
    return res.status(200).json(files);
  });
});


/**
 * Delete image
 * @param id : String
 * @example 
 * api/url/some_id
 */

imagesRoutes.delete(`${ROUTES.IMAGES.delImage}/:${ROUTES.IMAGES.paramId}`, (req, res) => {
  gfs.remove({ _id: req.params[ROUTES.IMAGES.paramId], root: TYPE_NAMES.images }, (error, gridStore) => {
    if (error) {
      return res.status(404).json({ error });
    } 
    return res.status(200).json({ msg: MESSAGES.success });
  });
});

/**
 * Add images array
 * @param @param {id: String, files: [jpeg/png]} 
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


export default imagesRoutes;