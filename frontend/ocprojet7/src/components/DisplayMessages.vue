<template>
<div>
    <div class="message">
        <form id="formMessage" class="formMessage" @submit.prevent="sentMessage" enctype="multipart/form-data">
            <h3 class="text-center">Ajouter un message :</h3>
            <div class="form-group">
                <textarea class="form-control" id="message" aria-describedby="messageHelp" rows="4" placeholder="Entrez votre message" v-model="content" required></textarea>
            </div>
            <div class="form-group">
              <input type="file" class="form-control-file inputFile" name="image" id="image" @change="onFileChange">
              <label for="image">Choisissez une image</label>
            </div>
            <div class="preview">
                <img v-if="url" :src="url" />
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
            {{ message.content }} <br/> <img v-if="message.image" class="w-25" :src="message.image" alt="Image du message"/></p>
        </div>
        <!-- Liens pour modifier / supprimer les messages et voir les commentaires -->
        <div class=" d-flex justify-content-end">
        <small class="d-inline-flex text-info">
            <p class="plink mr-2 text-danger" @click="addLike(message.id, 0)" v-if="likes.find(messageLiked => messageLiked === message.id)">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>
            </p>
            <p class="plink mr-2" @click="addLike(message.id, 1)" v-else>
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>
            </p>
                <p v-if="userId === message.userId" class="plink mr-2" @click="editMessage(message.id, message.content, message.image)">Modifier le message</p>
                <p v-if="userId === message.userId" class="plink mr-2" @click="deleteMessage(message.id)">Supprimer le message</p>
                <p v-if="showComments != message.id" class="plink mr-2" @click="getComments(message.id)">Voir les commentaires</p>
            <p v-else class="plink mr-2" @click="hideComments">Cacher les commentaires</p> 
        </small>
        </div>
        <!-- Formulaire d'édition d'un message -->
        <div v-if="showEditMessage===message.id">
            <form id="formEditMessage" class="formMessage" @submit.prevent="sentEditMessage(message.id)" enctype="multipart/form-data">
                <h3 class="text-center">Modifier le message :</h3>
                <div class="form-group">
                    <textarea class="form-control" id="editMessage" aria-describedby="messageHelp" rows="4" v-model="editContent" required></textarea>
                </div>
                <div class="form-group">
                    <input type="file" class="form-control-file inputFile" name="editImage" id="editImage" @change="editOnFileChange">
                    <label for="editImage">Choisissez une image</label>
                </div>
                <div class="preview">
                    <img v-if="editUrl" :src="editUrl" />
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
            <div class="comments" v-if="comments.data.length > 0"> -->
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
                        <p v-if="userId == comment.userId">
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
// import DisplayComments from '@/components/DisplayComments.vue'

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
                    likes: [], // likes est un tableau contenant les messages aimés par l'utilisateur connecté
                    url: null, 
                    editUrl: null
            }
        },
//   components: {
//       DisplayComments
//   },
  computed: {
    ...mapState({
    token: 'token',
    userId: 'userId'
    })
  },
  methods: {
      onFileChange(e) {
        const file = e.target.files[0];
        this.url = URL.createObjectURL(file);
        },
      editOnFileChange(e) {
        const file = e.target.files[0];
        this.editUrl = URL.createObjectURL(file);
        },
      addLike(messageId, data){
        axios.post('http://localhost:3000/api/messages/like/' + messageId,{
        'like': data,
        'userId': this.userId
        },{
        headers: {
            'Authorization': 'Bearer ' + this.token
        }
        })
        .then(() => {
            this.getLikes();
            })
        .catch(error => this.messageInfo= error);
      },
      sentMessage() {
        let formData = new FormData();
        // Si un fichier a été téléchargé
        let file = document.getElementById('image').files[0];
        console.log(document.getElementById('image').files);

        if (file){
        formData.append('image', file);
        }
        // Si aucun fichier n'a été téléchargé.
        else{
            formData.append('image', '');
        }
        formData.append('content', this.content);
        formData.append('userId', this.userId);
        axios.post('http://localhost:3000/api/messages', formData, {
        headers: {
            'Authorization': 'Bearer ' + this.token
        }
        })
        .then(() => {
            this.messageInfo = 'Message bien envoyé !';
            this.content='';
            this.url='';
            this.getMessages();
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
        .catch(error => this.messageInfo = error.message);
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
        .catch(error => this.messageInfo = error.message);
      },
      editMessage(messageId, editContent, image){
        this.showEditMessage = messageId;
        this.editContent = editContent;
        this.editUrl = image;
        this.showComments='';
      },
      editComment(commentId, content){
        this.showEditComment = commentId;
        this.updateComment = content;
        this.messageComment = '';
      },
      sentEditMessage(messageId){
        let formData = new FormData();
        // Si un fichier a été téléchargé
        let file = document.getElementById('editImage').files[0];
        if (file){
        formData.append('image', file);
        }
        // Si aucun fichier n'a été téléchargé.
        else{
            formData.append('image', this.editUrl);
        }
        formData.append('content', this.editContent);
        axios.put('http://localhost:3000/api/messages/' + messageId, formData, {
        headers: {
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            this.messageInfo = response.data.message;
            this.showEditMessage = '';
            this.editUrl = '';
            this.getMessages();
        })
        .catch(error => this.messageInfo = error.message);
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
        .catch(error => this.messageComment = error.message);
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
            this.getLikes();
            this.url='';
            this.info = response;
            })
        .catch(error => this.info = error);
      },
      getLikes(){
          axios.get('http://localhost:3000/api/like/' + this.userId, {
          headers: {
            'Authorization': 'Bearer ' + this.token
            }
          })
          .then(response => this.likes = response.data)
          .catch(error => this.likes = error);
          },
    },
  mounted() {
      this.getMessages()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.preview img {
  max-width: 700px;
  max-height: 500px;
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
    max-width: 700px;
}
 
.inputFile:focus + label,
.inputFile + label:hover {
    background: #2ecc71
}

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
