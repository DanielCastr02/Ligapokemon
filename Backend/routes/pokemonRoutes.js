import { Router } from "express";
import { getPokemon, getPokemonById, createPokemon, deletePokemon, updatePokemon, getPokemonesFiltro, getPokemonesPDF} from "../controllers/pokemonController.js";

const pokemonRoutes = Router();

//filtro
pokemonRoutes.get('/api/pokemones/pdf', getPokemonesPDF);
pokemonRoutes.get('/api/pokemones/filtro', getPokemonesFiltro);

pokemonRoutes.get('/api/pokemones', getPokemon);
pokemonRoutes.get('/api/pokemones/:id', getPokemonById);
pokemonRoutes.post('/api/pokemones', createPokemon);
pokemonRoutes.put('/api/pokemones/:id', updatePokemon);
pokemonRoutes.delete('/api/pokemones/:id', deletePokemon);


export default pokemonRoutes;