<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4> Agregar Trainer</h4>
            </div>
            <div class="card-body">
                <Form :validation-schema="validationSchema" @submit="checked()">
                    <div class="mb-3">
                        Sexo
                        <select name="sexo" id="sexo" class="form-control" v-model="model.trainer.sexo">
                            <option value="0" selected>Chico</option>
                            <option value="1">Chica</option>
                        </select>
                        <ErrorMessage name="sexo" class="errorValidacion"/>
                    </div>
                    <div class="mb-3">
                        Nombre
                        <Field name="nombre" id="nombre" type="text" class="form-control" v-model="model.trainer.nombre" @keypress="validateInputNombre" />
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
                        Estado
                        <select name="estado" id="estado" class="form-control" v-model="model.trainer.estado">
                            <option value="0" selected>Inactivo</option>
                            <option value="1">Activo</option>
                        </select>
                        <ErrorMessage name="sexo" class="errorValidacion"/>
                    </div>
                    <div class="mb-3">
                        Email
                        <Field name="email" id="email" type="text" class="form-control" v-model="model.trainer.email" @keypress="validateInputEmail"/>
                        <ErrorMessage name="email" class="errorValidacion"/>
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
            const emailRegex= new RegExp(
                /^[A-Za-z0-9@._]*$/
            );
            const validationSchema = toTypedSchema(
                zod.object({
                    nombre: zod
                    .string()
                    .regex(nombreRegex, { message: "nombre no válido" })
                    .min(1, { message: 'Requerido' }),
                    email: zod
                    .string()
                    .regex(emailRegex, { message: "email no válido" })
                    .min(1, { message: 'Requerido' }),
                })
            )
            return{
                validationSchema,
                model:{
                    trainer:{
                        sexo:'',
                        nombre:'',
                        edad:'',
                        dob: '',
                        estado: '',
                        email: '',
                    }
                }
            }
        },
        methods:{
            checked(){
                this.createTrainer();
                this.sendEmail();
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
                                estado: '',
                                email: '',
                            }
                        }
                    });
                    
                } catch (error) {
                    console.error(error)
                }
                alert('Datos Guardados con exito!');
            },
            sendEmail(){
                try {
                    apiclient.trainers.sendEmail(this.model.trainer).then(res =>{
                        console.log(this.model);
                        if(res.data.affectedRows == 1){
                            this.model.trainer = {
                                sexo:'',
                                nombre:'',
                                edad:'',
                                dob: '',
                                estado: '',
                                email: '',
                            }
                        }
                    });
                    
                } catch (error) {
                    console.error(error)
                }
                alert('Email Enviado con exito!');
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
            validateInputNombre(event) {
                const char = String.fromCharCode(event.keyCode);
                const regex = /^[A-Za-z]+$/;
                if (!regex.test(char)) {
                    event.preventDefault();
                }
            },
            validateInputEmail(event) {
                const char = String.fromCharCode(event.keyCode);
                const regex = /^[A-Za-z0-9@._]*$/;
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