<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4> Trainer Detalle</h4>
            </div>
            <div class="card-body row" >
                <form>
                    <div class="mb-3">
                        Trainer: 
                        <Field name="id" id="id" type="text" class="form-control" :disabled="true" v-model="model.trainer.nombre"/>
                        <ErrorMessage name="id" class="errorValidacion"/>
                    </div>
                </form>
                <div class="card-body">
            <table class="table table-bordered table-striped">
                <thead class="thead-dark"> Pokemones a su mando:
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Apodo</th>
                        <th>Sexo</th>
                    </tr>
                </thead>
                <tbody v-if="registros.length > 0">
                    <tr v-for="(registro, index) in registros" :key="index">
                        <td>{{ registro.pokemon_id }}</td>
                        <td>{{ registro.pokemon_nombre }}</td>
                        <td>{{ registro.pokemon_tipo }}</td>
                        <td>{{ registro.pokemon_apodo }}</td>
                        <td v-if="registro.pokemon_sexo == 0"> Macho</td>
                        <td v-if="registro.pokemon_sexo == 1"> Hembra</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="5" style="text-align: center;"> Sin Pokemones registrados!</td>
                    </tr>
                </tbody>
            </table>
        </div>
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
                registros: [],
                model:{
                    registro:{
                        id: '',
                        trainer_id: '',
                        trainer_nombre: '',
                        pokemon_id: '',
                        pokemon_nombre: '',
                        pokemon_tipo: '',
                        pokemon_apodo: '',
                        pokemon_sexo: '',
                    },
                    trainer:{
                        nombre: '',
                    }
                }
            }
        },
        mounted(){
            this.getRegistro(this.$route.params.id);
            this.getTrainerByID(this.$route.params.id);
        },
        methods:{
            getRegistro(id) {
                apiclient.trainers.getTrainerDetalle(id).then(res => {
                    this.registros = res.data.registro;
                    this.model.trainer.nombre = this.registros[0].trainer_nombre;
                });
            },
            getTrainerByID(id) {
                apiclient.trainers.getTrainerById(id).then(res => {
                    const trainerData = res.data.trainer[0];
                    this.model.trainer.nombre = trainerData.nombre;
                });
            },
        }
}
</script>

<style scoped>
.errorValidacion{
    color: red;
}
</style>