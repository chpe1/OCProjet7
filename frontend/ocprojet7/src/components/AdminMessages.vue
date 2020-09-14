<template>
  <div class="getmessages">
    <div class="row">
      <div class="col-12">
        <table class="table table-striped">
            <thead>
                <tr>
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
                    <th scope="row" class="plink" @click="getAllComments(message.id)">{{ message.id }}</th>
                    <td>{{ message.content }}</td>
                    <td>{{ message.user.email }}</td>
                    <td>{{ message.like }}</td>
                    <td>{{ message.createdAt }}</td>
                    <td>{{ message.updatedAt }}</td>
                </tr>
            </tbody>
        </table>
        <div v-if="comments.length>0">
            <table class="table table-striped">
                <caption>Liste des commentaires liés à ce message</caption>
                <thead>
                    <tr>
                    <th scope="col">id du commentaire</th>
                    <th scope="col">Contenu</th>
                    <th scope="col">Auteur</th>
                    <th scope="col">Date de Création</th>
                    <th scope="col">Date de Modification</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="comment in comments" :key="comment">
                        <th scope="row">{{ comment.id }}</th>
                        <td>{{ comment.content }}</td>
                        <td>{{ comment.user.email }}</td>
                        <td>{{ comment.createdAt }}</td>
                        <td>{{ comment.updatedAt }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
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
            comments: ''
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
    }
  },
  beforeMount(){ 
    this.getAllmessages() 
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

.getmessages{
    width: 100%;
}

caption { 
  caption-side: top;
  text-align: center;
  color: white;
  font-size: 2em;
}

</style>
