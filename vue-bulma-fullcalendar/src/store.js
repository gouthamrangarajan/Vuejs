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
    }
  },
  actions: {
    addEvent(state,event){
      state.commit('addEvent',event);
    },
    deleteEvent(state,event){
      state.commit('deleteEvent',event);
    }
  }
})
