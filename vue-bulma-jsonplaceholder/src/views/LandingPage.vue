<template>
<transition name="fade">
<section class="container has-text-centered">
    <div class="columns is-gapless is-centered">                 
        <transition name="right" appear>
            <router-link class="column is-primary notification is-5 offset-1" to="/posts">           
                <p class="title">
                    <i class="fas fa-blog fa-2x"></i>
                </p>
                <p class="subtitle">
                Posts ({{animatedPostsCount}})
                </p>        
            </router-link>     
        </transition>
        <transition name="left" appear>
            <router-link class="column is-link notification is-5" to="/albums">        
                <p class="title">
                    <i class="fas fa-images fa-2x"></i>
                </p>
                <p class="subtitle">
                    Albums ({{animatedAlbumsCount}})
                </p>        
            </router-link>            
        </transition>
    </div>
    <div class="columns is-gapless is-centered">
        <transition name="up" appear>     
            <router-link class="column  is-info notification  is-5" to="/users">         
                <p class="title">
                <i class="fas fa-users fa-2x"></i>
                </p>
                <p class="subtitle">
                    Users ({{animatedUsersCount}})
                </p>
            </router-link>     
        </transition>
        <transition name="up" appear>
            <router-link class="column is-warning notification is-5" to="/todos">         
                <p class="title">
                <i class="fas fa-list-ul fa-2x"></i>
                </p>
                <p class="subtitle">
                    Todos ({{animatedTodosCount}})
                </p>
            </router-link> 
        </transition>   
    </div>         
</section>  
</transition>
</template>

<script>
import {mapGetters} from 'vuex' 
export default {
    name:'LandingPage',
    mounted(){
      
    },
    data(){
        return {animatedPostsCount:0,animatedAlbumsCount:0,animatedUsersCount:0,animatedTodosCount:0,
            postsCountIntr:{},albumsCountIntr:{},usersCountIntr:{},todosCountIntr:{}
            }
    },
    computed:{
        ...mapGetters({
            postsLen:'posts/dataLength',
            albumsLen:'albums/dataLength',
            usersLen:'users/dataLength',
            todosLen:'todos/dataLength'
        }),        
    },
    watch:{
        postsLen:{
            immediate:true,
            handler (newVal,oldVal){
                this.animatedPostsCount=0;
                clearInterval(this.postsCountIntr);
                this.postsCountIntr=setInterval(()=>{
                    this.animatedPostsCount++;
                    if(this.animatedPostsCount==this.postsLen){
                        clearInterval(this.postsCountIntr);
                    }
                },10);
            }
        },
        albumsLen:{
            immediate:true,
            handler(newVal,oldVal){
                this.animatedAlbumsCount=0;
                clearInterval(this.albumsCountIntr);
                this.albumsCountIntr=setInterval(()=>{
                    this.animatedAlbumsCount++;
                    if(this.animatedAlbumsCount==this.albumsLen){
                        clearInterval(this.albumsCountIntr);
                    }
                },10);
            }
        },
        usersLen:{
            immediate:true,
            handler (newVal,oldVal){
                this.animatedUsersCount=0;
                clearInterval(this.usersCountIntr);
                this.usersCountIntr=setInterval(()=>{
                    this.animatedUsersCount++;
                    if(this.animatedUsersCount==this.usersLen){
                        clearInterval(this.usersCountIntr);
                    }
                },10);
            }
        },
        todosLen:{
            immediate:true,
            handler (newVal,oldVal){
                this.animatedTodosCount=0;
                clearInterval(this.todosCountIntr);
                this.todosCountIntr=setInterval(()=>{
                    this.animatedTodosCount++;
                    if(this.animatedTodosCount==this.todosLen){
                        clearInterval(this.todosCountIntr);
                    }
                },10);
            }
        },        
    }
}
</script>
<style scoped>
.columns{
    margin-bottom: 0!important;
}
section{         
    padding-top:12vh;
     
}
.notification p{
    padding-top:2rem;
}

.column{
    cursor: pointer;
    height: 12rem;    
    transition:all 0.3s ease-out;       
    width:30rem!important;
    border-radius: 0;
}
.column:hover{
    transition:all 0.3s ease-out;
    transform:scale(1.1);
    z-index:100;
}
@media screen  and  (width: 768px) {  
  section{    
      margin-left:12vw;
  }    
}
@media screen  and  (max-width: 768px){  
  section{    
      padding-top:1rem;
  }    
}
.left-enter-active,.left-leave-active{
    transition:all 0.3s;
}
.left-enter,.left-leave-to{
    transform:translateX(2rem);
}
.right-enter-active,.right-leave-active{
    transition:all 0.3s;
}
.right-enter,.right-leave-to{
    transform:translateX(-2rem);
}
.up-enter-active,.up-leave-active{
    transition:all 0.3s;
}
.up-enter,.up-leave-to{
    transform:translateY(2rem);
}

</style>