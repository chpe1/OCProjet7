<template>
  <div class="message">
    <form id="formMessage" class="formMessage" @submit.prevent="sentMessage">
        <h3 class="text-center">Ajouter un message :</h3>
        <div class="form-group">
            <textarea class="form-control" id="message" aria-describedby="messageHelp" rows="4" placeholder="Entrez votre message" v-model="content" required></textarea>
        </div>
        <button type="submit">Envoyer votre message</button>
    </form>
        <p>{{ info }}</p>
        <DisplayMessages />
  </div>
</template>

<script>

import axios from 'axios'
import { mapState } from 'vuex';
import DisplayMessages from '@/components/DisplayMessages.vue'

export default {
  name: 'FormMessage',
  data: function() {
            return {
                    info: '',
                    title: '',
                    content: '',
            }
        },
  components: {
      DisplayMessages
  },
  computed: {
      ...mapState({
          email: 'email'
      })
  },
  methods: {
    sentMessage() {
        axios.post('http://localhost:3000/api/messages',{
          'title': this.title,
          'content': this.content,
          'userId' : localStorage.getItem('userId')
        },{
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        })
        .then(() => this.info = 'Message bien envoyé !')
        .catch(error => this.info = error);
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.message {
    margin: auto;
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

.formMessage input[type="text"] {
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

.formMessage input[type="text"]:focus
{
    max-width: 750px;
    border-color: #2ecc71
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
</style>
