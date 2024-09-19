import { Router } from "express";
import { login, registro } from "../controllers/authController.js";

const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.post('/singup', registro);

export default authRoutes;