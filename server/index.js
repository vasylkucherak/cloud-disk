//*====== imports =====================================================================================================================================
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRouter from './auth.router.js';
import cors from './cors.middleware.js';

//*====== initialization =====================================================================================================================================
const app = express();
dotenv.config();

//*====== variable =====================================================================================================================================
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

//*====== settings =====================================================================================================================================
app.use(cors);
app.use(express.json());

//*====== routers =====================================================================================================================================
app.use('/api/auth', authRouter);

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