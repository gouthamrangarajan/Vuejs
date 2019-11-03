import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    imgLen:0,
    imgModified:[],
    uploadPercent:0
  },
  mutations: {
    setImgLen(state,data){
      state.imgLen=data;
    },
    setImgModified(state,data){
      state.imgModified=data;      
    }
  },
  actions: {
    async refreshImgInfo({commit}){
      try{
        var resp=await axios.get('/imgs/total');        
        commit('setImgLen',resp.data);
        resp=await axios.get('/imgs/modified');             
        commit('setImgModified',resp.data);
      }
      catch(err){
        console.log(err);
      }
    },   
    async uploadImage({commit},data){
      try{
        var resp=await axios.post('/upload',data,{
          headers:{
            'Content-Type':'multipart/form-data'
          }
        });        
      }
      catch(err){
        console.log(err);
      }
    }
  },
  modules: {
  }
})
