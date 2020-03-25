<template>
<div class="container">
  <transition name="fade">
      <template v-if="users.length==0">
       <div class="valign-wrapper center-align" style="height:85%;width:100%;margin-left:50%">
                <div class="preloader-wrapper active">
                    <div class="spinner-layer spinner-red-only">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                        <div class="circle"></div>
                    </div><div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                    </div>
                </div>
            </div>
      </template>
    </transition>
  <div class="row">
    <pagination :info="paginationData" id="users_pagination_1" @changeLen="pageInfo.pageLen=$event;pageInfo.currPage=1"
            @decrease="decreasePage" @increase="increasePage">
    </pagination>
    <transition-group name="records" tag="ul" class="collection  mt-reduce-one z-depth-5">
      <user-collection-item v-for="usr in pgedUsers" :key="usr.id" :user="usr">
      </user-collection-item>
    </transition-group>
  </div>
</div>
</template>
<script>
import {mapState} from 'vuex'
import pagination from '@/components/Pagination.vue'
import userCollectionItem from '@/components/UserCollectionItem.vue'
export default {
  transition:'scale',
  head(){
      return{
        title:'Nuxt Materialize',
        meta:[
            {'hid':'description',
            'name':'description',
            'content':'nuxt materialize jsonplaceholder users'}
        ]
      }
  },
  components:{
      pagination,userCollectionItem
  },
  data(){
      return {pageInfo:{currPage:1,totalPages:0,pageLen:5}}
    },
  mounted(){

    },
  destroyed(){

  },
  computed:{
    ...mapState({
        users:state=>state.users.data,
        ftTxt:state=>state.searchTxt
    }),
    ftUsers(){
        if(this.ftTxt!=''){
            return this.users.filter(el=>{
                var ret=false;
                Object.keys(el).forEach(ky=>{
                    if(ky!="address"){
                        if(el[ky]!=null && el[ky].toString().toLowerCase().includes(this.ftTxt.toLowerCase())
                            && !ret){
                            ret=true;
                        }
                    }
                    else{
                        Object.keys(el.address).forEach(ky=>{
                              if(el.address[ky]!=null && el.address[ky].toString().toLowerCase().includes(this.ftTxt.toLowerCase())
                                && !ret){
                                    ret=true;
                                }
                        });
                    }
                });
                return ret;
            });
        }
        return this.users;
    },
    pgedUsers(){
      let endInd=(this.pageInfo.currPage*this.pageInfo.pageLen)
      return this.ftUsers.slice(endInd-this.pageInfo.pageLen,endInd)
    },
    paginationData(){
      var display=this.pgedUsers.length>0;
      var end=(this.pageInfo.currPage*this.pageInfo.pageLen);
      var start=end-this.pageInfo.pageLen;
      if(end>this.ftUsers.length){
          end=this.ftUsers.length;
      }
      var fromTo= (start+1)+'-'+end;
      return {
          fromTo,
          isFirstPage:this.pageInfo.currPage==1,
          isLastPage: this.pageInfo.currPage*this.pageInfo.pageLen >= this.ftUsers.length,
          length:this.pageInfo.pageLen,
          display,
          pgLenList:[5,10,15,20],
          total:this.ftUsers.length
      };
    }
  },
  methods:{
    increasePage(){
      var isLastPage= this.pageInfo.currPage*this.pageInfo.pageLen >= this.ftUsers.length;
      if(isLastPage==true){
          return;
      }
      this.pageInfo.currPage++;
    },
    decreasePage(){
      if(this.pageInfo.currPage==1){
          return;
      }
      this.pageInfo.currPage--;
    },
    resetPage(){
      this.pageInfo.currPage=1
    },
  },
  watch:{
      ftUsers:'resetPage',
  }
}
</script>
