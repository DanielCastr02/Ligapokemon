<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4> Editar Registro</h4>
            </div>
            <div class="card-body row" >
                <Form>
                    <div class="mb-3">
                        idRegistro
                        <Field name="id" id="id" type="text" class="form-control" :disabled="true"  v-model="model.registro.id"/>
                        <ErrorMessage name="id" class="errorValidacion"/>
                    </div>
                </Form>
                <Form  class="col-md-6">
                    <div class="form-group">
                            <label for="trainerId">ID</label>
                            <select id="trainerId" class="form-control" v-model="selectedTrainerId" @change="loadTrainerDetails">
                                <option v-for="trainer in trainers" :key="trainer.id" :value="trainer.id">{{ trainer.id }}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="nombre">Nombre:</label>
                            <input name="nombre" id="nombre" type="text" class="form-control" v-model="model.trainer.nombre" :disabled="true" />
                        </div>
                </Form>
                <Form  class="col-md-6">
                    <div class="form-group">
                            <label for="pokemonId">ID</label>
                            <select id="pokemonId" class="form-control" v-model="selectedPokemonId" @change="loadPokemonDetails">
                                <option v-for="pokemon in pokemones" :key="pokemon.id" :value="pokemon.id">{{ pokemon.id }}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="pokemonApodo">Apodo:</label>
                            <input type="text" class="form-control" id="pokemonApodo" v-model="model.pokemon.apodo" :disabled="true" />
                        </div>
                </Form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { RouterLink } from 'vue-router';
import { Field, Form, ErrorMessage } from 'vee-validate';
import apiclient from '../../apiclient.js'
    export default{
        nombre: 'editarTrainer',
        components: {Field, Form, ErrorMessage, RouterLink},
        data(){
            return{
                mensaje: 0,
                model:{
                    registro:{
                        id: '',
                        idtrainer: '',
                        idpokemon: ''
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
        mounted(){
            this.getTrainer(this.$route.params.id);
        },
        methods:{
            checked(){
                this.updateRegistro();
                alert('Datos Actualizado con exito!');
                this.$router.push('/registros');
            },
            updateRegistro(){
                apiclient.registros.updateRegistro(this.model.registro).then(res =>{
                    if(res.data.affectedRows == 1){
                        this.model.registro = {
                            id: '',
                            idtrainer: '',
                            idpokemon: '',
                        }
                        this.mensaje = 1;
                    }
                });
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
                }
            },
            getTrainer(id) {
                apiclient.trainers.getTrainerById(id).then(res => {
                    const trainerData = res.data.trainer[0];
                    this.model.trainer.id = trainerData.id;
                    this.model.trainer.nombre = trainerData.nombre;
                });
            },
            loadPokemonDetails() {
                if (this.selectedPokemonId) {
                    this.getPokemon(this.selectedPokemonId);
                }
            },
            getPokemon(id) {
                apiclient.pokemones.getPokemonById(id).then(res => {
                    const pokemonData = res.data.pokemon[0];
                    this.model.pokemon.id = pokemonData.id;
                    this.model.pokemon.apodo = pokemonData.apodo;
                });
            }
        }
}
</script>

<style scoped>
.errorValidacion{
    color: red;
}
</style>