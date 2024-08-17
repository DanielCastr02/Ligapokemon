import pool from "../pool.js";

export const getTrainer = (req, res) => {
    pool.query('SELECT * FROM trainer;', (error, results) => {
        if(error){
            console.error('Error getting trainer:', error);
            res.status(500).send('Error getting trainer');
        } else {
            console.log('Fetching trainers...');
            res.status(201).json({message : 'Trainers fetched succesfully', trainer: results});
        }
    });
}


export const getTrainerById = (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM trainer WHERE id = ?;', [id], (error, results) => {
        if(error){
            console.error('Error getting trainer:', error);
            res.status(500).send('Error getting trainer');
        } else {
            console.log('Fetching trainer...');
            res.status(201).json({message : 'Trainer fetched succesfully', trainer: results});
        }
    });
}

export const createTrainer = (req, res) => {
    const trainer = req.body;
    pool.query('INSERT INTO trainer SET ?;', trainer, (error) => {
        if(error){
            console.error('Error creating trainer:', error);
            res.status(500).send('Error creating trainer');
        } else {
            console.log('Creating trainer...');
            res.status(201).json({message : 'Trainer created succesfully', trainer: trainer});
        }
    });
}

export const updateTrainer = (req, res) => {
    const id = req.params.id;
    const trainer = req.body;
    pool.query('UPDATE trainer SET ? WHERE id = ?;', [trainer, id], (error) => {
        if(error){
            console.error('Error updating trainer:', error);
            res.status(500).send('Error updating trainer');
        } else {
            console.log('Updating trainer...');
            res.status(201).json({message : 'Trainer updated succesfully', trainer: trainer});
        }
    });
}

export const deleteTrainer = (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM trainer WHERE id = ?;', [id], (error) => {
        if(error){
            console.error('Error deleting trainer:', error);
            res.status(500).send('Error deleting trainer');
        } else {
            console.log('Deleting trainer...');
            res.status(201).json({message : 'Trainer deleted succesfully'});
        }
    });
}

export const getTrainerDetalle = (req, res) => {
    const id = req.params.id;
    pool.query(
        `SELECT r.id AS id, t.id AS trainer_id, t.nombre AS trainer_nombre, p.id AS pokemon_id, 
                p.nombre AS pokemon_nombre, p.tipo AS pokemon_tipo, 
                p.apodo AS pokemon_apodo, p.sexo AS pokemon_sexo 
         FROM registro r 
         JOIN trainer t ON r.idtrainer = t.id 
         JOIN pokemon p ON r.idpokemon = p.id 
         WHERE t.id = ?;`, 
        [id], 
        (error, results) => {
            if (error) {
                console.error('Error getting registro:', error);
                res.status(500).send('Error getting registro');
            } else if (results.length === 0) {
                res.status(404).json({ message: 'Registro no encontrado' });
            } else {
                console.log('Fetching registro...');
                res.status(200).json({ message: 'Registro fetched successfully', registro: results});
            }
        }
    );
};
