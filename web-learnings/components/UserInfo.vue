<template>
  <transition name="fade" mode="out-in">
    <li v-if="user==''">
        <a class="blue-text text-darken-2 modal-trigger  waves-effect waves-green"  href="#loginModal" :key="1">Login</a>
        <LoginModal></LoginModal>
    </li>
  </transition>
</template>
<script>
import {mapState} from 'vuex'
export default {
   mounted()
   {

   },
   components:{
     LoginModal:()=>import('@/components/LoginModal.vue')
   },
   computed:{
     ...mapState({user:state=>state.user.current}),

   }
}
</script>
