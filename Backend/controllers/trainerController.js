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

// pool.query('UPDATE trainer SET sexo = ?, nombre = ?, edad = ?, dob = ? WHERE id = ?;', [trainer.sexo,trainer.nombre,trainer.edad, trainer.dob, id], (error) => {