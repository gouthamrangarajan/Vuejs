import {data} from '../static/items.js'

export const state=()=>({
    items:data,
    srchTxt:''
})
export const getters={
    ftItems:state=>{
        let els= state.items.filter(el=>{
            if(state.srchTxt=='')
                return false
            else if(el.name.toLowerCase().indexOf(state.srchTxt.toLowerCase())>-1) {
                return true
            }
            else
             return false
        }).map(el=>el)
        return els.sort((a,b)=>{
            if(a.name>b.name)
              return 1
             else if(a.name<b.name)
               return -1
             else
               return 0
          }).slice(0,5)
    },
    stItems:state=>{
        let els=state.items.map(el=>el)
        return els.sort((a,b)=>{
            if(a.name>b.name)
              return 1
             else if(a.name<b.name)
               return -1
             else
               return 0
          })
    }
}
export const actions={
    setSrchTxt({commit},value){
        commit('SET_SRCH_TXT',value)
    }
}

export const mutations={
    SET_SRCH_TXT(state,value){
        state.srchTxt=value
    }
}
