const File = require('../models/fileModel');
const path = require('path');
const fs = require('fs').promises;
const dotenv = require('dotenv');
dotenv.config();

const uploadPath = path.join(__dirname, '..', process.env.UPLOAD_PATH);
const supportedFileTypes = process.env.SUPPORTED_FILE_TYPES.split(',');

const uploadFile = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'Please upload a file.' });

        const fileExtension = path.extname(req.file.originalname).toLowerCase().substring(1);
        if (!supportedFileTypes.includes(fileExtension)) {
            await fs.unlink(req.file.path);
            return res.status(400).json({ message: `Unsupported file type: ${fileExtension}` });
        }

        const newFile = new File({
            filename: req.file.filename,
            originalname: req.file.originalname,
            mimeType: req.file.mimetype,
            size: req.file.size,
        });

        await newFile.save();
        res.status(201).json(newFile);
    } catch (error) {
        await fs.unlink(req.file.path);
        res.status(400).json({ message: 'File upload failed: ' + error.message });
    }
};

const getAllFiles = async (req, res) => {
    try {
        const files = await File.find().sort({ createdAt: -1 });
        res.json(files);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch files' });
    }
};

const downloadFile = async (req, res) => {
    try {
        const file = await File.findOne({ filename: req.params.filename });
        if (!file) return res.status(404).json({ message: 'File not found' });

        const filePath = path.join(uploadPath, file.filename);
        res.download(filePath, file.originalname);
    } catch (error) {
        res.status(500).json({ message: 'Download failed: ' + error.message });
    }
};
const getFileById = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) return res.status(404).json({ message: 'File not found' });
        res.json(file);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch file details' });
    }
};
const viewFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) return res.status(404).json({ message: 'File not found' });

        const filePath = path.join(uploadPath, file.filename);
        const fileData = await fs.readFile(filePath);

        res.set('Content-Type', file.mimeType);
        res.send(fileData);
    } catch (error) {
        res.status(500).json({ message: 'Failed to load file content' });
    }
};

module.exports = { uploadFile, getAllFiles, downloadFile, getFileById, viewFile };