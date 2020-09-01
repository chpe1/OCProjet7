<template>
  <div class="hello">
    <form id="formUser" class="formUser" @submit.prevent="login" action="/about">
          <h1>LOGIN</h1>
            <div class="form-group">
              <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Entrez votre email" v-model="email">
              <small id="emailHelp" class="form-text text-muted">Vous devez utiliser votre adresse email professionnelle</small>
            </div>
            <div class="form-group">
              <input type="password" class="form-control" id="password" placeholder="Mot de passe" v-model="password">
            </div>
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="souvenir">
              <label class="form-check-label" for="souvenir">Se souvenir de moi</label>
            </div>
            <button type="submit">Connexion</button>
        </form>
        <p class="text-center">{{ info }}</p>
  </div>
</template>

<script>
// const axios= require('axios');
import axios from 'axios'

export default {
  name: 'FormUser',
  data: function() {
            return {
                    info: '',
                    email: '',
                    password: ''
            }
        },
  methods: {
    login() {
        // let body = {
        //   'email': this.email,
        //   'password': this.password
        // }
        // axios({
        //   method: 'post',
        //   url: 'http://localhost:3000/api/auth/login',
        //   body: JSON.stringify(body)
        // })
        axios.post('http://localhost:3000/api/auth/login',{
          'email': this.email,
          'password': this.password
        })
        .then(response => {
          if (response.data.isAdmin){
            this.$router.push('/admin');
          }else{
            this.$router.push('/messages');
          }
        })
        .catch(error => this.info = error);
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello{
    margin: auto;
    // border: 1px solid yellow;
}
.formUser {
    max-width: 500px;
    margin: auto;
    padding: 40px;
    position: relative;
    background: #191919;
    text-align: center;
    transition: 0.25s;
}

.formUser input[type="email"],
.formUser input[type="password"] {
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #3498db;
    padding: 10px 10px;
    outline: none;
    max-width: 250px;
    color: white;
    border-radius: 24px;
    transition: 0.25s
}

.formUser h1 {
    color: white;
    text-transform: uppercase;
    font-weight: 500
}

.formUser input[type="email"]:focus,
.formUser input[type="password"]:focus {
    max-width: 300px;
    border-color: #2ecc71
}

.formUser button[type="submit"] {
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

.formUser button[type="submit"]:hover {
    background: #2ecc71
}
</style>
