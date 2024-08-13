import express from 'express';
import pool from './pool.js';
import cors from 'cors';
import trainersRoutes from './routes/trainersRoutes.js';
import pokemonRoutes from './routes/pokemonRoutes.js';

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

app.get('/', ()=>{
    console.log('Here is the rabbit');
})

app.listen(port, () =>
    console.log(`Server listen on port ${port}`)
);

