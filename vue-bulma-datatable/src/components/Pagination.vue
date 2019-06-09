<template>
    <nav class="pagination" role="navigation" aria-label="pagination">
  <a class="pagination-previous" @click="setPrevious" :disabled="value==1">Previous</a>
  <a class="pagination-next"  @click="setNext" :disabled="lastPage">Next page</a>
<transition-group name="fade" class="pagination-list" tag="ul" mode="out-in">
                      <li v-for="ls in pageList" :key="ls" class="show-pointer" @click="changeSeries(ls)" >
                        <a :class="{'pagination-link':true,'is-current':ls==value}" 
                            v-if="!isNaN(ls)" @click.stop="$emit('input',ls)">{{ls}}</a>
                         <span class="pagination-ellipsis" v-else>&hellip;</span>
                    </li>
                </transition-group>
</nav>
</template>
<script>
import { constants } from 'crypto';
export default {
    name:'Pagination',
    data(){
        return {series:1,seriesLen:5};
    },
    props:{
        info:{
            type:Object,
            required:true
        },
        value:{
            type:Number,
            required:true
        }
    },
    mounted(){
      
    },
    methods:{
        setPrevious(){
            if(this.value==1){
                return;
            }
            else{
                this.$emit('input',this.value-1);
            }
        },
        setNext(){
            if(!this.lastPage){
                this.$emit('input',this.value+1);
            }
        },
       changeSeries(data){
          if(data=="nxtSeries"){
              this.series++;
          }
          else if(data=="prvSeries"){
              this.series--;
          }         
       }
    },
    watch:{
        info(newVal,oldVal){                        
            
        },
        value(newVal,oldVal){
            var ft=this.pageList.filter(el=>parseInt(el)==newVal);
            if(ft.length==0){
                var frst=this.pageList[0];
                if(frst=="prvSeries"){
                    frst=this.pageList[1];
                }
                var diff=this.value-parseInt(frst);                
                if(diff>0){
                    diff=Math.ceil(diff/this.seriesLen);
                   this.series=this.series+diff;
                }
                else{
                     diff=Math.ceil(-diff/this.seriesLen);
                     this.series=this.series-diff;
                }
            }
        }
    },
    computed:{
        pageList(){
          var ret=[];
          var ttl=parseInt(this.info.total);
          var len=parseInt(this.info.len);
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
            if((this.value*this.info.len)>=this.info.total){
                  return true;
              }
              else{
                  return false;
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
