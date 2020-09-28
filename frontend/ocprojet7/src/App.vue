<template>
  <div class="container-fluid">
    <router-view/>
  </div>
</template>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // border: 1px solid blue;
}


.logo{
  width: 200px;
}

.userAccount a {
  color: white;
}

.userAccount img{
  width: 100px;
}

.user img{
  width: 250px;
}

.plink{
    text-decoration: underline;
    cursor: pointer;
}

.plink:hover{
  color: #3498db;
}
</style>
