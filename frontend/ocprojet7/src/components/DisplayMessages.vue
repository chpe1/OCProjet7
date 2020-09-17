<template>
<div>
    <div class="my-3 p-3 bg-dark rounded box-shadow" v-for="item in info.data" :key="item">
        <div class="media text-white text-left pt-3 mb-3">
            <img :src="item.user.avatar" alt="avatar" class="mr-2 rounded avatar">
            <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <strong class="d-block text-gray-dark">{{ item.user.email }}</strong>
            {{ item.content }} </p>
        </div>
        <small class="text-right text-info">
            <p>
                <span class="plink" @click="editMessage(item.id, item.content)">Modifier le message</span>&ensp;
                <span v-if="showComments != item.id" class="plink" @click="getComments(item.id)">Voir les commentaires</span>
                <span v-else class="plink" @click="hideComments">Cacher les commentaires</span> 
            </p>
        </small>

        <div v-if="showEditMessage===item.id">
            <form id="formEditMessage" class="formEditMessage" @submit.prevent="sentEditMessage(item.id)">
                <h3 class="text-center">Modifier le message :</h3>
                <div class="form-group">
                    <textarea class="form-control" id="message" aria-describedby="messageHelp" rows="4" v-model="content" required></textarea>
                </div>
                <button type="submit">Modifier votre message</button>
            </form>
            <p class="text-center">{{ response }}</p>
        </div>
        
        <div v-if="showComments===item.id">
            <div class="comments" v-if="comments.data.length > 0">
                <div class="my-3 p-3 bg-light rounded box-shadow" v-for="comment in comments.data" :key="comment">
                    <div class="media text-black text-left pt-3 mb-3">
                        <img :src="comment.user.avatar" alt="avatar" class="mr-2 rounded avatar">
                        <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                            <em><strong class="d-block text-gray-dark">{{ comment.user.email }}</strong></em>
                            {{ comment.content }}
                        </p>
                    </div>
                </div>
                <div class="my-3 p-3 bg-light rounded box-shadow">
                        <form id="formNewComment" class="formNewComment" @submit.prevent="sentNewComment(item.id)">
                            <div class="form-group">
                                <textarea class="form-control" id="createcomment" rows="4" v-model="newComment" required></textarea>
                            </div>
                            <button type="submit">Ecrire un nouveau commentaire</button>
                        </form>
                        <p class="text-center">{{ messageComment }}</p>
                </div>
            </div>
            <div v-else class="comments">
                <p class="small text-white">Pas de commentaire pour ce message</p>
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
                    showEditMessage: '',
                    content: '',
                    response: '',
                    comments: '',
                    newComment: '',
                    messageComment: ''
            }
        },
  computed: {
    ...mapState({
    token: 'token',
    userId: 'userId'
    })
  },
  methods: {
      hideComments(){
          this.showComments='';
      },
      getComments(messageId){
        this.showComments = messageId;
        axios.get('http://localhost:3000/api/comments/'+ messageId,{
            headers: {
                'Authorization': 'Bearer ' + this.token
                }
            })
        .then(response => this.comments = response)
        .catch(error => this.comments = error);
      },
      editMessage(messageId, content){
        this.showEditMessage = messageId;
        this.content = content;
      },
      sentEditMessage(messageId){
        axios.put('http://localhost:3000/api/messages/' + messageId, {
            content: this.content
        }, {
        headers: {
            'Authorization': 'Bearer ' + this.token
            }
        })
        .then(response => this.response = response.data.message)
        .catch(error => this.response = error);
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
        .then(response => this.messageComment = response)
        .catch(error => this.messageComment = error);
      }
  },
  mounted() {
      axios.get('http://localhost:3000/api/messages/',{
        headers: {
            'Authorization': 'Bearer ' + this.token
            }
        })
        .then(response => this.info = response)
        .catch(error => this.info = error);
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

.formEditMessage {
    max-width: 800px;
    margin: auto;
    padding: 40px;
    position: relative;
    background: #191919;
    text-align: center;
    transition: 0.25s;
}

.formNewComment {
    max-width: 500px;
    margin: left;
    position: relative;
    transition: 0.25s;
    text-align: left;
}

.formEditMessage button[type="submit"] {
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
    cursor: pointer;
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

.formEditMessage button[type="submit"]:hover, .formNewComment button[type="submit"]:hover {
    background: gray;
}

.formEditMessage textarea{
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

.formEditMessage textarea:focus {
    max-width: 750px;
    border-color: #2ecc71
}

.formNewComment textarea:focus {
    max-width: 550px;
    border-color: black
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
