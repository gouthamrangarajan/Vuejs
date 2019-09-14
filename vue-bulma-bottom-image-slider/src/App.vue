<template>
  <div id="app">
    <nav-bar></nav-bar>
    <container :imgs="images"/>
    <bottom-slider :imgs="images"/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import Container from './components/Container.vue'
import BottomSlider from './components/BottomSlider.vue'
import 'bulma/css/bulma.min.css';
export default {
  name: 'app',
  components: {
    NavBar,Container,BottomSlider
  },
  data(){
    return {images:[{id:1,src:'https://apod.nasa.gov/apod/image/1908/PerseidsPloughCow.jpg'},
{id:2,src:'https://www.nasa.gov/sites/default/files/thumbnails/image/stsci-h-p1936a-m-1999x2000.png'},   
{id:3,src:'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/potw1931a.jpg'}, 
{id:4,src:'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/pia23346-16.jpg'},
{id:5,src:'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/iss060e014848.jpg'}, 
{id:6,src:'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/potw1929a.jpg'},   
{id:7,src:'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/iss060e013471.jpg'},
{id:8,src:'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/pia22948b_0.jpg'},
{id:9,src:'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/pia22949.jpg'},
{id:10,src:'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/sts059-81-095large.jpg'},
{id:11,src:'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/teacup_lg.jpg'},
 {id:12,src:'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/potw1922a.jpg'},
{id:13,src:'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/potw1921a.jpg'},
 {id:14,src:'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/stsci-h-p1930a-f-3213x2836.jpg'},
 {id:15,src:'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/southcrab.jpg'}]}
  }
  }

</script>

<style>
.columns.is-gapless .column{
  padding:0rem;
}
.columns.is-gapless{
  margin-bottom:0 !important;
}
</style>
