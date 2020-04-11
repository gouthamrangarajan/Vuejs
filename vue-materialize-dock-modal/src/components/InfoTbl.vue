<template>
    <div class="container z-depth-1">
        <table class="striped">
            <thead>
                <th>Data</th>
                <th></th>
            </thead>
            <transition-group name="records" tag="tbody">
                <tr v-for="info in information" :key="info.id">
                    <td>{{info.data}}</td>
                    <td><i class="tiny material-icons" @click="startEdit(info.id)">create</i></td>
                </tr>
            </transition-group>
        </table>
    </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
    name:'InfoTbl',
    computed:{
        ...mapState(['information'])
    },
    methods:{
        ...mapActions(['startEdit'])
    }
}
</script>
<style scoped>
.container{
    max-height: 70vh;
    overflow-y:auto;
    overflow-x:hidden;
    padding:0.5rem;
}
.records-move{
    transition: all 0.3s;
}
.records-enter-active,
.records-leave-active{
    transition:all 0.3s;
}
.records-enter,
.records-leave-to{
    opacity: 0;
    transform: translateX(2px);
}
i{
    cursor:pointer;
}

</style>