<template>
  <div class="getmessages">
    <div class="row">
      <div class="col-12">
        <!-- TABLEAU DES MESSAGES  -->
        <table class="table table-light table-striped">
            <thead class="thead-dark">
                <tr>
                <th scope="col">Actions</th>
                <th scope="col">id</th>
                <th scope="col">Contenu</th>
                <th scope="col">Auteur</th>
                <th scope="col">Like</th>
                <th scope="col">Date de Création</th>
                <th scope="col">Date de Modification</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="message in messages" :key="message">
                    <td>
                      <svg @click="deleteMessage(message.id)" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle plink" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                      </svg>
                      &ensp; <!-- double espace    -->
                      <svg @click="getUpdateFormMessage(message.id, message.content)" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square plink" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                      </svg>
                    </td>
                    <th scope="row" class="plink" @click="getAllComments(message.id)">{{ message.id }}</th>
                    <td>{{ message.content }}</td>
                    <td>{{ message.user.email }}</td>
                    <td>{{ message.like }}</td>
                    <td>{{ message.createdAt }}</td>
                    <td>{{ message.updatedAt }}</td>
                </tr>
            </tbody>
        </table>

        <!-- TABLEAU DES COMMENTAIRES  -->
        <div v-if="comments.length>0">
            <table class="table table-light table-striped">
                <caption>Liste des commentaires liés à ce message</caption>
                <thead class="thead-dark">
                    <tr>
                      <th scope="col">Actions</th>
                      <th scope="col">id du commentaire</th>
                      <th scope="col">Contenu</th>
                      <th scope="col">Auteur</th>
                      <th scope="col">Date de Création</th>
                      <th scope="col">Date de Modification</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="comment in comments" :key="comment">
                        <td>
                          <svg @click="deleteComment(comment.id)" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle plink" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                          </svg>
                          &ensp; <!-- double espace    -->
                          <svg @click="getUpdateFormComment(comment.id, comment.content)" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square plink" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                          </svg>
                        </td>
                        <th scope="row">{{ comment.id }}</th>
                        <td>{{ comment.content }}</td>
                        <td>{{ comment.user.email }}</td>
                        <td>{{ comment.createdAt }}</td>
                        <td>{{ comment.updatedAt }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- FORMULAIRE DE MODIFICATION D'UN MESSAGE -->
        <div v-if="displayFormMessage===true">
          <form id="UpdateFormMessage" class="UpdateFormMessage" @submit.prevent="updateMessage">
            <h3 class="text-center">Modifier le contenu du message :</h3>
            <div class="form-group">
                <textarea class="form-control" id="message" aria-describedby="messageHelp" rows="4" v-model="content" required></textarea>
            </div>
            <button type="submit">Modifier le message</button>
          </form>
        </div>

        <!-- FORMULAIRE DE MODIFICATION D'UN COMMENTAIRE -->
        <div v-if="displayFormComment===true">
          <form id="UpdateFormMessage" class="UpdateFormMessage" @submit.prevent="updateComment">
            <h3 class="text-center">Modifier le contenu du commentaire :</h3>
            <div class="form-group">
                <textarea class="form-control" id="message" aria-describedby="messageHelp" rows="4" v-model="content" required></textarea>
            </div>
            <button type="submit">Modifier le commentaire</button>
          </form>
        </div>
          <p class="text-center">{{ info }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {

  name: 'Adminmessages',
  data: function() {
    return {
            messages: '',
            comments: '',
            info: '',
            displayFormMessage: false,
            messageId: '',
            content: '',
            commentId: '',
            displayFormComment: false
            }
      },
  computed: {
        ...mapState({
          token: 'token'
      })
    },
  methods: {
    getAllmessages(){
      axios.get('http://localhost:3000/api/admin/messages', {
        headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
      .then((response) => this.messages = response.data)
      .catch(error => this.messages = error);
    },
    getAllComments(messageId){
      let url = 'http://localhost:3000/api/admin/comments/' + messageId;
      axios.get(url, {
        headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
      .then((response) => {
        this.comments = response.data;
        })
      .catch(error => this.info = error);
    },
    deleteMessage(messageId){
      let url = 'http://localhost:3000/api/admin/messages/' + messageId;
      axios.delete(url, {
        headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
      .then((response) => {
        this.info = response.data.message;
        })
      .catch(error => this.info = error);
    },
    getUpdateFormMessage(messageId, content){
      this.displayFormMessage = true;
      this.messageId = messageId;
      this.content = content;
    },
    updateMessage(){
      let url = 'http://localhost:3000/api/admin/messages/' + this.messageId;
      axios.put(url, {
        content: this.content
      },{
        headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
      .then((response) => {
        this.displayFormMessage= false;
        this.info = response.data.message;
        })
      .catch(error => this.info = error);
    },
    deleteComment(commentId){
      let url = 'http://localhost:3000/api/admin/comments/' + commentId;
      axios.delete(url, {
        headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
      .then((response) => {
        this.info = response.data.message;
        })
      .catch(error => this.info = error);
    },
    getUpdateFormComment(commentId, content){
      this.displayFormComment = true;
      this.commentId = commentId;
      this.content = content;
    },
    updateComment(){
      let url = 'http://localhost:3000/api/admin/comments/' + this.commentId;
      axios.put(url, {
        content: this.content
      },{
        headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
      .then((response) => {
        this.displayFormComment= false;
        this.info = response.data.message;
        })
      .catch(error => this.info = error);
    }
  },
  beforeMount(){ 
    this.getAllmessages() 
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
  text-decoration: underline;
  color: #3498db;
}

.getmessages{
    width: 100%;
}

caption { 
  caption-side: top;
  text-align: center;
  color: white;
  font-size: 2em;
}

.UpdateFormMessage {
    max-width: 800px;
    margin: auto;
    padding: 40px;
    position: relative;
    background: #191919;
    text-align: center;
    transition: 0.25s;
}

.UpdateFormMessage button[type="submit"] {
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

.UpdateFormMessage button[type="submit"]:hover {
    background: #2ecc71
}

.UpdateFormMessage textarea{
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #3498db;
    padding: 10px 10px;
    outline: none;
    max-width: 700px;
    color: white;
    border-radius: 10px;
    transition: 0.25s
}

.UpdateFormMessage textarea:focus
{
    max-width: 750px;
    border-color: #2ecc71
}

</style>
