const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    originalname: {
        type: String,
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    mimeType: {
        type: String,
    },
    size: {
        type: Number,
    },

}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);