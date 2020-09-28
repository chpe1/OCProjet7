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
