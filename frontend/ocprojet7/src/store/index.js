import { createStore } from 'vuex'

export default createStore({
  state: {
    userId: '',
    isAdmin: '',
    // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU5OTk4NzMzNywiZXhwIjoxNjAwMDczNzM3fQ.cI8tEe6sPvfCJa2QmriZYhKAvvIyDyYeZ3jwk59zy3k',
    token: '',
    email: '',
    avatar: ''
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
