<template>
    <div id="bar_chart">
    </div>
</template>
<script>
import {GoogleCharts} from 'google-charts'
import {mapState} from 'vuex'
export default {
    name:'BarChart',
    mounted(){
        GoogleCharts.load(this.drawChart, {'packages':['bar']})
     },
    computed:{
        ...mapState(['navigationDrawerMode']),
    },
    methods:{
        drawChart(){            
             let data = google.visualization.arrayToDataTable([
                ['Year', 'Sales', 'Expenses', 'Profit'],
                ['2014', 1000, 400, 200],
                ['2015', 1170, 460, 250],
                ['2016', 660, 1120, 300],
                ['2017', 1030, 540, 350]
                ])

            let options = {                
                title: 'Company Performance',
                subtitle: 'Sales, Expenses, and Profit: 2014-2017',                
                bars: 'horizontal',
                hAxis:{                        
                    gridlines: {
                            color: 'transparent'
                        }
                },
                titleTextStyle: {
                    fontSize:20,
                    color:'#212121'
                },
                animation:{
                    duration:1000,
                    startup:true,
                    easing:'linear'
                },
                legend:{
                    textStyle:{
                        fontSize:14
                    }
                }
            }

            let chart = new google.visualization.BarChart(document.getElementById('bar_chart'))
            chart.draw(data, options)
        }
    },
    watch:{
        navigationDrawerMode:'drawChart'
    }
}
</script>
<style scoped>
div{
    margin-top:-3rem;    
    height:25rem;   
}
</style>