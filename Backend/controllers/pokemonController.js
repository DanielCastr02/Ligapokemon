import pool from "../pool.js";
import { check, validationResult } from 'express-validator';

const pokemonBodyValidate = [
    check('nombre').isString().isLength({ min: 1, max: 50 }).escape().withMessage('El nombre debe tener entre 1 y 50 caracteres.'),
    check('tipo').isString().isLength({ min: 1, max: 50 }).escape().withMessage('El tipo debe tener entre 1 y 50 caracteres.'),
    check('apodo').isString().isLength({ min: 1, max: 50 }).escape().withMessage('El apodo debe tener entre 1 y 50 caracteres.'),
    check('sexo').isInt().isIn([0, 1]).withMessage('El sexo debe ser 0 o 1.'),
];

const paginationValidate = [
    check('limit').isInt().withMessage('El límite debe ser un número.'),
    check('offset').isInt().withMessage('El offset debe ser un número.')
]

const idPokemonValidate = [
    check('id').isInt().withMessage('El id debe ser un número.')
]

export const getPokemon = (req, res) => {
    pool.query('SELECT * FROM getPokemones();', (error, results) => {
        if(error){
            console.error('Error getting pokemon:', error);
            res.status(500).send('Error getting pokemon');
        } else {
            console.log('Fetching pokemon...');
            res.status(201).json({message : 'pokemones fetched succesfully', pokemon: results.rows});
        }
    });
}

export const getPokemonById = [
    idPokemonValidate,
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;

    pool.query('SELECT * FROM getPokemonById($1::INT);', [id], (error, results) => {
        if(error){
            console.error('Error getting pokemon:', error);
            res.status(500).send('Error getting pokemon');
        } else {
            console.log('Fetching pokemon...');
            res.status(201).json({message : 'Pokemon fetched succesfully', pokemon: results.rows});
        }
    });
}];

export const createPokemon = [
    pokemonBodyValidate,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const pokemon = req.body;

    pool.query(
        'SELECT createPokemon($1::json);',
        [pokemon],
        (error) => {
        if(error){
            console.error('Error creating pokemon:', error);
            res.status(500).send('Error creating pokemon');
        } else {
            console.log('Creating pokemon...');
            res.status(201).json({message : 'Pokemon created succesfully', pokemon: pokemon});
        }
    });
}];


export const updatePokemon = [
    idPokemonValidate,
    pokemonBodyValidate,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const id = req.params.id;
    const pokemon = req.body;

    pool.query('SELECT updatePokemon($1::INT, $2::json)', 
        [id, pokemon], 
        (error) => {
        if(error){
            console.error('Error updating pokemon:', error);
            res.status(500).send('Error updating pokemon');
        } else {
            console.log('Updating pokemon...');
            res.status(201).json({message : 'Pokemon updated succesfully', pokemon: pokemon});
        }
    });
}]

export const deletePokemon = [
    idPokemonValidate,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const id = req.params.id;

    pool.query('SELECT deletePokemon($1::INT);', [id], (error) => {
        if(error){
            console.error('Error deleting pokemon:', error);
            res.status(500).send('Error deleting pokemon');
        } else {
            console.log('Deleting pokemon...');
            res.status(201).json({message : 'Pokemon deleted succesfully'});
        }
    });
}]

export const getPokemonesFiltro = [
    paginationValidate,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const nombre = req.query.nombre === undefined ? null : req.query.nombre;
    const tipo = req.query.tipo === undefined ? null : req.query.tipo;
    const apodo = req.query.apodo === undefined ? null : req.query.apodo;
    const sexo = req.query.sexo === undefined ? null: Number(req.query.sexo);
    const limit = req.query.limit === undefined ? null : Number(req.query.limit);
    const offset = req.query.offset === undefined ? null : Number(req.query.offset);

    const query = `
        SELECT * FROM getPokemonesFiltro(
            $1::VARCHAR, 
            $2::VARCHAR, 
            $3::VARCHAR, 
            $4::INT,
            $5::INT,
            $6::INT
        );
    `;
    pool.query(
        query,
        [
            nombre ,
            tipo ,  
            apodo , 
            sexo ,  
            limit,
            offset
        ],
        (error, results) => {
            if (error) {
                console.error('Error getting pokemons details:', error);
                res.status(500).send('Error getting pokemon details');
            } else if (results.rows.length === 0) {
                res.status(404).json({ message: 'Pokemon details not found' });
            } else {
                res.status(200).json({ message: 'Pokemon details fetched successfully', pokemon: results.rows });
            }
        }
    );
}];

export const getPokemonesPDF = [
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    const nombre = req.query.nombre === undefined ? null : req.query.nombre;
    const tipo = req.query.tipo === undefined ? null : req.query.tipo;
    const apodo = req.query.apodo === undefined ? null : req.query.apodo;
    const sexo = req.query.sexo === undefined ? null: Number(req.query.sexo);
    console.log({
        nombre: nombre,
        tipo: tipo,
        apodo: apodo,
        sexo: sexo
    })

    const query = `
        SELECT * FROM getPokemonesPDF(
            $1::VARCHAR, 
            $2::VARCHAR, 
            $3::VARCHAR, 
            $4::INT
        );
    `;
    pool.query(
        query,
        [
            nombre ,
            tipo ,  
            apodo , 
            sexo
        ],
        (error, results) => {
            if (error) {
                console.error('Error getting pokemons details:', error);
                res.status(500).send('Error getting pokemon details');
            } else if (results.rows.length === 0) {
                res.status(404).json({ message: 'Pokemon details not found' });
            } else {
                res.status(200).json({ message: 'Pokemon details fetched successfully', pokemon: results.rows });
            }
        }
    );
}];