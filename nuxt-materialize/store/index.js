export const  state=()=>({
  searchTxt:'',
})

export const mutations={
  setSearchTxt(state,value){
    state.searchTxt=value;
  }
}
export const actions={
  search({commit},text){
    commit('setSearchTxt',text);
  }
}
