<template>
  <div id="app">
    <slider :length="parseInt(6)" :duration="parseInt(7000)" />
  </div>
</template>

<script>
import slider from './components/Slider'
export default {
  name: 'app',
  components: {
    slider
  }
}
</script>

<style>

</style>
