<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4> Editar Trainer</h4>
                <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                    Datos Actualizado con exito!
                </div>
            </div>
            <div class="card-body">
                <form :validation-schema="validationSchema" @submit="checked()">
                    <div class="mb-3">
                        ID
                        <Field name="id" id="id" type="text" class="form-control" :disabled="true"  v-model="model.trainer.id"/>
                        <ErrorMessage name="id" class="errorValidacion"/>
                    </div>
                    <div class="mb-3">
                        Sexo
                        <select name="sexo" id="sexo" class="form-control" v-model="model.trainer.sexo">
                            <option value="0">Chico</option>
                            <option value="1">Chica</option>
                        </select>
                        <ErrorMessage name="sexo" class="errorValidacion"/>
                    </div>
                    <div class="mb-3">
                        Nombre
                        <Field name="nombre" id="nombre" type="text" class="form-control" v-model="model.trainer.nombre"/>
                        <ErrorMessage name="nombre" class="errorValidacion"/>
                    </div>
                    <div class="mb-3">
                        DOB
                        <Field name="fecha" id="fecha" type="date" class="form-control" @change="calculateAge" v-model="model.trainer.dob"/>
                        <ErrorMessage name="fecha" class="errorValidacion"/>
                    </div>
                    <div class="mb-3">
                        Edad
                        <Field name="edad" id="edad" type="number" class="form-control" :disabled="true" v-model="model.trainer.edad"/>
                        <ErrorMessage name="edad" class="errorValidacion"/>
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
        nombre: 'editarTrainer',
        components: {Field, ErrorMessage},
        data(){
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
        methods:{
            getTrainer(id) {
                apiclient.trainers.getTrainerById(id).then(res => {
                    const trainerData = res.data.trainer[0];
                    this.model.trainer.id = trainerData.id;
                    this.model.trainer.sexo = trainerData.sexo;
                    this.model.trainer.nombre = trainerData.nombre;
                    this.model.trainer.edad = trainerData.edad;
                    this.model.trainer.dob = trainerData.dob.slice(0,10);
                    this.model.trainer.estado = trainerData.estado;
                });
            },
            checked(){
                this.updateTrainer();
                alert('Datos Actualizado con exito!');
                this.$router.push('/trainers');
            },
            updateTrainer(){
                apiclient.trainers.updateTrainer(this.model.trainer).then(res =>{
                    if(res.data.affectedRows == 1){
                        this.model.trainer = {
                            id: '',
                            sexo:'',
                            nombre:'',
                            edad:'',
                            dob: '',
                            estado: ''
                        }
                        this.mensaje = 1;
                    }
                });
            },
            calculateAge(){
                const dob = new Date(this.model.trainer.dob);
                const today = new Date();
                let age = today.getFullYear() - dob.getFullYear();
                const monthDiff = today.getMonth() - dob.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                    age--;
                }
                this.model.trainer.edad = age;
            }
        }
}
</script>

<style scoped>
.errorValidacion{
    color: red;
}
</style>