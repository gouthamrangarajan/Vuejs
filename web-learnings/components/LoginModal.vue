<template>
  <div>
    <div id="loginModal" class="modal" @click.stop="$refs.email.focus()">
      <div class="modal-content">
        <h5 class="red-text text-darken-2">Enter Credentials...</h5>
        <div class="row">
          <form class="col s12" @submit.prevent>
            <div class="row">
              <div class="input-field col s12 grey-text text-darken-2">
                  <i class="material-icons prefix">email</i>
                  <input type="email" class="validate grey-text text-darken-4" v-model.trim="email" ref="email"
                  @keyup.enter="submit" placeholder="Email">
              </div>
              <div class="input-field col s12 grey-text text-darken-2">
                  <i class="material-icons prefix">vpn_key</i>
                  <input type="password" class="validate grey-text text-darken-4" v-model.trim="pwd" @click.stop
                      @keyup.enter="submit" placeholder="Password">
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <a href="#!" :class="{'waves-effect waves-green btn-flat':true,'disabled':isProcessing}" @click.stop="submit">Submit</a>
        <a href="#!" class="modal-close waves-effect waves-red btn-flat">Close</a>
      </div>
    </div>
    <notification v-bind="notification" v-model="notification.display"/>
  </div>
</template>
<script>
export default {
  data(){
    return{
      email:'',
      pwd:'',
      isProcessing:false,
      notification:{
          msg:'',
          display:false,
          success:true
      },
    }
  },
  mounted(){
      let elem = document.getElementById('loginModal')
      let instance = M.Modal.init(elem, {
        dismissible:false,
        onOpenEnd:()=>{
          this.$refs.email.focus()
        },
      })
  },
  components:{
    Notification:()=>import('@/components/Notification.vue')
  },
  methods:{
   async submit(){
        this.isProcessing=true
        let loginFailed=false
        if(this.email==''||this.pwd==''){
            loginFailed=true
        }
        else{
          try{
              this.$store.dispatch('user/set',this.email)
            }
          catch(err){
            loginFailed=true
            console.log(err)
          }
        }
        if(loginFailed){
          this.notification.msg='Invalid credentials...'
          this.notification.display=true
          this.notification.success=false
        }
        else{
            let elem = document.getElementById('loginModal')
            let instance = M.Modal.getInstance(elem)
            instance.close()
        }

    }
  },
  watch:{
    'notification.display':
    {
      handler(newVal,oldVal){
          this.isProcessing=newVal
      }
    }
  }
}
</script>
<style scoped>
i.prefix{
  margin-top:-0.5rem;
}
@media only screen  and (min-width:992px) {
   i.prefix{
   margin-top:-1rem;
 }
 form div.row{
   margin-top:2rem;
 }
  .modal{
    width:40rem;
  }
}
 .input-field{
   margin: 0.5rem;
 }

</style>
