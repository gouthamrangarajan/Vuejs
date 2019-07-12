import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt from 'jsonwebtoken'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    apiUrl:'https://localhost:44328/api/jwt/'/*RG change it accordingly*/,
    apiError:false,
    screens:[],
    userName:''
  },
  mutations: {
    initialiseStore(state){
      var tk=localStorage.getItem('token');      
      if(tk && tk!=null && tk!=undefined){
        state.token=tk;
        state.screens.splice(0);
        var decode=jwt.decode(tk);   
        if(decode['exp']){
          var dt=new Date(decode['exp']*1000);   
          if(dt<new Date()){
            console.log('expired token');
            localStorage.clear();
          }
          else{
            if(decode['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata']){
              decode['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata'].split(',').forEach(el=>{
                state.screens.push(el);
              });
            }
            if(decode['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']){
              state.userName=decode['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
            }
         }
        }      
      }
    },
    setToken(state,token){
      state.token=token;
      state.screens.splice(0);
      var decode=jwt.decode(token);
      if(decode['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata']){
        decode['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata'].split(',').forEach(el=>{
         state.screens.push(el);
        });
      }
      if(decode['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']){
        state.userName=decode['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      }
    },
    resetApiError(state){
      state.apiError=false;
    },
    setApiError(state){
      state.apiError=true;
    },
    clearToken(state){
      state.screens.splice(0);
      state.token='';
      localStorage.clear();
    }
  },
  actions: {
    /*RG can be moved to separate file  for api calls*/
    registerUser(context,user){
      context.commit('resetApiError');
      console.log(user);
      axios.post(context.state.apiUrl+'submit',user).then(resp=>{        
        if(resp.data.trim().toLowerCase()!="failure"){
          localStorage.setItem('token',resp.data);        
          context.commit('setToken',resp.data);  
        }
        else{
          console.log(resp.data);
          context.commit('setApiError');
        }
      }).catch(err=>{
        console.log(err);
        context.commit('setApiError');
      });
    },
    clearToken({commit}){
      commit('clearToken');
    }
  }
})
