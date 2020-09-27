<template>
    <div class="row">
      <div class="col-12">
        <table class="table table-light table-striped">
            <thead class="thead-dark">
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
                    <td class="avatar"><img :src="user.avatar" alt="avatar"/></td>
                    <td>{{ user.isAdmin }}</td>
                    <td>{{ user.createdAt_formated }}</td>
                    <td>{{ user.updatedAt_formated }}</td>
                </tr>
            </tbody>
        </table>
        <table class="table table-light table-striped" v-if="messages != ''">
            <caption>Liste des 5 derniers messages publiés par l'utilisateur</caption>
            <thead class="thead-dark">
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
                    <td>{{ message.createdAt_formated }}</td>
                    <td>{{ message.updatedAt_formated }}</td>
                </tr>
            </tbody>
        </table>
        <table class="table table-light table-striped" v-if="comments != ''">
            <caption>Liste des 5 derniers commentaires publiés par l'utilisateur</caption>
            <thead class="thead-dark">
                <tr>
                <th scope="col">id du commentaire</th>
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
                    <td>{{ comment.createdAt_formated }}</td>
                    <td>{{ comment.updatedAt_formated }}</td>
                </tr>
            </tbody>
        </table>
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
  },
  beforeMount(){ 
    this.getAllUsers() 
  }
}
</script>

<style scoped>
.table{
  color: black;
}

.avatar img{
    width: 100px;
}

.plink{
    cursor: pointer;
    text-decoration: none;
}

.plink:hover{
  color: #3498db;
  text-decoration: underline;
}

.getusers{
    border: 1px solid green;
}

caption { 
  caption-side: top;
  text-align: center;
  color: white;
  font-size: 2em;
}

</style>
