<template>
<transition name="scale">
    <transition-group  name="users" tag="div" class="container column">
        <transition-group name="users" tag="div" class="columns row" v-for="array in breakedUsersArray"  :key="array.id">
            <div class="column is-one-third" v-for="user in array.data" :key="user.id">
                <user-card :user="user"></user-card>       
            </div>
        </transition-group>     
    </transition-group>    
</transition>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import UserCard from './../components/UserCard'
export default {
    name:'Users',
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
                            if(el[ky]!=null && el[ky].toString().toLowerCase().indexOf(this.ftTxt.toLowerCase())>-1
                               && !ret){
                                ret=true;
                            }
                        }
                        else{
                            Object.keys(el.address).forEach(ky=>{
                                 if(el.address[ky]!=null && el.address[ky].toString().toLowerCase().indexOf(this.ftTxt.toLowerCase())>-1
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
        /* Array of arrays to easily break in ui display  */
        breakedUsersArray(){
            var retDat=[];
            var ind=0;
            var outArrId=1;
            while(ind<this.ftUsers.length){
                var inArr=[];
                for(var i=0;i<3;i++){
                    if(ind>=this.ftUsers.length){
                        break;
                    }
                    inArr.push(this.ftUsers[ind]);
                    ind++;
                }
                retDat.push({data:inArr,id:outArrId});
                outArrId++;
            }
            return retDat;
        }
    },
    components:{
        UserCard
    }
}
</script>
<style scoped>
    .users-move{
        transition:all 0.3s;
    }
    .users-enter-active,.users-leave-active{
        transition:all 0.3s;
    }
    .users-enter,.users-leave-to{
        opacity:0;
        transform: translateX(2rem);
    }
     
</style>