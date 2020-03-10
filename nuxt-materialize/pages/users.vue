<template>
  <div class="row">
    <transition-group name="records">
      <div class="col s12 l4" v-for="usr in ftUsers" :key="usr.id">
        <user-card :user="usr">
        </user-card>
      </div>
    </transition-group>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import userCard from '@/components/UserCard.vue'
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
      userCard
  },
  data(){
      return {pageInfo:{currPage:1,totalPages:0,pageLen:10},unsubscribe:null}
    },
  mounted(){
      this.unsubscribe=this.$store.subscribe((mutation)=>{
        if(mutation.type=='users/setData'){

          }
      })
      this.$store.dispatch('users/refresh')
    },
    destroyed(){
      if(this.unsubscribe){
        this.unsubscribe();
      }
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
  }
}
</script>
