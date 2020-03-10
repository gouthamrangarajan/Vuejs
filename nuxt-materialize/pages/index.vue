<template>
<div class="container">
   <div class="card blue white-text">
     <div class="card-content">
       <span class="card-title">Google Charts</span>
     </div>
     <div class="card-tabs" v-if="windowWidth>=993">
      <ul class="tabs tabs-fixed-width tabs-transparent">
        <li class="tab"><a href="#piechart">Chart 1</a></li>
          <li class="tab"><a href="#barchart">Chart 2</a></li>
      </ul>
     </div>
     <div class="card-content grey lighten-4">
       <div id="piechart" class="chart">
        </div>
        <div id="barchart" class="chart">
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
  head(){
      return{
        title:'Nuxt Materialize',
        meta:[
            {'hid':'description',
            'name':'description',
            'content':'nuxt materialize jsonplaceholder'}
        ]
      }
  },
  mounted(){
    this.unsubscribe=this.$store.subscribe((mutation)=>{
      if(mutation.type=='todos/setData'){
        this.init()
      }
    })
    this.$store.dispatch('users/refresh')
    this.$store.dispatch('albums/refresh')
    this.$store.dispatch('posts/refresh')
    this.$store.dispatch('todos/refresh')
  },
  destroyed(){
    if(this.unsubscribe){
      this.unsubscribe();
    }
  },
  computed:{
        ...mapGetters({
            posts:'posts/dataLength',
            albums:'albums/dataLength',
            users:'users/dataLength',
            todos:'todos/dataLength'
        }),
        windowWidth(){
          if(process.client)
            return window.innerWidth
          else
            return 1024;
        }
    },
    data(){
      return {
        unsubscribe:null
      }
    },
    methods:{
      init(){
        GoogleCharts.load(this.drawPieChart, {'packages':['corechart']});
        GoogleCharts.load(this.drawBarChart, {'packages':['bar']});
        if(this.windowWidth>=993){
          setTimeout(()=>{
            let el = document.querySelectorAll('.tabs');
            let instance = M.Tabs.init(el, {});
          },700);
        }
      },
      getPieChartData(){
        return google.visualization.arrayToDataTable([
          ['Category','Total'],
          ['Posts',     this.posts],
          ['Albums',      this.albums],
          ['Todos',  this.todos],
          ['Users', this.users],
        ]);
      },
      getBarChartData(){
        return google.visualization.arrayToDataTable([
          ['All','Posts','Albums','Todos','Users'],
          [' ',0,0,0,0],
          [' ', this.posts,this.albums,this.todos,this.users],
          [' ',0,0,0,0],
        ]);
      },
      getBasicOptions(){
        let positionVal='right'
        if(this.windowWidth<993)
          positionVal='top'

         return {
          colors:['#b71c1c','#0d47a1','#e65100','#004d40'],
          backgroundColor:'#f5f5f5',
          title:'JSONPlaceholder',
          fontName:'Roboto',
          titleTextStyle:{
              fontName:'Roboto',
              fontSize:16,
              color:'#1a237e',
          },
          fontSize:16,
          legend:{
            textStyle:{
            fontName:'Roboto',
              fontSize:16,
              color:'#1a237e',
            },
            position:positionVal
          }
        };
      },
      drawBarChart(){
        let data=this.getBarChartData()
        let options=this.getBasicOptions()
        options.bars='horizontal'
        options.animation={
          duration:500,
          easing:'out',
          startup:true
        }
        options.hAxis={
           titleTextStyle:{
              fontName:'Roboto',
              fontSize:16,
              color:'#1a237e',
          },
        }

        options.bar= {groupWidth: "70%"}
        let chart = new google.charts.Bar(document.getElementById('barchart'));
        chart.draw(data, google.charts.Bar.convertOptions(options));
      },
      drawPieChart(){
        let data=this.getPieChartData()
        let options=this.getBasicOptions()
        options.is3D=true
        let chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
      }
    }
}
</script>

<style scoped>
  .chart{
    width:900px;
    height:500px;
  }
@media only screen and (max-width:992px) {
    .chart{
      width:350px;
    }

}
</style>
