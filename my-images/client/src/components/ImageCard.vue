<template>       
<div class="card" :id="'card'+num">
    <div class="card-image">
        <transition name="fade">
            <figure class="image" @click="$emit('imageSelected')" v-if="imgId>0">
                <img :src="'/imgs/'+imgId"/>
            </figure>
        </transition>
    </div>
    <div class="card-content">
        <div class="content">             
            <p>{{uploaded}}</p>         
        </div>              
    </div>
    <div class="card-footer">
      <transition name="alert">
         <div class="message is-danger" v-show="showAlert">
            <div class="message-body">
                Are you sure? Once deleted it cannot be undone.
                <div class="buttons">
                    <div :class="{'button is-success':true,'is-loading':isProcessing,'is-light':!isProcessing}"
                         @click="deleteImg">Yes</div>
                    <div class="button" @click="showAlert=false">No</div>
                </div>
            </div>
        </div>
      </transition>
        <a class="card-footer-item button is-danger is-outlined" @click="showAlert=true">Remove</a>
    </div>
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
        return {showAlert:false,isProcessing:false}
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
                this.showAlert=false;
            },300);
        }
    },
    watch:{
        imgsLen(newVal,oldVal){        
            if(newVal<oldVal){
                this.$forceUpdate();                    
            }
      }
    }
}
</script>
<style scoped>
img{
    cursor: pointer;
}
.card:hover{
    box-shadow:0 10px 16px rgba(0, 0, 0, .13), 0 6px 6px rgba(0, 0, 0, .19);
}
.card-image{
    max-height: 43vh;
    overflow: hidden;
}
.message{
    position:absolute;
    z-index:101;
}
.alert-enter-active,
.alert-leave-active{
    transition:all 0.3s;
}
.alert-enter,.alert-leave-to{
    opacity: 0;
    transform: translateX(-1rem);
}
</style>