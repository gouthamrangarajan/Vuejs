<template>
 <ul class="collection with-header z-depth-1">
    <li class="collection-header"><h4 class="red-text">{{user.name}}</h4></li>
    <user-collection-item :user="user" :hideName="true">
    </user-collection-item>
  </ul>
</template>
<script>
import {mapState} from 'vuex'
import userCollectionItem from '@/components/UserCollectionItem.vue'
export default {
  props:{
    userId:{
      type:Number,
      required:true
    }
  },
  computed:{
    ...mapState({
          users:state=>state.users.data,
    }),
    user(){
      return this.users.filter(el=>el.id==this.userId)[0];
    }
  },
  components:{
    userCollectionItem
  }
}
</script>
