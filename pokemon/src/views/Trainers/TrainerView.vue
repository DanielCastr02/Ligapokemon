<template>
    <div class="container mt-4">
        <div class="card">
            <div class="card-header">
                <h4>Filtrar Trainers:</h4>
            </div>
            <div class="card-body">
                <div class="row g-3">
                    <!-- Filtro por Sexo -->
                    <div class="col-md-2">
                        <label for="sexo" class="form-label">Sexo:</label>
                        <select name="sexo" id="sexo" class="form-control" v-model="selectedTrainerSexo" @change="getTrainers">
                            <option value="2" :key="2" selected>None</option>
                            <option value="0" :key="0">Chico</option>
                            <option value="1" :key="1">Chica</option>
                        </select>
                    </div>
                    <!-- Filtro por Nombre -->
                    <div class="col-md-2">
                        <label for="nombre" class="form-label">Nombre:</label>
                        <input name="nombre" id="nombre" type="text" class="form-control" 
                        @input="getTrainers" 
                        @keypress="validateInputNombre"
                        placeholder="Buscar por nombre" ref="nombreInput"/>
                    </div>
                    <div class="col-md-2">
                        <div>
                            <label for="fecha1" class="form-label">DOB Inicio:</label>
                            <input name="fecha1" id="fecha1" type="date" class="form-control" v-model="selectedTrainerDobInicio"/>
                        </div>
                        <div>
                            <label for="fecha2" class="form-label">DOB Fin:</label>
                            <input name="fecha2" id="fecha2" type="date" class="form-control" v-model="selectedTrainerDobFin"/>
                        </div>
                        <button class="btn btn-primary" @click="getTrainers">
                            Filtrar Fecha
                        </button>
                    </div>
                    <!-- Filtro por Edad -->
                    <div class="col-md-2">
                        <label for="edad" class="form-label">Edad:</label>
                        <input name="edad" id="edad" type="number" class="form-control" 
                        @input="getTrainers"
                        @keypress="validateInputEdad" 
                        placeholder="Edad del entrenador" ref="edadInput" />
                    </div>
                    <!-- Filtro por Estado -->
                    <div class="col-md-2">
                        <label for="estado" class="form-label">Estado:</label>
                        <select name="estado" id="estado" class="form-control" v-model="selectedTrainerEstado" @change="getTrainers">
                            <option value="2" :key="2" selected>None</option>
                            <option value="0" :key="0">Inactivo</option>
                            <option value="1" :key="1">Activo</option>
                        </select>
                    </div>
                    <!-- Filtro por Email -->
                    <div class="col-md-2">
                        <label for="email" class="form-label">Email:</label>
                        <input name="email" id="email" type="text" class="form-control" 
                        @input="getTrainers" 
                        @keypress="validateInputEmail"
                        placeholder="Buscar por email" ref="emailInput"/>
                    </div>
                </div>
            </div>
            <div class="card-header">
                <h4>
                     Trainers
                     <RouterLink v-if="rol == 1" to="/trainer/create" class="btn btn-primary float-end btn-custom">
                        Agregar
                    </RouterLink>
                     <button class="btn btn-secondary float-end" @click="crearPDF">
                        Exportar PDF
                    </button>
                </h4>
            </div>
        </div>
        <div class="card-body">     
            <table class="table table-bordered table-striped" id="trainersTable" >
                <thead class="thead-dark">
                    <tr>
                        <th>Id</th>
                        <th>Sexo</th>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>DOB</th>
                        <th>Estado</th>
                        <th>Email</th>
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
                        <td>{{ trainer.email }}</td>
                        <td class="text-center">
                            <button v-if="trainer.estado == 0 && rol == 1" class="btn btn-success" @click="cambiarEstado(trainer.id)">
                                Activar
                            </button>
                            <button v-if="trainer.estado == 1 && rol == 1"  class="btn btn-danger" @click="cambiarEstado(trainer.id)">
                                Desactivar
                            </button>
                            <RouterLink v-if="rol == 1" :to="{ path: '/trainer/' + trainer.id + '/edit' }" class="btn btn-primary btn-custom">
                                Editar
                            </RouterLink>
                            <RouterLink :to="{ path: '/trainers/detalle/' + trainer.id }" class="btn btn-primary btn-custom">
                                Detalle
                            </RouterLink>
                            <button v-if="rol == 1" class="btn btn-danger" @click="borrarTrainer(trainer.id)">
                                Borrar
                            </button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="8" style="text-align: center;"> Sin registros!</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button class="btn btn-primary" @click="prevPage" :disabled="currentPage === 0">Anterior</button>
                <button class="btn btn-primary" @click="nextPage" :disabled="currentPage >= pageCount - 1">Siguiente</button>
            </div>
            <div class="pagination-info">
                Página {{ currentPage + 1 }} de {{ pageCount }} | Total de Entrenadores: {{ totalItems }}
            </div>

        </div>
    </div>
</template>

