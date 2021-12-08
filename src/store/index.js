import Vue from 'vue'
import Vuex from 'vuex'
import login from './login'
import token from './token'
import message from './message'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login,
    message,
    token
  }
})
