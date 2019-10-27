<template>
 <transition name="slide">
     <div class="column container">
        <div class="table-container">
            <table class="table is-bordered is-striped  is-hoverable  is-fullwidth">
                <thead>
                   <tr  class="is-selected">
                       <th rowspan="2" class="has-text-centered">Title</th>
                       <th colspan="3" class="has-text-centered">User</th>
                   </tr>
                   <tr  class="is-selected">
                      <th class="has-text-centered">Name</th>
                      <th class="has-text-centered">User Name</th>
                      <th class="has-text-centered is-hidden-mobile">Email</th>
                   </tr>
                </thead>                                    
                <transition-group name="rows" tag="tbody">
                    <tr v-for="alb in pagedAlbums" :key="alb.id">
                        <td>{{alb.title}}</td>
                        <td><span v-if="alb.user">{{alb.user.name}}</span></td>
                        <td @mouseleave="hideUserInfo">
                            <template v-if="alb.user"><a @mouseover="showUserInfo(alb.id)">{{alb.user.username}}</a>
                               <transition name="scale">
                                <div class="is-absolute" v-if="alb.showUserInfo">
                                    <user-card :user="alb.user"></user-card>
                                </div>                   
                               </transition>   
                            </template>
                        </td>
                        <td class="is-hidden-mobile"><span v-if="alb.user">{{alb.user.email}}</span></td>
                    </tr>
                </transition-group>
                <tfoot>
                    <tr>
                        <td colspan="4">
                            <pagination :info="paginationData" @decrease="decreasePage" @increase="increasePage"
                                @changeLen="changePgLen" :toggleUp="true">
                            </pagination>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
     </div>
 </transition>
</template>
<script>
import {mapState} from 'vuex'
import UserCard from './../components/UserCard'
import Pagination from './../components/Pagination'
export default {
    name:'Albums',
      data(){
        return {pageInfo:{currPage:1,totalPages:0,pageLen:10},albumIdToShowUserInfo:-1}
     }, 
     components:{
         UserCard,Pagination
     },
     computed:{
        ...mapState({
            albums:state=>state.albums.data,
            users:state=>state.users.data,
            ftTxt:state=>state.searchTxt
        }),
        albumsWithUser(){
            var data= this.albums.map(el=>{
                var user=this.users.filter(usEl=>usEl.id==el.userId)[0];
                el.user=user;
                el.showUserInfo=false;
                if(this.albumIdToShowUserInfo==el.id){
                    el.showUserInfo=true;
                }
                return el;
            }).filter(el=>{
                if(this.ftTxt!=''){
                    if( el.title.toLowerCase().indexOf(this.ftTxt.toLowerCase())>-1 ||                        
                        el.user.username.toLowerCase().indexOf(this.ftTxt.toLowerCase())>-1 ||
                        el.user.email.toLowerCase().indexOf(this.ftTxt.toLowerCase())>-1 ||
                        el.user.name.toLowerCase().indexOf(this.ftTxt.toLowerCase())>-1
                      )
                      return true;
                     else
                     return false;
                }
                return true;
            });            
            return data;
        },
        pagedAlbums(){
            var endInd=(this.pageInfo.currPage*this.pageInfo.pageLen);        
            return this.albumsWithUser.slice(endInd-this.pageInfo.pageLen,endInd);
        },
             
        paginationData(){
            var display=this.pagedAlbums.length>0;
            var end=(this.pageInfo.currPage*this.pageInfo.pageLen);        
            var start=end-this.pageInfo.pageLen;
            if(end>this.albumsWithUser.length){
                end=this.albumsWithUser.length;
            }
            var fromTo= (start+1)+'-'+end;
            return {
                fromTo,
                isFirstPage:this.pageInfo.currPage==1,
                isLastPage: this.pageInfo.currPage*this.pageInfo.pageLen >= this.albumsWithUser.length,
                length:this.pageInfo.pageLen,
                display,
                pgLenList:[10,25,50,100],                
                total:this.albumsWithUser.length
            };
        }
     },
     methods:{
          increasePage(){
           var isLastPage= this.pageInfo.currPage*this.pageInfo.pageLen >= this.albumsWithUser.length;
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
           this.albumIdToShowUserInfo=id;
        },
        hideUserInfo(){
            this.albumIdToShowUserInfo=-1;
        },
        changePgLen(value){
            this.pageInfo.pageLen=value;
            this.resetPageInfo();
        },
        resetPageInfo(){
          this.pageInfo.currPage=1;
          this.pageInfo.totalPages=Math.ceil(this.albumsWithUser.length/this.pageInfo.pageLen);
        }
     },
    watch:{
        'ftTxt':{
            immediate:true,
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
    transform: translateX(50rem);
}
.rows-move{
    transition:all 0.3s;
}
.rows-enter-active,.rows-leave-active{
    transition:all 0.3s;
}
.rows-enter,.rows-leave-to{
    opacity:0;
    transform: translateX(2rem);
}
.scale-enter-active,.scale-leave-active{
    transition:all 0.3s;
}
.scale-enter,.scale-leave-to{
     transform:scaleX(0);
}
.is-absolute{
    position: absolute;
    z-index:100;    
    margin-left:-12rem;
}
tfoot .column{
    padding:0;
}
</style>