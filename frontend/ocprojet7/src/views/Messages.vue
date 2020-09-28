<template>
  <div class="home">
    <div class="col-12">
      <p class="text-center"><img alt="logo" class="logo" src="../assets/images/groupomania-mini.png"></p>
      <p class="text-center w-100">Bienvenue sur le réseau social de Groupomania</p>
      <div v-if="isAdmin === true">
        <div id="nav">
          <router-link to="/admin">Panneau d'administration</router-link>
        </div>
      </div>
    </div>
    <div class="row">
        <div class="userAccount col-sm-3">
          <p><img :src="avatar" alt="Avatar"/></p>
          <p>Vous êtes connecté en tant que : <router-link to="/user">{{ email }}</router-link></p>
          <p><router-link to="/user">Modifier mon profil</router-link></p>
          <p @click="deconnect" class="plink">Se déconnecter</p>
        </div>
        <div class="col-sm-9">
          <DisplayMessages/>
        </div>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import DisplayMessages from '@/components/DisplayMessages.vue'
import { mapState } from 'vuex'

export default {
  name: 'Messages',
  components: {
    DisplayMessages
  }, 
  computed: {
        ...mapState({
          email: 'email',
          avatar: 'avatar',
          isAdmin: 'isAdmin'
      })
    },
  methods: {
    deconnect(){
      localStorage.clear();
      this.$store.commit('SETTOKEN', '');
      this.$store.commit('SETADMIN', '');
      this.$store.commit('SETUSERID', '');
      this.$store.commit('SETEMAIL', '');
      this.$store.commit('SETAVATAR', '');
      return this.$router.push('/');
    }
  }
}
</script>

<style lang="scss" scoped>


#nav{
  font-size: 1rem;
  margin-bottom: 5px;
  margin-left: 0;
}
</style>