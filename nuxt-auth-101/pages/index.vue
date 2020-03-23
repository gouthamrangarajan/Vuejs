<template>
  <div class="container">
    <div class="row">
      <div class="col s12">
          <app-usr-tbl></app-usr-tbl>
      </div>
    </div>
    <usr-btn></usr-btn>
  </div>
</template>

<script>
import AppUsrTbl from '@/components/AppUsrTbl.vue'
import UsrBtn from '@/components/UsrBtn.vue'
export default {
  transition:'fade',
  components:{
    AppUsrTbl,
    UsrBtn
  }
}
</script>

<style>

</style>
