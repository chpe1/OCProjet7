<template>
  <div class="admin">
    <p class="text-center"><img alt="logo" src="../assets/images/groupomania-mini.png"></p>
    <p class="text-center">Panneau d'administration du site Groupomania</p>
    <div class="row">
      <div class="col-12">
        <p class="plink text-center" ><span @click="chooseMenu('user')">Afficher tous les utilisateurs</span> | <span @click="chooseMenu('messages')">Afficher tous les messages</span></p>
      </div>
      <div v-if="choice === 'user'">
        <AdminUsers/>
      </div>
      <div v-if="choice === 'messages'">
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

.plink span{
    cursor: pointer;
    text-decoration: underline;
}

</style>