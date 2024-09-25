import { Router } from "express";
import { login, registro, me } from "../controllers/authController.js";

const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.post('/singup', registro);
authRoutes.get('/me', me);

export default authRoutes;