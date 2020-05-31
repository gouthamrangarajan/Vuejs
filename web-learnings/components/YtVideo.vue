<template>
  <div class="video-holder">
    <ViewportChecker :checkId="id" :action="loadVideo"></ViewportChecker>
    <div class="video-container">
      <div :id="id">
      </div>
    </div>
  </div>
</template>
<script>
import YTPlayer from 'yt-player'
import {mapState} from 'vuex'
export default {
  props:{
    id:{
      type:String,
      required:true
    },
    videoId:{
      type:String,
      required:true
    }
  },
  data(){
    return{player:null}
  },
  components:{
    ViewportChecker:()=>import('@/components/ViewportChecker.vue')
  },
  computed:{
    ...mapState(['currVideoId'])
  },
  methods:{
    loadVideo(){
      this.player= new YTPlayer('#'+this.id,{

      })
      this.player.load(this.videoId)
      this.player.on('playing',()=>{
        this.$store.dispatch('setCurrVideoId',this.videoId)
      })
    },
    checkAndPausePlaying(){
      if(this.player){
        let state=this.player.getState()
        if(['playing','cued','buffering'].includes(state))
            this.player.pause()
      }
    }
  },
  watch:{
    currVideoId(newVal){
      if(newVal!=this.videoId)
        this.checkAndPausePlaying()
    }
  }
}
</script>
<style scoped>

</style>
