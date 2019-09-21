  import api from './../../api/employees'

  const  state={
       totalLength:0,
       data:[],
       page:0,
       pageLength:0,
       filterTxt:'',
       sortInfo:[0,0]
  }
  const mutations= {
    setData(state,data){
      state.data=data;      
    },
    setPage(state,data){
      state.page=data;
    },
    setTotal(state,data){
      state.totalLength=data;
    },
    setPageLength(state,data){
      state.pageLength=data;
    },
    setfilterTxt(state,data){
      state.filterTxt=data;     
    },
    setSortInfo(state,data){
      state.sortInfo.splice(0,1,data[0]);
      state.sortInfo.splice(1,1,data[1]);      
    }
  }
  const actions= {    
    getPageData({commit},page){ 
      var ftTxt=state.filterTxt;
      if(ftTxt=='')
        ftTxt=' ';     
      api.getPageData(ftTxt,page,state.sortInfo,result=>{
        commit('setData',result.employees);
        commit('setTotal',result.totalLength);      
        commit('setPage',result.page); 
        commit('setPageLength',result.pageLength) 
      });
    },
    setfilterTxt({commit},filterTxt){
      commit('setfilterTxt',filterTxt);
    },
    setSortInfo({commit},sortInfo){      
      commit('setSortInfo',sortInfo);      
    }
  }
  const getters={
    dispData:state=>{
      var data=[];
      state.data.forEach((el,ind)=>{        
        data.push({
            id:el[0].substring(0,2)+"_"+(ind+1+(state.page*10)),//RG just a random logic for uniqueness
            name:el[0],
            designation:el[1],
            location:el[2],
            extn:el[3],
            startDate:el[4],
            salary:el[5] 
        });
        
      });
      return data;
    }
  }


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}