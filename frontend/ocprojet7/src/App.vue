<template>
  <div id="app" class="container">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/admin">Admin</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
if (localStorage.getItem('token')){
  // this.$store.commit('SETTOKEN', localStorage.getItem('token'));
  // this.$store.commit('SETADMIN', localStorage.getItem('isAdmmin'));
  // this.$store.commit('SETUSERID', localStorage.getItem('userId'));
  // this.$store.commit('SETEMAIL', localStorage.getItem('email'));
  
  // this.$store.state.token = localStorage.getItem('token');
  // this.$store.state.email = localStorage.getItem('email');
  // this.$store.state.userId = localStorage.getItem('userId');
  // this.$store.state.isAdmin = localStorage.getItem('isAdmin');
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // border: 1px solid blue;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: blue;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
