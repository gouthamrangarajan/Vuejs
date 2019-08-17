<template>
  <div id="app">
    <nav-bar></nav-bar>
    <Section :class="{'blur':showModal}">
      <img-container :imgs="Images" @selected="imgSelected"></img-container>
    </Section>
    <Modal :showModal="showModal" :initialImgId="clickedImgId" @close="closeModal"  :imgs="Images"></Modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import NavBar from './components/NavBar.vue'
import ImgContainer from './components/ImgContainer.vue';
import Modal from './components/Modal.vue'
import {IImage} from './models/IImage'
@Component({
  components: {
    NavBar,
    ImgContainer,
    Modal
  },
})
export default class App extends Vue {
   Images : IImage[]=[{id:1,src:'https://apod.nasa.gov/apod/image/1908/PerseidsPloughCow.jpg'},
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
 {id:15,src:'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/southcrab.jpg'}];
   
  showModal:boolean=false;
  clickedImgId:number=-1;

  created(){
    document.body.classList.add("has-navbar-fixed-top");
  }

  imgSelected(id:number):void{
    this.clickedImgId=id;
    this.showModal=true;
  }
  closeModal():void{
    this.showModal=false;
    this.clickedImgId=-1;
  }
}
</script>

<style>
.imgs-enter-active,
.imgs-leave-active{
  transition:all 1s;
}

.imgs-enter,
.imgs-leave-to{
  opacity:0;
  transform:translateX(1rem);
}
.blur{
  filter:blur(0.3rem);
}
</style>
