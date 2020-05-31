export const state=()=>({
  srchTxt:'',
  currVideoId:'',
  dckVideoId:''
})

export const getters={
  ftLearnings:state=>{
    let dt=state.learnings.data
    let lclSrchTxt=state.srchTxt.toLowerCase()
      return dt.filter(el=>{
        let allow=false
        if(lclSrchTxt=='')
          allow=true
        if(!allow)
          if(el.title.toLowerCase().indexOf(lclSrchTxt)>-1)
            allow=true
        if(!allow && el.subtitle && el.subtitle.toLowerCase().indexOf(lclSrchTxt)>-1)
            allow=true
        if(!allow && el.url)
          if(el.url.toLowerCase().indexOf(lclSrchTxt)>-1)
            allow=true
        if(!allow){
          el.tags.forEach(tgEl=>{
             if(!allow && tgEl.toLowerCase().indexOf(lclSrchTxt)>-1)
               allow=true
          })
        }
        return allow
      })

  }
}
export const actions={
   setSrchTxt({commit},value){
     commit('SET_SRCH_TXT',value)
   },
   setCurrVideoId({commit},value){
     commit('SET_CURR_VIDEO_ID',value)
   },
   setDckVideoId({commit},value){
    commit('SET_DOCK_VIDEO_ID',value)
  }

}

export const mutations={
   SET_SRCH_TXT(state,value){
      state.srchTxt=value
   },
   SET_CURR_VIDEO_ID(state,value){
     state.currVideoId=value
   },
   SET_DOCK_VIDEO_ID(state,value){
    state.dckVideoId=value
  }
}
