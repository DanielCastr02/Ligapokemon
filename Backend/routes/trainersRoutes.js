import {Router} from 'express';
import {getTrainer, getTrainerById, createTrainer, deleteTrainer, updateTrainer, getTrainerDetalle} from '../controllers/trainerController.js';

const trainersRoutes = Router();

trainersRoutes.get('/api/trainers', getTrainer);
trainersRoutes.get('/api/trainers/:id', getTrainerById);
trainersRoutes.post('/api/trainers', createTrainer);
trainersRoutes.put('/api/trainers/:id', updateTrainer);
trainersRoutes.delete('/api/trainers/:id', deleteTrainer);
trainersRoutes.get('/api/trainers/detalle/:id', getTrainerDetalle);

export default trainersRoutes;