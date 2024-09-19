import { Router } from 'express';
import { getTrainers, getTrainerById, createTrainer, deleteTrainer, updateTrainer, getTrainerDetalle, getTrainersFiltro, getTrainersPDF, sendEmail } from '../controllers/trainerController.js';
import { autorizar } from "../auth.js";

const trainersRoutes = Router();

trainersRoutes.use(autorizar);

//filtro
trainersRoutes.get('/pdf', getTrainersPDF);
trainersRoutes.get('/filtro', getTrainersFiltro);

trainersRoutes.get('', getTrainers);
trainersRoutes.get('/:id', getTrainerById);
trainersRoutes.post('', createTrainer);
trainersRoutes.put('/:id', updateTrainer);
trainersRoutes.delete('/:id', deleteTrainer);
trainersRoutes.get('/detalle/:id', getTrainerDetalle);
trainersRoutes.post('/email', sendEmail);




export default trainersRoutes;