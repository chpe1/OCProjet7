<template>
  <div class="user">
    <div class="row">
      <div class="col-12">
        <p class="text-center"><img alt="logo" class="logo" src="../assets/images/groupomania-mini.png"></p>
        <p class="text-center">Bienvenue sur le profil de {{ email }}</p>
        <p><router-link to="/messages">Retour aux messages</router-link></p>
      </div>
    </div>
    <UpdateUser></UpdateUser>
  </div>

</template>

<script>
// @ is an alias to /src
import UpdateUser from '@/components/UpdateUser.vue'
import { mapState } from 'vuex'

export default {
  name: 'User',
  components: {
    UpdateUser
  }, 
  computed: {
        ...mapState({
          email: 'email',
          avatar: 'avatar'
      })
    }
}
</script>
