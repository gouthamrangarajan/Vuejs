<template>  
<transition name="fade" appear>
  <div class="row">
    <div class="col s12">
      <div class="col s12 l6" v-for="index in 2" :key="'c1_'+index">
        <div class="card medium hoverable">
          <div class="card-content">
            <span class="card-title">Chart</span>
            <transition name="fade" appear>
              <template v-if="index==1">
                  <line-chart></line-chart>
              </template>
            </transition>
            <transition name="fade" appear>
              <template v-if="index==2">
                <bar-chart></bar-chart>
              </template>
            </transition>
          </div>
        </div>  
      </div>
      <div class="col s6 l4" v-for="index in 3" :key="'c2_'+index">
        <div class="card">
          <div class="card-content">
            <span class="card-title">Statistics {{index}}</span>
            
          </div>
        </div>  
      </div>
      <div class="col s12 l6" v-for="index in 2" :key="'c3_'+index">
        <div class="card">
          <div class="card-content">
            <span class="card-title">Table {{index}}</span>
             <tbl></tbl>
          </div>
        </div>  
      </div>
    </div>
  </div>
</transition>
</template>

<script>
// @ is an alias to /src
import LineChart from '@/components/LineChart.vue'
import BarChart from '@/components/BarChart.vue'
import Tbl from '@/components/Tbl.vue'
export default {
  name: 'Home',
  components: { 
    LineChart,
    BarChart,
    Tbl
  }
}
</script>
<style scoped>

</style>