<template>
    <div>    
        <pagination :info="paginationData" :id="paginationId" @changeLen="pageInfo.pageLen=$event;pageInfo.currPage=1"
            @decrease="decreasePage" @increase="increasePage"/>
        <nav class="white">
            <div class="nav-wrapper">
                <form>
                        <div class="input-field">
                        <input id="search" type="search" required v-model="ftText" placeholder="search...">
                        <label class="label-icon" for="search"><i class="material-icons black-text">search</i></label>
                        <i class="material-icons " @click="ftText=''">close</i>
                    </div>
                </form>
            </div>
        </nav>
        <div class="data-container">                      
            <table class="striped responsive-table">
                <thead>
                    <tr>
                        <th v-for="(head,ind) in tblHeaders" :key="head"  @click="changeSort(ind)"
                            :style="thStyle">
                            {{head}}
                            <transition name="fade">
                                <span class="right" v-if="sortInfo.column==ind">
                                    <sort :order="sortInfo.order">
                                    </sort>                    
                                </span>
                            </transition>
                        </th>
                    </tr>
                </thead>
                <transition-group name="records"  tag="tbody">
                    <tr v-for="dt in pgData" :key="dt[0]">
                        <td v-for="dtt in dt" :key="dtt" :style="thStyle">
                            {{dtt}}
                        </td>
                    </tr>
                </transition-group>
            </table> 
        </div>        
    </div>
</template>
<script>
import {mapState} from 'vuex'
import Sort from '@/components/Sort.vue'
import Pagination from '@/components/Pagination.vue'
export default {
    name:'Tbl',   
    components:{
        Sort,Pagination
    },
    data(){
        return {
            sortInfo:{column:0,order:'asc'},
            pageInfo:{currPage:1,pageLen:10},
            ftText:'',
            paginationId:'pagination_'+Math.floor(Math.random() * 100).toString()
        }
    },
    computed:{
        ...mapState(['tblData','tblHeaders','theme']),
        thTextStyle(){
            return this.theme.replace(/\s/g, '-text ').replace("darken-1","darken-4") 
        },
        thStyle(){
            let dt={}
            if(window.innerWidth>992){
                dt={width:'16%'}
            }
            return dt
        },
        ftData(){
            return this.tblData.filter(el=>{
                if(this.ftText=='')
                    return true
                else {
                    var ret=false
                    el.forEach(inel=>{
                        if(inel.toLowerCase()
                            .indexOf(this.ftText.toLowerCase())>-1){
                        ret=true;
                        }
                    })
                    return ret
                }           
            })
        },
        stData(){
            return this.ftData.sort((a,b)=>{
                if(this.sortInfo.order=='asc'){
                    if(a[this.sortInfo.column]>b[this.sortInfo.column])
                        return 1
                    else if(a[this.sortInfo.column]<b[this.sortInfo.column])
                        return -1
                    else
                        return 0
                }
                else{
                    if(a[this.sortInfo.column]>b[this.sortInfo.column])
                        return -1
                    else if(a[this.sortInfo.column]<b[this.sortInfo.column])
                        return 1
                    else
                        return 0
                }
            })
        },
        pgData(){
            let endInd=(this.pageInfo.currPage*this.pageInfo.pageLen)
            return this.stData.slice(endInd-this.pageInfo.pageLen,endInd)
        },
        paginationData(){
            var display=this.pgData.length>0;
            var end=(this.pageInfo.currPage*this.pageInfo.pageLen);
            var start=end-this.pageInfo.pageLen;
            if(end>this.ftData.length){
                end=this.ftData.length;
            }
            var fromTo= (start+1)+'-'+end;
            return {
                fromTo,
                isFirstPage:this.pageInfo.currPage==1,
                isLastPage:
                this.pageInfo.currPage*this.pageInfo.pageLen >= 
                        this.ftData.length,
                length:this.pageInfo.pageLen,
                display,
                pgLenList:[10,15,20,25,50],
                total:this.ftData.length
            }
        },
    },
    methods:{
        changeSort(col){
            if(this.sortInfo.column==col){
                if(this.sortInfo.order=='asc')
                this.sortInfo.order='desc'
                else
                this.sortInfo.order='asc'
            }
            else{
                this.sortInfo.column=col
                this.sortInfo.order='asc'
            }
        },
        increasePage(){
          var isLastPage= this.pageInfo.currPage*this.pageInfo.pageLen >= this.ftData.length;
          if(isLastPage==true){
              return;
          }
          this.pageInfo.currPage++
        },
        decreasePage(){
            if(this.pageInfo.currPage==1){
                return;
            }
            this.pageInfo.currPage--
        },
        resetPage(){
            this.pageInfo.currPage=1
        },
    }
}
</script>
<style scoped>
.records-move{
  transition:all 0.3s;
}
.records-enter-active{
  transition:all 0.3s;
}
.records-enter{
  transform:translateX(2px);
  opacity:0;
}
th{
    cursor: pointer;
}
.data-container{
    max-height: 25rem;
    overflow-y:scroll;
    overflow-x:hidden;
}
nav{
    height: 2.8rem;
    line-height: 2.8rem;
    margin-bottom: 0.2rem;
    margin-top:-1rem;
}
nav i{
    margin-top:-0.6rem
}
</style>