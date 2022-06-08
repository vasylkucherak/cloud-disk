//*====== imports =====================================================================================================================================
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

//*====== initialization =====================================================================================================================================
const app = express();
dotenv.config();

//*====== variable =====================================================================================================================================
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

const start = async () => {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, HOST, () => {
            console.log(`Server has been started on http://${HOST}:${PORT}`);
        })
    } catch (e) {
        console.log(e)
    }
}
start();