import axios from "axios";

const axiosinstance = axios.create({
    baseURL: 'http://localhost:3000/api/'
});

export default {
    trainers: {
        getTrainers() {
            return axiosinstance.get('trainers');
        },
        getTrainerById(id) {
            return axiosinstance.get(`trainers/${id}`);
        },
        createTrainer(trainer) {
            return axiosinstance.post('trainers', trainer);
        },
        updateTrainer(trainer) {
            return axiosinstance.put(`trainers/${trainer.id}`, trainer);
        },
        deleteTrainer(id) {
            return axiosinstance.delete(`trainers/${id}`);
        },
        getTrainerDetalle(id){
            return axiosinstance.get(`trainers/detalle/${id}`);
        }
    },

    pokemones: {
        getPokemones() {
            return axiosinstance.get('pokemones');
        },
        getPokemonById(id) {
            return axiosinstance.get(`pokemones/${id}`);
        },
        createPokemon(pokemon) {
            return axiosinstance.post('pokemones', pokemon);
        },
        updatePokemon(pokemon) {
            return axiosinstance.put(`pokemones/${pokemon.id}`, pokemon);
        },
        deletePokemon(id) {
            return axiosinstance.delete(`pokemones/${id}`);
        }
    },

    registros: {
        getRegistros() {
            return axiosinstance.get('registros');
        },
        getRegistroById(id) {
            return axiosinstance.get(`registros/${id}`);
        },
        createRegistro(registro) {
            return axiosinstance.post('registros', registro);
        },
        updateRegistro(registro) {
            return axiosinstance.put(`registros/${registro.id}`, registro);
        },
        deleteRegistro(id) {
            return axiosinstance.delete(`registros/${id}`);
        },
        getRegistroDetalle(id){
            return axiosinstance.get(`registros/detalle/${id}`);
        }
    }
};