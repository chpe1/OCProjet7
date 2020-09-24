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
              <input type="file" class="form-control-file" name="newAvatar" id="newAvatar" >
              <small> 1 Mo maxi - Format : jpg, jpeg ou png</small>
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
                    maxFileSize: 1048576
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
    updateUser(){
      let formData = new FormData();
      formData.append('email', this.email);
      formData.append('password', this.password);
      // Si un fichier a été téléchargé
      let file = document.getElementById('newAvatar').files[0];
      if (file){
        // if (file.size <= this.maxFileSize){
          
        // }
        formData.append('image', file);
      }
      // Si aucun fichier n'a été téléchargé.
      else{
        formData.append('avatar', "");
      }
      
      axios.put('http://localhost:3000/api/auth/' + this.userId, formData, {
        headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
      .then((response) => {
        if (localStorage.avatar){ // On modifie l'avatar dans le localstorage s'il existe
            localStorage.avatar = response.data.avatar;
            }
        this.$store.commit('SETAVATAR', response.data.avatar); // On modifie l'avatar dans le store.
        return this.info = response.data.message
        })
      .catch(error => this.info = error);
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

.formUpdateUser input[type="file"] {
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

.formUpdateUser button[type="submit"]:hover {
    background: #2ecc71
}
</style>
