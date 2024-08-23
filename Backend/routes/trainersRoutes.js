import {Router} from 'express';
import {getTrainers, getTrainerById, createTrainer, deleteTrainer, updateTrainer, getTrainerDetalle, getTrainersByGender} from '../controllers/trainerController.js';

const trainersRoutes = Router();

trainersRoutes.get('/api/trainers', getTrainers);
trainersRoutes.get('/api/trainers/:id', getTrainerById);
trainersRoutes.post('/api/trainers', createTrainer);
trainersRoutes.put('/api/trainers/:id', updateTrainer);
trainersRoutes.delete('/api/trainers/:id', deleteTrainer);
trainersRoutes.get('/api/trainers/detalle/:id', getTrainerDetalle);
//filtros
trainersRoutes.get('/api/trainers/sexo/:sexo', getTrainersByGender);

export default trainersRoutes;