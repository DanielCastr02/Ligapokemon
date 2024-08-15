<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>
                     Registros
                    <RouterLink to="/" class="btn btn-primary float-end btn-custom">
                        Agregar
                    </RouterLink>
                </h4>
            </div>
        </div>
        <div class="card-body">
            <table class="table table-bordered table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>id</th>
                        <th>idTrainer</th>
                        <th>idPokemon</th>
                    </tr>
                </thead>
                <tbody v-if="registros.length > 0">
                    <tr v-for="(registro, index) in registros" :key="index">
                        <td>{{ registro.id }}</td>
                        <td>{{ registro.idtrainer }}</td>
                        <td>{{ registro.idpokemon }}</td>
                        <td class="text-center">
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
        </div>
    </div>
</template>

<script>
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
            };
        },
        mounted() {
            this.getRegistros();
        },
        methods: {
            getRegistros() {
                apiclient.registros.getRegistros().then(res => {
                    this.registros = res.data.registro;
                });
            },
            borrarRegistro(idRegistroDelete) {
                apiclient.registros.deleteRegistro(idRegistroDelete).then(res => {
                    console.log(res);
                    this.getRegistros();
                });
            }
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
