<template>
  <div class="row">
    <transition name="fade">
      <div v-if="todos.length==0" class="container">
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
      </div>
    </transition>
    <pagination :info="paginationData" id="todo_pagination_1" @changeLen="pageInfo.pageLen=$event;pageInfo.currPage=1"
     @decrease="decreasePage" @increase="increasePage">
      <p>
      <label>
        <input type="checkbox" class="filled-in" v-model="additionalFilter" value="Pending" />
        <span class="green-text text-darken-4">Pending&nbsp;&nbsp;&nbsp;</span>
      </label>
      <label>
        <input type="checkbox" class="filled-in" v-model="additionalFilter" value="Completed" />
        <span class="green-text text-darken-4">Completed&nbsp;</span>
      </label>
    </p>
    </pagination>
    <transition-group name="records" tag="div" class="mt-reduce-one">
      <div v-for="todo in pgedTodos" :key="todo.id" class="col s6 l4">
         <div :class="{'card-panel':true,'red lighten-2':!todo.completed}">
           <span :class="{'strike-through':todo.completed}"> {{todo.title}}</span>
           <div class="teal darken-4 chip right yellow-text modal-trigger tooltipped" href="#todo-user-modal"
                    @click="modalUserId=todo.user.id" data-position="left" data-tooltip="Show user info">
             @{{todo.user.username}}
           </div>
         </div>
      </div>
    </transition-group>
     <div id="todo-user-modal" class="modal bottom-sheet">
        <div class="modal-content container">
            <transition name="fade">
              <user-modal-content :userId="modalUserId" v-if="modalUserId!=-1"></user-modal-content>
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
import userModalContent from '@/components/UserModalContent.vue'
export default {
  transition:'slide',
  head(){
      return{
        title:'Nuxt Materialize',
        meta:[
            {'hid':'description',
            'name':'description',
            'content':'nuxt materialize jsonplaceholder todos'}
        ]
      }
    },
    data(){
      return {pageInfo:{currPage:1,totalPages:0,pageLen:10},modalUserId:-1,additionalFilter:["Pending","Completed"]}
    },
    components:{
      pagination,
      userModalContent
    },
    mounted(){
      this.initializeMaterialize()
    },
    destroyed(){
    },
    computed:{
        ...mapState({
            todos:state=>state.todos.data,
            users:state=>state.users.data,
            ftTxt:state=>state.searchTxt
        }),
        ftTodos(){
           var data= this.todos.map(el=>{
                var user=this.users.filter(usEl=>usEl.id==el.userId)[0];
                el.user=user;
                return el;
            }).filter(el=>{
              if(this.additionalFilter.length==0)
                return false
               else if(el.completed && this.additionalFilter.includes("Completed"))
                return true
               else if(!el.completed && this.additionalFilter.includes("Pending"))
                return true
               else
                return false
            }).filter(el=>{
                if(this.ftTxt!=''){
                    if( el.title.toLowerCase().includes(this.ftTxt.toLowerCase())||
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
        pgedTodos(){
            let endInd=(this.pageInfo.currPage*this.pageInfo.pageLen)
            return this.ftTodos.slice(endInd-this.pageInfo.pageLen,endInd)
        },
        paginationData(){
          var display=this.pgedTodos.length>0;
          var end=(this.pageInfo.currPage*this.pageInfo.pageLen);
          var start=end-this.pageInfo.pageLen;
          if(end>this.ftTodos.length){
              end=this.ftTodos.length;
          }
          var fromTo= (start+1)+'-'+end;
          return {
              fromTo,
              isFirstPage:this.pageInfo.currPage==1,
              isLastPage: this.pageInfo.currPage*this.pageInfo.pageLen >= this.ftTodos.length,
              length:this.pageInfo.pageLen,
              display,
              pgLenList:[10,25,50,100],
              total:this.ftTodos.length
          };
        }
    },
    methods:{
      increasePage(){
           var isLastPage= this.pageInfo.currPage*this.pageInfo.pageLen >= this.ftTodos.length;
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
      ftTodos:'resetPage',
      pgedTodos(newVal,oldVal){
          setTimeout(()=>{
            this.initializeMaterialize()
          },300)
      }
    }
}
</script>
<style scoped>
.chip{
  cursor: pointer;
}
.strike-through{
  text-decoration: line-through;
}
</style>
