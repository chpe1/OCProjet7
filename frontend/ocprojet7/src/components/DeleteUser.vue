<template>
  <div class="user">
    <div class="row">
      <div class="col-12">
        <form id="formDeleteUser" class="formDeleteUser" @submit.prevent="deleteUser">
            <button type="submit">Supprimer votre profil</button>
            <p class="text-center">Attention : Vous ne pouvez supprimer votre compte que si vous n'avez envoyé aucun message. Si vous avez posté des messages, merci de les supprimer auparavant</p>
        </form>
        <p class="text-center">{{ info }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {

  name: 'DeleteUser',
  data: function() {
            return {
                    info: '',
                  }
      },
  computed: {
        ...mapState({
          email: "email",
          token: "token",
          userId: "userId"
      })
    },
  methods: {
    deleteUser(){
     console.log(this.email + ' ' + this.token + ' ' + typeof(this.userId))
    axios.delete('http://localhost:3000/api/auth', { 
        data: { 
            email: this.email, 
            userId: this.userId 
            }, 
            headers: { 
                "Authorization": 'Bearer ' + this.token 
                } 
        })
      .then((response) => {this.info = response})
      .catch(error => this.info = error);
    }
  }
}
</script>

<style scoped>

.formDeleteUser {
    max-width: 500px;
    margin: auto;
    position: relative;
    background: #191919;
    text-align: center;
    transition: 0.25s;
    border: 1px solid #191919;
}

.formDeleteUser button[type="submit"] {
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #2ecc71;
    padding: 14px 40px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s;
    cursor: pointer
}

.formDeleteUser button[type="submit"]:hover {
    background: #2ecc71
}
</style>
