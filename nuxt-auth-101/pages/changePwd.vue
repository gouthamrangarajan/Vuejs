<template>
  <div class="container">
    <div class="row">
     <div class="col s12">
        <div class="card blue-grey darken-3 hoverable  z-depth-5">
          <div class="card-content">
            <span class="card-title orange-text text-accent-2">Change Password</span>
            <div class="row white-text">
              <div class="input-field col s12">
                  <input id="pwd" type="password" class="validate white-text" v-model.trim="chngPwd.currPwd" @keyup.enter="submit">
                  <label for="pwd">Current</label>
              </div>
              <div class="input-field col s12">
                  <input id="new" type="password" class="validate white-text" v-model.trim="chngPwd.newPwd" @keyup.enter="submit">
                  <label for="new">New</label>
              </div>
            </div>
            </div>
            <div class="card-action">
              <a class="waves-effect waves-light" @click="submit">Change</a>
              <nuxt-link to="/" class="waves-effect waves-light">View Users</nuxt-link>
            </div>
        </div>
      </div>
    </div>
    <usr-btn></usr-btn>
  </div>
</template>
<script>
import UsrBtn from '@/components/UsrBtn.vue'
export default {
  transition:'fade',
  data(){
    return {chngPwd:{currPwd:'',newPwd:''}}
  },
  components:{
    UsrBtn
  },
  methods:{
    submit(){
      let record={currentPassword:this.chngPwd.currPwd,newPassword:this.chngPwd.newPwd};
      this.$store.dispatch('changePassword',{record:record,fn:this.parseResponse})
    },
    parseResponse(msg){
      let errMsg='';
      if(msg.length && msg[0].indexOf('Bad request')>-1){
       errMsg='Please key in valid information...'
      }
      else if(msg.length>0 && msg[0].indexOf('Success')==-1){
        msg.forEach((m,ind)=>{
          errMsg+=(ind+1).toString()+'.'+m+'<br/>';
        })
      }
      if(errMsg!=''){
           M.toast({html: errMsg,classes:'red darken-4 white-text'})
      }
      else{
           M.toast({html: msg[0],classes:'green darken-4 white-text'})
           this.chngPwd.currPwd=''
           this.chngPwd.newPwd=''
      }
    }
  }
}
</script>
<style scoped>

</style>
