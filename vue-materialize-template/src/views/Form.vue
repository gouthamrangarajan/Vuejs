<template>  
<transition name="scale" appear>
  <div class="container">
    <div class="card">    
      <div class="card-content">
        <div class="row">
          <div class="col s12">
            <div class="row">
              <div class="input-field col s6">
                <input id="first_name" type="text" class="validate">
                <label for="first_name">First Name</label>
              </div>
              <div class="input-field col s6">
                <input id="last_name" type="text" class="validate">
                <label for="last_name">Last Name</label>
              </div>
            </div>        
            <div class="row">
              <div class="input-field col s12">
                <input id="password" type="password" class="validate">
                <label for="password">Password</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input id="email" type="email" class="validate">
                <label for="email">Email</label>
              </div>
            </div>                   
          </div>
        </div>
      </div>
      <div class="card-action">
          <a :class="'full-width btn waves-effect waves-light '+theme">Submit
                  <i class="material-icons right">send</i>
          </a>
      </div>
    </div> 
  </div> 
</transition>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Form',
  components: {

  },
  mounted(){
      M.updateTextFields()
  },
  computed:{
    ...mapState(['theme']),
      textColor(){
          return this.theme.replace(/\s/g, '-text ').replace("darken-1","darken-4") 
      }
  }
}
</script>
<style scoped>
.btn{
  width:100%;
}
.scale-enter-active,
.scale-leave-active{
  transition:all 0.5s;
}
.scale-enter,
.scale-leave-to{
  transform: scale(0);
}
</style>