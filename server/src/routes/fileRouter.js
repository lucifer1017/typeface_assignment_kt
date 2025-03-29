const express = require('express');
const fileRouter = express.Router();
const fileController = require('../controllers/fileController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadPath = path.join(__dirname, '..', process.env.UPLOAD_PATH);
const maxFileSize = 10 * 1024 * 1024; // I took the liberty of choosing a max upload limit as 10MB.

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: maxFileSize },
});

fileRouter.post('/upload', upload.single('file'), fileController.uploadFile);
fileRouter.get('/files', fileController.getAllFiles);
fileRouter.get('/download/:filename', fileController.downloadFile);

module.exports = fileRouter;