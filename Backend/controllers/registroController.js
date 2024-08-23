import pool from "../pool.js";

export const getRegistros = (req, res) => {
    pool.query('SELECT * FROM getRegistros();', (error, results) => {
        if(error){
            console.error('Error getting registro:', error);
            res.status(500).send('Error getting registro');
        } else {
            console.log('Fetching registro...');
            res.status(201).json({message : 'Registro fetched succesfully', registro: results.rows});
        }
    });
}

export const getRegistroById = (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM getRegistroById($1);', [id], (error, results) => {
        if(error){
            console.error('Error getting registro:', error);
            res.status(500).send('Error getting registro');
        } else {
            console.log('Fetching registro...');
            res.status(201).json({message : 'Registro fetched succesfully', registro: results.rows});
        }
    });
}

export const createRegistro = (req, res) => {
    const registro = req.body;
    pool.query(
        'SELECT createRegistro($1::json);',
        [registro],
        (error) => {
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
    pool.query('SELECT updateRegistro($1, $2::json)', 
        [id, registro], 
        (error) => {
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
    pool.query('SELECT deleteRegistro($1);', [id], (error) => {
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
    pool.query('SELECT * FROM getRegistroDetalle($1)', [id], (error, results) => {
            if (error) {
                console.error('Error getting registro:', error);
                res.status(500).send('Error getting registro');
            } else if (results.length === 0) {
                res.status(404).json({ message: 'Registro no encontrado' });
            } else {
                console.log('Fetching registro...');
                res.status(200).json({ message: 'Registro fetched successfully', registro: results.rows});
            }
        }
    );
}
export const getRegistrosByTrainerId = (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM getRegistrosByTrainerId($1)', [id], (error, results) => {
        if(error){
            console.error('Error getting registro:', error);
            res.status(500).send('Error getting registro');
        } else {
            console.log('Fetching registro...');
            res.status(201).json({message : 'Registro fetched succesfully', registro: results.rows});
        }
    });
}

export const deleteRegistrosByTrainerId = (req, res) => {
    const id = req.params.id;
    pool.query('SELECT deleteRegistrosByTrainerId($1)', [id], (error, results) => {
        if(error){
            console.error('Error getting registro:', error);
            res.status(500).send('Error getting registro');
        } else {
            console.log('Fetching registro...');
            res.status(201).json({message : 'Registro fetched succesfully', registro: results});
        }
    });
}
export const deleteRegistrosByPokemonId = (req, res) => {
    const id = req.params.id;
    pool.query('SELECT deleteRegistrosByPokemonId($1)', [id], (error, results) => {
        if(error){
            console.error('Error getting registro:', error);
            res.status(500).send('Error getting registro');
        } else {
            console.log('Fetching registro...');
            res.status(201).json({message : 'Registro fetched succesfully', registro: results});
        }
    });
}
