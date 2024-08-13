<script setup>
import { RouterView } from 'vue-router'
import MenuView from './views/Home/Menuview.vue'
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-custom" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <RouterLink class="navbar-brand" to="/">
            <img src="https://www.pokemon.com/static-assets/content-assets/cms2-es-xl/img/attend-events/attend-events/trading-card-game/league_challenge/pokemon_league_logo_es.png" />
            </RouterLink>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="navbar-brand" to="/trainers">
                 Trainers
              </RouterLink>
              <RouterLink class="navbar-brand" to="/pokemones">
                 Pokemones
              </RouterLink>
              <RouterLink class="navbar-brand" to="/registros">
                 Registros
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

  
<style scoped>
img{
  width: 60px;
}

</style>
