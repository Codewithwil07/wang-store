import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.orginalname);
    cb(null, `${file.filedname}-${Date.now()}${extname}`);
  },
});

const filefilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimtypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.orginalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimtypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Image only'), false);
  }
};

const upload = multer({ storage: filefilter });
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      res.status(200).send({
        message: 'Image upload successfully',
        image: `/${req.file.path}`,
      });
    } else {
      res.status(404).send({ message: 'No image file provided' });
    }
  });
});

export default router;
