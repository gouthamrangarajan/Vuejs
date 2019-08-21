<template>
     <article class="notification is-danger is-bold">
          <p class="title">
            New ?
          </p>
          <div class="subtitle">
              <br>Not a member already?<br/><br/><br/><br/><br/>
              <a class="button is-danger
                  is-rounded is-inverted" 
              @click.stop="$emit('show-sign-up')">Sign Up
              </a>
          </div>
      </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class SignUpText extends Vue{
    
}
</script> 