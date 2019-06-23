import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme:'is-light',
  },
  mutations: {
    setTheme(state,value){
      state.theme=value;
    }
  },
  actions: {
    setTheme({commit},{value}){
      commit('setTheme',value);
    }
  }
})
