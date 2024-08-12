import pool from "../pool.js";

export const getRegistro = (req, res) => {
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
