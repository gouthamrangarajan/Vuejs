import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    information:[
                {id:1,raw:'Information1',html:'<p>Information1</p>',dirtyHtml:'<p>Information1</p>'
                  ,edit:false,dock:false,dt:new Date()},
                {id:2,raw:'Information2New Line Information',html:'<p>Information2<br/>New&nbsp;line&nbsp;information</p>'
                  ,dirtyHtml:'<p>Information2<br/>New&nbsp;line&nbsp;information</p>'
                  ,edit:false,dock:false,dt:new Date()},
                {id:3,raw:'Information3',html:'<p>Information3</p>',dirtyHtml:'<p>Information3</p>'
                  ,edit:false,dock:false,dt:new Date()},      
                {id:4,raw:'Information4',html:'<p>Information4</p>',dirtyHtml:'<p>Information4</p>'
                  ,edit:false,dock:false,dt:new Date()},                           
              ],
    nextInfoId:5,
    curMode:'',
    modalOpened:false
  },
  getters:{
    editableInfo(state){
      return state.information.filter(el=>el.edit)[0]
    },
    dockableInfo(state){
      return state.information.filter(el=>el.dock).sort((a,b)=>{
        if(a.dt>b.dt)
          return 1
        else if(b.dt>a.dt)
          return -1
        else
          return 0
      })
    }
  },
  mutations: {
    ADD_INFO(state){
      state.information.push({id:state.nextInfoId,edit:true,dock:false,raw:'',html:'<p></p>',dirtyHtml:'<p></p>',dt:new Date()})
      state.nextInfoId++
      state.curMode='Add'
      state.modalOpened=true
    },
    SAVE_INFO(state,data){
      let dt=state.information.filter(el=>el.id==data.id)[0]
      dt.raw=data.raw
      dt.html=data.html
      dt.dirtyHtml=data.dirtyHtml
      dt.edit=false
      dt.dock=false
      state.modalOpened=false
    },
    SET_DIRTY_INFO(state,data){
      let dt=state.information.filter(el=>el.id==data.id)[0]      
      dt.dirtyHtml=data.dirtyHtml      
    },
    CLEAR_EDIT(state){
      state.information.forEach(el=>el.edit=false)
    },
    REMOVE_EDIT(state,id){
      let dt=state.information.filter(el=>el.id==id)[0]          
      dt.edit=false
      dt.dock=false
      state.modalOpened=false
    },
    REMOVE_DOCK(state,id){
      let dt=state.information.filter(el=>el.id==id)[0]            
      dt.dock=false      
    },
    START_EDIT(state,id){      
      let dt=state.information.filter(el=>el.id==id)[0]      
      dt.edit=true
      dt.dt=new Date()
      state.curMode='Edit'
      state.modalOpened=true
      state.dock=false
    },
    DOCK_INFO(state,id){
      let dt=state.information.filter(el=>el.id==id)[0]      
      dt.dock=true
      state.modalOpened=false
    },
    SET_MODE(state,data){
      state.curMode=data;
    }
  },
  actions: {
    saveInfo({commit},data){
      commit('SAVE_INFO',data)
    },
    setDirtyInfo({commit},data){
      commit('SET_DIRTY_INFO',data)
    },
    removeEdit({commit},data){
      commit('REMOVE_EDIT',data)
    },
    removeDock({commit},data){
      commit('REMOVE_DOCK',data)
    },
    startEdit({commit},data){
      commit('CLEAR_EDIT')
      commit('START_EDIT',data)
    },
    dockInfo({commit},data){
      commit('DOCK_INFO',data)
    },
    addInfo({commit}){
      commit('CLEAR_EDIT')
      commit('ADD_INFO')
    },
    setMode({commit},data){
      commit('SET_MODE',data)
    }
  },
  modules: {
  }
})
