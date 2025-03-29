const mongoose = require('mongoose');

const connectToDB = async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri)
        throw new Error("Connection to DB not successful, kindly check connection string");

    await mongoose.connect(mongoUri);
}

module.exports = { connectToDB };
