<template>
  <div class="valign-wrapper">
    <div class="row">
      <div class="col s12">
        <div class="card blue-grey darken-1 hoverable">
          <div class="card-image center">
            <i class="large material-icons white-text">person_pin_circle</i>
            <span class="card-title orange-text text-accent-2">
              Login
            </span>
          </div>
          <div class="card-content">
            <div class="row white-text">
              <div class="input-field col s12">
                  <i class="material-icons prefix">email</i>
                  <input id="userName" type="text" class="validate white-text" v-model.trim="login.email">
                  <label for="userName">Email</label>
              </div>
              <div class="input-field col s12">
                  <i class="material-icons prefix">vpn_key</i>
                  <input id="pwd" type="password" class="validate white-text" v-model.trim="login.password" @keyup.enter="submit">
                  <label for="pwd">Password</label>
              </div>
              <div class="btn cyan darken-1 waves-effect waves-green" @click="submit">Submit<i class="material-icons right">send</i></div>
            </div>
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
   return {login:{email:'',password:''}}
 },
 methods:{
   async submit(){
     try{
      let response=await this.$auth.loginWith('local',{data:this.login})
     }
     catch(err){
       M.toast({html: 'Invalid Credentials...',classes:'red darken-4 white-text'})
     }
   }
 }
}
</script>
<style scoped>
.btn{
  width:98%!important;
}
.valign-wrapper{
  height: 100vh;
}
</style>
