export const state=()=>({
    current:'guest'
})

export const mutations={
  SET(state,data){
    state.current=data
  }
}

export const actions={
  set({commit},data){
    commit('SET',data)
  }
}
