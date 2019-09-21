<template>
<transition name="fade" appear>
  <div class="fstDV">
    <tbl-filter/>
    <table class="table is-bordered is-striped  is-hoverable is-fullwidth">
    <thead>
      <tr class="is-selected">
        <th v-for="(hd,ind) in headers" :key="ind" @click="setSortField(ind)">
          {{hd|tableHeader}}     
           <span :class="{'icon is-pulled-right':true, 'lightOpac':ind!=sortInfo[0]}">               
                    <i class="fa fa-caret-up" v-show="ind!=sortInfo[0] || ind==sortInfo[0] && sortInfo[1]==0"></i>                                      
                     <i class="fa fa-caret-down setMargin" v-show="ind!=sortInfo[0] || ind==sortInfo[0] && sortInfo[1]==1"></i>                 
              </span> 
          </th>      
      </tr>
    </thead>  
      <transition-group name="tbl" tag="tbody">
        <tr v-for="dt in tblData" :key="dt.id">
          <td v-for="(hd,ind) in headers" :key="ind">{{dt[hd]}}</td> 
        </tr>
      </transition-group>  
      <tfoot>
        <tr>
          <td :colspan="headers.length">
            <pagination></pagination>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
  </transition>
 </template>
<script>
import pagination from './Pagination'
import tblFilter from './TblFilter'
import {mapState} from 'vuex'
export default {  
  name: 'DataTable',
  components:{pagination,tblFilter},  
  mounted(){    
        
  },
  methods:{
    setSortField(headerIndex) {
      var data=[];
      data.push(headerIndex);
        if (this.sortInfo[0] == headerIndex) {
            if (this.sortInfo[1] == 0) {                
               data.push(1);
            }
            else {
               data.push(0);
            }
        }
        else {        
            data.push(0);
        }
      this.$store.dispatch('employees/setSortInfo',data);
      this.$store.dispatch('employees/getPageData',this.currPage);
    },        
  },
  data(){
    return {ftText:''}
  },
  computed:{
    ...mapState({
      sortInfo:state=>state.employees.sortInfo,
      currPage:state=>state.employees.page
    }),
    headers(){
      if(this.$store.getters['employees/dispData'] &&
         this.$store.getters['employees/dispData'].length==0)
        return [];
      var fDt=this.$store.getters['employees/dispData'][0];
      return Object.keys(fDt).filter(el=>el.toUpperCase()!="ID");
    },
    tblData(){
       if(this.$store.getters['employees/dispData']&&
        this.$store.getters['employees/dispData'].length==0)
        return [];
       else 
        return  this.$store.getters['employees/dispData'];
    },   
  },
  filters:{
    tableHeader(val){       
      var val1=val.substring(1).replace(/([A-Z])/g, " $1");      
      return val.substring(0,1).toUpperCase()+val1;
    },    
  },
}
</script>
<style scoped>
th{
  cursor: pointer;
}
.icon-sort{
  opacity: 0.6;
}
.tbl-move{
  transition: all 0.5s;
}
.tbl-enter-active{
 transition: all 0.5s;
}
.tbl-enter,.tbl-leave-to{
  opacity: 0;
  transform: translateX(1rem);
}
table{
  margin-top:-0.8rem;
}
.fstDV{
   margin-top:0.8rem;
}
.setMargin{
    margin-top:0.9rem; 
    margin-left:-0.6rem;
}
.lightOpac{
    opacity: 0.8;
}
span.icon{
  
    margin-top:-0.2rem;
}
</style>
