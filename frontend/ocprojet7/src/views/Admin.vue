<template>
  <div class="admin">
    <p class="text-center"><img alt="logo" src="../assets/images/groupomania-mini.png"></p>
    <p class="text-center">Panneau d'administration du site Groupomania</p>
    <div class="row">
     <AdminUsers/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AdminUsers from '@/components/AdminUsers.vue'

export default {
  name: 'Admin',
  components: {
    AdminUsers
  }
}
</script>

<style scoped>
.admin img{
  width: 250px;
}
/* .home{
  border: 1px solid green;
} */
</style>