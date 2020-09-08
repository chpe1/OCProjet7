<template>
  <div class="comments">
      <!-- <p>{{ info }}</p> -->
    <div class="my-3 p-3 bg-dark rounded box-shadow" v-for="item in info.data" :key="item">
        <p class="text-left"><em>{{ item.user.email }}</em></p>
        <p class="text-left">{{ item.content }}</p>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Comments',
  props: {
      messageId: {
          type: Number,
          required: true
      }
  },
  data: function() {
            return {
                    info: '',
                    token: this.$store.getters.getToken
            }
        },
  mounted() {
      axios.get('http://localhost:3000/api/comments/'+ this.messageId,{
        headers: {
            'Authorization': 'Bearer ' + this.$store.getters.getToken
            }
        })
        .then(response => this.info = response)
        .catch(error => this.info = error);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.comments {
    margin-top: 10px;
    color: white;
    max-width: 600px;
}

.card-body{
    background: rgb(144, 143, 143);
    color: white;
    border-bottom: 1px solid black;
}

</style>
