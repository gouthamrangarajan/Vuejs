<template>
    <nav class="pagination" role="navigation" aria-label="pagination">
  <a class="pagination-previous" @click="setPrevious" :disabled="currPage==1">Previous</a>
  <a class="pagination-next"  @click="setNext" :disabled="lastPage">Next page</a>
<transition-group name="fade" class="pagination-list" tag="ul" mode="out-in">
                      <li v-for="ls in pageList" :key="ls" class="show-pointer" @click="changeSeries(ls)" >
                        <a :class="{'pagination-link':true,'is-current':ls==currPage}" 
                            v-if="!isNaN(ls)" @click.stop="changePage(ls)">{{ls}}</a>
                         <span class="pagination-ellipsis" v-else>&hellip;</span>
                    </li>
                </transition-group>
</nav>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name:'Pagination',
    data(){
        return {series:1,seriesLen:5};
    },
    
    mounted(){
      
    },
    methods:{
        setPrevious(){
            var prevPage=parseInt(this.currPage)-1;
            if(prevPage<1){
                return;
            }
            else{
                this.$store.dispatch('employees/getPageData',prevPage);
            }
        },
        setNext(){
            var nextPage=parseInt(this.currPage)+1;
            
            if(!this.lastPage){
                this.$store.dispatch('employees/getPageData',nextPage);
            }
        },
       changeSeries(data){
          if(data=="nxtSeries"){
              this.series++;
          }
          else if(data=="prvSeries"){
              this.series--;
          }         
       },
       changePage(pgNum){
           this.$store.dispatch('employees/getPageData',pgNum);
       }
    },
   
    computed:{
        ...mapState({
            totalLength:state=>state.employees.totalLength,
            pageLength:state=>state.employees.pageLength,
            currPage:state=>state.employees.page
        }),
        pageList(){
          var currPage=this.currPage;
          var totalLen=this.totalLength;
          var ret=[];
          var ttl=parseInt(totalLen);          
          var len=parseInt(this.pageLength);
          var pages=Math.ceil(ttl/len);
          var ind=1;    
          var startNum=((this.series-1)*this.seriesLen)+1;
          if(startNum>1){
              ret.push("prvSeries");
          }
          
          for(var i=startNum;i<=pages;i++){
             if(ind>this.seriesLen){
                  ret.push("nxtSeries");
                  break;
              }
              ret.push(i);            
              ind++;
          }
          return ret;          
        },  
         lastPage(){                                 
             var currPage=this.currPage;
             var totalLen=this.totalLength;
             var len=parseInt(this.pageLength);
            if((currPage*len)>=totalLen){
                  return true;
              }
              else{
                  return false;
              }
        }
    },
    watch:{
        currPage(newVal,oldVal){
            var serMaxLen=this.series*5*this.pageLength;            
            var pgMaxLen=newVal*this.pageLength;
            if(pgMaxLen>serMaxLen){
                this.series++;
            }
            var pageMinLen=(newVal*this.pageLength)-this.pageLength;
            var serMinLen=(this.series-1)*5*this.pageLength;
            if(serMinLen<1)
                serMinLen=1;
            while(pageMinLen<serMinLen && this.series>1){
                pageMinLen=(newVal*this.pageLength)-this.pageLength;
                serMinLen=(this.series-1)*5*this.pageLength;
                if(serMinLen<1)
                    serMinLen=1;
                    this.series--;
                }
        }
    }
}
</script>
<style scoped>
.show-pointer{
    cursor: pointer;
}
</style>
