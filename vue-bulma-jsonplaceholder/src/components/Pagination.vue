<template>
     <transition name="fade" appear>
        <div class="column columns is-centered is-vcentered" v-show="info.display">        
            <div class="column is-2 is-offset-7">              
                    <div :class="{'dropdown is-active':true,'is-up':toggleUp}">
                        <div class="dropdown-trigger">
                            <button class="button" aria-haspopup="true" @click.stop="showPgLenList=!showPgLenList">
                            <span>Show {{info.length}} entries</span>
                            <span class="icon is-small">
                                <template v-if="toggleUp">
                                    <i class="fas fa-angle-up" aria-hidden="true"></i>
                                </template>
                                <template v-else>
                                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                                </template>
                            </span>
                            </button>
                        </div>
                        <transition name="scale">
                            <div class="dropdown-menu" role="menu" v-show="showPgLenList">
                                <div class="dropdown-content">
                                    <a :class="{'dropdown-item':true,'is-active':pgLen==info.length}" 
                                       v-for="pgLen in info.pgLenList" :key="pgLen"
                                        @click="$emit('changeLen',pgLen)">
                                        {{pgLen}}
                                    </a>                                    
                                </div>
                            </div>
                        </transition>
                    </div>
            </div>            
            <div class="column is-3">    
                <div class="box">
                    <nav class="pagination" role="navigation" aria-label="pagination">
                        <a class="pagination-previous" :disabled="info.isFirstPage" @click="$emit('decrease')"><i class="fas fa-angle-left"></i></a>
                        <a class="pagination-next" :disabled="info.isLastPage" @click="$emit('increase')"><i class="fas fa-angle-right"></i></a>
                        <ul class="pagination-list">
                            <li>
                                <a> {{info.fromTo}} of {{info.total}}</a>
                            </li>               
                        </ul>
                    </nav>  
                </div>    
            </div>
        </div>
      </transition>
</template>
<script>
export default {
    mounted(){
        window.addEventListener("click",this.hideDropDown);
    },
    beforeDestroy(){
        window.removeEventListener("click",this.hideDropDown);
    },
    data(){
        return {showPgLenList:false}
    },
    methods:{
        hideDropDown(){
            this.showPgLenList=false;
        }
    },
    props:{
        info:{
            type:Object,
            required:true
        } ,
        toggleUp:{
            type:Boolean,
            required:false
        }       
    }
}
</script>
<style scoped>
.box{
    padding-top:0;
    padding-bottom:0;
}
</style>