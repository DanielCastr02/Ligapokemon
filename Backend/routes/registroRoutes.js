import { Router } from "express";
import { getRegistros, getRegistroById, createRegistro, deleteRegistro, updateRegistro, getRegistroDetalle } from '../controllers/registroController.js'

const registroRoutes = Router();

registroRoutes.get('/api/registros', getRegistros);
registroRoutes.get('/api/registros/:id', getRegistroById);
registroRoutes.post('/api/registros', createRegistro);
registroRoutes.put('/api/registros/:id', updateRegistro);
registroRoutes.delete('/api/registros/:id', deleteRegistro);
registroRoutes.get('/api/registros/detalle/:id', getRegistroDetalle)

export default registroRoutes;