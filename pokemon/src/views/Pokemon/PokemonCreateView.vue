<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4> Agregar Pokemon</h4>
                <div v-if="mensaje == 1" class="alert alert-success" role="success">
                    Datos Guardado con exito!
                </div>
            </div>
            <div class="card-body">
                <Form :validation-schema="validationSchema" @submit="createPokemon()">
                    <div class="mb-3">
                        Nombre
                        <Field name="nombre" id="nombre" type="text" class="form-control" v-model="model.pokemon.nombre"/>
                        <ErrorMessage name="nombre" class="errorValidacion"/>
                    </div>
                    <div class="mb-3">
                        Tipo
                        <select name="tipo" id="tipo" class="form-control" v-model="model.pokemon.tipo">
                            <option value="Normal">Normal</option>
                            <option value="Lucha">Lucha</option>
                            <option value="Volador">Volador</option>
                            <option value="Veneno">Veneno</option>
                            <option value="Tierra">Tierra</option>
                            <option value="Roca">Roca</option>
                            <option value="Fuego">Fuego</option>
                            <option value="Agua">Agua</option>
                            <option value="Planta">Planta</option>
                            <option value="Electrico">Electrico</option>
                        </select>
                        <ErrorMessage name="tipo" class="errorValidacion"/>
                    </div>
                    <div class="mb-3">
                        Apodo
                        <Field name="apodo" id="apodo" type="text" class="form-control" v-model="model.pokemon.apodo"/>
                        <ErrorMessage name="apodo" class="errorValidacion"/>
                    </div>
                    <div class="mb-3">
                        Sexo
                        <select name="sexo" id="sexo" class="form-control" v-model.number="model.pokemon.sexo">
                            <option value="0">Macho</option>
                            <option value="1">Hembra</option>
                        </select>
                        <ErrorMessage name="sexo" class="errorValidacion"/>
                    </div>
                    <div class="mb-3">
                        <button type="submit" class="btn btn-primary"> Guardar </button>
                    </div>
                </Form> 
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { Field, Form, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import apiclient from '../../apiclient.js'
    export default{
        nombre: 'crearPokemon',
        components: {Field, Form, ErrorMessage},
        data(){
            const validationSchema = toTypedSchema(
                zod.object({
                    nombre: zod.string().min(1, {message: 'requerido'}),
                    apodo: zod.string().min(1, {message: 'requerido'}),
                })
            )
            return{
                validationSchema,
                mensaje: 0,
                model:{
                    pokemon:{
                        nombre:'',
                        tipo:'',
                        apodo:'',
                        sexo:'',
                    }
                }
            }
        },
        methods:{
            createPokemon(){
            apiclient.pokemones.createPokemon(this.model.pokemon).then(res =>{
                if(res.data.affectedRows == 1){
                    this.model.pokemon = {
                        nombre:'',
                        tipo:'',
                        apodo:'',
                        sexo:'',
                    }
                    this.mensaje = 1;
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