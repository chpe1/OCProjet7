<template>
  <div class="login">
    <form id="formSignup" class="formSignup" @submit.prevent="signup"  enctype="multipart/form-data">
          <h1>INSCRIVEZ-VOUS !</h1>
            <div class="form-group">
              <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Entrez votre email" v-model="email">
              <small id="emailHelp" class="form-text text-muted">Vous devez utiliser votre adresse email professionnelle</small>
            </div>
            <div class="form-group">
              <input type="password" class="form-control" id="password" placeholder="Mot de passe" v-model="password">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" id="confirm" placeholder="Confirmez votre mot de passe" v-model="confirm">
            </div>
            <div class="form-group">
              <input type="file" class="form-control-file inputFile" ref="avatar" name="avatar" id="avatar" @change="onFileChange">
              <label for="avatar">Choisissez un avatar</label>
            </div>
            <div class="preview">
                <img v-if="url" :src="url" />
            </div>
            <button type="submit">Inscription</button>
        </form>
        <p class="text-center">{{ info }}</p>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'FormSignup',
  data: function() {
            return {
                    info: '',
                    email: '',
                    password: '',
                    confirm: '',
                    avatar: '',
                    url: ''
            }
        },
  methods: {
      onFileChange(e) {
        const file = e.target.files[0];
        // URL.createObjectURL() crée une chaîne contenant une URL représentant l’objet passé en paramètre
        this.url = URL.createObjectURL(file);
        },
    signup() {
        let formData = new FormData();
        // Si un fichier a été téléchargé
        let file = this.$refs.avatar.files[0];
        if (file){
        formData.append('image', file);
        }
        // Si aucun fichier n'a été téléchargé.
        else{
            formData.append('image', "");
        }
        formData.append('email', this.email);
        if (this.password === this.confirm){
          formData.append('password', this.password);
          axios.post('http://localhost:3000/api/auth/signup', formData)
          .then(response => {
            this.info = response.data.message;
            return this.$router.push('/');
          })
          .catch(error => this.info = error.message);
        }
        else{
          this.info = 'Vos mots de passe sont différents'
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.preview img {
  max-width: 200px;
}

.login{
    margin: auto;
}
.formSignup {
    max-width: 500px;
    margin: auto;
    padding: 40px;
    position: relative;
    background: #191919;
    text-align: center;
    transition: 0.25s;
}

.formSignup input[type="email"],
.formSignup input[type="password"] {
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

.formSignup h1 {
    color: white;
    text-transform: uppercase;
    font-weight: 500
}

.formSignup input[type="email"]:focus,
.formSignup input[type="password"]:focus {
    max-width: 300px;
    border-color: #2ecc71
}

.formSignup button[type="submit"] {
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #2ecc71;
    padding: 14px 40px;
    outline: none;
    color: white;
    cursor: pointer;
    border-radius: 24px;
    transition: 0.25s;
}

.formSignup button[type="submit"]:hover {
    background: #2ecc71
}

.inputFile {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}
 
.inputFile + label {
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #3498db;
    padding: 14px 40px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s;
    cursor: pointer;
    max-width: 250px;
}
 
.inputFile:focus + label,
.inputFile + label:hover {
    background: #2ecc71
}
</style>
