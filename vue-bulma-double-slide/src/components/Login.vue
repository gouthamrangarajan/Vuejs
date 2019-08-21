<template>
     <form class="loginForm form">
  <div class="field">
  <label class="label">Email</label>
   <div class="control">
      <input class="input"/>
    </div>
  </div>
  <div class="field">
  <label class="label">Password</label>
   <div class="control">
      <input class="input" type="password"/>
    </div>
  </div>
  <div class="field">
      <div class="control is-expanded">
        <input type="submit" class="button is-danger 
          is-fullwidth" value="Sign in" @click.prevent/>
      </div>
  </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Login extends Vue{
    
}
</script> 
<style scoped>
.loginForm{
  padding-top:2rem;  
}
</style>