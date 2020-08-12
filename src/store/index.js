import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginInfo: {
      isLogin: false,
      user: null
    }
  },
  mutations: {
    doLogin(state,info){
      state.loginInfo.isLogin = true;
      state.loginInfo.user = info;
    },
    doLogout(state){
      state.loginInfo.isLogin = false;
      state.loginInfo.user = null;
    }
  },
  actions: {
  },
  modules: {
  }
})
