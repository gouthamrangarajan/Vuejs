<template>  
<transition name="fade" appear>
  <div class="row">
    <div class="col s12">
      <div class="col s6 l4" v-for="index in 3" :key="'c1_'+index">
        <div class="card small">
          <div class="card-content">
            <span class="card-title">Chart {{index}}</span>
          </div>
        </div>  
      </div>
      <div class="col s6 l3" v-for="index in 4" :key="'c2_'+index">
        <div class="card">
          <div class="card-content">
            <span class="card-title">Statistics {{index}}</span>
            
          </div>
        </div>  
      </div>
      <div class="col s12 l6" v-for="index in 2" :key="'c3_'+index">
        <div class="card large">
          <div class="card-content">
            <span class="card-title">Table {{index}}</span>
            
          </div>
        </div>  
      </div>
    </div>
  </div>
</transition>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  
  }
}
</script>
<style scoped>

</style>