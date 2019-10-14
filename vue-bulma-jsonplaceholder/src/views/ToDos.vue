<template>
  <transition name="slide">
    <div class="container">
        <pagination :info="paginationData" @decrease="decreasePage" @increase="increasePage"
              @changeLen="changePgLen">
              <template v-slot:additionalControls>
                <div class="field is-horizontal">
                    <div class="control">
                        <label class="checkbox">
                        <input type="checkbox" v-model="status" value="Pending">
                            Show Pending&nbsp;&nbsp;
                        </label>
                    </div>
                    <div class="control">                    
                        <label class="checkbox">
                        <input type="checkbox" v-model="status" value="Completed">
                            Show Completed&nbsp;&nbsp;
                        </label>
                    </div>
                </div>
              </template>
        </pagination>
         <transition-group name="todos" tag="div" class="columns row" v-for="array in breakedToDosArray"  :key="array.id">
            <div class="column is-one-third" v-for="toDo in array.data" :key="toDo.id">
                <div :class="{'box notification':true,'is-primary':!toDo.completed}" 
                         @mouseleave="hideUserInfo">
                    <span :class="{'line-through':toDo.completed}">{{toDo.title}}</span>
                    <span class="tag is-pulled-right" @mouseover="showUserInfo(toDo.id)">@{{toDo.user.username}}</span>
                      <transition name="scale">
                        <div class="column is-absolute" v-if="toDo.showUserInfo">
                            <user-card :user="toDo.user"></user-card>
                        </div>                   
                    </transition>   
                </div>      
            </div>
        </transition-group>     
         <pagination :info="paginationData" @decrease="decreasePage" @increase="increasePage"  
            @changeLen="changePgLen" :toggleUp="true">
            <template v-slot:additionalControls>
                <div class="field is-horizontal">
                    <div class="control">
                        <label class="checkbox">
                        <input type="checkbox" v-model="status" value="Pending">
                            Show Pending&nbsp;&nbsp;
                        </label>
                    </div>
                    <div class="control">                    
                        <label class="checkbox">
                        <input type="checkbox" v-model="status" value="Completed">
                            Show Completed&nbsp;&nbsp;
                        </label>
                    </div>
                </div>
              </template>
        </pagination>
    </div>
  </transition>
</template>
<script>
import {mapState} from 'vuex'
import UserCard from './../components/UserCard'
import Pagination from './../components/Pagination'
export default {
    name:'ToDos',
     data(){
        return {pageInfo:{currPage:1,totalPages:0,pageLen:21},toDoIdToShowUserInfo:-1,status:["Completed","Pending"]}
     }, 
     components:{
         UserCard,Pagination
     },
    computed:{
        ...mapState({
            todos:state=>state.todos.data,
            users:state=>state.users.data,
            ftTxt:state=>state.searchTxt
        }), 
        toDosWithUser(){
            var data= this.todos.map(el=>{
                var user=this.users.filter(usEl=>usEl.id==el.userId)[0];
                el.user=user;
                el.showUserInfo=false;
                if(this.toDoIdToShowUserInfo==el.id){
                    el.showUserInfo=true;
                }
                return el;
            }).filter(el=>{
                var retBool=false;
                var statusBoolToString="Completed";
                if(!el.completed){
                    statusBoolToString="Pending";
                }
                if(this.status.includes(statusBoolToString)){
                    retBool=true;
                }
                if(this.ftTxt!='' && retBool){
                    if(el.title.toLowerCase().indexOf(this.ftTxt.toLowerCase())>-1 ||
                        el.user.username.toLowerCase().indexOf(this.ftTxt.toLowerCase())>-1)
                    {
                      retBool=true;
                    }
                     else{
                        retBool=false;
                     }
                }
                return retBool;
            });            
            return data;
        },
        pagedToDos(){
            var endInd=(this.pageInfo.currPage*this.pageInfo.pageLen);        
            return this.toDosWithUser.slice(endInd-this.pageInfo.pageLen,endInd);
        },
        
        /* Array of arrays to easily break in ui display  */
        breakedToDosArray(){
            var retDat=[];
            var ind=0;
            var outArrId=1*this.pageInfo.currPage*this.pageInfo.pageLen;
            while(ind<this.pagedToDos.length){
                var inArr=[];
                for(var i=0;i<3;i++){
                    if(ind>=this.pagedToDos.length){
                        break;
                    }
                    inArr.push(this.pagedToDos[ind]);
                    ind++;
                }
                retDat.push({data:inArr,id:outArrId});
                outArrId++;
            }
            return retDat;
        },
          paginationData(){
            var display=this.pagedToDos.length>0;
            var end=(this.pageInfo.currPage*this.pageInfo.pageLen);        
            var start=end-this.pageInfo.pageLen;
            if(end>this.toDosWithUser.length){
                end=this.toDosWithUser.length;
            }
            var fromTo= (start+1)+'-'+end;
            return {
                fromTo,
                isFirstPage:this.pageInfo.currPage==1,
                isLastPage: this.pageInfo.currPage*this.pageInfo.pageLen >= this.toDosWithUser.length,
                length:this.pageInfo.pageLen,
                display,
                pgLenList:[21,42,63,105],                
                total:this.toDosWithUser.length
            };
        }
    },
    methods:{
        increasePage(){
           var isLastPage= this.pageInfo.currPage*this.pageInfo.pageLen >= this.toDosWithUser.length;
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
        showUserInfo(id){                  
           this.toDoIdToShowUserInfo=id;
        },
        hideUserInfo(){
            this.toDoIdToShowUserInfo=-1;
        },
        changePgLen(value){
            this.pageInfo.pageLen=value;
            this.resetPageInfo();
        },
        resetPageInfo(){
          this.pageInfo.currPage=1;
          this.pageInfo.totalPages=Math.ceil(this.toDosWithUser.length/this.pageInfo.pageLen);
        }
    },
    watch:{
        'ftTxt':{
            immediate:true,
            handler:'resetPageInfo'
        },
        'status':{
          handler:'resetPageInfo'  
        }
    }
}
</script>
<style scoped>
.slide-enter-active,.slide-leave-active{
    transition:all 0.3s;
}
.slide-enter,.slide-leave-to{
    transform: translateX(-50rem);
}

.todos-move{
    transition:all 0.3s;
}
.todos-enter-active,.todos-leave-active{
    transition:all 0.3s;
}
.todos-enter,.todos-leave-to{
    opacity:0;
    transform: translateX(2rem);
}
.tag{
    cursor: pointer;
}     
.is-absolute{
    position: absolute;
    z-index:100;
    margin-top:-1.4vh;
}
.scale-enter-active,.scale-leave-active{
    transition:all 0.3s;
}
.scale-enter,.scale-leave-to{
    transform: scaleX(0);
}
.line-through{
    text-decoration: line-through;
}
</style>