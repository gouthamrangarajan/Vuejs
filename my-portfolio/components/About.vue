<template>
    <div class="flex w-full items-center justify-center">
        <div class="flex flex-col items-start rounded px-6 py-4 shadow bg-white">
            <span class="text-teal-700  text-xl">About</span>
            <p class="text-md">{{about}}</p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {about:''}
    },
    created(){
        let data=require('@/static/data.json')        
        this.about=data.info.about
    },
}
</script>