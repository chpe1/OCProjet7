<template>
  <div class="home">
    <div class="row">
      <div class="col-12">
        <p class="text-center"><img alt="logo" src="../assets/images/groupomania-mini.png"></p>
        <p class="text-center">Bienvenue sur le réseau social de Groupomania</p>
        <div v-if="$store.state.isAdmin === true">
        <!-- <div v-if="getIsAdmin === true"> Ne fonctionne pas -->
          <div id="nav">
            <router-link to="/admin">Panneau d'administration</router-link>
          </div>
        </div>
      </div>
    </div>  
    <div class="row">
      <div class="userAccount col-3">
        <p><img :src="avatar" alt="Avatar"/></p>
        <p>Vous êtes connecté en tant que : <router-link to="/user">{{ email }}</router-link></p>
        <p><router-link to="/user">Modifier mon profil</router-link></p>
      </div>
      <div class="formMessage col-9">
        <DisplayMessages/>
      </div>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import DisplayMessages from '@/components/DisplayMessages.vue'
import { mapState } from 'vuex'
// import { mapGetters } from 'vuex'

export default {
  name: 'Messages',
  components: {
    DisplayMessages
  }, 
  computed: {
        // ...mapGetters(['getIsAdmin'])
        ...mapState({
          email: 'email',
          avatar: 'avatar'
      })
    }
}
</script>

<style scoped>
.home img{
  width: 250px;
}
/* 
.home{
  border: 1px solid green;
}

.formMessage{
  border: 1px solid yellow;
}
*/
.userAccount a {
  color: white;
}
</style>