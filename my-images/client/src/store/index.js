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
    },
    setUploadPercent(state,data){
      state.uploadPercent=data;
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
          },
          onUploadProgress:ev=>{
            commit('setUploadPercent',Math.round((ev.loaded*100)/ev.total));
            if(ev.total==ev.loaded){
              setTimeout(()=>{commit('setUploadPercent',0);},1000);
            }
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
