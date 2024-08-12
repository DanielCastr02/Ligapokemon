import { Router } from "express";
import { getRegistro, getRegistroById, createRegistro, deleteRegistro, updateRegistro } from "../controllers/registroController.js";

const registroRoutes = Router();

registroRoutes.get('/api/registro', getRegistro);
registroRoutes.get('/api/registroregistro/:id', getRegistroById);
registroRoutes.post('/api/registro', createRegistro);
registroRoutes.put('/api/registro/:id', updateRegistro);
registroRoutes.delete('/api/registro/:id', deleteRegistro);

export default registroRoutes;