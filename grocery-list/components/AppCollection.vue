<template>
  <div :class="{'card transparent':true,'large':!isMobile,'medium':isMobile}"  @dragover.prevent.stop @drop.prevent.stop="dropped">
    <div :class="{'card-content white-text':true,'active':active}" @mouseover.stop="active=true">
      <span class="card-title">{{header}}</span>
      <transition name="fade">
        <ul class="collapsible" :id="'collapse_'+id" v-show="showRecords">
            <li v-for="dt in items" :key="dt.id" draggable="true" :item-id="dt.id"  :id="'li_'+dt.id"  @dragstart="drag">
              <div :class="['collapsible-header',itemClass]">
                {{dt.name}}
                <span class="badge white-text">{{dt.count}}</span>
              </div>
              <AppCollapsibleBody :item="dt"></AppCollapsibleBody>
            </li>
        </ul>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    header:{
      type:String,
      required:true
    },
    items:{
      type:Array,
      required:true
    },
    id:{
      type:Number,
      required:true
    }
  },
  data(){
    {return {active:false,isMobile:false,showRecords:true}}
  },
  components:{
    AppCollapsibleBody:()=>import('@/components/AppCollapsibleBody.vue')
  },
  methods:{
    initializeCollapsible(){
      let elem = document.getElementById('collapse_'+this.id)
      let instance = M.Collapsible.init(elem, {})
    },
    toggleRecords(){
      this.showRecords=false
      setTimeout(()=>{
        this.showRecords=true
      },300)
    },
    dropped(ev){
      let data = ev.dataTransfer.getData("text")
      // this.toggleRecords()
      this.$nextTick(()=>{this.$store.dispatch('updateItemStatus',{data:{id:data,status:this.header}})})
    },
    drag(ev){
      ev.dataTransfer.setData("text", ev.target.attributes['item-id'].value)
    },
    setInactive(){
      this.active=false
    }

  },
  created(){
    if(process.client && window){
      window.addEventListener('mouseover',this.setInactive)
      if(window.innerWidth<992)
        this.isMobile=true
    }
  },
  destroyed(){
    if(window){
       window.removeEventListener('mouseover',this.setInactive)
    }
  },
  watch:{
    items:{
      deep:true,
      immediate:true,
      handler(){
        if(process.client){
          setTimeout(()=>{
            this.initializeCollapsible()
          },600)
        }
      }
    }
  },
  computed:{
    itemClass(){
      let ret='pending'
      switch(this.header){
        case 'Bought':{
          ret='completed'
          break
        }
      }
      return ret
    },
  }
}
</script>
<style scoped>
.card-content{
  overflow-y:auto!important;
}
.card-content::-webkit-scrollbar {
  width: 0.25rem;  
}
 
.card-content::-webkit-scrollbar-thumb {
  background-color:#00bcd4;
  outline: 1px solid #00bcd4;
  border-radius:5px;
}
.pending{
  background: linear-gradient(.25turn,#c2185b,#7b1fa2) ;
}

.completed{
  background: linear-gradient(.25turn,#388e3c,#00796b ) ;
}



ul{
  border-radius: 2px;
}
</style>
