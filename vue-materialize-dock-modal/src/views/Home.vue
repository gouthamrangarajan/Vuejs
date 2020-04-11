<template>
  <div class="home">     
    <info-tbl></info-tbl>     
    <dock-modal></dock-modal>     
    <transition name="scale" appear>   
      <div class="fixed-action-btn" @click="addInfo" v-show="!modalOpened" :key="1">
        <a class="btn-floating btn-large red">
          <i class="large material-icons">add</i>
        </a>
      </div>
    </transition>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import DockModal from '@/components/DockModal.vue'
import InfoTbl from '@/components/InfoTbl.vue'
export default {
  name: 'Home',
  components: {
    DockModal,
    InfoTbl
  }, 
  computed:{
    ...mapState(['modalOpened'])
  },
  methods:{
    ...mapActions(['addInfo'])
  }
}
</script>
<style scoped>
.home{
  padding-top:1rem;
}
</style>