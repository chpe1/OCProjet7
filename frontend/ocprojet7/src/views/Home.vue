<template>
  <div class="home">
    <p class="text-center"><img class="logo" alt="logo" src="../assets/images/groupomania-mini.png"></p>
    <p class="text-center">Bienvenue sur le réseau social de Groupomania</p>
    <div class="row">
     <FormUser/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import FormUser from '@/components/FormUser.vue'

export default {
  name: 'Home',
  components: {
    FormUser
  }
}
</script>
