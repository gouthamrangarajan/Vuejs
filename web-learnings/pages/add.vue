<template>
  <div>
    <div class="container">
      <transition name="fade" appear>
        <div class="card" v-if="user!=''">
          <div class="card-content">
            <span class="card-title teal-text text-darken-2">Enter details...</span>
            <div class="row">
              <form class="col s12" @submit.prevent>
                <div class="row">
                  <div class="input-field col s12 l6">
                    <input type="text" placeholder="Title" v-model.trim="title"/>
                  </div>
                  <div class="input-field col s12 l6">
                    <input type="text" placeholder="Url" v-model.trim="url"/>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12 l6">
                    <input type="text" placeholder="SubTitle" v-model.trim="subtitle"/>
                  </div>
                  <div class="input-field col s12 l6">
                    <input type="number" v-model.trim="rank" id="rank"/>
                    <label for="rank" class="active">Rank</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12 l6">
                  <div class="switch">
                      <label>
                        You Tube Video
                        <input type="checkbox" v-model="isYt">
                        <span class="lever"></span>
                        &nbsp;
                      </label>
                    </div>
                  </div>
                  <div class="input-field col s12 l6">
                    <input type="text" placeholder="You Tube Video Id" v-model.trim="videoId"
                      :disabled="!isYt"/>
                  </div>
                </div>
                <div class="row">
                  <div class="card tags-card">
                    <div class="card-content">
                      <transition-group name="records">
                          <div v-for="tg in tags"  :key="tg.id" class="input-field">
                            <transition name="fade">
                              <i :class="{'material-icons prefix red-text waves-effect waves-red tooltipped tool-tip':true,
                                          'grey-text disabled':tags.length==1}"
                                @click="removeTag(tg.id)"  data-position="left" data-tooltip="Remove Tag">
                                remove_circle_outline
                              </i>
                            </transition>
                            <input v-model.trim="tg.txt" placeholder="Tag" :id="'tgInp_'+tg.id">
                          </div>
                      </transition-group>
                      <a class="btn-floating halfway-fab waves-effect waves-light" @click="addTag()">
                        <i class="material-icons">add</i>
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="card-action center">
            <a :class="{'btn blue darken-4 submit waves-effect waves-light':true,'disabled':isProcessing}" @click="submit">Submit
              <i class="material-icons right">send</i>
            </a>
          </div>
        </div>
      </transition>
    </div>
      <notification v-bind="notification" v-model="notification.display"/>
      <div class="fixed-action-btn tooltipped tool-tip" data-position="left" data-tooltip="Home">
        <nuxt-link class="btn-floating btn-large blue pulse waves-effect waves-light" to="/">
          <i class="large material-icons">home</i>
        </nuxt-link>
      </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  transition:'fade',
  scrollToTop: true,
  data(){
    return{
      title:'',
      subtitle:'',
      url:'',
      videoId:'',
      isYt:false,
      rank:5,
      tags:[{id:1,txt:''}],
      nxtTgId:2,
      isProcessing:false,
      notification:{
          msg:'',
          display:false,
          success:true,
          duration:4000,
          dismissible:false
      },
    }
  },
  components:{
    Notification:()=>import('@/components/Notification.vue'),
  },
  mounted(){
    setTimeout(()=>{M.updateTextFields()},300)
  },
  computed:{
    ...mapState({learnings:state=>state.learnings.data,user:state=>state.user.current})
  },
  methods:{
    addTag(txt){
      if(!txt)
        txt=''
      this.tags.push({id:this.nxtTgId,txt})
      this.nxtTgId++
      this.$nextTick(()=>{
        let elem=document.getElementById('tgInp_'+(this.nxtTgId-1))
        elem.scrollIntoView({behavior:'smooth',block:'center'})
      })
    },
    removeTag(id){
      if(this.tags.length==1)
        return
      this.tags=this.tags.filter(el=>el.id!=id)
    },
    submit(){
       this.isProcessing=true
       let errorMsgs=[]
       if(this.title=='')
          errorMsgs.push('Title cannot be empty')
       if(!this.isYt)
       {
          if(this.url=='')
            errorMsgs.push('Data should be YouTube video/Document(Url)')
          else if(this.learnings.filter(el=>el.url==this.url).length>0)
            errorMsgs.push('This Url is already added')
       }
       else if(this.isYt){
         if(this.videoId=='')
            errorMsgs.push('YouTube video should have valid Video Id')
          else if(this.learnings.filter(el=>el.isYt && el.videoId==this.videoId).length>0)
            errorMsgs.push('This YouTube video is already added')
       }
       if(this.tags.filter(el=>el.txt!='').length==0)
          errorMsgs.push('Please enter at least one valid tag')
       if(this.rank<1 || this.rank>5)
          errorMsgs.push('Rank should be number between 1 to 5')
       if(errorMsgs.length>0){
         this.notification.msg='* Please check the following<br/>'
         errorMsgs.forEach((el,index)=>{
           this.notification.msg+= (index+1)+'.'+el+'<br/>'
         })
         this.notification.duration=10000
         this.notification.success=false
         this.notification.dismissible=true
         this.notification.display=true
       }
       else{
         let dt={}
         dt.title=this.title
         if(this.isYt){
          dt.isYt=this.isYt
          dt.videoId=this.videoId
         }
         else{
           dt.url=this.url
         }
         if(this.subtitle!='')
           dt.subtitle=this.subtitle
         dt.tags=[]
         this.tags.filter(el=>el.txt!='').map(el=>el.txt).forEach(el=>{
           if(!dt.tags.includes(el)){
             dt.tags.push(el)
           }
         })
         dt.rank=this.rank
         this.$store.dispatch('learnings/add',{data:dt,successAction:this.dataAdded,failureAction:this.dataFailed})
       }
    },
    dataAdded(){
      this.tags.splice(0)
      this.isYt=false
      this.url=''
      this.title=''
      this.rank=5
      this.subtitle=''
      this.videoId=''
      this.$nextTick(()=>{
        if(this.tags.length==0)
          this.addTag('')
      })
      this.notification.duration=4000
      this.notification.msg='Successfully added learning...'
      this.notification.dismissible=false
      this.notification.success=true
      this.notification.display=true
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    dataFailed(){
      this.notification.duration=4000
      this.notification.msg='Error adding details.Please try again later...'
      this.notification.dismissible=false
      this.notification.success=false
      this.notification.display=true
    },
    initializeToolTip(){
      if(process.client){
        setTimeout(()=>{
          let elems=document.querySelectorAll('.tool-tip')
          let instances = M.Tooltip.init(elems, {})
        },300)
      }
    }
  },
  watch:{
    'notification.display':
    {
      handler(newVal,oldVal){
          this.isProcessing=newVal
      }
    },
    isYt(newVal,oldVal){
      if(newVal){
        this.addTag('Video')
      }
      else{
        this.tags=this.tags.filter(el=>el.txt!='Video')
        if(this.tags.length==0)
          this.addTag('')
      }
    },
    tags:{
      deep:true,
      immediate:true,
      handler(){
        this.initializeToolTip()
      }
    }
  }
}
</script>
<style scoped>
.switch label{
  font-size: 1rem;
}
a,i{
  cursor: pointer;
}
.submit{
  width:90%;
}
.switch{
    margin-top:1rem;
}
i.prefix{
  font-size:1.5rem;
  margin-top:0.5rem;
}

@media only screen and (max-width:991px) {
  .switch{
    margin-top:0rem;
  }
}
</style>
