<template>
<div>
    <!-- Formulaire d'ajout de commentaire -->
    <div v-if="showComments===messageId">
        <div class="comments my-3 p-3 bg-light rounded box-shadow">
            <form id="formNewComment" class="formNewComment" @submit.prevent="sentNewComment">
                <div class="form-group">
                    <textarea class="form-control" id="createcomment" rows="4" v-model="newComment" required></textarea>
                </div>
                <button type="submit">Ecrire un nouveau commentaire</button>
            </form>
        </div>
        <p class="text-left">{{ commentInfo }}</p>
        <!-- Liste des commentaires -->
        <div class="comments" v-if="comments.length > 0">
            <div class="my-3 p-3 bg-light rounded box-shadow" v-for="comment in comments" :key="comment">
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
                        <span class="plink" @click="deleteComment(comment.id)">Supprimer le commentaire</span>
                    </p>
                </small>
                <!-- Formulaire de modification de commentaire -->
                <div v-if="showEditComment===comment.id">
                    <div class="comments my-3 p-3 bg-light rounded box-shadow">
                        <form id="formNewComment" class="formNewComment" @submit.prevent="sentEditComment(comment.id)">
                            <div class="form-group">
                                <textarea class="form-control" id="editComment" rows="4" v-model="updateComment" required></textarea>
                            </div>
                            <button type="submit">Modifier le commentaire</button>
                        </form>
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
    name: 'DisplayComments',
    props: ['messageId', 'showComments'],
    data: function (){
        return {
                newComment: '',
                commentInfo: '',
                comments: '',
                showEditComment: '',
                updateComment: ''
        }
    },
    computed: {
        ...mapState({
        token: 'token',
        userId: 'userId'
        })
    },
    methods: {
        getComments() {
            axios.get('http://localhost:3000/api/comments/'+ this.messageId,{
                headers: {
                    'Authorization': 'Bearer ' + this.token
                    }
                })
            .then(response => {
                this.commentInfo = '';
                this.comments = response.data;
                })
            .catch(error => this.comments = error);
        },
        sentNewComment(){
        axios.post('http://localhost:3000/api/comments/'+ this.messageId,{
            content: this.newComment,
            userId: this.userId
        },{
            headers: {
                'Authorization': 'Bearer ' + this.token
                }
            })
        .then((response) => {
            this.newComment= '';
            this.getComments();
            this.commentInfo= response.data.message;
            })
        .catch(error => this.commentInfo = error);
      },
        editComment(commentId, content){
            this.showEditComment = commentId;
            this.updateComment = content;
            this.commentInfo = '';
      },
        sentEditComment(commentId){
            axios.put('http://localhost:3000/api/comments/' + commentId, {
                content: this.updateComment
            }, {
            headers: {
                'Authorization': 'Bearer ' + this.token
                }
            })
            .then(() => {
                this.showEditComment = '';
                this.getComments();
                })
            .catch(error => this.commentInfo = error.message);
        },
        deleteComment(commentId){
          axios.delete('http://localhost:3000/api/comments/'+ commentId,{
            headers: {
                'Authorization': 'Bearer ' + this.token
                }
            })
        .then(() => {
            // this.showComments = this.messageId;
            this.getComments();
            })
        .catch(error => this.commentInfo = error.message);
      }
    },
    mounted() {
        this.getComments();
    }
}
</script>

<style scoped lang="scss">
.avatar{
    width: 30px;
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