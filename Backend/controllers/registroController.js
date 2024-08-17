import pool from "../pool.js";

export const getRegistros = (req, res) => {
    pool.query('SELECT * FROM registro;', (error, results) => {
        if(error){
            console.error('Error getting registro:', error);
            res.status(500).send('Error getting registro');
        } else {
            console.log('Fetching registro...');
            res.status(201).json({message : 'Registro fetched succesfully', registro: results});
        }
    });
}

export const getRegistroById = (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM registro WHERE id = ?;', [id], (error, results) => {
        if(error){
            console.error('Error getting registro:', error);
            res.status(500).send('Error getting registro');
        } else {
            console.log('Fetching registro...');
            res.status(201).json({message : 'Registro fetched succesfully', registro: results});
        }
    });
}

export const createRegistro = (req, res) => {
    const registro = req.body;
    pool.query('INSERT INTO registro SET ?;', registro, (error) => {
        if(error){
            console.error('Error creating registro:', error);
            res.status(500).send('Error creating registro');
        } else {
            console.log('Creating registro...');
            res.status(201).json({message : 'Registro created succesfully', registro: registro});
        }
    });
}


export const updateRegistro = (req, res) => {
    const id = req.params.id;
    const registro = req.body;
    pool.query('UPDATE registro SET ? WHERE id = ?;', [registro, id], (error) => {
        if(error){
            console.error('Error updating registro:', error);
            res.status(500).send('Error updating registro');
        } else {
            console.log('Updating registro...');
            res.status(201).json({message : 'Registro updated succesfully', registro: registro});
        }
    });
}

export const deleteRegistro = (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM registro WHERE id = ?;', [id], (error) => {
        if(error){
            console.error('Error deleting registro:', error);
            res.status(500).send('Error deleting registro');
        } else {
            console.log('Deleting registro...');
            res.status(201).json({message : 'Registro deleted succesfully'});
        }
    });
    
}

export const getRegistroDetalle = (req, res) => {
    const id = req.params.id;
    pool.query(
        `SELECT r.id AS id, t.id AS trainer_id, t.nombre AS trainer_nombre, t.sexo AS trainer_sexo,
                t.edad AS trainer_edad, t.dob AS trainer_dob, p.id AS pokemon_id, 
                p.nombre AS pokemon_nombre, p.tipo AS pokemon_tipo, 
                p.apodo AS pokemon_apodo, p.sexo AS pokemon_sexo 
         FROM registro r 
         JOIN trainer t ON r.idtrainer = t.id 
         JOIN pokemon p ON r.idpokemon = p.id 
         WHERE r.id = ?;`, 
        [id], 
        (error, results) => {
            if (error) {
                console.error('Error getting registro:', error);
                res.status(500).send('Error getting registro');
            } else if (results.length === 0) {
                res.status(404).json({ message: 'Registro no encontrado' });
            } else {
                console.log('Fetching registro...');
                res.status(200).json({ message: 'Registro fetched successfully', registro: results[0] });
            }
        }
    );
};
