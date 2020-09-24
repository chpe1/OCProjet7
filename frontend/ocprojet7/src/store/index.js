import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    userId: '',
    isAdmin: '',
    token: '',
    email: '',
    avatar: ''
  },
  plugins: [createPersistedState()],
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
