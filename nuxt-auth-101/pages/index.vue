<template>
  <div class="container">
    <div class="row">
      <div class="col s12">
          <app-usr-tbl></app-usr-tbl>
      </div>
    </div>
    <add-usr-btn></add-usr-btn>
  </div>
</template>

<script>
import AppUsrTbl from '@/components/AppUsrTbl.vue'
import AddUsrBtn from '@/components/AddUsrBtn.vue'
export default {
  transition:'slide',
  components:{
    AppUsrTbl,
    AddUsrBtn
  }
}
</script>

<style>

</style>
