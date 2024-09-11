import pool from "../pool.js";
import { check, validationResult } from 'express-validator';

const trainerValidate = [
    check('sexo').isInt().isIn([0, 1]).withMessage('El sexo debe ser 0 o 1.'),
    check('nombre').isString().isLength({ min: 1, max: 50 }).escape().withMessage('El nombre debe tener entre 1 y 50 caracteres.'),
    check('edad').isInt({ min: 18, max: 99 }).withMessage('La edad debe ser un número entre 18 y 99.'),
    check('dob').isISO8601().withMessage('La fecha de nacimiento debe ser una fecha válida en formato ISO8601.'),
    check('estado').isInt().isIn([0, 1]).withMessage('El estado debe ser 0 o 1.'),
    check('email').isEmail().trim().escape().normalizeEmail().withMessage('El correo electrónico debe ser válido.')
];

const trainerValidateFiltro = [
    check('sexo').isInt().isIn([0, 1]).isEmpty().withMessage('El sexo debe ser 0 o 1.'),
    check('nombre').isString().isLength({ min: 1, max: 50 }).escape().isEmpty().withMessage('El nombre debe tener entre 1 y 50 caracteres.'),
    check('edad').isInt({ min: 18, max: 99 }).isEmpty().withMessage('La edad debe ser un número entre 18 y 99.'),
    check('dob').isISO8601().isEmpty().withMessage('La fecha de nacimiento debe ser una fecha válida en formato ISO8601.'),
    check('estado').isInt().isIn([0, 1]).isEmpty().withMessage('El estado debe ser 0 o 1.'),
    check('email').isEmail().trim().escape().normalizeEmail().isEmpty().withMessage('El correo electrónico debe ser válido.')
];

const paginationValidate = [
    check('limit').isInt().withMessage('El límite debe ser un número.'),
    check('offset').isInt().withMessage('El offset debe ser un número.')
]

const idTrainerValidate = [
    check('id').isInt().withMessage('El id debe ser un número.')
]

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

export const getTrainerById =[
    idTrainerValidate,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id = req.params.id;

    pool.query('SELECT * FROM getTrainerById($1::INT);', [id], (error, results) => {
        if (error) {
            console.error('Error getting trainer:', error);
            res.status(500).send('Error getting trainer');
        } else {
            console.log('Fetching trainer...');
            res.status(200).json({ message: 'Trainer fetched successfully', trainer: results.rows });
        }
    });
}];

export const createTrainer = [
    trainerValidate, 
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const trainer = req.body;

        pool.query(
            'SELECT createTrainer($1::json);',
            [trainer],
            (error) => {
                if (error) {
                    console.error('Error creating trainer:', error);
                    return res.status(500).send('Error creating trainer');
                }
                console.log('Creating trainer...');
                return res.status(201).json({ message: 'Trainer created successfully', trainer: trainer });
            }
        );
    }
];

export const updateTrainer = [
    idTrainerValidate,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id = req.params.id;
        const trainer = req.body;
        pool.query('SELECT updateTrainer($1::INT, $2::json)', 
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
}];

export const deleteTrainer = [
    idTrainerValidate,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id = req.params.id;
        pool.query('SELECT deleteTrainer($1::INT);', [id], (error) => {
            if(error){
                console.error('Error deleting trainer:', error);
                res.status(500).send('Error deleting trainer');
            } else {
                console.log('Deleting trainer...');
                res.status(201).json({message : 'Trainer deleted succesfully'});
            }
        });
}];

