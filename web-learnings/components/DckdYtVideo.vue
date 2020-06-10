<template>
<transition name="slide" appear>
   <div class="dock" v-show="dckVideoId!=''">
     <div class="card large grey darken-4 hoverable">
      <div class="card-content">
        <span class="deep-orange-text card-title" @click="$store.dispatch('setDckVideoId','')">
          <i class="material-icons right">close</i>
        </span>
         <div id="dckedVd">
         </div>
      </div>
    </div>
   </div>
</transition>
</template>
<script>
import {mapState} from 'vuex'
import YTPlayer from 'yt-player'
export default {
  data(){
    return {player:null}
  },
  computed:{
    ...mapState(['dckVideoId','currVideoId'])
  },
  mounted(){
    this.player= new YTPlayer('#dckedVd',{
        height:'450'
    })
    this.player.on('playing',()=>{
      this.$store.dispatch('setCurrVideoId','')
    })
    if(this.dckVideoId!='')
      this.loadVideo(this.dckVideoId)
  },
  methods:{
    checkAndPausePlay(){
      let state=this.player.getState()
        if(['playing','cued','buffering'].includes(state))
            this.player.pause()
    },
    loadVideo(videoId){
      this.player.load(videoId)
    }
  },
  watch:{
    dckVideoId(newVal){
      if(newVal!='')
        this.loadVideo(newVal)
      else
        this.checkAndPausePlay()
    },
    currVideoId(newVal){
       if(newVal!='')
          this.checkAndPausePlay()
    }
  }
}
</script>
<style scoped>
.dock{
  position: fixed;
  bottom: 0;
  left:0;
  z-index: 3;
}
.card{
  margin-bottom: 0;
}
.card-content{
  padding:0.2rem;
}
i{
  cursor: pointer;
}
.slide-enter-active,
.slide-leave-active{
  transition:all 0.3s;
}
.slide-enter,
.slide-leave-to{
  opacity: 0;
  transform: translateY(450px);
}
</style>
