import Vue from 'vue'
import Vuex from 'vuex'
import posts from './modules/posts'
import albums from './modules/albums'
import users from './modules/users'
import todos from './modules/todos'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    searchTxt:''
  },
  mutations:{
    setSearchTxt(state,value){
      state.searchTxt=value;
    }
  },
  actions:{
    search({commit},text){
      commit('setSearchTxt',text);
    }
  },
  modules:{
    posts,  
    albums,
    users,
    todos
  },  
})
