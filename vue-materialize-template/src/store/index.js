import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme:'teal darken-1'
  },
  mutations: {
    SET_THEME(state,data){
      state.theme=data
    }
  },
  actions: {
    setTheme({commit},data){
      commit('SET_THEME',data)
    }
  },
  modules: {
  }
})
