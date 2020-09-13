<template>
  <div class="getusers">
    <div class="row">
      <div class="col-12">
        <!-- <form id="formGetUsers" class="formGetUsers" @submit.prevent="getAllUsers">
            <select name="user" id="userSelect">
                <option name=""></option>
            </select>
            <button type="submit">Sélectionner l'utilisateur</button>
        </form> -->
        <p class="plink text-center" @click="getAllUsers">Afficher tous les utilisateurs</p>
        <table class="table table-striped">
            <thead>
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
                <tr v-for="item in info" :key="item">
                    <th scope="row">{{ item.id }}</th>
                    <td>{{ item.email }}</td>
                    <td>{{ item.avatar }}</td>
                    <td>{{ item.isAdmin }}</td>
                    <td>{{ item.createdAt }}</td>
                    <td>{{ item.updatedAt }}</td>
                </tr>
            </tbody>
        </table>
      </div>
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
            info: '',
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
      .then((response) => this.info = response.data)
      .catch(error => this.info = error);
    }
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

/* .formUpdateUser {
    max-width: 500px;
    margin: auto;
    padding: 40px;
    position: relative;
    background: #191919;
    text-align: center;
    transition: 0.25s;
}

.formUpdateUser input[type="password"] {
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #3498db;
    padding: 10px 10px;
    outline: none;
    max-width: 250px;
    color: white;
    border-radius: 24px;
    transition: 0.25s
}

.formUpdateUser input[type="password"]:focus {
    max-width: 300px;
    border-color: #2ecc71
}

.formUpdateUser button[type="submit"] {
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

.formUpdateUser input[type="file"] {
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #3498db;
    padding: 10px 10px;
    outline: none;
    max-width: 250px;
    color: white;
    border-radius: 24px;
    transition: 0.25s
}

.formUpdateUser button[type="submit"]:hover {
    background: #2ecc71
} */
</style>
