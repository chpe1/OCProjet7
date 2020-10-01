<template>
  <div class="user">
    <div class="row">
      <div class="col-12">
        <p class="text-center avatar"><img alt="logo" :src="avatar"></p>
        <form id="formUpdateUser" class="formUpdateUser" @submit.prevent="updateUser" enctype="multipart/form-data">
          <fieldset>
              <legend>Modifier votre mot de passe : </legend>
            <div class="form-group">
              <input type="password" class="form-control" id="password" placeholder="Nouveau mot de passe" v-model="password">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" id="confirmPassword" placeholder="Confirmez votre mot de passe" v-model="confirmPassword">
            </div>
          </fieldset>
          <fieldset>
            <legend>Modifier votre avatar :</legend>
            <div class="form-group">
              <input type="file" class="form-control-file inputFile" ref="newAvatar" name="newAvatar" id="newAvatar" @change="onFileChange">
              <label for="newAvatar">Choisissez une image</label>
            </div>
            <div class="preview">
                <img v-if="url" :src="url" />
            </div>
          </fieldset>
            <button type="submit">Modifier votre profil</button>
        </form>
        <DeleteUser></DeleteUser>
        <p class="text-center">{{ info }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import DeleteUser from '@/components/DeleteUser.vue'

export default {

  name: 'UpdateUser',
  data: function() {
            return {
                    info: '',
                    password: '',
                    confirmPassword: '',
                    url: ''
                  }
      },
  components: {
      DeleteUser
  },
  computed: {
        ...mapState({
          email: 'email',
          avatar: 'avatar',
          token: 'token',
          userId: 'userId'
      })
    },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      // URL.createObjectURL() crée une chaîne contenant une URL représentant l’objet passé en paramètre
      this.url = URL.createObjectURL(file);
    },
    updateUser(){
      let formData = new FormData();
      // Si un fichier a été téléchargé
      let file = this.$refs.newAvatar.files[0];
      if (file){
        formData.append('image', file);
      }
      // Si aucun fichier n'a été téléchargé.
      else{
        formData.append('avatar', "");
      }
      if (this.password === this.confirmPassword){
        formData.append('password', this.password);
        axios.put('http://localhost:3000/api/auth/' + this.userId, formData, {
        headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then((response) => {
          this.$store.commit('SETAVATAR', response.data.avatar); // On modifie l'avatar dans le store.
          return this.info = response.data.message
          })
        .catch(error => this.info = error);
      }
      else{
        this.info = 'Vos mots de passe sont différents';
      }
      
    }
  }
}
</script>

<style scoped>
.avatar img{
    width: 100px;
}

.formUpdateUser {
    max-width: 500px;
    margin: auto;
    padding: 40px;
    position: relative;
    background: #191919;
    text-align: center;
    transition: 0.25s;
}

.formUpdateUser input[type="password"] {
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

.formUpdateUser input[type="password"]:focus {
    max-width: 300px;
    border-color: #2ecc71
}

.formUpdateUser button[type="submit"] {
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


.formUpdateUser button[type="submit"]:hover {
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

.preview img {
  max-width: 200px;
}
</style>
