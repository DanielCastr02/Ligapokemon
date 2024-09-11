import { Router } from "express";
import { getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario } from "../controllers/usuarioController.js";

const usuarioRoutes = Router();

//filtro
// usuarioRoutes.get('/api/usuarios/pdf', getusuariosPDF);
// usuarioRoutes.get('/api/usuarios/filtro', getusuariosFiltro);

usuarioRoutes.get('/api/usuarios', getUsuarios);
usuarioRoutes.get('/api/usuarios/:id', getUsuarioById);
usuarioRoutes.post('/api/usuarios', createUsuario);
usuarioRoutes.put('/api/usuarios/:id', updateUsuario);
usuarioRoutes.delete('/api/usuarios/:id', deleteUsuario);


export default usuarioRoutes;