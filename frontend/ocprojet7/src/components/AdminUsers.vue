<template>
  <div class="getusers">
    <div class="row">
      <div class="col-12">
        <!-- <form id="formGetUsers" class="formGetUsers" @submit.prevent="getAllUsers">
            <select name="user" id="userSelect">
                <option name=""></option>
            </select>
            <button type="submit">Sélectionner l'utilisateur</button>
        </form> -->
        <p class="plink text-center" @click="getAllUsers">Afficher tous les utilisateurs</p>
        <!-- Le v-if permet de ne pas afficher les titres du tableau si celui-ci est vide-->
        <table class="table table-striped" v-if="users != ''">
            <thead>
                <tr>
                <th scope="col">id</th>
                <th scope="col">Email</th>
                <th scope="col">Avatar</th>
                <th scope="col">isAdmin</th>
                <th scope="col">Date de Création</th>
                <th scope="col">Date de Modification</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user">
                    <th scope="row">{{ user.id }}</th>
                    <td class="plink" @click="getOneUser(user.id)">{{ user.email }}</td>
                    <td>{{ user.avatar.split('/images/')[1] }}</td>
                    <td>{{ user.isAdmin }}</td>
                    <td>{{ user.createdAt }}</td>
                    <td>{{ user.updatedAt }}</td>
                </tr>
            </tbody>
        </table>
        <table class="table table-striped" v-if="messages != ''">
            <caption>Liste des 5 derniers messages publiés par l'utilisateur</caption>
            <thead>
                <tr>
                <th scope="col">id du message</th>
                <th scope="col">Contenu</th>
                <th scope="col">Nombre de "j'aime"</th>
                <th scope="col">Date de Création</th>
                <th scope="col">Date de Modification</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="message in messages" :key="message">
                    <th scope="row">{{ message.id }}</th>
                    <td>{{ message.content }}</td>
                    <td>{{ message.like }}</td>
                    <td>{{ message.createdAt }}</td>
                    <td>{{ message.updatedAt }}</td>
                </tr>
            </tbody>
        </table>
        <table class="table table-striped" v-if="comments != ''">
            <caption>Liste des 5 derniers commentaires publiés par l'utilisateur</caption>
            <thead>
                <tr>
                <th scope="col">id du message</th>
                <th scope="col">Contenu</th>
                <th scope="col">Id du message commenté</th>
                <th scope="col">Date de Création</th>
                <th scope="col">Date de Modification</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="comment in comments" :key="comment">
                    <th scope="row">{{ comment.id }}</th>
                    <td>{{ comment.content }}</td>
                    <td>{{ comment.messageId }}</td>
                    <td>{{ comment.createdAt }}</td>
                    <td>{{ comment.updatedAt }}</td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {

  name: 'AdminUsers',
  data: function() {
    return {
            users: '',
            messages: '',
            comments: ''
            }
      },
  computed: {
        ...mapState({
          token: 'token'
      })
    },
  methods: {
    getAllUsers(){
      axios.get('http://localhost:3000/api/admin/users', {
        headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
      .then((response) => this.users = response.data)
      .catch(error => this.users = error);
    },
    getOneUser(userId){
      let url = 'http://localhost:3000/api/admin/users/' + userId;
      axios.get(url, {
        headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
      .then((response) => {
        this.messages = response.data.message
        this.comments = response.data.commentaires
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

.plink{
    cursor: pointer;
    text-decoration: underline;
}

.getusers{
    width: 100%;
}

caption { 
  caption-side: top;
  text-align: center;
  color: white;
  font-size: 2em;
}

/* .formUpdateUser {
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
} */
</style>
