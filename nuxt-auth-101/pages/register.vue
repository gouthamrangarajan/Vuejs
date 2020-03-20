<template>
  <div class="container">
    <div class="row">
     <div class="col s12">
        <div class="card blue-grey darken-3 hoverable">
          <div class="card-content">
            <span class="card-title orange-text text-accent-2">Register</span>
            <div class="row white-text">
              <div class="input-field col s12">
                  <i class="material-icons prefix">person</i>
                  <input id="name" type="text" class="validate white-text" v-model.trim="register.name" @keyup.enter="submit">
                  <label for="name">Name</label>
              </div>
              <div class="input-field col s12">
                  <i class="material-icons prefix">email</i>
                  <input id="userName" type="text" class="validate white-text" v-model.trim="register.email" @keyup.enter="submit">
                  <label for="userName">Email</label>
              </div>
              <div class="input-field col s12">
                  <i class="material-icons prefix">vpn_key</i>
                  <input id="pwd" type="password" class="validate white-text" v-model.trim="register.password" @keyup.enter="submit">
                  <label for="pwd">Password</label>
              </div>
            </div>
            </div>
            <div class="card-action">
              <a class="waves-effect waves-light" @click="submit">Submit</a>
              <nuxt-link to="/" class="waves-effect waves-light">View Users</nuxt-link>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  transition:'scale',
  data(){
    return {register:{email:'',password:'',name:''}}
  },
  methods:{
    submit(){
      let record={name:this.register.name,email:this.register.email,password:this.register.password};
      this.$store.dispatch('registerUser',{record:record,fn:this.parseResponse})
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
           setTimeout(()=>{
             window.location.href=window.location.href;
           },500);
      }
    }
  }
}
</script>
<style scoped>

</style>
