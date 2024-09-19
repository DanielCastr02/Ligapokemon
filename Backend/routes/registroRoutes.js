import { Router } from "express";
import { getRegistros, getRegistroById, createRegistro, deleteRegistro, updateRegistro, getRegistroDetalle, 
    getRegistrosByTrainerId, deleteRegistrosByTrainerId , deleteRegistrosByPokemonId, getRegistrosFiltro, getRegistrosPDF} from '../controllers/registroController.js'
import { autorizar } from "../auth.js";

const registroRoutes = Router();

registroRoutes.use(autorizar);

//filtro
registroRoutes.get('/pdf', getRegistrosPDF);
registroRoutes.get('/filtro', getRegistrosFiltro);

registroRoutes.get('', getRegistros);
registroRoutes.get('/:id', getRegistroById);
registroRoutes.post('', createRegistro);
registroRoutes.put('/:id', updateRegistro);
registroRoutes.delete('/:id', deleteRegistro);
registroRoutes.get('/detalle/:id', getRegistroDetalle);
registroRoutes.delete('/trainer/:id', deleteRegistrosByTrainerId);
registroRoutes.delete('/pokemon/:id', deleteRegistrosByPokemonId);
registroRoutes.get('/trainer/:id', getRegistrosByTrainerId);

export default registroRoutes;