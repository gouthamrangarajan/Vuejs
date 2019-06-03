<template>
<transition name="fade" appear>
  <div>
  <input class="input" placeholder="Search..." v-model="ftText"/>
  <table class="table is-bordered is-striped  is-hoverable is-fullwidth">
  <thead>
    <tr class="is-selected">
      <th v-for="(hd,ind) in headers" :key="ind" @click="changeSortInfo(hd)">
        {{hd|tableHeader}}
        <span class="icon is-pulled-right">
            <transition name="fade" appear>
              <i class="fa fa-sort-asc icon-sort-asc" v-if="hd==sortInfo[0] && sortInfo[1]==0"/>
              <i class="fa fa-sort-desc icon-sort-desc" v-else-if="hd==sortInfo[0] && sortInfo[1]==1"/>
              <i class="fa fa-sort icon-sort" v-else/>
            </transition>
          </span>
        </th>      
    </tr>
  </thead>  
    <transition-group name="tbl" tag="tbody">
      <tr v-for="dt in sortedData" :key="dt.id">
        <td v-for="(hd,ind) in headers" :key="ind">{{dt[hd]|tableData}}</td> 
      </tr>
    </transition-group>  
  </table>
  </div>
  </transition>
 </template>
<script>
export default {
  name: 'DataTable',
  props: {
    msg: String
  },
  data(){
    return {sortInfo:[],ftText:''};
  },
  mounted(){
    if(this.headers.length>0)
    {
      this.sortInfo.push(this.headers[0]);
      this.sortInfo.push(0);
    }
  },
  methods:{
    changeSortInfo(val){      
      if(this.sortInfo[0]==val){        
        if(this.sortInfo[1]==0){            
            this.sortInfo.splice(1,1,1);
        }
          else
            this.sortInfo.splice(1,1,0);
      }
      else{
        this.sortInfo.splice(0);
        this.sortInfo.push(val);
        this.sortInfo.push(0);
      }
    }
  },
  computed:{
    headers(){
      if(this.$store.getters.tblData &&
         this.$store.getters.tblData.length==0)
        return [];
      var fDt=this.$store.getters.tblData[0];
      return Object.keys(fDt).filter(el=>el.toUpperCase()!="ID");
    },
    tblData(){
       if(this.$store.getters.tblData &&
         this.$store.getters.tblData.length==0)
        return [];
       else 
        return  this.$store.getters.tblData;
    },
    filteredData(){
      return this.tblData.filter(el=>{
        var valid=false;
         this.headers.forEach(hd=>{
           if(this.ftText.trim()=="")
             {
               valid=true;
             }           
           else if(el[hd] && el[hd]!=null && 
             el[hd].toString().toLowerCase().indexOf(this.ftText.trim().toLowerCase())>-1){
             valid=true;
           }
         });
        return valid;
      });
    },
    sortedData(){
      return this.filteredData.sort((a,b)=>{
        var sortOrder=this.sortInfo[1];
        var sortCol=this.sortInfo[0];
        if(sortOrder==0 && a[sortCol]>b[sortCol])
         return 1;
        else if(sortOrder==0 && a[sortCol]<b[sortCol])
          return -1;
        else if(sortOrder==1 && a[sortCol]>b[sortCol])
         return -1;
        else if(sortOrder==1 && a[sortCol]<b[sortCol])
          return 1;
        else
          return 0;
      });
    }
  },
  filters:{
    tableHeader(val){       
      var val1=val.substring(1).replace(/([A-Z])/g, " $1");      
      return val.substring(0,1).toUpperCase()+val1;
    },
    tableData(val){
      return val;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-enter-active,.fade-leave-active{
  transition:opacity 0.5s;
}
.fade-enter,.fade-leave-to{
  opacity: 0;
}
th{
  cursor: pointer;
}
.icon-sort{
  opacity: 0.6;
}
.tbl-move{
  transition: all 0.5s;
}
.tbl-enter-active,.tbl-leave-active{
 transition: all 0.5s;
}
.tbl-enter,.tbl-leave-to{
  opacity: 0;
  transform: translateX(1rem);
}
.input{
  width:60%;
}
</style>
