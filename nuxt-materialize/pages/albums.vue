<template>
  <div class="container">
    <pagination :info="paginationData" id="albums_pagination_1" @changeLen="pageInfo.pageLen=$event;pageInfo.currPage=1"
     @decrease="decreasePage" @increase="increasePage"/>
     <div class="z-depth-5 mt-reduce-one white">
      <table class="striped responsive-table">
        <thead class="white-text">
            <tr  class="light-blue accent-4">
                <th rowspan="2" class="center">Title</th>
                <th colspan="3" class="center">User</th>
            </tr>
            <tr  class="light-blue accent-4">
              <th class="center">Name</th>
              <th class="center">User Name</th>
              <th class="center">Email</th>
            </tr>
          </thead>
          <transition-group name="records" tag="tbody">
              <tr v-for="alb in pgedAlbums" :key="alb.id">
                  <td>{{alb.title}}</td>
                  <td><span v-if="alb.user">{{alb.user.name}}</span></td>
                  <td>
                    <a v-if="alb.user" class="modal-trigger tooltipped" href="#album-user-modal"
                         @click="modalUserId=alb.user.id" data-position="right" data-tooltip="Show user info">
                    {{alb.user.username}}
                    </a>
                  </td>
                  <td><span v-if="alb.user">{{alb.user.email}}</span></td>
              </tr>
          </transition-group>
      </table>
     </div>
     <div id="album-user-modal" class="modal bottom-sheet">
        <div class="modal-content container">
            <transition name="fade">
              <user-modal-content :userId="modalUserId" v-if="modalUserId!=-1"></user-modal-content>
            </transition>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-red btn-flat">Close</a>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import pagination from '@/components/Pagination.vue'
import userModalContent from '@/components/UserModalContent.vue'
export default {
  transition:'slide',
  head(){
      return{
        title:'Nuxt Materialize',
        meta:[
            {'hid':'description',
            'name':'description',
            'content':'nuxt materialize jsonplaceholder albums'}
        ]
      }
    },
    data(){
      return {pageInfo:{currPage:1,totalPages:0,pageLen:10},modalUserId:-1,unsubscribe:null}
    },
    components:{
      pagination,
      userModalContent
    },
    mounted(){
      this.unsubscribe=this.$store.subscribe((mutation)=>{
        if(mutation.type=='albums/setData'){
            this.initializeMaterialize()
          }
      })
      this.$store.dispatch('users/refresh')
      this.$store.dispatch('albums/refresh')
    },
    destroyed(){
      if(this.unsubscribe){
        this.unsubscribe();
      }
    },
    computed:{
        ...mapState({
            albums:state=>state.albums.data,
            users:state=>state.users.data,
            ftTxt:state=>state.searchTxt
        }),
        ftAlbums(){
           var data= this.albums.map(el=>{
                var user=this.users.filter(usEl=>usEl.id==el.userId)[0];
                el.user=user;
                return el;
            }).filter(el=>{
                if(this.ftTxt!=''){
                    if( el.title.toLowerCase().includes(this.ftTxt.toLowerCase())||
                        el.user.username.toLowerCase().includes(this.ftTxt.toLowerCase()) ||
                        el.user.email.toLowerCase().includes(this.ftTxt.toLowerCase()) ||
                        el.user.name.toLowerCase().includes(this.ftTxt.toLowerCase())
                      )

                      return true;
                     else
                      return false;
                }
                return true;
            });
            return data;
        },
        pgedAlbums(){
            let endInd=(this.pageInfo.currPage*this.pageInfo.pageLen)
            return this.ftAlbums.slice(endInd-this.pageInfo.pageLen,endInd)
        },
        paginationData(){
          var display=this.pgedAlbums.length>0;
          var end=(this.pageInfo.currPage*this.pageInfo.pageLen);
          var start=end-this.pageInfo.pageLen;
          if(end>this.ftAlbums.length){
              end=this.ftAlbums.length;
          }
          var fromTo= (start+1)+'-'+end;
          return {
              fromTo,
              isFirstPage:this.pageInfo.currPage==1,
              isLastPage: this.pageInfo.currPage*this.pageInfo.pageLen >= this.ftAlbums.length,
              length:this.pageInfo.pageLen,
              display,
              pgLenList:[10,25,50,100],
              total:this.ftAlbums.length
          };
        }
    },
    methods:{
      increasePage(){
           var isLastPage= this.pageInfo.currPage*this.pageInfo.pageLen >= this.ftAlbums.length;
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
           let elems = document.querySelectorAll('.modal');
           let instances = M.Modal.init(elems, {});
           elems = document.querySelectorAll('.tooltipped');
           instances = M.Tooltip.init(elems, {});
        }
    },
    watch:{
      ftAlbums:'resetPage',
      pgedAlbums(newVal,oldVal){
          setTimeout(()=>{
            this.initializeMaterialize()
          },300)
      }
    }
}
</script>
<style scoped>
.z-depth-5{
  margin-bottom:1rem;
}
</style>
