import axios from "axios";

const axiosinstance = axios.create({
    baseURL: 'http://localhost:3000/api/'
});

export default {
    trainers: {
        getTrainers() {
            return axiosinstance.get('trainer');
        },
        getTrainerById(id) {
            return axiosinstance.get(`trainer/${id}`);
        },
        createTrainer(trainer) {
            return axiosinstance.post('trainer', trainer);
        },
        updateTrainer(trainer) {
            return axiosinstance.put(`trainer/${trainer.id}`, trainer);
        },
        deleteTrainer(id) {
            return axiosinstance.delete(`trainer/${id}`);
        }
    },

    pokemones: {
        getPokemones() {
            return axiosinstance.get('pokemon');
        },
        getPokemonById(id) {
            return axiosinstance.get(`pokemon/${id}`);
        },
        createPokemon(pokemon) {
            return axiosinstance.post('pokemon', pokemon);
        },
        deletePokemon(id) {
            return axiosinstance.delete(`pokemon/${id}`);
        }
    }
};