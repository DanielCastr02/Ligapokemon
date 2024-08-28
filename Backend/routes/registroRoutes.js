import { Router } from "express";
import { getRegistros, getRegistroById, createRegistro, deleteRegistro, updateRegistro, getRegistroDetalle, 
    getRegistrosByTrainerId, deleteRegistrosByTrainerId , deleteRegistrosByPokemonId, getRegistrosFiltro} from '../controllers/registroController.js'

const registroRoutes = Router();

//filtro
registroRoutes.get('/api/registros/filtro', getRegistrosFiltro);

registroRoutes.get('/api/registros', getRegistros);
registroRoutes.get('/api/registros/:id', getRegistroById);
registroRoutes.post('/api/registros', createRegistro);
registroRoutes.put('/api/registros/:id', updateRegistro);
registroRoutes.delete('/api/registros/:id', deleteRegistro);
registroRoutes.get('/api/registros/detalle/:id', getRegistroDetalle);
registroRoutes.delete('/api/registros/trainer/:id', deleteRegistrosByTrainerId);
registroRoutes.delete('/api/registros/pokemon/:id', deleteRegistrosByPokemonId);
registroRoutes.get('/api/registros/trainer/:id', getRegistrosByTrainerId);

export default registroRoutes;