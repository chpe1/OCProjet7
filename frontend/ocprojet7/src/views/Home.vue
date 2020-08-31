<template>
  <div class="home">
    <p class="text-center"><img alt="logo" src="../assets/images/groupomania-mini.png"></p>
    <p class="text-center">Bienvenue sur le réseau social de Groupomania</p>
    <FormUser/>
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

<style scoped>
.home img{
  width: 300px;
}
/* .home{
  border: 1px solid green;
} */
</style>