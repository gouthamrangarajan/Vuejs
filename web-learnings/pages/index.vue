<template>
  <div class="row page">
    <transition-group name="records" tag="div" class="col s12">
      <div :key="-1" v-if="learnings.length==0">
         <h5 class="red-text text-darken-1">No data found.</h5>
      </div>
      <div v-for="learn in stLearnings" :key="learn.id" class="col s12 l4">
        <div :class="{'card hoverable z-depth-1':true,'medium':!isMobile}">
          <div class="card-content">
            <span class="card-title teal-text text-darken-2">{{learn.title}}
              <span class="right tooltipped tool-tip" @click="$store.dispatch('setDckVideoId',learn.videoId)" data-position="left"
                data-tooltip="Launch" v-if="!isMobile && learn.isYt">
                <i class="material-icons deep-orange-text tiny">launch</i>
              </span>
              <span class="right tooltipped tool-tip" @click="launch(learn.url)" data-position="left"
                 data-tooltip="Launch" v-else-if="learn.url">
                <i class="material-icons deep-orange-text tiny">launch</i>
              </span>

            </span>
            <span class="sub-title grey-text">
              <template v-if="learn.subtitle">
                {{learn.subtitle}}
               </template>
            </span>
            <template v-if="learn.isYt">
              <YtVideo :id="'div_'+learn.id" :videoId="learn.videoId" >
              </YtVideo>
            </template>
            <template v-else>
              <HtmlIFrame :url="learn.url" :id="'ifr_'+learn.id" ></HtmlIFrame>
            </template>
          </div>
          <HomeCardReveal :tags="sortTags(learn.tags)" :id="learn.id.toString()" :title="learn.title">
          </HomeCardReveal>
          <div class="card-action">
            <div v-for="(tag,index) in getSlicedTags(learn.tags)" :key="index"
              class="chip light-blue darken-2 white-text">
                {{tag}}
            </div>
            <a :key="-1" class="activator tooltipped tool-tip
                btn-flat waves-effect waves-red red-text text-darken-2"
                data-position="right"
                 data-tooltip="All Tags">
                  ...
            </a>
          </div>
         </div>
      </div>
    </transition-group>
    <transition name="scale" appear>
      <div class="fixed-action-btn tool-tip tooltipped" v-if="user!=''" data-position="left"
                 data-tooltip="Add Learning">
        <nuxt-link class="btn-floating btn-large red waves-effect waves-light" to="/add">
          <i class="large material-icons">add</i>
        </nuxt-link>
      </div>
    </transition>
    <DckdYtVideo></DckdYtVideo>
  </div>
</template>

<script>
import {mapGetters,mapState} from 'vuex'
import HomeCardReveal from '@/components/HomeCardReveal.vue'
export default {
  transition:'fade',
  scrollToTop: true,
  data(){
    return {isMobile:false}
  },
  mounted(){
    if(window)
     if(window.innerWidth<991)
        this.isMobile=true
  },
  components:{
    YtVideo:()=>import(/* webpackChunkName: "videoframe" */'@/components/YtVideo.vue'),
    HtmlIFrame:()=>import(/* webpackChunkName: "videoframe" */'@/components/HtmlIFrame.vue'),
    HomeCardReveal,
    DckdYtVideo:()=>import(/* webpackChunkName: "videoframe" */'@/components/DckdYtVideo.vue'),
  },
  computed:{
    ...mapGetters({learnings:'ftLearnings'}),
    ...mapState({user:state=>state.user.current,srchTxt:state=>state.srchTxt}),
    stLearnings(){
      let els=this.learnings.map(el=>el)
      return els.sort((a,b)=>{
        if(a.rank>b.rank)
          return 1
        else if(a.rank < b.rank)
          return -1
        else if(a.title.toLowerCase()>b.title.toLowerCase())
          return 1
        else if(a.title.toLowerCase()<b.title.toLowerCase())
          return -1
        else
          return 0
      })
    }
  },
  methods:{
    launch(url){
      window.open(url)
    },
    initializeToolTip(){
      if(process.client){
        setTimeout(()=>{
          let elems=document.querySelectorAll('.tool-tip')
          let instances = M.Tooltip.init(elems, {})
        },300)
      }
    },
    sortTags(tags){
      let els=tags.map(el=>el)
       return els.sort((a,b)=>{
         if(a.toLowerCase()>b.toLowerCase())
            return 1
          else if(a.toLowerCase()<b.toLowerCase())
            return -1
          else
            return 0
       })
    },
     getSlicedTags(tags){
      let els=this.sortTags(tags)
       els.splice(3)
       return els
     }
  },
  watch:{
    learnings:{
      immediate:true,
      handler(){
        this.initializeToolTip()
      }
    },
    user(){
        this.initializeToolTip()
    },
    srchTxt(){
      setTimeout(()=>{
        this.$store.dispatch('setCurrVideoId','')
      },600)
    }
  }
}

</script>

<style scoped>
i,.activator{
  cursor: pointer;
}
.page{
  overflow-x:hidden;
}
@media only screen and (max-width: 991px){
  .page{
    margin-top:3rem;
  }
}
.scale-enter-active,
.scale-leave-active{
  transition: all 0.3s;
}
.scale-enter,
.scale-leave-to{
  opacity: 0;
  transform:scale(0);
}

</style>
