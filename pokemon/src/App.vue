<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-custom" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <RouterLink class="navbar-brand" to="/">
            <img src="https://www.pokemon.com/static-assets/content-assets/cms2-es-xl/img/attend-events/attend-events/trading-card-game/league_challenge/pokemon_league_logo_es.png" />
          </RouterLink>
            <span v-if="rol == 1"> Administrador </span>
            <span v-if="rol == 0"> Usuario </span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink v-if="token" class="navbar-brand" to="/trainers">
                <Icon icon="ic:twotone-catching-pokemon"/> Trainers
              </RouterLink>
              <RouterLink v-if="token" class="navbar-brand" to="/pokemones">
                <Icon icon="hugeicons:pokemon"/> Pokemones
              </RouterLink>
              <RouterLink v-if="token" class="navbar-brand" to="/registros">
                <Icon icon="fa-regular:address-book"></Icon> Registros
              </RouterLink>
              <RouterLink v-if="!token" class="navbar-brand" to="/login">
                <Icon icon="solar:login-2-linear"></Icon> Login
              </RouterLink>
              <button v-if="token" class="navbar-brand navbar-custom" @click="logout">
                <Icon icon="solar:logout-2-linear"></Icon> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import { Icon } from "@iconify/vue";
import { store } from './store.js';
import apiclient from './apiclient.js';

export default {
  components: {
    Icon,
    RouterView
  },
  data() {
    return {
      token: null, 
      rol: null
    };
  },
  methods: {
    logout() {
      this.$cookies.remove('token');
      this.token = null;
      console.log('logout');
      store.rol = null;
      this.$router.push('/login');
    }
  },
  mounted() {
    this.token = this.$cookies.get('token');
    apiclient.auth.me()
      .then(res => {
        store.rol = res.data.usuario.rol;
        this.rol = store.rol;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
img {
  width: 60px;
}
.navbar-custom {
  background-color: #e70000;
  border-radius: 5px;
}
</style>
