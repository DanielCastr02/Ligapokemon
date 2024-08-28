import {Router} from 'express';
import {getTrainers, getTrainerById, createTrainer, deleteTrainer, updateTrainer, getTrainerDetalle, getTrainersFiltro} from '../controllers/trainerController.js';

const trainersRoutes = Router();

//filtro
trainersRoutes.get('/api/trainers/filtro', getTrainersFiltro);

trainersRoutes.get('/api/trainers', getTrainers);
trainersRoutes.get('/api/trainers/:id', getTrainerById);
trainersRoutes.post('/api/trainers', createTrainer);
trainersRoutes.put('/api/trainers/:id', updateTrainer);
trainersRoutes.delete('/api/trainers/:id', deleteTrainer);
trainersRoutes.get('/api/trainers/detalle/:id', getTrainerDetalle);




export default trainersRoutes;