<template>
  <div id="app" class="is-family-monospace">
    <div class="box container">
      <div class="columns is-vcentered  is-mobile is-centered is-multiline">
        <div class="column">  
          <transition name="slide-left" appear>
            <component :is="compOne" @show-login="showLogin"  class="comp" @show-sign-up="showSignUp"></component>
          </transition>
        </div>
        <div class="column">
            <transition name="slide-right" appear>
            <component :is="compTwo"  @show-login="showLogin"  @show-sign-up="showSignUp" class="comp"></component>
          </transition>
        </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import login from './components/Login.vue';
import loginText from './components/LoginText.vue';
import signUp from './components/SignUp.vue';
import signUpText from './components/SignUpText.vue';
import 'bulma/css/bulma.css';
@Component({
  components: {
    login,loginText,signUp,signUpText
  },
})
export default class App extends Vue {
  compOne:string='login';
  compTwo:string='sign-up-text';
  showLogin():void{
      this.compOne="login";
      this.compTwo="sign-up-text";
  }
  showSignUp():void{
      this.compOne="login-text";
      this.compTwo="sign-up";
  }
}
</script>

<style>
#app{
   height:100vh;
 background-color:hsl(0, 0%, 98%);
   padding-top:12rem;
}
.box{
  height:19rem;
  padding-left:1rem;
}
.comp{
  position:absolute;
  width:49%;
  height:90%;
  text-align:center;
  justify-content:center;
}
.form{
  text-align:left;
  
}

.slide-left-enter-active,
.slide-left-leave-active{
  transition:all 1s;
}

.slide-left-enter,
.slide-left-leave-to{
  opacity:0;
  transform:translateX(35rem);
}

.slide-right-enter-active,
.slide-right-leave-active{
  transition:all 1s;
}

.slide-right-enter,
.slide-right-leave-to{
  opacity:0;
  transform:translateX(-35rem);
}
.notification{
  z-index:2;
}
</style>
