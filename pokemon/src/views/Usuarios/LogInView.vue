<template>
  <div class="vh-100">
    <div class="container h-100 d-flex align-items-center justify-content-center">
      <div class="card p-5 shadow-lg espacio-custom">
        <div class="text-center mb-4">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnpDDd16-m8fTneCbtEI1TYpDiVqegO11beA&s"
            class="img-fluid" 
            alt="Pokémon logo">
        </div>
        <h3 class="mb-4 text-center letra-azul">Inicio de Sesión</h3>
        <Form @submit="iniciarSesion">
          <div class="form-outline mb-4">
            <label class="form-label">Correo electrónico</label>
            <Field v-model="model.usuario.correo" type="email" id="correo" name="correo" class="form-control form-control-lg" />
          </div>
          <div class="form-outline mb-4">
            <label class="form-label">Contraseña</label>
            <Field v-model="model.usuario.contraseña" type="password" id="contraseña" name="contraseña" class="form-control form-control-lg" />
          </div>
          <div>
            <button type="submit" class="btn btn-primary btn-lg btn-block btn-custom">
              Iniciar Sesión
            </button>
          </div>
        </Form>
        <div class="text-center mt-3">
          <span>No tienes cuenta?</span>
          <RouterLink to="/singup" class="crea-custom">
              Crea una.
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiclient from '@/apiclient';
import { Field, Form } from 'vee-validate';

export default {
  components: {Field, Form},
  data() {
    return {
      model:{
        usuario: {
          correo: '',
          contraseña: '',
          rol: '',
        }
      }
    };
  },
  methods: {
    iniciarSesion() {
      const usuario = this.model.usuario;
      try {
        apiclient.auth.login(usuario)
          .then(res => {
            console.log(res);
            this.$router.push('/');
          });
      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>

<style scoped>
body {
  background-color: #f6f8fc;
}
.form-label {
  color: #2a75bb;
}

.crea-custom {
  color: #d62d2d; 
  cursor: pointer;
}
.btn-custom {
  background-color: #2a75bb; 
  border-color: #2a75bb;
}
.letra-azul {
  color: #2a75bb;
}
.espacio-custom {
  width: 40rem; 
  background-color: white;
}
</style>
  