<script>
    import jsPDF from 'jspdf'
    import 'jspdf-autotable'
    import { RouterLink } from 'vue-router';
    import apiclient from '../../apiclient.js';
    import { store } from '@/store.js';
    
    export default {
        name: "trainersView",
        components: {
            RouterLink,
        },
        data() {
            return {
                rol: null,
                trainers: [],
                trainer_pdf: [],
                selectedTrainerSexo: '2',
                selectedTrainerEstado: '2',
                selectedTrainerDobInicio: '',  
                selectedTrainerDobFin: '',  

                currentPage: 0,
                pageSize: 10, 
                pageCount: 0,     
                totalItems: 0,

                model:{
                    trainer:{
                        id: '',
                        sexo:'',
                        nombre:'',
                        edad:'',
                        dob: '',
                        estado: '',
                        email: '',
                        total_count: '',
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
            apiclient.auth.me()
            .then(res => {
                store.rol = res.data.usuario.rol;
                this.rol = store.rol;
            })
            .catch(err => {
                console.log(err);
            });
        },
        methods: {
            getTrainers() {
                const filtros = {
                    sexo: this.selectedTrainerSexo === '2' ? null : this.selectedTrainerSexo,
                    nombre: this.$refs.nombreInput.value.trim() || null,
                    edad: this.$refs.edadInput.value.trim() || null,
                    dobInicio: this.selectedTrainerDobInicio || null,
                    dobFin: this.selectedTrainerDobFin || null,
                    estado: this.selectedTrainerEstado === '2' ? null : this.selectedTrainerEstado,
                    email: this.$refs.emailInput.value.trim() || null,
                    limit: this.pageSize,
                    offset: this.currentPage * this.pageSize
                };

                apiclient.trainers.getTrainersFiltro(
                    filtros.sexo,
                    filtros.nombre,
                    filtros.edad,
                    filtros.dobInicio,
                    filtros.dobFin,
                    filtros.estado,
                    filtros.email,
                    filtros.limit,
                    filtros.offset
                )
                .then(res => {
                    this.trainers = res.data.trainer; 
                    this.totalItems = res.data.trainer[0].total_count;
                    this.pageCount = Math.ceil(this.totalItems / this.pageSize);
                })
                .catch(error => {
                    console.error("Error al obtener los entrenadores:", error);
                    this.errorMessage = "No se pudieron cargar los entrenadores. Por favor, inténtelo de nuevo más tarde.";
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
                                email: '',
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
            //KEYPRESS
            validateInputNombre(event) {
                const char = String.fromCharCode(event.keyCode);
                const regex = /^[A-Za-z]+$/;
                if (!regex.test(char)) {
                    event.preventDefault();
                }
            },
            validateInputEdad(event) {
                const char = String.fromCharCode(event.keyCode);
                const regex = /^[0-9]*$/;
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
            crearPDF() {
                const filtros = {
                    sexo: this.selectedTrainerSexo === '2' ? null : this.selectedTrainerSexo,
                    nombre: this.$refs.nombreInput.value.trim() || null,
                    edad: this.$refs.edadInput.value.trim() || null,
                    dobInicio: this.selectedTrainerDobInicio || null,
                    dobFin: this.selectedTrainerDobFin || null,
                    estado: this.selectedTrainerEstado === '2' ? null : this.selectedTrainerEstado,
                    email: this.$refs.emailInput.value.trim() || null,
                };

                apiclient.trainers.getTrainersPDF(
                    filtros.sexo,
                    filtros.nombre,
                    filtros.edad,
                    filtros.dobInicio,
                    filtros.dobFin,
                    filtros.estado,
                    filtros.email
                )       
                .then(res => {
                    this.trainer_pdf = res.data.trainer; 
                    const doc = new jsPDF();
                    doc.text('Lista de Entrenadores', 10, 10);
                    doc.autoTable({
                        head: [['Id', 'Sexo', 'Nombre', 'Edad', 'DOB', 'Estado', 'Email']],
                        body: this.trainer_pdf.map(trainer => [
                            trainer.id,
                            trainer.sexo === 0 ? 'Chico' : 'Chica',
                            trainer.nombre,
                            trainer.edad,
                            trainer.dob.slice(0,10),
                            trainer.estado === 0 ? 'Inactivo' : 'Activo',
                            trainer.email
                        ]),
                    });

                    doc.save('trainers.pdf');
                })
                .catch(error => {
                    console.error("Error al obtener los entrenadores:", error);
                    this.errorMessage = "No se pudieron cargar los entrenadores. Por favor, inténtelo de nuevo más tarde.";
                });
            },
            nextPage() {
                if (this.currentPage < this.pageCount - 1) {
                    this.currentPage++;
                    this.getTrainers();
                }
            },
            prevPage() {
                if (this.currentPage > 0) {
                    this.currentPage--;
                    this.getTrainers();
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
    .pagination-info {
        margin-top: 10px;
        font-size: 16px;
        font-weight: bold;
    }

</style>
