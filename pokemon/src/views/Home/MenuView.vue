<template>
    <body>
        <div class="container mt-5">
            <div class="text-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUvNnPKO-Typ2QEzDjEH500qZQ7KF9DX12Fw&s" class="text-center flex" alt="">
                <h1 class="text-center">REGISTRO LIGA POKEMON</h1>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <h2 class="text-center">Trainer</h2>
                    <form >
                        <div class="form-group">
                            <label for="trainerId">ID</label>
                            <select id="trainerId" class="form-control" v-model="selectedTrainerId" @change="loadTrainerDetails">
                                <option v-for="trainer in trainers" :key="trainer.id" :value="trainer.id">{{ trainer.id }}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="trainerSexo">Sexo:</label>
                            <input type="text" class="form-control" id="trainerSexo" v-model="model.trainer.sexo" :disabled="true" />
                        </div>
                        <div class="form-group">
                            <label for="nombre">Nombre:</label>
                            <input name="nombre" id="nombre" type="text" class="form-control" v-model="model.trainer.nombre" :disabled="true" />
                        </div>
                        <div class="form-group">
                            <label for="trainerDOB">DOB:</label>
                            <input type="text" class="form-control" id="trainerDOB" v-model="model.trainer.dob" :disabled="true" />
                        </div>
                        <div class="form-group">
                            <label for="trainerEdad">Edad:</label>
                            <input type="text" class="form-control" id="trainerEdad" v-model="model.trainer.edad" :disabled="true" />
                        </div>
                    </form>
                </div>
                <div class="col-md-6">
                    <h2 class="text-center">Pokémon</h2>
                    <form>
                        <div class="form-group">
                            <label for="pokemonId">ID</label>
                            <select id="pokemonId" class="form-control" v-model="selectedPokemonId" @change="loadPokemonDetails">
                                <option v-for="pokemon in pokemones" :key="pokemon.id" :value="pokemon.id">{{ pokemon.id }}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="pokemonNombre">Nombre:</label>
                            <input type="text" class="form-control" id="pokemonNombre" v-model="model.pokemon.nombre" :disabled="true" />
                        </div>
                        <div class="form-group">
                            <label for="pokemonTipo">Tipo:</label>
                            <input type="text" class="form-control" id="pokemonTipo" v-model="model.pokemon.tipo" :disabled="true" />
                        </div>
                        <div class="form-group">
                            <label for="pokemonApodo">Apodo:</label>
                            <input type="text" class="form-control" id="pokemonApodo" v-model="model.pokemon.apodo" :disabled="true" />
                        </div>
                        <div class="form-group">
                            <label for="pokemonSexo">Sexo:</label>
                            <input type="text" class="form-control" id="pokemonSexo" v-model="model.pokemon.sexo" :disabled="true" />
                        </div>
                    </form>
                </div>
                <div class="text-center mt-3">
                <button @click="checked()" type="submit" class="btn btn-primary">Registrar</button>
            </div>
            </div>
        </div>
    </body>
</template>

<script>
    import { RouterLink } from 'vue-router';
    import axios from 'axios';
    import { Field, Form, ErrorMessage } from 'vee-validate';
    import * as zod from 'zod';
    import apiclient from '../../apiclient.js';

    export default {
        name: "trainersView",
        components: {
            RouterLink,
        },
        data() {
            return {
                mensaje: 0,
                trainers: [], 
                pokemones: [],      
                selectedTrainerId: '',  
                selectedPokemonId: '',  
                model: {
                    registro: {
                        idtrainer: '',
                        idpokemon: '',
                    },
                    trainer: {
                        id: '',
                        sexo: '',
                        nombre: '',
                        edad: '',
                        dob: '',
                    },
                    pokemon: {
                        id: '',
                        nombre: '',
                        tipo: '',
                        apodo: '',
                        sexo: '',
                    }
                }
            }
        },
        mounted() {
            this.getTrainers();
            this.getPokemones();
        },
        methods: {
            checked(){
                this.createRegistro();
                alert('Datos Guardados con exito!');
            },
            createRegistro(){
            try {
                apiclient.registros.createRegistro(this.model.registro).then(res =>{
                    console.log(this.model);
                    if(res.data.affectedRows == 1){
                        this.model.registro = {
                            idtrainer: '',
                            idpokemon: '',
                        }
                    }
                });
                
                } catch (error) {
                    console.error(error)
                }
            },
            getTrainers() {
                apiclient.trainers.getTrainers().then(res => {
                    this.trainers = res.data.trainer;
                });
            },
            getPokemones() {
                apiclient.pokemones.getPokemones().then(res => {
                    this.pokemones = res.data.pokemon;
                });
            },
            loadTrainerDetails() {
                if (this.selectedTrainerId) {
                    this.getTrainer(this.selectedTrainerId);
                    this.model.registro.idtrainer = this.selectedTrainerId; 
                }
            },
            getTrainer(id) {
                apiclient.trainers.getTrainerById(id).then(res => {
                    const trainerData = res.data.trainer[0];
                    this.model.trainer.id = trainerData.id;
                    this.model.trainer.sexo = trainerData.sexo;
                    this.model.trainer.nombre = trainerData.nombre;
                    this.model.trainer.edad = trainerData.edad;
                    this.model.trainer.dob = new Date(trainerData.dob).toISOString().split('T')[0];
                });
            },
            loadPokemonDetails() {
                if (this.selectedPokemonId) {
                    this.getPokemon(this.selectedPokemonId);
                    this.model.registro.idpokemon = this.selectedPokemonId;
                }
            },
            getPokemon(id) {
                apiclient.pokemones.getPokemonById(id).then(res => {
                    const pokemonData = res.data.pokemon[0];
                    this.model.pokemon.id = pokemonData.id;
                    this.model.pokemon.nombre = pokemonData.nombre;
                    this.model.pokemon.tipo = pokemonData.tipo;
                    this.model.pokemon.apodo = pokemonData.apodo;
                    this.model.pokemon.sexo = pokemonData.sexo;
                });
            }
        }
    };
</script>

<style scoped>
img {
    width: 100px;
}

</style>
