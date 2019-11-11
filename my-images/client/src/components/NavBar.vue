<template>
    <nav class="navbar is-dark is-fixed-top is-bold">
  <transition-group name="fade" class="navbar-brand container" tag="div">       
        <div class="navbar-item buttons" :key="1">        
            <a class="button is-info" @click="$refs.fl.click()">
                <span class="icon">
                <i class="fas fa-upload"></i>
                </span>
                <span>Select Image</span>
                <input type="file" single ref="fl" v-show="false" @change="fileChanged">
            </a>  
            <a :class="{'button is-primary':true,'is-loading':uploadPercent>0}" @click="upload">Upload</a>
        </div>        
         <div class="navbar-item" :key="2">
            <notification></notification>
        </div>  
  </transition-group>    
</nav>
</template>
<script>
import Notification from '@/components/Notification.vue'
export default {
    name:'NavBar',
    data(){
        return {fl:{}}
    },
    components:{
        Notification
    },
    methods:{
        fileChanged(ev){
            this.fl=ev.target.files[0];
        },
        upload(){
            let formData=new FormData();
            formData.append('myImage',this.fl);
            this.$store.dispatch('uploadImage',formData);
            setTimeout(()=>{
                this.$store.dispatch('refreshImgInfo');
            },500);            
        }
    },
    computed:{
        imgsLen(){return this.$store.state.imgLen;},
        uploadPercent(){return this.$store.state.uploadPercent;}
        
    },
    watch:{
        imgsLen(newVal,oldVal){
            setTimeout(()=>{
                var elToScroll=document.getElementById('card'+newVal);
                elToScroll.scrollIntoView();
            },500)
        }
    }
}
</script>
<style scoped>
    nav{
        height:1.2rem!important;
        z-index: 101;
    }
</style>