import pool from "../pool.js";
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registro = 
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
};

export const login = 
    (req, res) => {
      
        const correo = req.body.correo;
        const contraseña = req.body.contraseña;

        pool.query('SELECT * FROM getUsuarioByCorreo($1::TEXT);', [correo], (error, results) => {
            if (error) {
                console.error('Error obteniendo el usuario:', error);
                return res.status(500).send('Error al obtener el usuario');
            }

            if (results.rows.length === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const usuario = results.rows[0];
            const hashedPassword = usuario.contraseña

            bcrypt.compare(contraseña, hashedPassword, (err, isMatch) => {
                if (err) {
                    console.error('Error comparando contraseñas:', err);
                    return res.status(500).send('Error interno al comparar contraseñas');
                }

                if (!isMatch) {
                    return res.status(401).json({ message: 'Contraseña incorrecta' });
                }
                const token = jwt.sign({
                    id: usuario.id,
                    correo: usuario.correo,
                    rol: usuario.rol
                },'llaveprivada')
                res.cookie('token', token, { maxAge: 900000, });

                res.status(200).json({ message: 'Login exitoso', usuario: usuario });
            });
        });
    };

export const me =(req, res) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: 'No estas autorizado'});
    }
    const verificado = jwt.verify(token, 'llaveprivada');
    res.status(200).json({message: 'Estas autorizado', usuario: verificado});
}
