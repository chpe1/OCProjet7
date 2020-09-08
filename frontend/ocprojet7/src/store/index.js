import { createStore } from 'vuex'

export default createStore({
  state: {
    userId: 2,
    isAdmin: '1',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU5OTU4ODc0MiwiZXhwIjoxNTk5Njc1MTQyfQ.gZyMtjXemPJvIW0paCAC2NsAYqS1gp9SgaYUFeRporE',
    email: 'celine@test.com',
    avatar: 'http://localhost:3000/images/avatar_default.png'
  },
  getters: {
    getIsAdmin: state => {
      return `${state.isAdmin}`
    },
    getToken: state => {
      return `${state.token}`
    },
    getEmail: state => {
      return `${state.email}`
    },
    getUserId: state => {
      return `${state.userId}`
    },
    getAvatar: state => {
      return `${state.avatar}`
    }
  },
  mutations: {
    SETTOKEN(state, token){
      state.token = token
    },
    SETADMIN(state, isAdmin){
      state.isAdmin = isAdmin
    },
    SETEMAIL(state, email){
      state.email = email
    },
    SETUSERID(state, userId){
      state.userId = userId
    },
    SETAVATAR(state, avatar){
      state.avatar = avatar
    }
  },
  actions: {
  },
  modules: {
  }
})
