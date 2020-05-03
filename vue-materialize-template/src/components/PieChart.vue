<template>
    <div id="pie_chart" style="width: 30rem; height: 15rem;">
    </div>
</template>
<script>
import {GoogleCharts} from 'google-charts'
import {mapState} from 'vuex'
export default {
    name:'PieChart',
    mounted(){
        GoogleCharts.load(this.drawChart)
    },
    methods:{
        drawChart(){
             let data = google.visualization.arrayToDataTable([
                            ['Task', 'Hours per Day'],
                            ['Work',     11],
                            ['Eat',      2],
                            ['Commute',  2],
                            ['Watch TV', 2],
                            ['Sleep',    7]
                        ])

        let options = {
          title: 'Daily Activities',
          titleTextStyle:{
              fontSize:24,
              fontName:'Roboto'
          },
          legend:{
              textStyle:{
                  fontName:'Roboto',
              }
          },
          is3D: true,
        slices: {
                1: {offset: 0.3},                
            },
        }

        let chart = new google.visualization.PieChart(document.getElementById('pie_chart'))
        chart.draw(data, options)
      }
    },
    computed:{
        ...mapState(['theme'])
    }
}
</script>
<style scoped>
div{
    margin-left:-2rem;
    margin-top:-3rem;
    transform: scale(1.2);
    transition: all 0.3s;
}
</style>