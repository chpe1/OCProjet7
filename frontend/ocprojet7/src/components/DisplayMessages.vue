<template>
<div>
    <div class="message">
        <form id="formMessage" class="formMessage" @submit.prevent="sentMessage">
            <h3 class="text-center">Ajouter un message :</h3>
            <div class="form-group">
                <textarea class="form-control" id="message" aria-describedby="messageHelp" rows="4" placeholder="Entrez votre message" v-model="content" required></textarea>
            </div>
            <button type="submit">Envoyer votre message</button>
        </form>
        <p class="text-center">{{ messageInfo }} </p>
    </div>
    <!-- Affichage des messages -->
    <div class="my-3 p-3 bg-dark rounded box-shadow" v-for="message in info.data" :key="message">
        <div class="media text-white text-left pt-3 mb-3">
            <img :src="message.user.avatar" alt="avatar" class="mr-2 rounded avatar">
            <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <strong class="d-block text-gray-dark">{{ message.user.email }}</strong>
            {{ message.content }} </p>
        </div>
        <!-- Liens pour modifier / supprimer les messages et voir les commentaires -->
        <small class="text-right text-info">
            <p>
                <!-- <span :class="colorLike(message.id)"class="plink" @click="addLike(message.id)">J'aime</span>&ensp; -->
                <span class="plink" @click="editMessage(message.id, message.content)">Modifier le message</span>&ensp;
                <span class="plink" @click="deleteMessage(message.id)">Supprimer le message</span>&ensp;
                <span v-if="showComments != message.id" class="plink" @click="getComments(message.id)">Voir les commentaires</span>
                <span v-else class="plink" @click="hideComments">Cacher les commentaires</span> 
            </p>
        </small>
        <!-- Formulaire d'édition d'un message -->
        <div v-if="showEditMessage===message.id">
            <form id="formEditMessage" class="formMessage" @submit.prevent="sentEditMessage(message.id)">
                <h3 class="text-center">Modifier le message :</h3>
                <div class="form-group">
                    <textarea class="form-control" id="editMessage" aria-describedby="messageHelp" rows="4" v-model="editContent" required></textarea>
                </div>
                <button type="submit">Modifier votre message</button>
            </form>
        </div>
        <!-- Formulaire d'ajout de commentaire -->
        <div v-if="showComments===message.id">
            <div class="comments my-3 p-3 bg-light rounded box-shadow">
                <form id="formNewComment" class="formNewComment" @submit.prevent="sentNewComment(message.id)">
                    <div class="form-group">
                        <textarea class="form-control" id="createcomment" rows="4" v-model="newComment" required></textarea>
                    </div>
                    <button type="submit">Ecrire un nouveau commentaire</button>
                </form>
            </div>
            <!-- Liste des commentaires -->
            <div class="comments" v-if="comments.data.length > 0">
                <div class="my-3 p-3 bg-light rounded box-shadow" v-for="comment in comments.data" :key="comment">
                    <div class="media text-black text-left pt-3 mb-3">
                        <img :src="comment.user.avatar" alt="avatar" class="mr-2 rounded avatar">
                        <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                            <em><strong class="d-block text-gray-dark">{{ comment.user.email }}</strong></em>
                            {{ comment.content }}
                        </p>
                    </div>
                    <!-- Lien pour modifier / supprimer un commentaire -->
                    <small class="text-right text-info">
                        <p>
                            <span class="plink" @click="editComment(comment.id, comment.content)">Modifier le commentaire</span>&ensp;
                            <span class="plink" @click="deleteComment(comment.id, message.id)">Supprimer le commentaire</span>
                        </p>
                    </small>
                    <!-- Formulaire de modification de commentaire -->
                    <div v-if="showEditComment===comment.id">
                        <div class="comments my-3 p-3 bg-light rounded box-shadow">
                            <form id="formNewComment" class="formNewComment" @submit.prevent="sentEditComment(comment.id, message.id)">
                                <div class="form-group">
                                    <textarea class="form-control" id="editComment" rows="4" v-model="updateComment" required></textarea>
                                </div>
                                <button type="submit">Modifier le commentaire</button>
                            </form>
                        </div>
                        <p class="text-center">{{ messageComment }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>

import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'DisplayMessages',
  data: function() {
            return {
                    info: '',
                    showComments: '',
                    showEditComment: '',
                    showEditMessage: '',
                    content: '',
                    editContent: '',
                    updateComment: '',
                    comments: '',
                    newComment: '',
                    messageComment: '',
                    messageInfo: '',
                    // like: 1
            }
        },
  computed: {
    ...mapState({
    token: 'token',
    userId: 'userId'
    })
  },
  methods: {
    //   colorLike(messageId){
    //       if ((this.showEditMessage === messageId) && (this.like===1)){
    //           return {
    //               'text-danger': true
    //           }              
    //       }
    //   },
    //   addLike(messageId){
    //     axios.post('http://localhost:3000/api/messages/like/' + messageId,{
    //     'like': this.like
    //     },{
    //     headers: {
    //         'Authorization': 'Bearer ' + this.token
    //     }
    //     })
    //     .then(() => {
    //         this.messageInfo = 'Merci !';
    //         if (this.like === 0){
    //             this.like = 1;
    //         }
    //         else{
    //             this.like = 0;
    //         }
    //         this.colorLike();
    //         this.getMessages();
    //         })
    //     .catch(error => this.messageInfo= error);
    //   },
      sentMessage() {
        axios.post('http://localhost:3000/api/messages',{
        'content': this.content,
        'userId' : this.userId
        },{
        headers: {
            'Authorization': 'Bearer ' + this.token
        }
        })
        .then(() => {
            this.messageInfo = 'Message bien envoyé !';
            this.getMessages();
            this.content='';
            })
        .catch(error => this.messageInfo= error);
      },
      hideComments(){
          this.showComments='';
          this.newComment= '';
          this.messageInfo= '';
      },
      getComments(messageId){
        // showComments permet de montrer les commentaires du message choisi.
        this.showComments = messageId;
        // Réinitialise showEditMessage pour que le formulaire de modification du message disparaisse si on clique sur voir les commentaires
        this.showEditMessage = '';
        axios.get('http://localhost:3000/api/comments/'+ messageId,{
            headers: {
                'Authorization': 'Bearer ' + this.token
                }
            })
        .then(response => this.comments = response)
        .catch(error => this.comments = error);
      },
      deleteComment(commentId, messageId){
          axios.delete('http://localhost:3000/api/comments/'+ commentId,{
            headers: {
                'Authorization': 'Bearer ' + this.token
                }
            })
        .then(() => {
            this.showComments = messageId;
            this.getComments(messageId);
            })
        .catch(error => this.messageInfo = error);
      },
      deleteMessage(messageId){
          axios.delete('http://localhost:3000/api/messages/'+ messageId,{
            headers: {
                'Authorization': 'Bearer ' + this.token
                }
            })
        .then(response => {
            this.messageInfo = response.data.message;
            this.getMessages();
            })
        .catch(error => this.messageInfo = error);
      },
      editMessage(messageId, content){
        this.showEditMessage = messageId;
        this.editContent = content;
        this.showComments='';
      },
      editComment(commentId, content){
        this.showEditComment = commentId;
        this.updateComment = content;
        this.messageComment = '';
      },
      sentEditMessage(messageId){
        axios.put('http://localhost:3000/api/messages/' + messageId, {
            content: this.editContent
        }, {
        headers: {
            'Authorization': 'Bearer ' + this.token
            }
        })
        .then(response => {
            this.messageInfo = response.data.message;
            this.showEditMessage = '';
            this.getMessages();
        })
        .catch(error => this.messageInfo = error);
      },
      sentEditComment(commentId, messageId){
        axios.put('http://localhost:3000/api/comments/' + commentId, {
            content: this.updateComment
        }, {
        headers: {
            'Authorization': 'Bearer ' + this.token
            }
        })
        .then(() => {
            this.showEditComment = '';
            this.getComments(messageId);
            })
        .catch(error => this.messageComment = error);
      },
      sentNewComment(messageId){
        axios.post('http://localhost:3000/api/comments/'+ messageId,{
            content: this.newComment,
            userId: this.userId
        },{
            headers: {
                'Authorization': 'Bearer ' + this.token
                }
            })
        .then((response) => {
            this.newComment= '';
            this.getComments(messageId);
            this.messageInfo= response.data.message;
            })
        .catch(error => this.messageInfo = error);
      },
      getMessages(){
        axios.get('http://localhost:3000/api/messages/',{
        headers: {
            'Authorization': 'Bearer ' + this.token
            }
        })
        .then(response => {
            this.info = response;
            })
        .catch(error => this.info = error);
      }
  },
  mounted() {
      this.getMessages()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.message {
    margin: auto;
    color: white;
    max-width: 800px;
}

.avatar{
    width: 30px;
}

.plink{
    text-decoration: underline;
    cursor: pointer;
}

.formMessage {
    max-width: 800px;
    margin: auto;
    padding: 40px;
    position: relative;
    background: #191919;
    text-align: center;
    transition: 0.25s;
}

.formMessage button[type="submit"] {
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

.formMessage button[type="submit"]:hover {
    background: #2ecc71
}

.formMessage textarea{
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

.formMessage textarea:focus
{
    max-width: 750px;
    border-color: #2ecc71
}

.formNewComment {
    max-width: 500px;
    margin: left;
    position: relative;
    transition: 0.25s;
    text-align: left;
}

.formNewComment button[type="submit"] {
    border: 0;
    background: black;
    display: block;
    margin: 20px auto;
    text-align: left;
    border: 2px solid black;
    border-radius: 24px;
    transition: 0.25s;
    cursor: pointer;
    color: white;
    outline: none;
}

.formNewComment button[type="submit"]:hover {
    background: gray;
}

.formNewComment textarea{
    background: gray;
    display: block;
    margin: 20px auto;
    text-align: left;
    border: 2px solid black;
    padding: 10px 10px;
    outline: none;
    max-width: 500px;
    color: white;
    border-radius: 10px;
    transition: 0.25s
}

.comments {
    margin-top: 10px;
    color: black;
    max-width: 600px;
}

.card-body{
    background: rgb(144, 143, 143);
    color: white;
    border-bottom: 1px solid black;
}


</style>
