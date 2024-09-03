<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Filtrar Pokemones</h4>
            </div>
            <div class="card-body">
                <div class="row g-3">
                    <!-- Filtro por Nombre -->
                    <div class="col-md-2">
                        <label for="nombre" class="form-label">Nombre:</label>
                        <input name="nombre" id="nombre" type="text" class="form-control" 
                        @input="getPokemones"
                        @keypress="validateInput"
                        ref="nombreInput"
                        placeholder="Buscar por nombre" />
                    </div>
                    <!-- Filtro por tipo -->
                    <div class="col-md-2">
                        <label for="sexo" class="form-label">Tipo:</label>
                        <select name="sexo" id="sexo" class="form-control" v-model="selectedPokemonTipo" @change="getPokemones">
                            <option value="0" :key="0" >None</option>
                            <option value="Acero" :key="'Acero'" >Acero</option>
                            <option value="Agua" :key="'Agua'" >Agua</option>
                            <option value="Bicho" :key="'Bicho'" >Bicho</option>
                            <option value="Dragon" :key="'Dragon'" >Dragon</option>
                            <option value="Electrico" :key="'Electrico'" >Electrico</option>
                            <option value="Fantasma" :key="'Fantasma'" >Fantasma</option>
                            <option value="Fuego" :key="'Fuego'" >Fuego</option>
                            <option value="Hada" :key="'Hada'" >Hada</option>
                            <option value="Hielo" :key="'Hielo'" >Hielo</option>
                            <option value="Normal" :key="'Normal'" >Normal</option>
                            <option value="Lucha" :key="'Lucha'" >Lucha</option>
                            <option value="Planta" :key="'Planta'" >Planta</option>
                            <option value="Psiquico" :key="'Psiquico'" >Psiquico</option>
                            <option value="Roca" :key="'Roca'" >Roca</option>
                            <option value="Siniestro" :key="'Siniestro'" >Siniestro</option>
                            <option value="Tierra" :key="'Tierra'" >Tierra</option>
                            <option value="Veneno" :key="'Veneno'" >Veneno</option>
                            <option value="Volador" :key="'Volador'" >Volador</option>
                        </select>
                    </div>
                    <!-- Filtro por apodo -->
                    <div class="col-md-2">
                        <label for="apodo" class="form-label">Apodo:</label>
                        <input name="apodo" id="apodo" type="text" class="form-control" 
                        @input="getPokemones" 
                        @keypress="validateInput"
                        ref="apodoInput"
                        placeholder="Buscar por apodo" />
                    </div>

                    <!-- Filtro por Sexo -->
                    <div class="col-md-2">
                        <label for="sexo" class="form-label">Sexo:</label>
                        <select name="sexo" id="sexo" class="form-control" v-model="selectedPokemonSexo" @change="getPokemones">
                            <option value="2" :key="2">None</option>
                            <option value="0" :key="0">Macho</option>
                            <option value="1" :key="1">Hembra</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="card-header">
                <h4>
                     Pokemones
                    <RouterLink to="/pokemones/create" class="btn btn-primary float-end btn-custom">
                        Agregar
                    </RouterLink>
                    <button class="btn btn-secondary float-end" @click="crearPDF">
                        Exportar PDF
                    </button>
                </h4>
            </div>
        </div>
        <div class="card-body">
            <table class="table table-bordered table-striped" id="pokemonesTable">
                <thead class="thead-dark">
                    <tr>
                        <th>id</th>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Apodo</th>
                        <th>Sexo</th>
                        <th></th>
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
        name: "pokemonView",
        components: {
            RouterLink,
        },
        data() {
            return {
                pokemones: [],
                pokemon_pdf: [],
                selectedPokemonSexo: '2',
                selectedPokemonTipo: '0',

                currentPage: 0,
                pageSize: 10, 
                pageCount: 0,     
                totalItems: 0,

                model:{
                    pokemon:{
                        id: '',
                        nombre:'',
                        tipo: '',
                        apodo:'',
                        sexo:'',
                        total_count: ''
                    }
                }
            };
        },
        mounted() {
            this.getPokemones();
        },
        methods: {
            getPokemones() {
                const filtros = {
                    nombre: this.$refs.nombreInput.value.trim() || null,
                    tipo: this.selectedPokemonTipo === '0' ? null : this.this.selectedPokemonTipo,
                    apodo: this.$refs.apodoInput.value.trim() || null,
                    sexo: this.selectedPokemonSexo === '2' ? null : this.selectedPokemonSexo,
                    limit: this.pageSize,
                    offset: this.currentPage * this.pageSize
                };
                apiclient.pokemones.getPokemonesFiltro(
                    filtros.nombre,
                    filtros.tipo,
                    filtros.apodo,
                    filtros.sexo,
                    filtros.limit,
                    filtros.offset
                )
                .then(res => {
                    this.pokemones = res.data.pokemon; 
                    this.totalItems = res.data.pokemon[0].total_count;
                    this.pageCount = Math.ceil(this.totalItems / this.pageSize);
                })
                .catch(error => {
                    console.error("Error al obtener los pokemones:", error);
                    this.errorMessage = "No se pudieron cargar los pokemones. Por favor, inténtelo de nuevo más tarde.";
                });
            },
            borrarPokemon(idPokemonDelete) {
                apiclient.pokemones.deletePokemon(idPokemonDelete).then(res => {
                    console.log(res);
                    this.getPokemones();
                }).catch(error => {
                    if(confirm("Este pokemon ya esta registrado a un trainer. ¿Desea eliminar los registros?", error)){
                        apiclient.registros.deleteRegistrosByPokemonId(idPokemonDelete).then(res => {
                            console.log(res);
                            alert('Registros Eliminados...')
                            this.borrarPokemon(idPokemonDelete);
                            this.getPokemones();
                        });
                    }

                });
            },
            //KEYPRESS
            validateInput(event) {
                const char = String.fromCharCode(event.keyCode);
                const regex = /^[A-Za-z\s]+$/;
                if (!regex.test(char)) {
                    event.preventDefault();
                }
            },
            crearPDF() {
                const filtros = {
                    nombre: this.$refs.nombreInput.value.trim() || null,
                    tipo: this.selectedPokemonTipo === '0' ? null : this.this.selectedPokemonTipo,
                    apodo: this.$refs.apodoInput.value.trim() || null,
                    sexo: this.selectedPokemonSexo === '2' ? null : this.selectedPokemonSexo,
                };
                apiclient.pokemones.getPokemonesPDF(
                    filtros.nombre,
                    filtros.tipo,
                    filtros.apodo,
                    filtros.sexo
                )
                .then(res => {
                    this.pokemon_pdf = res.data.pokemon; 
                    const doc = new jsPDF();
                    doc.text('Lista de Pokemones', 10, 10);
                    doc.autoTable({
                        head: [['Id', 'Nombre', 'Tipo', 'Apodo', 'Sexo']],
                        body: this.pokemon_pdf.map(pokemon => [
                            pokemon.id,
                            pokemon.nombre,
                            pokemon.tipo,
                            pokemon.apodo,
                            pokemon.sexo === 0 ? 'Macho' : 'Hembra'
                        ]),
                    });

                    doc.save('pokemones.pdf');
                })
                .catch(error => {
                    console.error("Error al obtener los pokemones:", error);
                    this.errorMessage = "No se pudieron cargar los pokemones. Por favor, inténtelo de nuevo más tarde.";
                });
            },
            nextPage() {
                if (this.currentPage < this.pageCount - 1) {
                    this.currentPage++;
                    this.getPokemones();
                }
            },
            prevPage() {
                if (this.currentPage > 0) {
                    this.currentPage--;
                    this.getPokemones();
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
