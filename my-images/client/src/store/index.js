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
  getters:{
    sortedImgModified(state){
      return state.imgModified.sort((a,b)=>{
        let aDt=new Date(a.modified);
        let bDt=new Date(b.modified);
        if(aDt>bDt){
          return 1;
        }
        else if(aDt<bDt){
          return -1;
        }
        else{
          return 0;
        }
      })
    }
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
      if(data.toString().indexOf("400") >-1 || 
       data.toString().indexOf("413")>-1)
      {
        data="Invalid file.";
      }
      else if(data.toString().indexOf("500") >-1)
     {
       data="Error removing image.";
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
    async deleteImg({commit},data){
      try{
        let resp=await axios.delete('/imgs/'+data);        
        commit('setNotificationMsg',resp.data);
        commit('setNotificationSuccess',true);                    
      }
      catch(err){
        commit('setNotificationMsg',err);
        commit('setNotificationSuccess',false);
      }
      commit('setNotificationDisplay',true); 
      setTimeout(() => {
        commit('setNotificationDisplay',false);
      }, 3000);  
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
      commit('setNotificationDisplay',false);
        setTimeout(() => {
          commit('setNotificationDisplay',true);
        }, 500);  
    },
    closeNotification({commit}){
      commit('setNotificationDisplay',false);
    }
  },
  modules: {
  }
})
