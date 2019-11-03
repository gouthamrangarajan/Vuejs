<template>
    <nav class="navbar is-transparent is-fixed-top">
  <div class="navbar-brand container">
    <transition name="fade" mode="in-out">
        <div class="navbar-item buttons" v-if="uploadPercent==0">        
            <a class="button is-info" @click="$refs.fl.click()">
                <span class="icon">
                <i class="fas fa-upload"></i>
                </span>
                <span>Select Image</span>
                <input type="file" single ref="fl" v-show="false" @change="fileChanged">
            </a>  
            <a class="button is-primary" @click="upload">Upload</a>
        </div>      
    </transition>
    </div>    
</nav>
</template>
<script>
export default {
    name:'NavBar',
    data(){
        return {fl:{}}
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
            },300)
        }
    }
}
</script>
<style scoped>

</style>