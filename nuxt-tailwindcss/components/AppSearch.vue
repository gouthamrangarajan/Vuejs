<template>
    <div>
        <div class="mr-2 inline-flex justify-end">                        
            <input type="text" class="bg-gray-200 focus:bg-gray-300 rounded-l px-4 py-2 outline-none"
                v-model.trim="searchTxt" @focus="showSrchedItems=true"
                @click.stop="showSrchedItems=true"  @keyup="showSrchedItems=true"
                placeholder="Search..." ref="input"/> 
            <span class="icon bg-gray-200 rounded-r px-4 py-2 cursor-pointer"
                 @click.stop="iconClicked">
                <transition name="fade" mode="out-in">
                    <i class="material-icons" v-if="searchTxt==''" :key="1">search</i>
                    <i class="material-icons" v-else :key="2">close</i>
                </transition>
            </span>       
        </div>
        <transition name="slide" appear>
            <div class="absolute" v-show="showSrchedItems && ftItems.length>0" @click.stop>
                <div class="shadow bg-white tbl-container">
                    <table class="table-auto">
                        <transition-group name="records" tag="tbody">
                            <tr v-for="(item,index) in ftItems" :key="item.id" @click.stop="$router.push({path:item.path})"
                                :class="{'cursor-pointer':true,'bg-gray-100':isEven(index+1)}">
                                <td  class="border px-4 py-2 hover:text-indigo-700">{{item.name}}</td>                           
                            </tr>                   
                        </transition-group>
                    </table>  
                </div>   
            </div>       
        </transition>        
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return {showSrchedItems:false}
    },
    mounted(){
        if(process.client && window){
            window.addEventListener('click',this.hideSrchedItems)
            window.addEventListener('scroll',this.hideSrchedItems)
        }
    },
    destroyed(){
        if(process.client && window){
            window.removeEventListener('click',this.hideSrchedItems)
            window.removeEventListener('scroll',this.hideSrchedItems)
        }
    },
    computed:{
        searchTxt:{
            get(){
                return this.$store.state.srchTxt
            },
            set(value){
                this.$store.dispatch('setSrchTxt',value)
            }
        },
        ...mapGetters(['ftItems'])
    },
     methods:{
       hideSrchedItems(){
           this.showSrchedItems=false
       },    
       isEven(ind){
           return ind%2==0
       },
       iconClicked(){
           this.$refs.input.focus()
           if(this.searchTxt.length>0){
               this.$store.dispatch('setSrchTxt','')
           }
       }
    },
    watch:{
        $route(){
            this.showSrchedItems=false
        }
    }
}
</script>
<style scoped>
@media only screen and (max-width:991px){
 div{
     display: none;
 }
}

input{
    width:25rem;
}

table{
    width:17rem;
}
.tbl-container::before{
  position:absolute;
  left:10%;
  content:"";
  border-width:0 8px 8px 8px;
  border-style:solid;
  border-color:transparent  transparent #ffffff transparent ;
  margin-top:-7px;
  border-radius:2px;
}
input,.icon{
    transition:all 0.5s;
}
.slide-enter-active,
.slide-leave-active{
    transition: all 0.3s;
}
.slide-enter,
.slide-leave-to{
    opacity:0;
    transform: translateY(-2px);
}
</style>