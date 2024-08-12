import {Router} from 'express';
import {getTrainer, getTrainerById, createTrainer, deleteTrainer, updateTrainer} from '../controllers/trainerController.js';

const trainersRoutes = Router();

trainersRoutes.get('/api/trainer', getTrainer);
trainersRoutes.get('/api/trainer/:id', getTrainerById);
trainersRoutes.post('/api/trainer', createTrainer);
trainersRoutes.put('/api/trainer/:id', updateTrainer);
trainersRoutes.delete('/api/trainer/:id', deleteTrainer);

export default trainersRoutes;