export const getTrainerDetalle = [
    idTrainerValidate,
    (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    
    pool.query(
        'SELECT * FROM getTrainerDetalle($1::INT);',
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
}];

//filtro
export const getTrainersFiltro = [
    paginationValidate,
    (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const sexo = req.query.sexo === undefined ? null: Number(req.query.sexo);
    const nombre = req.query.nombre === undefined ? null : req.query.nombre;
    const edad = req.query.edad === undefined ? null: Number(req.query.edad);
    const dobInicio = req.query.dobInicio === undefined ? null : req.query.dobInicio;
    const dobFin = req.query.dobFin === undefined ? null : req.query.dobFin;
    const estado = req.query.estado === undefined ? null: Number(req.query.estado);
    const email = req.query.email === undefined ? null : req.query.email;
    const limit = req.query.limit === undefined ? null : Number(req.query.limit);
    const offset = req.query.offset === undefined ? null : Number(req.query.offset);

    console.log({
        sexo: sexo,
        nombre: nombre,
        edad: edad,
        dobInicio: dobInicio,
        dobFin: dobFin,
        estado: estado,
        email: email,
        limit: limit,
        offset: offset
    })

    const query = `
        SELECT * FROM getTrainersFiltro(
            $1::INT, 
            $2::VARCHAR, 
            $3::INT, 
            $4::DATE, 
            $5::DATE,
            $6::INT,
            $7::VARCHAR,
            $8::INT,
            $9::INT
        );
    `;
    pool.query(
        query,
        [
            sexo , 
            nombre ,
            edad ,  
            dobInicio , 
            dobFin,
            estado,
            email,
            limit,
            offset
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
}];


export const getTrainersPDF = [
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    const sexo = req.query.sexo === undefined ? null: Number(req.query.sexo);
    const nombre = req.query.nombre === undefined ? null : req.query.nombre;
    const edad = req.query.edad === undefined ? null: Number(req.query.edad);
    const dobInicio = req.query.dobInicio === undefined ? null : req.query.dobInicio;
    const dobFin = req.query.dobFin === undefined ? null : req.query.dobFin;
    const estado = req.query.estado === undefined ? null: Number(req.query.estado);
    const email = req.query.email === undefined ? null : req.query.email;

    console.log({
        sexo: sexo,
        nombre: nombre,
        edad: edad,
        dobInicio: dobInicio,
        dobFin: dobFin,
        estado: estado,
        email: email
    })

    const query = `
        SELECT * FROM getTrainersPDF(
            $1::INT, 
            $2::VARCHAR, 
            $3::INT, 
            $4::DATE, 
            $5::DATE,
            $6::INT,
            $7::VARCHAR
        );
    `;
    pool.query(
        query,
        [
            sexo , 
            nombre ,
            edad ,  
            dobInicio , 
            dobFin,
            estado,
            email
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
}];


import transporter from '../index.js';

export const sendEmail = (req, res) => {
    try {
        const sexo = req.body.sexo === '0' ? 'Chico' : 'Chica';
        const estado = req.body.estado === '0' ? 'Inactivo' : 'Activo';

        // Definir los correos a enviar
        const mailToMe = {
            from: process.env.SMTP_USER,
            to: process.env.SMTP_USER,
            subject: "¡Nuevo Trainer Registrado!",
            text: `
            Sexo: ${sexo},
            Nombre: ${req.body.nombre},
            Edad: ${req.body.edad},
            DOB: ${req.body.dob},
            Estado: ${estado},
            Email: ${req.body.email}`
        };

        const mailToTrainer = {
            from: process.env.SMTP_USER,
            to: req.body.email,
            subject: "¡Felicidades! Ha sido registrado como Trainer",
            text: `
            Registro Info:
            Sexo: ${sexo},
            Nombre: ${req.body.nombre},
            Edad: ${req.body.edad},
            DOB: ${req.body.dob},
            Estado: ${estado},
            Email: ${req.body.email}`
        };

        // Enviar correo al trainer
        transporter.sendMail(mailToTrainer, (err, info) => {
            if (err) {
                console.error('Error enviando email al trainer: ', err);
                return res.status(500).json({ error: 'Error enviando email al trainer' });
            } else {
                console.log('Email enviado al trainer: ', info.response);

                // Después de enviar al trainer, enviar el correo al administrador
                transporter.sendMail(mailToMe, (err, info) => {
                    if (err) {
                        console.error('Error enviando email al administrador: ', err);
                        return res.status(500).json({ error: 'Error enviando email al administrador' });
                    } else {
                        console.log('Email enviado al administrador: ', info.response);
                        return res.status(200).json({ message: 'Correos enviados correctamente', trainer: req.body });
                    }
                });
            }
        });

    } catch (error) {
        console.error('Error en el controlador: ', error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};
