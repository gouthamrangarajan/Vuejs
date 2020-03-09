//simple vuex module
//calls api
//stores all frond end albums data
import api from '@/api/albums'
  export const state=()=>({
       data:[],
  })
 export const mutations= {
      setData(state,result){
          state.data.splice(0);
          state.data=result;
      }
  }
export const actions= {
    refresh({commit}){
        api.getAll(result=>{
            commit('setData',result);
        });
    }
  }
  export const getters={
     dataLength:state=>{
         return state.data.length;
     }
   }


