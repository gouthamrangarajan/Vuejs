import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Mode={
  OPEN:'Open',
  CLOSE:'Close'
}
export default new Vuex.Store({
  state: {
    theme:'teal darken-1',
    navigationDrawerMode:'Open'
  },
  mutations: {
    SET_THEME(state,data){
      state.theme=data
    },
    CLOSE_NAVIGATION_DRAWER(state){
      state.navigationDrawerMode=Mode.CLOSE
    },
    OPEN_NAVIGATION_DRAWER(state){
      state.navigationDrawerMode=Mode.OPEN
    }
  },
  actions: {
    setTheme({commit},data){
      commit('SET_THEME',data)
    },
    closeNavigationDrawer({commit}){
      commit('CLOSE_NAVIGATION_DRAWER')
    },
    openNavigationDrawer({commit}){
      commit('OPEN_NAVIGATION_DRAWER')
    },
  },
  modules: {
  }
})
