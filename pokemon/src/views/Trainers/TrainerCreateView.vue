<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4> Agregar Trainer</h4>
                <div v-if="mensaje == 1" class="alert alert-success" role="success">
                    Datos Guardado con exito!
                </div>
            </div>
            <div class="card-body">
                <Form :validation-schema="validationSchema" @submit="checked()">
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
                        <Field name="nombre" id="nombre" type="text" class="form-control" v-model="model.trainer.nombre" @keypress="validateInput" />
                        <ErrorMessage name="nombre" class="errorValidacion"/>
                    </div>
                    <div class="mb-3">
                        DOB
                        <Field name="fecha" id="fecha" type="date" class="form-control" :min @change="calculateAge" v-model="model.trainer.dob"/>
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
                </Form> 
            </div>
        </div>
    </div>
</template>
<script>
import { Field, ErrorMessage, Form } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import apiclient from '../../apiclient.js'
    export default{
        nombre: 'createTrainer',
        components: {Field, ErrorMessage, Form},
        data(){
            const nombreRegex= new RegExp(
                /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(n+([A-Za-zÑñÁáÉéÍíÓóÚú]+['-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/
            );
            const validationSchema = toTypedSchema(
                zod.object({
                    nombre: zod
                    .string()
                    .regex(nombreRegex, { message: "nombre no válido" })
                    .min(1, { message: 'Requerido' }),
                })
            )
            return{
                validationSchema,
                mensaje: 0,
                model:{
                    trainer:{
                        sexo:'',
                        nombre:'',
                        edad:'',
                        dob: '',
                    }
                }
            }
        },
        methods:{
            checked(){
                this.createTrainer();
                alert('Datos Guardados con exito!');
                this.$router.push('/trainers');
            },
            createTrainer(){
                try {
                    apiclient.trainers.createTrainer(this.model.trainer).then(res =>{
                        console.log(this.model);
                        if(res.data.affectedRows == 1){
                            this.model.trainer = {
                                sexo:'',
                                nombre:'',
                                edad:'',
                                dob: '',
                            }
                            this.mensaje = 1;
                        }
                    });
                    
                } catch (error) {
                    console.error(error)
                }
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
            },
            validateInput(event) {
                const char = String.fromCharCode(event.keyCode);
                const regex = /^[A-Za-z\s]+$/;
                if (!regex.test(char)) {
                    event.preventDefault();
                }
            },
    }
}
</script>

<style scoped>
.errorValidacion{
    color: red;
    
}
</style>