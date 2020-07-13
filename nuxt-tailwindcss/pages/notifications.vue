<template>
  <div>
    <div class="notification-container">
      <transition :name="transition" appear>
        <a :class="[colorClass+' '+positionClass+' fixed px-4 py-2 rounded z-10 cursor-pointer shadow-lg font-semibold']"
            v-show="show">
            {{notificationMsg}}
            <transition name="fade" appear>
              <span :class="['icon float-right ml-2 -mr-3 -mt-2 p-1',isoutlined && !isInversed ? 'text-yellow-700':'text-yellow-500']" 
                v-show="dismissible" @click.stop="dismiss">
                <i class="material-icons font-semibold">close</i>
              </span>
            </transition>
        </a>  
      </transition>
    </div>
    <div class="flex flex-col items-start bg-white shadow rounded py-6 px-12 md:w-2/3 lg:w-3/5 m-auto overflow-x-hidden">             
      <label class="text-xl text-purple-700">Configuration:</label>  
      <hr class="w-full mb-4"/>      
      <span class="text-lg text-orange-700 px-1">Notification Type:</span> 
      <div class="grid grid-cols-2 gap-4 w-full mt-1 items-center px-2">
         <div class="flex flex-col">       
          <div>
            <input type="radio" name="type" class="cursor-pointer" v-model="color" value="green"><span class="ml-2">Success</span>
          </div>
          <div>
            <input type="radio" name="type" class="cursor-pointer" v-model="color" value="blue"><span class="ml-2">Processing</span>
          </div>
          <div>
            <input type="radio" name="type" class="cursor-pointer" v-model="color" value="red"><span class="ml-2">Error</span>
          </div>          
        </div>
        <div class="flex flex-col">                 
          <div>
            <input type="checkbox" name="isOultine" class="cursor-pointer" v-model="isoutlined"><span class="ml-2">Outlined</span>            
          </div>
          <div>
            <input type="checkbox" name="isInverse" :class="[isoutlined?'cursor-pointer':'cursor-not-allowed']" 
              :disabled="!isoutlined"  v-model="isInversed"><span class="ml-2">Inverse</span>
          </div>
        </div>
        <div class="flex flex-row">                 
          <div>
            <input type="checkbox" name="isDismiss" class="cursor-pointer" v-model="dismissible"><span class="ml-2">Dismissible?</span>
          </div>
        </div>
      </div>  
      <hr class="w-full mb-4 mt-1"/>  
      <span class="text-lg text-orange-700 px-1 mt-1">Position & Animation:</span> 
       <div class="grid grid-cols-2 gap-4 w-full mt-1 items-center px-2">
         <div class="flex flex-col">       
          <div>
            <input type="radio" name="position" class="cursor-pointer" v-model="position" value="top"><span class="ml-2">Top Right</span>
          </div>
          <div>
            <input type="radio" name="position" class="cursor-pointer" v-model="position" value="bottomRight"><span class="ml-2">Bottom Right</span>
          </div>
          <div>
            <input type="radio" name="position" class="cursor-pointer" v-model="position" value="bottomLeft"><span class="ml-2">Bottom Left</span>
          </div>          
         </div>
         <div class="flex flex-col">                 
          <div>
            <input type="radio" name="animation" class="cursor-pointer" v-model="transition" value="slide-up"><span class="ml-2">Slide Up</span>
          </div>
          <div>
            <input type="radio" name="animation" :class="[position=='bottomLeft'?'cursor-not-allowed':'cursor-pointer']" 
              v-model="transition"  :disabled="position=='bottomLeft'" value="slide-left"><span class="ml-2">Slide Left</span>
          </div>   
          <div>
            <input type="radio" name="animation" :class="[position!='bottomLeft'?'cursor-not-allowed':'cursor-pointer']" 
              v-model="transition"  :disabled="position!='bottomLeft'" value="slide-right"><span class="ml-2">Slide Right</span>
          </div>   
          <div>
            <input type="radio" name="animation" class="cursor-pointer" v-model="transition" value="fade"><span class="ml-2">Fade</span>
          </div>              
         </div>       
      </div>    
      <div class="flex flex-row justify-center items-center w-full mt-8">
        <a :class="{'cursor-wait':animateBtnClicked,'cursor-pointer w-full text-center rounded py-2 px-4 bg-gray-700 hover:bg-gray-800 text-white font-semibold shadow':true}"
          @click="toggle">
            Animate
        </a>      
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {show:true,transition:'slide-up',color:'green',isoutlined:false,dismissible:false,
      animateBtnClicked:false,position:'top',isInversed:false}
  },
  mounted(){
    
  },
  methods:{
    toggle(){
      this.animateBtnClicked=true
      this.dismiss()  
      setTimeout(()=>{
        this.show=true
        this.animateBtnClicked=false
      },600)      
    },
    dismiss(){
      if(this.position.indexOf('bottom')==-1)
        this.transition=this.transition+'-opp'
      this.$nextTick(()=>{this.show=false})
      setTimeout(()=>{
        this.transition=this.transition.replace(/-opp/g,'')
      },300)
    }
  },
  computed:{
    colorClass(){
        if(!this.isoutlined){         
          return 'bg-'+this.color+'-700 hover:bg-'+this.color+'-800 text-white'            
        }
        else{
          if(!this.isInversed)
            return 'bg-white text-'+this.color+'-700'
          else
            return 'bg-gray-700 hover:bg-gray-800 text-'+this.color+'-300'
        }
    },
    notificationMsg(){
      let dt='Success...'
      switch(this.color){
        case 'blue':
        case 'indigo':{
          dt='Processing...'
          break
        }
        case 'red':{
          dt='Error...'
          break
        }          
      }
      return dt
    },
    positionClass(){
      let dt='top-0 mt-16 right-0 mr-5'
      switch(this.position){
        case 'bottomRight':{
          dt='bottom-0 right-0 mr-5 mb-1'
          break
        }
        case 'bottomLeft':{
          dt='bottom-0 left-0 ml-5 mb-1'
          break
        }
      }
      return dt
    },   
  }, 
  watch:{
    isoutlined(newVal,oldVal){
      if(!newVal)
        this.isInversed=newVal
    },
    position(newVal,oldVal){
      switch(newVal){
        case 'top':
        case 'bottomRight':{
          if(this.transition=='slide-right')
            this.transition='slide-up'     
          break
        }
       case 'bottomLeft':{
         if(this.transition=='slide-left')
            this.transition='slide-up'     
         break
       }
      }             
    }
  }
  
}
</script>
<style scoped>
.slide-up-enter-active,
.slide-up-leave-active,
.slide-up-opp-enter-active,
.slide-up-opp-leave-active,
.slide-left-enter-active,
.slide-left-leave-active,
.slide-left-opp-enter-active,
.slide-left-opp-leave-active,
.fade-opp-enter-active,
.fade-opp-leave-active,
.slide-right-enter-active,
.slide-right-leave-active,
.slide-right-opp-enter-active,
.slide-right-opp-leave-active{
  transition:all 0.3s;
}
.slide-up-enter,
.slide-up-leave-to{
  opacity:0;
  transform: translateY(45rem);
}
.slide-left-enter,
.slide-left-leave-to{
  opacity:0;
  transform: translateX(15rem);
}

.slide-right-enter,
.slide-right-leave-to{
  opacity:0;
  transform: translateX(-15rem);
}
.slide-up-opp-enter,
.slide-up-opp-leave-to{
  opacity:0;
  transform: translateY(-15rem);
}

.slide-left-opp-enter,
.slide-left-opp-leave-to{
  opacity:0;
  transform: translateX(15rem);
}

.slide-right-opp-enter,
.slide-right-opp-leave-to{
  opacity:0;
  transform: translateX(15rem);
}

.fade-opp-enter,
.fade-opp-leave-to{
  opacity:0;
}
.icon i {
  font-size:1rem;
}
</style>