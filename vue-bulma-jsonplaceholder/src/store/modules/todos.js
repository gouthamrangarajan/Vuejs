//simple vuex module
//calls api 
//stores all frond end todos data
import api from '../../api/todos'
  const  state={       
       data:[],       
  }
  const mutations= {
      setData(state,result){
          state.data.splice(0);
          state.data=result;          
      }
  }
  const actions= {    
    refresh({commit}){
        api.getAll(result=>{
            commit('setData',result);
        });
    }
  }
  const getters={
     dataLength:state=>{
         return state.data.length;
     }
   }


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}