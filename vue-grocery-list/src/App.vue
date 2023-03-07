<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'

const intervalMS = 60 * 60 * 1000

useRegisterSW({
  onRegistered(r) {
    r &&
      setInterval(() => {
        r.update()
      }, intervalMS)
  }
})
</script>

<template>
  <RouterView />
</template>

<style>
.list-move,
.list-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}
.list-leave-active {
  position: absolute;
}
.list-leave-from {
  opacity: 1;
}
.list-leave-to {
  opacity: 0;
}
</style>
