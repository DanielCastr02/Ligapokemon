import axios from "axios";

const axiosinstance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    withCredentials: true,
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
        },
        sendEmail(trainer){
            return axiosinstance.post(`trainers/email`, trainer);
        },
        getTrainersFiltro(sexo, nombre, edad, dobInicio, dobFin, estado, email, limit, offset) {
            console.log({
                sexo: sexo,
                    nombre: nombre,
                    edad: edad,
                    dobInicio: dobInicio,
                    dobFin: dobFin,
                    estado: estado,
                    email: email,
                    limit: limit,
                    offset: offset
            })
            return axiosinstance.get(`trainers/filtro`,{
                params: {
                    sexo: sexo,
                    nombre: nombre,
                    edad: edad,
                    dobInicio: dobInicio,
                    dobFin: dobFin,
                    estado: estado,
                    email: email,
                    limit: limit,
                    offset: offset 
            }});
        },
        getTrainersPDF(sexo, nombre, edad, dobInicio, dobFin) {
            console.log({
                sexo: sexo,
                    nombre: nombre,
                    edad: edad,
                    dobInicio: dobInicio,
                    dobFin: dobFin
            })
            return axiosinstance.get(`trainers/pdf`,{
                params: {
                    sexo: sexo,
                    nombre: nombre,
                    edad: edad,
                    dobInicio: dobInicio,
                    dobFin: dobFin
            }});
        },
        
        
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
        },
        //filtro
        getPokemonesFiltro(nombre, tipo, apodo, sexo, limit, offset) {
            return axiosinstance.get(`pokemones/filtro`,{
                params: {
                    nombre: nombre,
                    tipo: tipo,
                    apodo: apodo,
                    sexo: sexo,
                    limit: limit,
                    offset: offset
            }});
        },
        getPokemonesPDF(nombre, tipo, apodo, sexo) {
            console.log({
                    nombre: nombre,
                    tipo: tipo,
                    apodo: apodo,
                    sexo: sexo
            })
            return axiosinstance.get(`pokemones/pdf`,{
                params: {
                    nombre: nombre,
                    tipo: tipo,
                    apodo: apodo,
                    sexo: sexo
            }});
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
        },
        deleteRegistrosByTrainerId(id){
            return axiosinstance.delete(`registros/trainer/${id}`);
        },
        deleteRegistrosByPokemonId(id){
            return axiosinstance.delete(`registros/pokemon/${id}`);
        },
        //filtro
        getRegistrosByTrainerId(id){
            return axiosinstance.get(`registros/trainer/${id}`);
        },
        getRegistrosFiltro(idtrainer, idpokemon, limit, offset) {
            return axiosinstance.get(`registros/filtro`,{
                params: {
                    idtrainer: idtrainer,
                    idpokemon: idpokemon,
                    limit: limit,
                    offset: offset
            }});
        },
        getRegistrosPDF(idtrainer, idpokemon) {
            console.log({
                    idtrainer: idtrainer,
                    idpokemon: idpokemon,
            })
            return axiosinstance.get(`registros/pdf`,{
                params: {
                    idtrainer: idtrainer,
                    idpokemon: idpokemon,
            }});
        }
    },

    usuarios: {
        getUsuarios() {
            return axiosinstance.get('usuarios');
        },
        getUsuarioById(id) {
            return axiosinstance.get(`usuarios/${id}`);
        },
        createUsuario(usuario) {
            return axiosinstance.post('usuarios', usuario);
        },
        updateUsuario(usuario) {
            return axiosinstance.put(`usuarios/${usuario.id}`, usuario);
        },
        deleteUsuario(id) {
            return axiosinstance.delete(`usuarios/${id}`);
        }
    },

    auth: {
        async login(usuario) {
            return axiosinstance.post('auth/login', usuario);
        },
        logout() {
            return axiosinstance.post('auth/logout');
        },
        singup(usuario) {
            return axiosinstance.post('auth/singup', usuario);
        },
        me() {
            return axiosinstance.get('auth/me');
        }
    }
};