import pool from "../pool.js";

export const getTrainers = (req, res) => {
    pool.query('SELECT * FROM getTrainers();', (error, results) => {
        if(error){
            console.error('Error getting trainer:', error);
            res.status(500).send('Error getting trainer');
        } else {
            console.log('Fetching trainers...');
            res.status(201).json({message : 'Trainers fetched succesfully', trainer: results.rows});
        }
    });
}

export const getTrainerById = (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM getTrainerById($1);', [id], (error, results) => {
        if (error) {
            console.error('Error getting trainer:', error);
            res.status(500).send('Error getting trainer');
        } else {
            console.log('Fetching trainer...');
            res.status(200).json({ message: 'Trainer fetched successfully', trainer: results.rows });
        }
    });
}

export const createTrainer = (req, res) => {
    const trainer = req.body;
    pool.query(
        'SELECT createTrainer($1::json);',
        [trainer],
        (error) => {
            if (error) {
                console.error('Error creating trainer:', error);
                res.status(500).send('Error creating trainer');
            } else {
                console.log('Creating trainer...');
                res.status(201).json({ message: 'Trainer created successfully', trainer: trainer });
            }
        }
    );
}



export const updateTrainer = (req, res) => {
    const id = req.params.id;
    const trainer = req.body;
    pool.query('SELECT updateTrainer($1, $2::json)', 
        [id, trainer], 
        (error) => {
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
    pool.query('SELECT deleteTrainer($1);', [id], (error) => {
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
        'SELECT * FROM getTrainerDetalle($1);',
        [id],
        (error, results) => {
            if (error) {
                console.error('Error getting trainer details:', error);
                res.status(500).send('Error getting trainer details');
            } else if (results.rows.length === 0) {
                res.status(404).json({ message: 'Trainer details not found' });
            } else {
                console.log('Fetching trainer details...');
                res.status(200).json({ message: 'Trainer details fetched successfully', registro: results.rows });
            }
        }
    );
};

//filtro
export const getTrainersFiltro = (req, res) => {
    const sexo = req.query.sexo === undefined ? null: Number(req.query.sexo);
    const nombre = req.query.nombre === undefined ? null : req.query.nombre;
    const edad = req.query.edad === undefined ? null: Number(req.query.edad);
    const dobInicio = req.query.dobInicio === undefined ? null : req.query.dobInicio;
    const dobFin = req.query.dobFin === undefined ? null : req.query.dobFin;
    console.log({
        sexo: sexo,
        nombre: nombre,
        edad: edad,
        dobInicio: dobInicio,
        dobFin: dobFin
    })

    const query = `
        SELECT * FROM getTrainersFiltro(
            $1::INT, 
            $2::VARCHAR, 
            $3::INT, 
            $4::DATE, 
            $5::DATE
        );
    `;
    pool.query(
        query,
        [
            sexo , 
            nombre ,
            edad ,  
            dobInicio , 
            dobFin 
        ],
        (error, results) => {
            if (error) {
                console.error('Error getting trainer details:', error);
                res.status(500).send('Error getting trainer details');
            } else if (results.rows.length === 0) {
                res.status(404).json({ message: 'Trainer details not found' });
            } else {
                res.status(200).json({ message: 'Trainer details fetched successfully', trainer: results.rows });
            }
        }
    );
};
