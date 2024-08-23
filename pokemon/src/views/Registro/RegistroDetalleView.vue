<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4> Detalle Registro</h4>
            </div>
            <div class="card-body row" >
                <form>
                    <div class="mb-3">
                        idRegistro
                        <Field name="id" id="id" type="text" class="form-control" :disabled="true"  v-model="model.registro.id"/>
                        <ErrorMessage name="id" class="errorValidacion"/>
                    </div>
                </form>
                <form  class="col-md-6">
                    <div class="form-group">
                            <label for="trainer_id">Trainer_ID:</label>
                            <input type="text" class="form-control" id="trainer_id" v-model="model.registro.trainer_id" :disabled="true" />
                        </div>
                    <div class="form-group">
                            <label for="trainerSexo">Sexo:</label>
                            <input type="text" class="form-control" id="trainerSexo" v-model="model.registro.trainer_sexo" :disabled="true" />
                        </div>
                        <div class="form-group">
                            <label for="nombre">Nombre:</label>
                            <input name="nombre" id="nombre" type="text" class="form-control" v-model="model.registro.trainer_nombre" :disabled="true" />
                        </div>
                        <div class="form-group">
                            <label for="trainerDOB">DOB:</label>
                            <input type="text" class="form-control" id="trainerDOB" v-model="model.registro.trainer_dob" :disabled="true" />
                        </div>
                        <div class="form-group">
                            <label for="trainerEdad">Edad:</label>
                            <input type="text" class="form-control" id="trainerEdad" v-model="model.registro.trainer_edad" :disabled="true" />
                        </div>
                </form>
                <form  class="col-md-6">
                    <div class="form-group">
                            <label for="pokemon_id">Pokemon_ID:</label>
                            <input type="text" class="form-control" id="pokemon_id" v-model="model.registro.pokemon_id" :disabled="true" />
                        </div>
                         <div class="form-group">
                            <label for="pokemonNombre">Nombre:</label>
                            <input type="text" class="form-control" id="pokemonNombre" v-model="model.registro.pokemon_nombre" :disabled="true" />
                        </div>
                        <div class="form-group">
                            <label for="pokemonTipo">Tipo:</label>
                            <input type="text" class="form-control" id="pokemonTipo" v-model="model.registro.pokemon_tipo" :disabled="true" />
                        </div>
                        <div class="form-group">
                            <label for="pokemonApodo">Apodo:</label>
                            <input type="text" class="form-control" id="pokemonApodo" v-model="model.registro.pokemon_apodo" :disabled="true" />
                        </div>
                        <div class="form-group">
                            <label for="pokemonSexo">Sexo:</label>
                            <input type="text" class="form-control" id="pokemonSexo" v-model="model.registro.pokemon_sexo" :disabled="true" />
                        </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { Field, ErrorMessage } from 'vee-validate';
import apiclient from '../../apiclient.js'
    export default{
        nombre: 'detalleRegistro',
        components: {Field, ErrorMessage},
        data(){
            return{
                mensaje: 0,
                model:{
                    registro: {
                        id: '',
                        trainer_id: '',
                        trainer_sexo: '',
                        trainer_nombre: '',
                        trainer_edad: '',
                        trainer_dob: '',
                        pokemon_id: '',
                        pokemon_nombre: '',
                        pokemon_tipo: '',
                        pokemon_apodo: '',
                        pokemon_sexo: '',
                    }
                }
            }
        },
        mounted(){
            this.getRegistro(this.$route.params.id);
        },
        methods:{
            getRegistro(id) {
                apiclient.registros.getRegistroDetalle(id).then(res => {
                    // this.model.registro = res.data.registro;

                    const registroData = res.data.registro[0];
                    //Registro
                    this.model.registro.id = registroData.id;
                    //Trainer
                    this.model.registro.trainer_id = registroData.trainer_id;
                    if(registroData.trainer_sexo == 0){
                        this.model.registro.trainer_sexo = 'Chico'
                    }else{
                        this.model.registro.trainer_sexo = 'Chica'
                    }
                    this.model.registro.trainer_nombre = registroData.trainer_nombre;
                    this.model.registro.trainer_edad = registroData.trainer_edad;
                    this.model.registro.trainer_dob = registroData.trainer_dob.slice(0,10);
                    //Pokemon
                    this.model.registro.pokemon_id = registroData.pokemon_id;
                    this.model.registro.pokemon_nombre = registroData.pokemon_nombre;
                    this.model.registro.pokemon_tipo = registroData.pokemon_tipo;
                    this.model.registro.pokemon_apodo = registroData.pokemon_apodo;
                    if(registroData.pokemon_sexo == 0){
                        this.model.registro.pokemon_sexo = 'Macho'
                    }else{
                        this.model.registro.pokemon_sexo = 'Hembra'
                    }
                    
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