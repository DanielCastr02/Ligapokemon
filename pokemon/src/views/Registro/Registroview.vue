<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Filtrar Registros</h4>
            </div>
            <div class="card-body">
                <div class="row g-3">
                    <!-- Filtro por idtrainer -->
                    <div class="col-md-2">
                        <label for="idtrainer" class="form-label">idtrainer:</label>
                        <input name="idtrainer" id="idtrainer" type="number" class="form-control"
                        @input="getRegistros"
                        @keypress="validateInput" 
                        ref="idTrainerInput"
                         />
                    </div>
                    <!-- Filtro por idpokemon -->
                    <div class="col-md-2">
                        <label for="idpokemon" class="form-label">idpokemon:</label>
                        <input name="idpokemon" id="idpokemon" type="number" class="form-control" 
                        @input="getRegistros"
                        @keypress="validateInput"
                        ref="idPokemonInput"
                        />
                    </div>
                </div>
            </div>
            <div class="card-header">
                <h4>
                     Registros
                    <RouterLink to="/" class="btn btn-primary float-end btn-custom">
                        Agregar
                    </RouterLink>
                    <button class="btn btn-secondary float-end" @click="crearPDF">
                        Exportar PDF
                    </button>
                </h4>
            </div>
        </div>
        <div class="card-body">
            <table class="table table-bordered table-striped" id="registrosTable">
                <thead class="thead-dark">
                    <tr>
                        <th>id</th>
                        <th>idTrainer</th>
                        <th>idPokemon</th>
                        <th>estado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody v-if="registros.length > 0">
                    <tr v-for="(registro, index) in registros" :key="index">
                        <td>{{ registro.id }}</td>
                        <td>{{ registro.idtrainer }}</td>
                        <td>{{ registro.idpokemon }}</td>
                        <td v-if="registro.estado == 0"> Inactivo</td>
                        <td v-if="registro.estado == 1"> Activo</td>
                        <td class="text-center">
                            <button v-if="registro.estado == 0" class="btn btn-success" @click="cambiarEstado(registro.id)">
                                Activar
                            </button>
                            <button v-if="registro.estado == 1" class="btn btn-danger" @click="cambiarEstado(registro.id)">
                                Desactivar
                            </button>
                            <RouterLink :to="{ path: '/registros/' + registro.id + '/edit' }" class="btn btn-primary btn-custom">
                                Editar
                            </RouterLink>
                            <RouterLink :to="{ path: '/registros/detalle/' + registro.id }" class="btn btn-primary btn-custom">
                                Detalle
                            </RouterLink>
                            <button class="btn btn-danger" @click="borrarRegistro(registro.id)">
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
    
    export default {
        name: "registroView",
        components: {
            RouterLink,
        },
        data() {
            return {
                registros: [],

                currentPage: 0,
                pageSize: 10, 
                pageCount: 0,     
                totalItems: 0,

                model:{
                    registro:{
                        id: '',
                        idtrainer:'',
                        idpokemon:'',
                        estado:'',
                    }
                }
            };
        },
        mounted() {
            this.getRegistros();
        },
        methods: {
            getRegistros() {
                const filtros = {
                    idtrainer: this.$refs.idTrainerInput.value.trim() || null,
                    idpokemon: this.$refs.idPokemonInput.value.trim() || null,
                    limit: this.pageSize,
                    offset: this.currentPage * this.pageSize
                };
                apiclient.registros.getRegistrosFiltro(
                    filtros.idtrainer,
                    filtros.idpokemon,
                    filtros.limit,
                    filtros.offset
                )
                .then(res => {
                    this.registros = res.data.registro;
                    this.totalItems = res.data.registro[0].total_count;
                    this.pageCount = Math.ceil(this.totalItems / this.pageSize);
                })
                .catch(error => {
                    console.error('Error al filtrar registros:', error);
                    this.registros = [];
                });
            },
            borrarRegistro(idRegistroDelete) {
                apiclient.registros.deleteRegistro(idRegistroDelete).then(res => {
                    console.log(res);
                    this.getRegistros();
                });
            },
            cambiarEstado(id) {
                apiclient.registros.getRegistroById(id).then(res => {
                    this.model.registro = res.data.registro[0];                    
                    this.model.registro.estado = this.model.registro.estado === 0 ? 1 : 0;

                    apiclient.registros.updateRegistro(this.model.registro).then(res => {
                        if (res.data.affectedRows === 1) {
                            this.model.registro = {
                                id: '',
                                idtrainer: '',
                                idpokemon: '',
                                estado: '',
                            };
                        }
                        this.getRegistros();
                    }).catch(error => {
                        console.error("Error durante el update:", error);
                    });
                }).catch(error => {
                    console.error("Error en getRegistroById:", error);
                });
            },
            validateInput(event) {
                const char = String.fromCharCode(event.keyCode);
                const regex = /^[0-9,$]*$/;
                if (!regex.test(char)) {
                    event.preventDefault();
                }
            },
            crearPDF() {
                const doc = new jsPDF();
                doc.text('Lista de Registros', 10, 10);
                doc.autoTable({
                    html: '#registrosTable', 
                    columns: [
                        { header: 'Id', dataKey: '0' },
                        { header: 'IdTrainer', dataKey: '1' },
                        { header: 'IdPokemon', dataKey: '2' },
                        { header: 'Estado', dataKey: '3' },
                    ],
                    columnStyles: {
                        3: { display: 'none' }, 
                    },
                });
                doc.save('registros.pdf');
            },
            nextPage() {
                if (this.currentPage < this.pageCount - 1) {
                    this.currentPage++;
                    this.getRegistros();
                }
            },
            prevPage() {
                if (this.currentPage > 0) {
                    this.currentPage--;
                    this.getRegistros();
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
