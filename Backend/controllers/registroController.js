import pool from "../pool.js";
import { check, validationResult } from 'express-validator';

const registroBodyValidate = [
    check('idtrainer').isInt().withMessage('El idTrainer debe ser un número.'),
    check('idpokemon').isInt().withMessage('El idPokemon debe ser un número.'),
];

const registroValidateFiltro = [
    check('idtrainer').isInt().isEmpty().withMessage('El idTrainer debe ser un número.'),
    check('idpokemon').isInt().isEmpty().withMessage('El idPokemon debe ser un número.'),
];

const paginationValidate = [
    check('limit').isInt().withMessage('El límite debe ser un número.'),
    check('offset').isInt().withMessage('El offset debe ser un número.')
]

const idRegistroValidate = [
    check('id').isInt().withMessage('El id debe ser un número.')
]

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

export const getRegistroById = [
    idRegistroValidate,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const id = req.params.id;

    pool.query('SELECT * FROM getRegistroById($1::INT);', [id], (error, results) => {
        if(error){
            console.error('Error getting registro:', error);
            res.status(500).send('Error getting registro');
        } else {
            console.log('Fetching registro...');
            res.status(201).json({message : 'Registro fetched succesfully', registro: results.rows});
        }
    });
}];

export const createRegistro = [
    registroBodyValidate,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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
}];


export const updateRegistro = [
    idRegistroValidate,
    registroBodyValidate,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const id = req.params.id;
    const registro = req.body;

    pool.query('SELECT updateRegistro($1::INT, $2::json);', 
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
}];

export const deleteRegistro = [
    idRegistroValidate,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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
}];

export const getRegistroDetalle = [
    idRegistroValidate,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const id = req.params.id;

    pool.query('SELECT * FROM getRegistroDetalle($1::INT);', [id], (error, results) => {
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
}];
export const getRegistrosByTrainerId = [
    idRegistroValidate,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const id = req.params.id;

    pool.query('SELECT * FROM getRegistrosByTrainerId($1::INT);', [id], (error, results) => {
        if(error){
            console.error('Error getting registro:', error);
            res.status(500).send('Error getting registro');
        } else {
            console.log('Fetching registro...');
            res.status(201).json({message : 'Registro fetched succesfully', registro: results.rows});
        }
    });
}];

export const deleteRegistrosByTrainerId = [
    idRegistroValidate,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const id = req.params.id;

    pool.query('SELECT deleteRegistrosByTrainerId($1::INT);', [id], (error, results) => {
        if(error){
            console.error('Error getting registro:', error);
            res.status(500).send('Error getting registro');
        } else {
            console.log('Fetching registro...');
            res.status(201).json({message : 'Registro fetched succesfully', registro: results});
        }
    });
}];

export const deleteRegistrosByPokemonId = [
    idRegistroValidate,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const id = req.params.id;

    pool.query('SELECT deleteRegistrosByPokemonId($1::INT);', [id], (error, results) => {
        if(error){
            console.error('Error getting registro:', error);
            res.status(500).send('Error getting registro');
        } else {
            console.log('Fetching registro...');
            res.status(201).json({message : 'Registro fetched succesfully', registro: results});
        }
    });
}];

export const getRegistrosFiltro = [
    paginationValidate,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const idtrainer = req.query.idtrainer === undefined ? null: Number(req.query.idtrainer);
    const idpokemon = req.query.idpokemon === undefined ? null: Number(req.query.idpokemon);
    const limit = req.query.limit === undefined ? null : Number(req.query.limit);
    const offset = req.query.offset === undefined ? null : Number(req.query.offset);

    console.log({
        idtrainer: idtrainer,
        idpokemon: idpokemon,
        limit: limit,
        offset: offset
    })

    const query = `
        SELECT * FROM getRegistrosFiltro(
            $1::INT, 
            $2::INT,
            $3::INT,
            $4::INT
        );
    `;
    pool.query(
        query,
        [
            idtrainer,
            idpokemon,
            limit,
            offset
        ],
        (error, results) => {
            if (error) {
                console.error('Error getting registros details:', error);
                res.status(500).send('Error getting registro details');
            } else if (results.rows.length === 0) {
                res.status(404).json({ message: 'Registro details not found' });
            } else {
                res.status(200).json({ message: 'Registro details fetched successfully', registro: results.rows });
            }
        }
    );
}];

export const getRegistrosPDF = [
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
    const idtrainer = req.query.idtrainer === undefined ? null: Number(req.query.idtrainer);
    const idpokemon = req.query.idpokemon === undefined ? null: Number(req.query.idpokemon);

    console.log({
        idtrainer: idtrainer,
        idpokemon: idpokemon
    })

    const query = `
        SELECT * FROM getRegistrosPDF(
            $1::INT, 
            $2::INT
        );
    `;
    pool.query(
        query,
        [
            idtrainer,
            idpokemon
        ],
        (error, results) => {
            if (error) {
                console.error('Error getting registros details:', error);
                res.status(500).send('Error getting registro details');
            } else if (results.rows.length === 0) {
                res.status(404).json({ message: 'Registro details not found' });
            } else {
                res.status(200).json({ message: 'Registro details fetched successfully', registro: results.rows });
            }
        }
    );
}];