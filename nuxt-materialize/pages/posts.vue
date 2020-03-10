<template>
  <div class="container">
     <pagination :info="paginationData" id="posts_pagination_1" @changeLen="pageInfo.pageLen=$event;pageInfo.currPage=1"
            @decrease="decreasePage" @increase="increasePage">
      </pagination>
      <div class="z-depth-5 mt-reduce-one">
        <transition-group name="records" tag="ul" class="row  collapsible" v-show="pgedPosts.length>0">
          <li  v-for="pst in pgedPosts" :key="pst.id">
            <div class="collapsible-header blue-grey darken-1">
                  <span class="white-text"> {{pst.title}} </span>
                  <span class="badge yellow-text modal-trigger tooltipped" href="#post-user-modal"
                    @click="modalUserId=pst.user.id" data-position="right" data-tooltip="Show user info">
                    @{{pst.user.username}}
                  </span>
            </div>
            <div class="collapsible-body">
                {{pst.body}}
            </div>
          </li>
        </transition-group>
      </div>
      <div id="post-user-modal" class="modal bottom-sheet">
        <div class="modal-content container">
            <transition name="fade">
              <user-card :user="users.filter(el=>el.id==modalUserId)[0]" v-if="modalUserId!=-1"></user-card>
            </transition>
        </div>
        <div class="modal-footer">
          <a href="#  !" class="modal-close waves-effect waves-red btn-flat">Close</a>
         </div>
      </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import pagination from '@/components/Pagination.vue'
import userCard from '@/components/UserCard.vue'
export default {
    transition:'scale',
    head(){
      return{
        title:'Nuxt Materialize',
        meta:[
            {'hid':'description',
            'name':'description',
            'content':'nuxt materialize jsonplaceholder posts'}
        ]
      }
    },
    data(){
      return {pageInfo:{currPage:1,totalPages:0,pageLen:10},modalUserId:-1,unsubscribe:null}
    },
    components:{
      pagination,
      userCard
    },
    mounted(){
      this.unsubscribe=this.$store.subscribe((mutation)=>{
        if(mutation.type=='posts/setData'){
            this.initializeMaterialize()
          }
      })
      this.$store.dispatch('users/refresh')
      this.$store.dispatch('posts/refresh')
    },
    destroyed(){
      if(this.unsubscribe){
        this.unsubscribe();
      }
    },
    computed:{
        ...mapState({
            posts:state=>state.posts.data,
            users:state=>state.users.data,
            ftTxt:state=>state.searchTxt
        }),
        ftPosts(){
           var data= this.posts.map(el=>{
                var user=this.users.filter(usEl=>usEl.id==el.userId)[0];
                el.user=user;
                return el;
            }).filter(el=>{
                if(this.ftTxt!=''){
                    if( el.title.toLowerCase().includes(this.ftTxt.toLowerCase()) ||
                        el.body.toLowerCase().includes(this.ftTxt.toLowerCase()) ||
                        el.user.username.toLowerCase().includes(this.ftTxt.toLowerCase())
                      )
                      return true;
                     else
                      return false;
                }
                return true;
            });
            return data;
        },
        pgedPosts(){
            let endInd=(this.pageInfo.currPage*this.pageInfo.pageLen)
            return this.ftPosts.slice(endInd-this.pageInfo.pageLen,endInd)
        },
        paginationData(){
          var display=this.pgedPosts.length>0;
          var end=(this.pageInfo.currPage*this.pageInfo.pageLen);
          var start=end-this.pageInfo.pageLen;
          if(end>this.ftPosts.length){
              end=this.ftPosts.length;
          }
          var fromTo= (start+1)+'-'+end;
          return {
              fromTo,
              isFirstPage:this.pageInfo.currPage==1,
              isLastPage: this.pageInfo.currPage*this.pageInfo.pageLen >= this.ftPosts.length,
              length:this.pageInfo.pageLen,
              display,
              pgLenList:[10,25,50,100],
              total:this.ftPosts.length
          };
        }
    },
    methods:{
      increasePage(){
           var isLastPage= this.pageInfo.currPage*this.pageInfo.pageLen >= this.ftPosts.length;
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
        initializeMaterialize(){
           let elems = document.querySelectorAll('.collapsible');
           let instances = M.Collapsible.init(elems, {});
           elems = document.querySelectorAll('.modal');
           instances = M.Modal.init(elems, {});
           elems = document.querySelectorAll('.tooltipped');
           instances = M.Tooltip.init(elems, {});
        }
    },
    watch:{
      ftPosts:'resetPage',
      pgedPosts(newVal,oldVal){
          setTimeout(()=>{
            this.initializeMaterialize()
          },300)
      }
    }
}
</script>
