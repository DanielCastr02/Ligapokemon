import { createRouter, createWebHistory } from 'vue-router'
import VueCookies from 'vue-cookies'

//HOME
import HomeView from '../views/Home/HomeView.vue'
import UnauthorizedView from '../views/Home/AccesoDenegadoView.vue'

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
import apiclient from '@/apiclient'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: UnauthorizedView,
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: false }
    },
    //TRAINERS
    {
      path: '/trainers',
      name: 'trainers',
      component: TrainerView,
      meta: { requiresAuth: true }
    },
    {
      path: '/trainer/create',
      name: 'createtrainer',
      component: TrainerCreateView,
      meta: { requiresAuth: true, rol: 1 }
    },
    {
      path: '/trainer/:id/edit',
      name: 'edittrainer',
      component: TrainerEditView,
      meta: { requiresAuth: true, rol: 1 }
    },
    {
      path: '/trainers/detalle/:id',
      name: 'detalletrainer',
      component: TrainerDetalleView,
      meta: { requiresAuth: true }
    },


    //POKEMONES
    {
      path: '/pokemones',
      name: 'pokemones',
      component: PokemonView,
      meta: { requiresAuth: true }
    },
    {
      path: '/pokemones/create',
      name: 'createpokemones',
      component: PokemonCreateView,
      meta: { requiresAuth: true , rol: 1 }
    },
    {
      path: '/pokemon/:id/edit',
      name: 'editpokemon',
      component: PokemonEditView,
      meta: { requiresAuth: true, rol: 1 }
    },

    //REGISTROS
    {
      path: '/registros',
      name: 'registros',
      component: RegistroView,
      meta: { requiresAuth: true }
    },
    {
      path: '/registros/detalle/:id',
      name: 'detalleregistro',
      component: RegistroDetalleView,
      meta: { requiresAuth: true }
    },
    {
      path: '/registros/:id/edit',
      name: 'editregistros',
      component: RegistroEditView,
      meta: { requiresAuth: true, rol: 1 }
    },

    //USUARIOS
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/singup',
      name: 'singup',
      component: SingupView,
      meta: { requiresAuth: false }
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  const token = VueCookies.get('token');

  if (to.meta.requiresAuth) {
    if (!token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
      return;
    }

    try {
      const response = await apiclient.auth.me();
      const rol = response.data.usuario.rol;

      if (to.meta.rol && to.meta.rol !== rol) {
        next({ path: '/unauthorized' });
      } else {
        next();
      }
    } catch (error) {
      console.error("Error obteniendo el rol del usuario:", error);
      next({ path: '/login' });
    }
  } else {
    next();
  }
});


export default router
