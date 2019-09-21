<template>
<div class="field has-addons">
    <div class="control is-expanded">
    <input class="input" placeholder="Search..." v-model.trim="ftText"/>
    </div>
    <div class="control">
    <a class="button is-dark" @click="ftText=''"><i class="fa fa-times"></i></a>
    </div>
</div>
</template>
<script>
import {debounce} from "debounce"
export default {
    name:'TblFilter',
    created(){
        this.debouncedFilterData=debounce(this.filterData,500);
        this.$store.dispatch('employees/getPageData',1);
    },
    data(){
        return {ftText:''}
    },
    watch:{
        ftText:{          
            //RG immediate doesn't work well debounce  
            handler(newVal,oldVal){
                this.debouncedFilterData(newVal);
            }
        }           
        
    },
    methods:{
        filterData(val){            
            this.$store.dispatch('employees/setfilterTxt',val);
            this.$store.dispatch('employees/getPageData',1);
        }
    }

}
</script>