<template>
     <nav class="navbar is-fixed-top is-transparent">
        <div class="navbar-brand">
        <a class="navbar-item">
            <img src="./../assets/logo.png"/>
        </a>
        </div>
  </nav>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class NavBar extends Vue{

}
</script>
<style scoped>
nav{
  height: 1.2rem;
}
</style>