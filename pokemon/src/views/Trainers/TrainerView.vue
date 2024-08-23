<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>
                     Filtrar:
                </h4>
            </div>
            <div class="m-3 d-inline-flex">
                Sexo:
                <select name="sexo" id="sexo" class="form-control" v-model="selectedTrainerSexo" @change="filtroSexo">
                    <option value="2" :key="2">None</option>
                    <option value="0" :key="0">Chico</option>
                    <option value="1" :key="1">Chica</option>
                </select>
                Nombre:
                <input name="nombre" id="nombre" type="text" class="form-control" />
                DOB:
                    <input name="fecha1" id="fecha1" type="date" class="form-control" />
                    <input name="fecha2" id="fecha2" type="date" class="form-control" />
                Edad:
                <input name="edad" id="edad" type="text" class="form-control" />
            </div>
            <div class="card-header">
                <h4>
                     Trainers
                    <RouterLink to="/trainer/create" class="btn btn-primary float-end btn-custom">
                        Agregar
                    </RouterLink>
                </h4>
            </div>
        </div>
        <div class="card-body">     
            <table class="table table-bordered table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Id</th>
                        <th>Sexo</th>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>DOB</th>
                        <th>estado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody v-if="trainers.length > 0">
                    <tr v-for="(trainer, index) in trainers" :key="index">
                        <td>{{ trainer.id }}</td>
                        <td v-if="trainer.sexo == 0"> Chico</td>
                        <td v-if="trainer.sexo == 1"> Chica</td>
                        <td>{{ trainer.nombre }}</td>
                        <td>{{ trainer.edad }}</td>
                        <td>{{ trainer.dob.slice(0,10) }}</td>
                        <td v-if="trainer.estado == 0"> Inactivo</td>
                        <td v-if="trainer.estado == 1"> Activo</td>
                        <td class="text-center">
                            <button v-if="trainer.estado == 0" class="btn btn-success" @click="cambiarEstado(trainer.id)">
                                Activar
                            </button>
                            <button v-if="trainer.estado == 1" class="btn btn-danger" @click="cambiarEstado(trainer.id)">
                                Desactivar
                            </button>
                            <RouterLink :to="{ path: '/trainer/' + trainer.id + '/edit' }" class="btn btn-primary btn-custom">
                                Editar
                            </RouterLink>
                            <RouterLink :to="{ path: '/trainers/detalle/' + trainer.id }" class="btn btn-primary btn-custom">
                                Detalle
                            </RouterLink>
                            <button class="btn btn-danger" @click="borrarTrainer(trainer.id)">
                                Borrar
                            </button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="5" style="text-align: center;"> Sin registros!</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { RouterLink } from 'vue-router';
    import apiclient from '../../apiclient.js';
    
    export default {
        name: "trainersView",
        components: {
            RouterLink,
        },
        data() {
            return {
                trainers: [],
                selectedTrainerSexo: '',  
                model:{
                    trainer:{
                        id: '',
                        sexo:'',
                        nombre:'',
                        edad:'',
                        dob: '',
                        estado: '',
                    },
                    registro:{
                        id: '',
                        idtrainer:'',
                        idpokemon:'',
                        estado: '',
                    }
                }
            };
        },
        mounted() {
            this.getTrainers();
        },
        methods: {
            getTrainers() {
                apiclient.trainers.getTrainers().then(res => {
                    this.trainers = res.data.trainer;
                });
            },
            borrarTrainer(idTrainerDelete) {
                apiclient.trainers.deleteTrainer(idTrainerDelete).then(res => {
                    console.log(res);
                    this.getTrainers();
                }).catch(error => {
                    if(confirm("Este trainer ya esta registrado a un pokemon, desea eliminar el registro?", error)){
                        apiclient.registros.deleteRegistrosByTrainerId(idTrainerDelete).then(res => {
                            console.log(res);
                            alert('Registros Eliminados...')
                            this.borrarTrainer(idTrainerDelete);
                            this.getTrainers();
                        });
                    }

                });
            },
            cambiarEstado(id) {
                apiclient.trainers.getTrainerById(id).then(res => {
                    this.model.trainer = res.data.trainer[0];
                    
                    this.model.trainer.estado = this.model.trainer.estado === 0 ? 1 : 0;
                    this.model.trainer.dob = this.model.trainer.dob.slice(0,10);

                    apiclient.trainers.updateTrainer(this.model.trainer).then(res => {
                        if (res.data.affectedRows === 1) {
                            this.model.trainer = {
                                id: '',
                                sexo:'',
                                nombre:'',
                                edad:'',
                                dob: '',
                                estado: '',
                            };
                        }
                        if (this.model.trainer.estado === 0) {
                                this.cambiarEstadoRegistro(id);
                            }
                        this.getTrainers();
                    }).catch(error => {
                        console.error("Error durante el update:", error);
                    });
                }).catch(error => {
                    console.error("Error en getRegistroById:", error);
                });
                this.$router.push('/trainers');
            },
            cambiarEstadoRegistro(idTrainer) {
            apiclient.registros.getRegistrosByTrainerId(idTrainer).then(res => {
                const registros = res.data.registro;
                
                registros.forEach(registro => {
                    registro.estado = 0; 
                    apiclient.registros.updateRegistro(registro).then(res => {
                        if (res.data.affectedRows === 1) {
                            console.log(`Estado del registro ${registro.id} actualizado a 0`);
                        }
                    }).catch(error => {
                        console.error(`Error actualizando el estado del registro ${registro.id}:`, error);
                    });
                });
            }).catch(error => {
                console.error("Error al obtener registros del trainer:", error);
            });
        },
        filtroSexo(){
            if(this.selectedTrainerSexo != 2){
                apiclient.trainers.getTrainersByGender(this.selectedTrainerSexo).then(res => {
                    this.trainers = res.data.trainer;
                });
            }
        },


        }
    };
</script>

<style scoped>
    .thead-dark {
        background-color: #343a40;
        color: #fff;
    }
    .btn-custom {
        background-color: #1e3a8a; 
        color: white;
        border: none;
        margin: 0 10px; 
    }
    .text-center {
        text-align: center;
    }
</style>
