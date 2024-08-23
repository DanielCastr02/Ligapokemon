import { Router } from "express";
import { getRegistros, getRegistroById, createRegistro, deleteRegistro, updateRegistro, getRegistroDetalle, 
    getRegistrosByTrainerId, deleteRegistrosByTrainerId , deleteRegistrosByPokemonId} from '../controllers/registroController.js'

const registroRoutes = Router();

registroRoutes.get('/api/registros', getRegistros);
registroRoutes.get('/api/registros/:id', getRegistroById);
registroRoutes.post('/api/registros', createRegistro);
registroRoutes.put('/api/registros/:id', updateRegistro);
registroRoutes.delete('/api/registros/:id', deleteRegistro);
registroRoutes.get('/api/registros/detalle/:id', getRegistroDetalle);
registroRoutes.get('/api/registros/trainer/:id', getRegistrosByTrainerId);
registroRoutes.delete('/api/registros/trainer/:id', deleteRegistrosByTrainerId);
registroRoutes.delete('/api/registros/pokemon/:id', deleteRegistrosByPokemonId);

export default registroRoutes;