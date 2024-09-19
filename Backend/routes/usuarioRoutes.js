import { Router } from "express";
import { getUsuarios, getUsuarioById, updateUsuario, deleteUsuario } from "../controllers/usuarioController.js";
import { autorizar } from "../auth.js";

const usuarioRoutes = Router();

usuarioRoutes.use(autorizar);

usuarioRoutes.get('', getUsuarios);
usuarioRoutes.get('/:id', getUsuarioById);
usuarioRoutes.put('/:id', updateUsuario);
usuarioRoutes.delete('/:id', deleteUsuario);


export default usuarioRoutes;