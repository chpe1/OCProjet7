<template>
  <div class="admin">
    <p class="text-center"><img class="logo" alt="logo" src="../assets/images/groupomania-mini.png"></p>
    <p class="text-center">Panneau d'administration du site Groupomania</p>
    <div class="row">
      <div class="col-12">
        <p class="text-center"><span class="plink" @click="chooseMenu('user')">Afficher tous les utilisateurs</span> | <span class="plink" @click="chooseMenu('messages')">Afficher tous les messages</span> | <router-link to="/messages">Retour aux messages</router-link></p>
      </div>
      <div  class="col-12" v-if="choice === 'user'">
        <AdminUsers/>
      </div>
      <div class="col-12" v-if="choice === 'messages'">
        <AdminMessages/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AdminUsers from '@/components/AdminUsers.vue'
import AdminMessages from '@/components/AdminMessages.vue'

export default {
  name: 'Admin',
  data: function () {
    return {
      choice: ''
    }
  },
  components: {
    AdminUsers,
    AdminMessages
  },
  methods: {
    chooseMenu(item){
      this.choice= item
    }
  }
}
</script>

<style scoped>
.admin img{
  width: 250px;
}
</style>