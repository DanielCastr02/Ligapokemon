import { Router } from "express";
import { getPokemon, getPokemonById, createPokemon, deletePokemon, updatePokemon,
    getPokemonesByName, getPokemonesByType, getPokemonesByApodo, getPokemonesByGender
 } from "../controllers/pokemonController.js";

const pokemonRoutes = Router();

pokemonRoutes.get('/api/pokemones', getPokemon);
pokemonRoutes.get('/api/pokemones/:id', getPokemonById);
pokemonRoutes.post('/api/pokemones', createPokemon);
pokemonRoutes.put('/api/pokemones/:id', updatePokemon);
pokemonRoutes.delete('/api/pokemones/:id', deletePokemon);

//filtros
pokemonRoutes.get('/api/pokemones/nombre/:nombre', getPokemonesByName);
pokemonRoutes.get('/api/pokemones/tipo/:tipo', getPokemonesByType);
pokemonRoutes.get('/api/pokemones/apodo/:apodo', getPokemonesByApodo);
pokemonRoutes.get('/api/pokemones/sexo/:sexo', getPokemonesByGender);

export default pokemonRoutes;