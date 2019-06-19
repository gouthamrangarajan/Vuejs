import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    events:[
    {id:1,date:new Date(),name:'Test Event',fullDay:true,color:'is-warning'},
    {id:2,date:new Date(),name:'Test Event',fullDay:true,color:'is-success'},    
    {id:3,date:new Date(),name:'Test Event',fullDay:true,color:'is-danger'}
    ],
    maxEventId:4
  },
  getters:{
    filterEvents:(state)=>(date,month,year)=>{
      return state.events.filter(elem=>{
      return elem.date.getDate()==date && elem.date.getMonth()==month 
        &&elem.date.getFullYear()==year;
      });
    },
    findEvent:(state)=>(id)=>{            
      return state.events.find(el=>el.id==id);
    }
  },
  mutations: {
    addEvent(state,event){
      state.events.push({id:state.maxEventId,date:event.date,name:event.name,color:event.color});
      state.maxEventId++;
    },
    deleteEvent(state,event){
      var ind=state.events.findIndex(el=>el.id==event.id);
      state.events.splice(ind,1);
    },
    updateEvent(state,event){
      var dt=state.events.find(el=>el.id==event.id);
      dt.name=event.name;
      dt.color=event.color;
    }
  },
  actions: {
    addEvent({commit},event){
      commit('addEvent',event);
    },
    deleteEvent({commit},event){
       commit('deleteEvent',event);
    },
    updateEvent({commit},event){
       commit('updateEvent',event);
    }
  }
})
