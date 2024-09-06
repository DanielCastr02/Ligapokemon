import express from 'express';
import pool from './pool.js';
import cors from 'cors';
import trainersRoutes from './routes/trainersRoutes.js';
import pokemonRoutes from './routes/pokemonRoutes.js';
import registrosRoutes from './routes/registroRoutes.js'

const app = express();

const port = 3000;

pool.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Successfully connected!!');
});

app.use(cors());
app.use(express.json());

app.use(trainersRoutes);
app.use(pokemonRoutes);
app.use(registrosRoutes);

app.get('/', ()=>{
    console.log('Here is the rabbit');
})

app.listen(port, () =>
    console.log(`Server listen on port ${port}`)
);


import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASS  
    }
});

export default transporter; 
