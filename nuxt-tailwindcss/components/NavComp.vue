<template>
    <nav :class="'py-2 px-4 flex justify-around h-12 shadow items-center '+bgColor">
        <div  v-for="item in menu" :key="item.id">
            <a :class="'text-lg text-white cursor-pointer '+textColor" @mouseover.stop="showInnerMenu(item.id)">
                {{item.name}}&nbsp;
                <i class="material-icons float-right mt-1">
                    keyboard_arrow_down
                </i>
            </a>
            <transition name="inner-menu">   
                <ul class="bg-white inner-menu absolute rounded shadow-md
                            mt-2 -ml-3 flex flex-col pt-1" v-show="item.showChildren">                 
                 <li v-for="child in item.children" :key="child.id" 
                    :class="'cursor-pointer px-4 py-2 text-gray-600 hover:text-white hover:'+bgColor">
                    <a  class="px-2 py-1 cursor-pointer">
                    {{child.name}}
                    </a>
                  </li>
                </ul>
            </transition>
        </div>   
    </nav>
</template>
<script>
export default {
    data(){
        return {
            menu:[
            {id:1,name:'Item 1',showChildren:false,children:[{id:11,name:'Item 11'},{id:12,name:'Item 12'},{id:13,name:'Item 13'}]},
            {id:2,name:'Item 2',showChildren:false,children:[{id:21,name:'Item 21'},{id:22,name:'Item 22'}]},
            {id:3,name:'Item 3',showChildren:false,children:[{id:31,name:'Item 31'},{id:32,name:'Item 32'}]},
            {id:4,name:'Item 4',showChildren:false,children:[{id:41,name:'Item 41'},{id:42,name:'Item 42'}]},
            ]
        }
    },
    props:{
        bgColor:{
            type:String,
            required:false,
            default:'bg-teal-700'
        },
        textColor:{
            type:String,
            required:false,
            default:'text-white'
        }
    },
    created(){
        if(process.client)
            window.addEventListener('click',this.hideInnerMenu)
    },
    destoryed(){
        if(process.client)
            window.removeEventListener('click',this.hideInnerMenu)
    },
    methods:{
        showInnerMenu(id){
            this.hideInnerMenu()
            this.menu.filter(el=>el.id==id)[0].showChildren=true
        },
        hideInnerMenu(){
            this.menu.forEach(el=>el.showChildren=false)
        }
    }
}
</script>
<style scoped>
.inner-menu::before{
  position:absolute;
  left:25%;
  content:"";
  border-width:0 10px 10px 10px;
  border-style:solid;
  border-color:transparent transparent rgba(255,255,255,var(--bg-opacity)) transparent ;
  margin-left:-8px;
  margin-top:-10px;
  border-radius:2px;
  transition:all 0.3s;
}

.inner-menu-enter-active,
.inner-menu-leave-active{
  transition:all 0.3s;
}

.inner-menu-enter,
.inner-menu-leave-to{
  opacity:0;
  transform:translateY(2px);
}
</style>