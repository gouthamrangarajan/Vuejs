<template>
   <nav class="h-40">
        <div class="banner h-40 lg:h-48 flex flex-row justify-between">
            <div class="flex flex-col items-center pt-6 lg:pt-12 w-full pl-2 lg:pl-40">
                <span class="banner__heading text-2xl  text-white">
                    Goutham Rangarajan
                </span>
                <span class="banner__heading text-lg text-white italic">
                    RG
                </span>
            </div>
            <img src="@/assets/my-avatar.jpg" class="cursor-pointer rounded-full object-contain h-24 lg:h-32 mt-1 mr-1" @click="showModal=true">
            <imgModal v-model="showModal"></imgModal>
        </div>
   </nav>
</template>
<script>
export default {
    data(){
        return{showModal:false}
    },
    components:{
        imgModal:()=>import('@/components/ImgModal')
    }
}
</script>
<style scoped>
.banner{
    background: linear-gradient(#000,#f7fafc);
}
</style>