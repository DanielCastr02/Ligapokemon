import { Router } from "express";
import { getPokemon, getPokemonById, createPokemon, deletePokemon, updatePokemon, getPokemonesFiltro, getPokemonesPDF} from "../controllers/pokemonController.js";
import { autorizar } from "../auth.js";

const pokemonRoutes = Router();

pokemonRoutes.use(autorizar);

//filtro
pokemonRoutes.get('/pdf', getPokemonesPDF);
pokemonRoutes.get('/filtro', getPokemonesFiltro);

pokemonRoutes.get('', getPokemon);
pokemonRoutes.get('/:id', getPokemonById);
pokemonRoutes.post('', createPokemon);
pokemonRoutes.put('/:id', updatePokemon);
pokemonRoutes.delete('/:id', deletePokemon);


export default pokemonRoutes;