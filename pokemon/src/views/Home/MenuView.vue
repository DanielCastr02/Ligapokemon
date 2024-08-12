<template>
    <body>
    <div class="container  mt-5">
      <div class="text-center">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUvNnPKO-Typ2QEzDjEH500qZQ7KF9DX12Fw&s" 
          class="text-center flex "alt="">
        <h1 class="text-center ">REGISTRO LIGA POKEMON</h1>
      </div>
        <div class="row">
            <div class="col-md-6">
                <h2 class="text-center ">Trainer</h2>
                <form>
                  <div class="form-group">
                        ID
                        <select name="sexo" id="sexo" class="form-control" v-model="model.trainer.id">
                            <option value="0">1</option>
                            <option value="1">2</option>
                        </select>
                        <ErrorMessage name="sexo" class="errorValidacion"/>
                    </div>
                    <div class="form-group">
                        <label for="trainerSexo">Sexo:</label>
                        <Input type="text" class="form-control" id="trainerSexo" :disabled="true" />
                    </div>
                    <div class="form-group">
                        Nombre
                        <Input name="nombre" id="nombre" type="text" class="form-control" :disabled="true" v-model="model.trainer.nombre"/>
                        <ErrorMessage name="nombre" class="errorValidacion"/>
                    </div>
                    <div class="form-group">
                        <label for="trainerDOB">DOB:</label>
                        <input type="text" class="form-control" id="trainerDOB" :disabled="true">
                    </div>
                    <div class="form-group">
                        <label for="trainerEdad">Edad:</label>
                        <input type="text" class="form-control" id="trainerEdad" :disabled="true">
                    </div>
                    </form>
            </div>
            <div class="col-md-6">
                <h2 class="text-center ">Pokémon</h2>
                <form>
                    <div class="form-group">
                        <label for="pokemonId">ID:</label>
                        <select class="form-select" id="pokemonId">
                            <option value="">Seleccionar</option>
                            </select>
                    </div>
                    <div class="form-group">
                        <label for="pokemonNombre">Nombre:</label>
                        <input type="text" class="form-control" id="pokemonNombre" :disabled="true">
                    </div>
                    <div class="form-group">
                        <label for="pokemonTipo">Tipo:</label>
                        <input type="text" class="form-control" id="pokemonTipo" :disabled="true">
                    </div>
                    <div class="form-group">
                        <label for="pokemonApodo">Apodo:</label>
                        <input type="text" class="form-control" id="pokemonApodo" :disabled="true">
                    </div>
                    <div class="form-group">
                        <label for="pokemonSexo">Sexo:</label>
                        <input type="text" class="form-control" id="pokemonSexo" :disabled="true">
                    </div>
                    </form>
            </div>
        </div>

        <div class="text-center mt-3">
            <button class="btn btn-primary">Registrar</button>
        </div>
    </div>
</body>
</template>

<script>
    import { RouterLink } from 'vue-router';
    import axios from 'axios'
    import { Field, Form, ErrorMessage } from 'vee-validate';
    import { toTypedSchema } from '@vee-validate/zod';
    import * as zod from 'zod';
    import apiclient from '../../apiclient.js';
    
    export default {
        name: "trainersView",
        components: {
            RouterLink,
        },
        data() {
          const validationSchema = toTypedSchema(
                zod.object({
                    nombre: zod.string().min(1, {message: 'requerido'}),
                    edad: zod.number().int(),
                })
            )
          return{
                validationSchema,
                mensaje: 0,
                model:{
                    trainer:{
                        id: '',
                        sexo:'',
                        nombre:'',
                        edad:'',
                        dob: '',
                    }
                }
            }
        },
        mounted(){
            this.getTrainer(this.$route.params.id);
        },
        methods: {
          getTrainer(id){
                apiclient.trainers.getTrainerById(id).then(res=>{
                    this.model.trainer = res.data.trainer[0];
                });
            },
            getPokemones() {
                apiclient.pokemones.getPokemones().then(res => {
                    this.pokemones = res.data.pokemones;
                });
            },
        }
    };
</script>

<style scoped>
img{
  width: 100px;
}

</style>
