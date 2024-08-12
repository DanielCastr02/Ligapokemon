import { Router } from "express";
import { getPokemon, getPokemonById, createPokemon, deletePokemon } from "../controllers/pokemonController.js";

const pokemonRoutes = Router();

pokemonRoutes.get('/api/pokemon', getPokemon);
pokemonRoutes.get('/api/pokemon/:id', getPokemonById);
pokemonRoutes.post('/api/pokemon', createPokemon);
pokemonRoutes.delete('/api/pokemon/:id', deletePokemon);

export default pokemonRoutes;