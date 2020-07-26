<template>
    <div class="card bg-white rounded-t">
        <div class="py-4 px-6 h-24">            
            <a class="cursor-pointer underline text-blue-700 text-justify text-lg" @click="launch(project.url)">{{project.url}}</a>
            <template v-if="project.description">
                <p class="px-4 mt-1 text-justify text-sm text-gray-600">{{project.description}}</p>                 
            </template>
        </div>
        <template v-if="project.imgSrc">                            
            <img :src="project.imgSrc" class="rounded-b shadow object-contain">                            
        </template>
    </div>
</template>
<script>
export default {
    props:{
        project:{
            type:Object,
            required:true
        }
    },
    methods:{
         launch(url){
            window.open(url)
        }
    }
}
</script>
<style scoped>
.card{
    width:800px;
}
@media only screen and (max-width:991px) {
    .card{
        width:600px;
    }
}
</style>