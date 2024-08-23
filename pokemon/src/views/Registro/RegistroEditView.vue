<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4> Editar Registro</h4>
            </div>
            <Form class="card-body row" @submit="checked()">
                <div>
                    <div class="mb-3">
                        Registro ID
                        <Field name="id" id="id" type="text" class="form-control" :disabled="true"  v-model="model.registro.id"/>
                        <ErrorMessage name="id" class="errorValidacion"/>
                    </div>
                </div>
                <div  class="col-md-6">
                    <div class="form-group">
                            <label for="trainerId">Trainer ID</label>
                            <select id="trainerId" class="form-control" v-model="model.trainer.id" @change="loadTrainerDetails">
                                <option v-for="trainer in trainers" :key="trainer.id" :value="trainer.id">{{ trainer.id }}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="nombre">Trainer Nombre</label>
                            <input name="nombre" id="nombre" type="text" class="form-control" v-model="model.trainer.nombre" :disabled="true" />
                        </div>
                </div>
                <div  class="col-md-6">
                    <div class="form-group">
                            <label for="pokemonId">Pokemon ID</label>
                            <select id="pokemonId" class="form-control" v-model="model.pokemon.id" @change="loadPokemonDetails" >
                                <option v-for="pokemon in pokemones" :key="pokemon.id" :value="pokemon.id">{{ pokemon.id }}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="pokemonApodo">Pokemon Apodo</label>
                            <input type="text" class="form-control" id="pokemonApodo" v-model="model.pokemon.apodo" :disabled="true" />
                        </div>
                </div>
                <div class="mb-3">
                        <button type="submit" class="btn btn-primary"> Actualizar </button>
                </div>
            </Form>
        </div>
    </div>
</template>
<script>
import { Field, ErrorMessage } from 'vee-validate';
import apiclient from '../../apiclient.js'
    export default{
        nombre: 'editarTrainer',
        components: {Field, ErrorMessage},
        data(){
            return{
                mensaje: 0,
                trainers: [], 
                pokemones: [],
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
            this.getRegistro(this.$route.params.id);
            this.getTrainers();
            this.getPokemones();
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
                if (this.model.trainer.id) {
                    this.getTrainer(this.model.trainer.id);
                    this.model.registro.idtrainer = this.model.trainer.id;
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
                if (this.model.pokemon.id) {
                    this.getPokemon(this.model.pokemon.id);
                    this.model.registro.idpokemon = this.model.pokemon.id;
                }
            },
            getPokemon(id) {
                apiclient.pokemones.getPokemonById(id).then(res => {
                    const pokemonData = res.data.pokemon[0];
                    this.model.pokemon.id = pokemonData.id;
                    this.model.pokemon.apodo = pokemonData.apodo;
                });
            },
            getRegistro(id) {
                apiclient.registros.getRegistroDetalle(id).then(res => {
                    const registroData = res.data.registro;

                    //Registro
                    this.model.registro.id = registroData.id;
                    this.model.registro.idtrainer = registroData.trainer_id;
                    this.model.registro.idpokemon = registroData.pokemon_id;
                    //Trainer
                    this.model.trainer.id = registroData.trainer_id;
                    this.model.trainer.nombre = registroData.trainer_nombre;
                    //Pokemon
                    this.model.pokemon.id = registroData.pokemon_id;
                    this.model.pokemon.apodo = registroData.pokemon_apodo;
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