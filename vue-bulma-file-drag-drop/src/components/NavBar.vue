<template>
<transition name="fade" appear>
    <nav class="navbar is-dark is-fixed-top">
        <div class="navbar-brand">
            <a class="navbar-item">
                <img src="./../assets/logo.png"/>
            </a>
        </div>
    </nav>
</transition>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class NavBar extends Vue{
 
 
}
</script>
<style scoped>

</style>
