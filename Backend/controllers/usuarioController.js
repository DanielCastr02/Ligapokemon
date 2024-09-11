import pool from "../pool.js";
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

const usuarioBodyValidate = [
    check('correo').isString().isLength({ min: 1, max: 100 }).escape().withMessage('El correo no debe ser vacio.'),
    check('password').isString().isLength({ min: 1, max: 50 }).escape().withMessage('el password no debe ser vacio.'),
    check('rol').isInt().withMessage('El rol debe ser un número.'),
];

const paginationValidate = [
    check('limit').isInt().withMessage('El límite debe ser un número.'),
    check('offset').isInt().withMessage('El offset debe ser un número.')
]

const idUsuarioValidate = [
    check('id').isInt().withMessage('El id debe ser un número.')
]

export const getUsuarios = (req, res) => {
    pool.query('SELECT * FROM getUsuarios();', (error, results) => {
        if(error){
            console.error('Error getting pokemon:', error);
            res.status(500).send('Error getting usuario');
        } else {
            console.log('Fetching usuario...');
            res.status(201).json({message : 'usuarios fetched succesfully', usuario: results.rows});
        }
    });
}

export const getUsuarioById = [
    idUsuarioValidate,
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;

    pool.query('SELECT * FROM getUsuarioById($1::INT);', [id], (error, results) => {
        if(error){
            console.error('Error getting usuario:', error);
            res.status(500).send('Error getting usuario');
        } else {
            console.log('Fetching usuario...');
            res.status(201).json({message : 'Usuario fetched succesfully', usuario: results.rows});
        }
    });
}];

export const createUsuario = [
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const usuario = req.body;
  
      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(usuario.contraseña, salt);
        
        usuario.contraseña = hashedPassword;

        pool.query(
          'SELECT createUsuario($1::json);',
          [usuario],
          (error) => {
            if (error) {
              console.error('Error creating usuario:', error);
              res.status(500).send('Error creating usuario');
            } else {
              console.log('Creating usuario...');
              res.status(201).json({ message: 'Usuario created successfully', usuario });
            }
          }
        );
      } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).send('Error processing request');
      }
    }
  ];


export const updateUsuario = [
    idUsuarioValidate,
    usuarioBodyValidate,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const id = req.params.id;
    const usuario = req.body;

    pool.query('SELECT updateUsuario($1::INT, $2::json)', 
        [id, usuario], 
        (error) => {
        if(error){
            console.error('Error updating usuario:', error);
            res.status(500).send('Error updating usuario');
        } else {
            console.log('Updating usuario...');
            res.status(201).json({message : 'Usuario updated succesfully', usuario: usuario});
        }
    });
}];

export const deleteUsuario = [
    idUsuarioValidate,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const id = req.params.id;

    pool.query('SELECT deleteUsuario($1::INT);', [id], (error) => {
        if(error){
            console.error('Error deleting usuario:', error);
            res.status(500).send('Error deleting usuario');
        } else {
            console.log('Deleting usuario...');
            res.status(201).json({message : 'Usuario deleted succesfully'});
        }
    });
}]

