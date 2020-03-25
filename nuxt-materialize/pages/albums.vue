<template>
  <div class="container">
    <transition name="fade">
      <template v-if="albums.length==0">
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
    <pagination :info="paginationData" id="albums_pagination_1" @changeLen="pageInfo.pageLen=$event;pageInfo.currPage=1"
     @decrease="decreasePage" @increase="increasePage"/>
     <div class="z-depth-5 mt-reduce-one white">
      <table class="striped responsive-table">
        <thead class="white-text">
            <tr  class="light-blue accent-4">
                <th rowspan="2" @click="changeSort(0)" class="center" :style="thStyle[0]">Title
                  <transition name="fade">
                    <span class="right" v-if="sortInfo.column==0">
                        <sort :order="sortInfo.order"/>
                    </span>
                  </transition>
                </th>
                <th colspan="3" class="center hide-on-med-and-down" style="cursor:default">User</th>
            </tr>
            <tr  class="light-blue accent-4">
              <th @click="changeSort(1)" :style="thStyle[1]">Name
                <transition name="fade">
                  <span class="right" v-if="sortInfo.column==1">
                      <sort :order="sortInfo.order"/>
                  </span>
                </transition>
              </th>
              <th @click="changeSort(2)" :style="thStyle[2]">User Name
                <transition name="fade">
                  <span class="right" v-if="sortInfo.column==2">
                      <sort :order="sortInfo.order"/>
                  </span>
                </transition>
              </th>
              <th @click="changeSort(3)" :style="thStyle[3]">Email
                <transition name="fade">
                  <span class="right" v-if="sortInfo.column==3">
                      <sort :order="sortInfo.order"/>
                  </span>
                </transition>
              </th>
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
import sort from '@/components/Sort.vue'
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
    return {pageInfo:{currPage:1,totalPages:0,pageLen:10},
            sortInfo:{column:0,order:'asc'},
            modalUserId:-1}
  },
  components:{
    pagination,
    userModalContent,
    sort
  },
  mounted(){
    this.initializeMaterialize()
  },
  destroyed(){

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
      stAlbums(){
        let sortColumnTranslation={
          0:['title'],
          1:['user','name'],
          2:['user','username'],
          3:['user','email']
        }
        return this.ftAlbums.sort((a,b)=>{
          let translation=sortColumnTranslation[this.sortInfo.column]
          if(this.sortInfo.order=='asc'){
            if(translation.length==1){
               if(a[translation[0]]>b[translation[0]])
                 return 1
               else if(a[translation[0]]<b[translation[0]])
                return -1
              else
                return 0
            }
            else{
              if(a[translation[0]][translation[1]]>b[translation[0]][translation[1]])
                 return 1
               else if(a[translation[0]][translation[1]]<b[translation[0]][translation[1]])
                return -1
              else
                return 0
            }
          }
          else{
            if(translation.length==1){
               if(a[translation[0]]<b[translation[0]])
                 return 1
               else if(a[translation[0]]>b[translation[0]])
                return -1
              else
                return 0
            }
            else{
              if(a[translation[0]][translation[1]]<b[translation[0]][translation[1]])
                 return 1
               else if(a[translation[0]][translation[1]]>b[translation[0]][translation[1]])
                return -1
              else
                return 0
            }
          }
        })
      },
      pgedAlbums(){
          let endInd=(this.pageInfo.currPage*this.pageInfo.pageLen)
          return this.stAlbums.slice(endInd-this.pageInfo.pageLen,endInd)
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
      },
      thStyle(){
        var width=[]
        if(process.client && window.innerWidth>992){
          width.push({width:'40%'})
          width.push({width:'20%'})
          width.push({width:'20%'})
          width.push({width:'20%'})
        }
       else{
         width.push({})
         width.push({})
         width.push({})
         width.push({})
       }
       return width;
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
      },
      changeSort(col){
        if(this.sortInfo.column==col)
          if(this.sortInfo.order=='asc')
            this.sortInfo.order='desc'
          else
            this.sortInfo.order='asc'
        else{
          this.sortInfo.column=col
          this.sortInfo.order='asc'
        }
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
th{
  cursor: pointer;
}
</style>
