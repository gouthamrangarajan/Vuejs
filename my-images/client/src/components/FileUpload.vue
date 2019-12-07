<template>
    <div class="fixed-action-btn">
        <a class="btn-floating btn-large red pulse">
            <i class="large material-icons">add</i>
        </a>
        <ul>            
            <li><a :class="{'btn-floating green':true,'disabled':uploadPercent>0}" @click="upload"><i class="material-icons">publish</i></a></li>
            <li><a class="btn-floating blue" @click="$refs.fl.click()"><i class="material-icons">attach_file</i></a></li>
            <li v-show="false"><input type="file" multiple ref="fl" @change="fileChanged"></li>            
        </ul>
    </div>
</template>
<script>
export default {
    name:'FileUpload',
    mounted(){
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems, null);
    },
     data(){
        return {fl:{}}
    },
    methods:{
        fileChanged(ev){
            this.fl=ev.target.files;
        },
        upload(){
            this.fl.forEach(flu => {
               let formData=new FormData();
                formData.append('myImage',flu);
                this.$store.dispatch('uploadImage',formData);                    
            });            
        },
    },
    computed:{
        uploadPercent(){return this.$store.state.uploadPercent;},
        imgsLen(){return this.$store.state.imgLen;},
    },
    watch:{
        imgsLen(newVal,oldVal){
            if(newVal>0){
                setTimeout(()=>{
                    var elToScroll=document.getElementById('card'+newVal);
                    elToScroll.scrollIntoView();
                },500)
            }
        }
    }
}
</script>