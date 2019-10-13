<template>
<transition name="scale">    
    <div class="container">    
        <pagination :info="paginationData" @decrease="decreasePage" @increase="increasePage"
            @changeLen="changePgLen">
        </pagination>
        <transition-group name="fade">
            <div v-for="post in pagedPosts" :key="post.id" class="card post-card">
                <div class="card-content">
                    <div class="media">
                        <div class="media-center">
                            <figure class="image is-rounded">
                                <i class="fab fa-blogger-b fa-2x"></i>
                            </figure>
                        </div>
                        <div class="media-content has-text-centered" @mouseleave="hideUserInfo">
                            <p class="title is-5">{{post.title}}</p>
                            <p class="subtitle is-6 has-text-link">
                                <span v-if="post.user" @mouseover="showUserInfo(post.id)">@{{post.user.username}}</span>
                            </p>    
                            <transition name="scale">
                                <div class="column is-4 is-offset-4 is-absolute" v-if="post.showUserInfo">
                                    <user-card :user="post.user"></user-card>
                                </div>                   
                            </transition>     
                        </div>
                    </div>
                    <div class="content has-text-justified">
                        <p>{{post.body}}</p>
                    </div>
                </div>
            </div>
        </transition-group>
       <pagination :info="paginationData" @decrease="decreasePage" @increase="increasePage"
            @changeLen="changePgLen" :toggleUp="true">
        </pagination>
    </div>
</transition>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import UserCard from './../components/UserCard'
import pagination from './../components/Pagination'
export default {
    name:'Posts',
    data(){
        return {pageInfo:{currPage:1,totalPages:0,pageLen:10},postIdToShowUserInfo:-1}
    },   
    components:{
        UserCard,
        pagination
    },
    computed:{
        ...mapState({
            posts:state=>state.posts.data,
            users:state=>state.users.data,
            ftTxt:state=>state.searchTxt
        }),
        postsWithUser(){
            var data= this.posts.map(el=>{
                var user=this.users.filter(usEl=>usEl.id==el.userId)[0];
                el.user=user;
                el.showUserInfo=false;
                if(this.postIdToShowUserInfo==el.id){
                    el.showUserInfo=true;
                }
                return el;
            }).filter(el=>{
                if(this.ftTxt!=''){
                    if( el.title.toLowerCase().indexOf(this.ftTxt.toLowerCase())>-1 ||
                        el.body.toLowerCase().indexOf(this.ftTxt.toLowerCase())>-1  ||
                        el.user.username.toLowerCase().indexOf(this.ftTxt.toLowerCase())>-1
                      )
                      return true;
                     else
                     return false;
                }
                return true;
            });            
            return data;
        },
        pagedPosts(){
            var endInd=(this.pageInfo.currPage*this.pageInfo.pageLen);        
            return this.postsWithUser.slice(endInd-this.pageInfo.pageLen,endInd);
        },
             
        paginationData(){
            var display=this.pagedPosts.length>0;
            var end=(this.pageInfo.currPage*this.pageInfo.pageLen);        
            var start=end-this.pageInfo.pageLen;
            if(end>this.postsWithUser.length){
                end=this.postsWithUser.length;
            }
            var fromTo= (start+1)+'-'+end;
            return {
                fromTo,
                isFirstPage:this.pageInfo.currPage==1,
                isLastPage: this.pageInfo.currPage*this.pageInfo.pageLen >= this.postsWithUser.length,
                length:this.pageInfo.pageLen,
                display,
                pgLenList:[10,25,50,100],                
                total:this.postsWithUser.length
            };
        }
    },
    methods:{
        increasePage(){
           var isLastPage= this.pageInfo.currPage*this.pageInfo.pageLen >= this.postsWithUser.length;
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
           this.postIdToShowUserInfo=id;
        },
        hideUserInfo(){
            this.postIdToShowUserInfo=-1;
        },
        changePgLen(value){
            this.pageInfo.pageLen=value;
            this.resetPageInfo();
        },
        resetPageInfo(){
          this.pageInfo.currPage=1;
          this.pageInfo.totalPages=Math.ceil(this.postsWithUser.length/this.pageInfo.pageLen);
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
.scale-enter-active,.scale-leave-active{
    transition:all 0.3s;
}
.scale-enter,.scale-leave-to{
    transform:scaleX(0);
}
.post-card{
    margin-bottom:1.2rem;
}
.is-absolute{
    position: absolute;
    z-index:100;
    margin-top:-5vh;
}

.scale-enter-active,.scale-leave-active{
    transition:all 0.3s;
}
.scale-enter,.scale-leave-to{
    transform: scaleX(0);
}
p.subtitle span{
    cursor: pointer;
}
.image.is-rounded{
    position: absolute;
    margin-left:42.5vw;
    margin-top:-6vh;
}
</style>