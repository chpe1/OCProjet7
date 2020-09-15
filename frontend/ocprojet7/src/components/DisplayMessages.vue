<template>
<div>
    <div class="my-3 p-3 bg-dark rounded box-shadow" v-for="item in info.data" :key="item">
        <div class="media text-white text-left pt-3 mb-3">
            <img :src="item.user.avatar" alt="" class="mr-2 rounded avatar">
            <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <strong class="d-block text-gray-dark">{{ item.user.email }}</strong>
            {{ item.content }} </p>
        </div>
        <small class="text-right text-info">
            <p class="plink" @click="getComments()">{{ textButton }}</p>
        </small>
        
        <div v-show="showComments">
            <Comments :messageId = item.id></Comments>
        </div>
    </div>
</div>

</template>

<script>

import axios from 'axios'
import Comments from '@/components/Comments.vue'
import { mapState } from 'vuex'

export default {
  name: 'DisplayMessages',
  data: function() {
            return {
                    info: '',
                    showComments: false,
                    textButton: 'Voir les commentaires'
            }
        },
  components: {
      Comments
  },
  computed: {
    ...mapState({
    token: 'token'
    })
  },
  methods: {
      changeTextButton(){
          if (this.showComments){
              return this.textButton = 'Cacher les commentaires'
          }
          else
          {
              return this.textButton = 'Voir les commentaires'
          }
      },
      getComments(){
          this.showComments = !this.showComments;
          this.changeTextButton();          
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

</style>
