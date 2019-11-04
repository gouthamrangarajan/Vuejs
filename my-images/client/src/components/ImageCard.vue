<template>       
<div class="card" :id="'card'+num">
    <div class="card-image">
        <figure class="image" @click="$emit('imageSelected')">
         <img :src="'/imgs/'+num"/>
        </figure>
    </div>
    <div class="card-content">
        <div class="content">
            <h4>Uploaded</h4>    
            <p>{{uploaded}}</p>
        </div>
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
    computed:{
        uploaded(){
            var dt= this.$store.state.imgModified.filter((el,ind)=>{
                if(ind+1==this.num){
                    return true;
                }
            })[0];    
            if(dt)        
                return dt.substr(0,16).replace("T"," ");
            else
             return '';
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
</style>