const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const { connectToDB } = require('./config/database');
const fileRouter = require('./routes/fileRouter');
dotenv.config();

app.use(express.json());
app.use(cors({
    origin: process.env.BASE_URL,
    credentials: true
}));
const port = process.env.PORT || 5000;
app.use('/api', fileRouter);
connectToDB()
    .then(() => {
        console.log("Connected to DB successfully");
        app.listen(port, () => {
            console.log(`Server running successfully on PORT:${port}`);
        })
    })
    .catch((err) => {
        console.error("Cannot establish connection");
    });

