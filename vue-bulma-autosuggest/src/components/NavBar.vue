<template>
<nav class="navbar">
  <div class="navbar-brand">
   <a class="navbar-item">
      <img src="./../assets/logo.png">
    </a>
</div>
<div class="navbar-menu">
  <div class="navbar-end">
    <div class="navbar-item">
      <slot name="item">
      </slot>
    </div>
  </div>
</div>
</nav>
</template>
