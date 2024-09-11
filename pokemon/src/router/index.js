import { createRouter, createWebHistory } from 'vue-router'
//HOME
import HomeView from '../views/Home/HomeView.vue'

//TRAINER
import TrainerView from '../views/Trainers/TrainerView.vue'
import TrainerCreateView from '../views/Trainers/TrainerCreateView.vue'
import TrainerEditView from '../views/Trainers/TrainerEditView.vue'
import TrainerDetalleView from '../views/Trainers/TrainerDetalleView.vue'


//POKEMON
import PokemonView from '../views/Pokemon/PokemonView.vue'
import PokemonCreateView from '../views/Pokemon/PokemonCreateView.vue'
import PokemonEditView from '../views/Pokemon/PokemonEditView.vue'

//REGISTROS
import RegistroView from '../views/Registro/Registroview.vue'
import RegistroDetalleView from '../views/Registro/RegistroDetalleView.vue'
import RegistroEditView from '../views/Registro/RegistroEditView.vue'

//USUARIOS
import LoginView from '../views/Usuarios/LogInView.vue'
import SingupView from '../views/Usuarios/SingUpView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    //TRAINERS
    {
      path: '/trainers',
      name: 'trainers',
      component: TrainerView
    },
    {
      path: '/trainer/create',
      name: 'createtrainer',
      component: TrainerCreateView
    },
    {
      path: '/trainer/:id/edit',
      name: 'edittrainer',
      component: TrainerEditView
    },
    {
      path: '/trainers/detalle/:id',
      name: 'detalletrainer',
      component: TrainerDetalleView
    },


    //POKEMONES
    {
      path: '/pokemones',
      name: 'pokemones',
      component: PokemonView
    },
    {
      path: '/pokemones/create',
      name: 'createpokemones',
      component: PokemonCreateView
    },
    {
      path: '/pokemon/:id/edit',
      name: 'editpokemon',
      component: PokemonEditView
    },


    //REGISTROS
    {
      path: '/registros',
      name: 'registros',
      component: RegistroView
    },
    {
      path: '/registros/detalle/:id',
      name: 'detalleregistro',
      component: RegistroDetalleView
    },
    {
      path: '/registros/:id/edit',
      name: 'editregistros',
      component: RegistroEditView
    },

    //USUARIOS
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/singup',
      name: 'singup',
      component: SingupView
    },
  ]
})

export default router
