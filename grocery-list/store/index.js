export const state=()=>({
  items:[],
  maxId:1
})

export const getters={
  toBuyItems:state=>{
    let els=state.items.filter(el=>el.status=='To Buy').map(el=>el)
    return els.sort((a,b)=>{
      if(a.name.toLowerCase()>b.name.toLowerCase())
         return 1
      else if(a.name.toLowerCase()<b.name.toLowerCase())
          return -1
      else
          return 0
    })
  },
  boughtItems:state=>{
    let els=state.items.filter(el=>el.status=='Bought').map(el=>el)
    return els.sort((a,b)=>{
      if(a.name.toLowerCase()>b.name.toLowerCase())
         return 1
      else if(a.name.toLowerCase()<b.name.toLowerCase())
          return -1
      else
          return 0
    })
  }
}

export const actions={
  addItem({commit},info){
    commit('ADD_ITEM',info.data)
    if(info.successFn)
      info.successFn()
  },
  updateItemStatus({commit},info){
    commit('UPDATE_ITEM_STATUS',info.data)
    if(info.successFn)
      info.successFn()
  },
  updateItemCount({commit},info){
    commit('UPDATE_ITEM_COUNT',info.data)
    if(info.successFn)
      info.successFn()
  },
  initialize({commit}){
    let dt=localStorage.getItem('data')
    if(dt){
      JSON.parse(dt).items.forEach(el=>{
        commit('ADD_ITEM',el)
      })
    }
  },
  clearData({commit}){
    saveLclStorage({items:[]})
    commit('CLEAR_DATA')
  }
}
function saveLclStorage(dt){
  localStorage.setItem('data',JSON.stringify(dt))
}
export const mutations={
  CLEAR_DATA(state){
    state.items.splice(0)
    state.maxId=1
  },
  ADD_ITEM(state,data){
    let fl=state.items.filter(el=>el.name.toLowerCase()==data.name.toLowerCase() && el.status==data.status)
    if(fl.length>0){
      fl[0].count+=data.count
    }
    else{
      state.items.push({
        id:state.maxId,
        name:data.name,
        count:data.count,
        status:data.status
      })
      state.maxId++
    }
    saveLclStorage({items:state.items})
  },
  UPDATE_ITEM_STATUS(state,data){
    let actEl= state.items.filter(el=>el.id==data.id)[0]
    actEl.status=data.status
    let fl=state.items.filter(el=>el.id!=actEl.id && el.name.toLowerCase()==actEl.name.toLowerCase()
      && el.status==actEl.status)
    if(fl.length>0){
      fl[0].count+=actEl.count
      let ind=state.items.findIndex(el=>el.id==actEl.id)
      state.items.splice(ind,1)
    }
    saveLclStorage({items:state.items})
  },
  UPDATE_ITEM_COUNT(state,data){
    state.items.filter(el=>el.id==data.id)[0].count=data.count
    saveLclStorage({items:state.items})
  }
}
