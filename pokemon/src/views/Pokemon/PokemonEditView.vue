<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4> Editar Pokemon</h4>
                <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                    Datos Actualizado con exito!
                </div>
            </div>
            <div class="card-body">
                <form :validation-schema="validationSchema" @submit="checked()">
                    <div class="mb-3">
                        ID
                        <Field name="id" id="id" type="text" class="form-control" :disabled="true"  v-model="model.pokemon.id"/>
                        <ErrorMessage name="id" class="errorValidacion"/>
                    </div>
                    <div class="mb-3">
                        Nombre
                        <Field name="nombre" id="nombre" type="text" class="form-control" v-model="model.pokemon.nombre"/>
                        <ErrorMessage name="nombre" class="errorValidacion"/>
                    </div>
                    <div class="mb-3">
                        Tipo
                        <select name="tipo" id="tipo" class="form-control" v-model="model.pokemon.tipo">
                            <option value="Acero">Acero</option>
                            <option value="Agua">Agua</option>
                            <option value="Bicho">Bicho</option>
                            <option value="Dragon">Dragon</option>
                            <option value="Electrico">Electrico</option>
                            <option value="Fantasma">Fantasma</option>
                            <option value="Fuego">Fuego</option>
                            <option value="Hada">Hada</option>
                            <option value="Hielo">Hielo</option>
                            <option value="Normal">Normal</option>
                            <option value="Lucha">Lucha</option>
                            <option value="Planta">Planta</option>
                            <option value="Psiquico">Psiquico</option>
                            <option value="Roca">Roca</option>
                            <option value="Siniestro">Siniestro</option>
                            <option value="Tierra">Tierra</option>
                            <option value="Veneno">Veneno</option>
                            <option value="Volador">Volador</option>
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
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import apiclient from '../../apiclient.js'
    export default{
        nombre: 'editarPokemon',
        components: {Field, ErrorMessage},
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
                        id: '',
                        nombre:'',
                        tipo: '',
                        apodo:'',
                        sexo:'',
                    }
                }
            }
        },
        mounted(){
            this.getPokemon(this.$route.params.id);
        },
        methods:{
            getPokemon(id){
                apiclient.pokemones.getPokemonById(id).then(res=>{
                    this.model.pokemon = res.data.pokemon[0];
                });
            },
            checked(){
                this.updatePokemon();
                alert('Datos Actualizado con exito!');
                this.$router.push('/pokemones');
            },
            updatePokemon(){
            apiclient.pokemones.updatePokemon(this.model.pokemon).then(res =>{
                if(res.data.affectedRows == 1){
                    this.model.pokemon = {
                        id: '',
                        nombre:'',
                        tipo: '',
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