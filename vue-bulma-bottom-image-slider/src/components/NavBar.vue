<template>
     <nav class="navbar is-fixed-top is-black">
    <div class="navbar-brand">
    <a class="navbar-item">
    <img src="./../assets/logo.png"/>
  </a>
  </div>
    </nav>
</template>
<script>
export default {
    name:'NavBar',
    mounted(){
        document.body.classList.add("has-navbar-fixed-top");
    }
}
</script>