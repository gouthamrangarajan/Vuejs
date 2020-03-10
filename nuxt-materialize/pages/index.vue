<template>
<div class="container">
   <div class="card large">
     <div class="card-content">
       <span class="card-title indigo-text text-darken-4">Google Charts</span>
        <div id="chart"  style="width:900px; height:500px;">
        </div>
     </div>
   </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {GoogleCharts} from 'google-charts'
export default{
  transition:'slide',
  created(){
    if(this.users==0){
       this.$store.dispatch('users/refresh')
      }
      if(this.albums==0){
        this.$store.dispatch('albums/refresh')
      }
      if(this.posts==0){
        this.$store.dispatch('posts/refresh')
      }
      if(this.todos==0){
          this.$store.dispatch('todos/refresh')
      }
  },
  mounted(){
    this.init();
  },
  computed:{
        ...mapGetters({
            posts:'posts/dataLength',
            albums:'albums/dataLength',
            users:'users/dataLength',
            todos:'todos/dataLength'
        }),
    },
    data(){
      return {
         chartColors:[
          '#b71c1c','#0d47a1','#e65100','#004d40'
        ],
      }
    },
    methods:{
      init(){
          GoogleCharts.load(this.drawChart, {'packages':['corechart']});
      },
      drawChart(){
          var data = google.visualization.arrayToDataTable([
          ['Category','Total'],
          ['Posts',     this.posts],
          ['Albums',      this.albums],
          ['Todos',  this.todos],
          ['Users', this.users],
        ]);
         var options = {
          is3D:true,
          colors:[this.chartColors[0],this.chartColors[1],this.chartColors[2],this.chartColors[3]],
          fontName:'Roboto',
          legend:{
            textStyle:{
              fontName:'Roboto',
              fontSize:16,
              color:'#1a237e',
            },
            position:'right'
          }
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart'));

        chart.draw(data, options);
      }
    },
    watch:{
      albums:'init',
       users:'init',
       todos:'init',
       posts:'init'
    }
}
</script>

<style scoped>
  .card{
    width:90%;
  }
</style>
