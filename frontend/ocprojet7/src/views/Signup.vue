<template>
  <div class="user">
    <div class="row">
      <div class="col-12">
        <p class="text-center"><img alt="logo" src="../assets/images/groupomania-mini.png"></p>
        <p class="text-center">Bienvenue sur le site de groupomania</p>
      </div>
    </div>
    <FormSignup></FormSignup>
  </div>

</template>

<script>
// @ is an alias to /src
import FormSignup from '@/components/FormSignup.vue'
import { mapState } from 'vuex'
// import { mapGetters } from 'vuex'

export default {
  name: 'Signup',
  components: {
    FormSignup
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