<template>
<div class="container">
   <div class="card blue white-text">
     <div class="card-content">
       <span class="card-title">Google Charts</span>
     </div>
     <div class="card-tabs">
      <ul class="tabs tabs-fixed-width tabs-transparent">
        <li class="tab"><a href="#piechart">Pie</a></li>
          <li class="tab"><a href="#barchart">Bar</a></li>
      </ul>
     </div>
     <div class="card-content grey lighten-4">
       <div id="piechart" class="chart">
          <div class="valign-wrapper center-align" style="height:85%;width:100%;margin-left:50%">
                <div class="preloader-wrapper active">
                    <div class="spinner-layer spinner-red-only">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                        <div class="circle"></div>
                    </div><div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                    </div>
                </div>
            </div>
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
  asyncData({req}){
    if(process.server){
      if(req && req.headers){
        let cookie=req.headers.cookie
        if(cookie && cookie.indexOf('windowWidth=')>-1)
          return {windowWidth:parseInt(cookie.replace('windowWidth=',''))}
      }
      return {windowWidth:1024}
    }
    else{
      return {windowWidth:window.innerWidth}
    }
  },
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
    if(process.client){
      if(this.windowWidth!=window.innerWidth){
        this.windowWidth=window.innerWidth
        this.init()
        var d = new Date()
        d.setFullYear(d.getFullYear() + 1);
        var expires = "expires="+ d.toUTCString()
        document.cookie='windowWidth='+window.innerWidth+ ";" + expires + ";path=/";
      }
    }
  },
  computed:{
       ...mapGetters({
            posts:'posts/dataLength',
            albums:'albums/dataLength',
            users:'users/dataLength',
            todos:'todos/dataLength'
        })
    },
    methods:{
      init(){
        if(this.posts>0
          && this.albums>0
          && this.todos>0
           && this.users>0){
          GoogleCharts.load(this.drawPieChart, {'packages':['corechart']});
          GoogleCharts.load(this.drawBarChart, {'packages':['bar']});
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
        if(this.windowWidth>=993)
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
    },
    watch:{
      posts:{
        immediate:true,
        handler(){
          this.init()
        }
      },
      todos:{
        immediate:true,
        handler(){
          this.init()
        }
      },
      albums:{
        immediate:true,
        handler(){
          this.init()
        }
      },
      users:{
        immediate:true,
        handler(){
          this.init()
        }
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
      width:300px;
    }

}
</style>
