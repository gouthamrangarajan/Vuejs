<template>
  <form class="form">
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
  <label class="label">Confirm Password</label>
   <div class="control">
      <input class="input" type="password"/>
    </div>
  </div>
  <div class="field">
      <div class="control is-expanded">
        <input type="submit" class="button is-danger 
          is-fullwidth" value="Register" @click.prevent/>
      </div>
  </div>
  </form>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class SignUp extends Vue{
    
}
</script> 