<template>
    <div class="vh-100" >
      <div class="container h-100 d-flex align-items-center justify-content-center">
        <div class="card p-5 shadow-lg espacio-custom">
          <div class="text-center mb-4">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnpDDd16-m8fTneCbtEI1TYpDiVqegO11beA&s"
              class="img-fluid" 
              alt="Pokémon logo">
          </div>
          <h3 class="mb-4 text-center letra-azul">Crear Cuenta</h3>
          <Form :validation-schema="validationSchema" @submit="registro()">
            <div class="form-outline mb-4">
              <label class="form-label" >Correo electrónico</label>
              <Field name="correo" id="correo" type="text" 
                class="form-control form-control-lg" 
                v-model="model.usuario.correo" 
                @keypress="validateInputEmail"
                />
              <ErrorMessage name="correo" class="errorValidacion"/>
            </div>
            <div class="form-outline mb-4">
              <label class="form-label" >Contraseña</label>
              <Field name="contraseña" type="password" id="contraseña" 
              v-model="model.usuario.contraseña"
              class="form-control form-control-lg" 
              />
              <ErrorMessage name="contraseña" class="errorValidacion"/>
              <ul class="list-unstyled">
                <li>Mínimo 8 caracteres</li>
                <li>Al menos una letra mayúscula</li>
                <li>Al menos una letra minúscula</li>
                <li>Al menos un número</li>
                <li>Al menos un carácter especial</li>
              </ul>
            </div>
            <div class="form-outline mb-4">
              <select name="rol" id="admin" v-model="model.usuario.rol" class="form-control">
                  <option value="0" selected>Usuario</option>
                  <option value="1">Administrador</option>
              </select>
              <label class="form-label" >Permisos</label>
            </div>
            <button type="submit" class="btn btn-primary btn-lg btn-block btn-custom">
              Crear cuenta
            </button>
          </Form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Field, ErrorMessage, Form } from 'vee-validate';
  import { toTypedSchema } from '@vee-validate/zod';
  import * as zod from 'zod';
  import apiclient from '@/apiclient';
  
  export default {
      nombre: 'createUsuario',
      components: {Field, ErrorMessage, Form},
    data() {
      const emailRegex = new RegExp(
          /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/
      );
      const contraseñaRegex= new RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      );
      const validationSchema = toTypedSchema(
          zod.object({
              correo: zod
              .string()
              .regex(emailRegex, { message: "email no válido" })
              .min(1, { message: 'Requerido' }),
              contraseña: zod
              .string()
              .regex(contraseñaRegex, { message: "contraseña no válida" })
              .min(1, { message: 'Requerido' }),
          })
      );
      return {
        validationSchema,
        model: {
          usuario: {
            correo: '',
            contraseña: '',
            rol: 0,
          }
        }
      };
    },
    methods: {
      checked() {
        alert('Usuario creado con éxito');
        this.$router.push('/login');
      },
      registro() {
        try {
          apiclient.auth.singup(this.model.usuario).then(res =>{
              console.log(this.model);
              if(res.data.affectedRows == 1){
                  this.model.usuario = {
                      correo: '',
                      contraseña: '',
                      rol: '',
                  }
              }
          },
          this.checked()
        ); 
        } catch (error) {
            console.error(error)
        }
      },
      validateInputEmail(event) {
          const char = String.fromCharCode(event.keyCode);
          const regex = /^[A-Za-z0-9@._]*$/;
          if (!regex.test(char)) {
              event.preventDefault();
          }
      },
    }
  };
  </script>
  
  <style scoped>
  body {
    background-color: #f6f8fc;
  }
  .errorValidacion{
    color: red;   
  }
  .form-label {
    color: #2a75bb;
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
  