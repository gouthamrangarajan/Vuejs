<template>       
<div class="card z-depth-5 hoverable" :id="'card'+num"  v-if="imgId>0" style="overflow:visible">
    <div class="card-image">
        <transition-group name="fade">   
            <template v-if="imgId>0">       
                <img :src="'/imgs/'+imgId" :key="1" class="materialboxed" :data-caption="uploaded" />   
                <span class="card-title" :key="2">{{uploaded}}</span>                         
            </template>
        </transition-group>
    </div>  
    <transition name="fade">
        <div class="card-reveal" v-show="!isProcessing">
            <span class="card-title red-text text-darken-4">Are you sure?<i class="material-icons right grey-text text-darken-1">close</i></span>
            <p>This action is permanent and cannot be undone.</p>
            <a :class="{'btn blue waves-effect waves-light right':true,'disabled':isProcessing}" @click="deleteImg">Proceed</a>
        </div>
    </transition>
    <a class="btn-floating halfway-fab waves-effect waves-light grey darken-1 btn-small activator"
     :key="3"><i class="material-icons">delete</i></a>  
</div>               
</template>
<script>
export default {
    name:'ImageCard',   
    props:{
        num:{
            type:Number,
            required:true
        }
    },
    data(){
        return {isProcessing:false}
    },
    mounted(){
    
    },
    computed:{
        uploaded(){
            var dt= this.$store.state.imgModified.filter((el,ind)=>{
                if(ind+1==this.num){
                    return true;
                }
            })[0];    
            if(dt)       
            {                
                var dat=new Date(dt.modified);
                return dat.toLocaleDateString() ;
            }
            else
             return '';
        },
        imgId(){
              var dt= this.$store.state.imgModified.filter((el,ind)=>{
                if(ind+1==this.num){
                    return true;
                }
            })[0];    
            if(dt)       
            {                
              return parseInt(dt.fileId);
            }
            else
             return -1;
        },
         imgsLen(){return this.$store.state.imgLen;},
    },
    methods:{
        deleteImg(){
            this.isProcessing=true;                  
            this.$store.dispatch('deleteImg',this.imgId);
            setTimeout(()=>{
                this.isProcessing=false;                             
            },300);            
        }
    },
    watch:{
       
    }
}
</script>
<style scoped>
.card-image{
    max-height: 38vh;
    overflow: hidden;
}

</style>