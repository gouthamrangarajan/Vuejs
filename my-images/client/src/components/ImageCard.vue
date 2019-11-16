<template>       
<div class="card" :id="'card'+num">
    <div class="card-image">
        <figure class="image" @click="$emit('imageSelected')">
         <img :src="'/imgs/'+num"/>
        </figure>
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
                    <div class="button is-success is-light" @click="deleteImg">Yes</div>
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
        return {showAlert:false}
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
                var dat=new Date(dt);
                return dat.toLocaleDateString() ;
            }
            else
             return '';
        }
    },
    methods:{
        deleteImg(){
            this.$store.dispatch('deleteImg',this.num);                     
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
    z-index:2;
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