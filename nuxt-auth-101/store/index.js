import axios from  'axios'

export const  state=()=>({
  searchTxt:'',
  users:[]
})
export const getters={
  srchedUsers(state){
    return state.users.filter(el=>{
      let srchTxt=state.searchTxt.trim().toLowerCase()
      if(srchTxt=='')
        return true
      else if(el.name.trim().toLowerCase().indexOf(srchTxt)>-1
        ||el.email.trim().toLowerCase().indexOf(srchTxt)>-1
      )
       return true
      return false
    })
  }
}
export const mutations={
  setSearchTxt(state,value){
    state.searchTxt=value;
  },
  setUsers(state,data){
    state.users.splice(0);
    data.forEach(el=>state.users.push(el));
  }
}
export const actions={
  search({commit},text){
    commit('setSearchTxt',text);
  },
  refreshUsers({commit}){
    if(localStorage){
      let bearer_token=localStorage.getItem('auth._token.local')
      axios.get('/api/users/all',{headers:{Authorization:bearer_token}}).then(response=>{
        commit('setUsers',response.data);
      })
   }
  },
  registerUser({commit},data){
    if(localStorage){
      let bearer_token=localStorage.getItem('auth._token.local')
      axios.post('/api/users/register',data.record,{headers:{Authorization:bearer_token}}).then(response=>{
        data.fn(response.data.msg)
      }).catch(err=>{
        data.fn(err.response.data.msg)
      })
   }
  },
  changePassword({commit},data){
    if(localStorage){
      let bearer_token=localStorage.getItem('auth._token.local')
      axios.post('/api/users/password/change',data.record,{headers:{Authorization:bearer_token}}).then(response=>{
        data.fn(response.data.msg)
      }).catch(err=>{
        data.fn(err.response.data.msg)
      })
   }
  }
}
