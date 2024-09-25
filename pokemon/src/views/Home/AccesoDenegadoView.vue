<template>
        <div>
            <div v-if="!token" class="alert alert-danger" role="alert" style="text-align:center;">
                <h2> 
                    <Icon icon="maki:police"/>
                    Acceso No Autorizado
                    <Icon icon="ph:hand-duotone"/>
                </h2>
            </div>
        </div>
  </template>
  
  <script>
    import { Icon } from "@iconify/vue";

export default {
    name: "noAutoriza",
    components: {
        Icon,
    }
  }
  </script>
  