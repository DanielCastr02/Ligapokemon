<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>
                     Pokemones
                    <RouterLink to="/pokemones/create" class="btn btn-primary float-end btn-custom">
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
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Apodo</th>
                        <th>Sexo</th>
                    </tr>
                </thead>
                <tbody v-if="pokemones.length > 0">
                    <tr v-for="(pokemon, index) in pokemones" :key="index">
                        <td>{{ pokemon.id }}</td>
                        <td>{{ pokemon.nombre }}</td>
                        <td>{{ pokemon.tipo }}</td>
                        <td>{{ pokemon.apodo }}</td>
                        <td v-if="pokemon.sexo == 0"> Macho</td>
                        <td v-if="pokemon.sexo == 1"> Hembra</td>
                        <td class="text-center">
                            <RouterLink :to="{ path: '/pokemon/' + pokemon.id + '/edit' }" class="btn btn-primary btn-custom">
                                Editar
                            </RouterLink>
                            <button class="btn btn-danger" @click="borrarPokemon(pokemon.id)">
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
        name: "pokemonView",
        components: {
            RouterLink,
        },
        data() {
            return {
                pokemones: [],
            };
        },
        mounted() {
            this.getPokemones();
        },
        methods: {
            getPokemones() {
                apiclient.pokemones.getPokemones().then(res => {
                    this.pokemones = res.data.pokemon;
                });
            },
            borrarPokemon(idPokemonDelete) {
                apiclient.pokemones.deletePokemon(idPokemonDelete).then(res => {
                    console.log(res);
                    this.getPokemones();
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
