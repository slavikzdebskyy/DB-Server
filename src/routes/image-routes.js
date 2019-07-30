
import GridFsStorage from 'multer-gridfs-storage';
import express from 'express';
import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

import Admin from '../mongo/admin.model';
import { gfs } from '../app';
import { 
  ROUTES, 
  TYPE_NAMES, 
  CRYPTO_IMAGE_NAME_LENGTH,
  MESSAGES,
} from '../constants';


const imagesRoutes = express.Router();

const storage = new GridFsStorage({
  url: ROUTES.DB.devTest,
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

imagesRoutes.post(ROUTES.IMAGES.uploadAdmin, upload.single('file'), (req, res) => {
  Admin.findOne({ email: req.body.email })
  .then(admin => {
    admin.avatar = `${ROUTES.IMAGES.main}${ROUTES.IMAGES.getImage}/${req.file.filename}`;
    admin.save()
      .then(newAdmin => res.status(200).json({ file: req.file, admin: newAdmin }))
      .catch(err => res.status(400).json({ err }))
  })
  .catch(err => res.status(400).json({ err }))
});

imagesRoutes.get(`${ROUTES.IMAGES.getImage}/:${ROUTES.IMAGES.paramFileName}`, (req, res) => {
  gfs.files.findOne({ filename: req.params[ROUTES.IMAGES.paramFileName] }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({err: MESSAGES.noFileErr});
    }
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({err: MESSAGES.noImgeErr});
    }
  });
});

imagesRoutes.get(ROUTES.IMAGES.allImages, (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({err: MESSAGES.noFilesErr});
    }
    return res.json(files);
  });
});

imagesRoutes.delete(`${ROUTES.IMAGES.getImage}/:${ROUTES.IMAGES.paramId}`, (req, res) => {
  gfs.remove({ _id: req.params[ROUTES.IMAGES.paramId], root: TYPE_NAMES.images }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    } 
    return res.status(200).json({ msg: MESSAGES.success });
  });
});


export default imagesRoutes;