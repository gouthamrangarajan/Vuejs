import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    imgLen:0,
    imgModified:[],
    uploadPercent:0,
    showNotification:false,
    notificationMsg:'',
    isNotificationSuccess:true
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
    },
    setNotificationDisplay(state,data){
      state.showNotification=data;
    },
    setNotificationMsg(state,data){
      if(data.toString().indexOf("400")>-1){
        data="Invalid file.";
      }
      state.notificationMsg=data;
    },
    setNotificationSuccess(state,data){
      state.isNotificationSuccess=data;
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
              
        commit('setNotificationMsg',resp.data);
        commit('setNotificationSuccess',true);
      }
      catch(err){
        console.log(err);        
        commit('setNotificationMsg',err);
        commit('setNotificationSuccess',false);
      }
      commit('setNotificationDisplay',true);
        setTimeout(() => {
          commit('setNotificationDisplay',false);
        }, 3000);  
    },
    closeNotification({commit}){
      commit('setNotificationDisplay',false);
    }
  },
  modules: {
  }
})
