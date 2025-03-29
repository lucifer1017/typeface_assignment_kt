const File = require('../models/file.model');
const path = require('path');
const fs = require('fs').promises;
require('dotenv').config();

const uploadPath = path.join(__dirname, '..', process.env.UPLOAD_PATH);
const supportedFileTypes = process.env.SUPPORTED_FILE_TYPES.split(',');

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a file.' });
        }

        const fileExtension = path.extname(req.file.originalname).toLowerCase().substring(1);
        if (!supportedFileTypes.includes(fileExtension)) {
            await fs.unlink(req.file.path);
            return res.status(400).json({ message: `File type "${fileExtension}" is not supported.` });
        }

        const newFile = new File({
            filename: req.file.filename,
            originalName: req.file.originalname,
            mimeType: req.file.mimetype,
            size: req.file.size,
        });

        await newFile.save();
        res.status(201).json({ message: 'File uploaded successfully.', file: newFile });
    } catch (error) {
        console.error('Error uploading file:', error.message);
        res.status(500).json({ message: 'Failed to upload file.' });
    }
};

const getAllFiles = async (req, res) => {
    try {
        const files = await File.find().sort({ uploadDate: -1 });
        res.status(200).json(files);
    } catch (error) {
        console.error('Error getting all files:', error.message);
        res.status(500).json({ message: 'Failed to get the file list.' });
    }
};

const downloadFile = async (req, res) => {
    try {
        const file = await File.findOne({ filename: req.params.filename });
        if (!file) {
            return res.status(404).json({ message: 'File not found.' });
        }

        const filePath = path.join(uploadPath, file.filename);
        res.download(filePath, file.originalName);
    } catch (error) {
        console.error('Error downloading the file:', error.message);
        res.status(500).json({ message: 'Failed to download file.' });
    }
};

module.exports = {
    uploadFile,
    getAllFiles,
    downloadFile,
};