<template>
   <div class="is-modal"
       v-show="showModal">
    <div class="modal-background"></div>
    <transition name="modal">
    <div class="modal-card is-pulled-right" v-show="animateModal">
    <header class="modal-card-head">
      <p class="modal-card-title">
        <transition name="fade" mode="out-in">
          <span v-if="isUpdate" key="1">Update Event</span>
          <span v-else key="2">Add New Event</span>
        </transition>
      </p>
      <button class="delete" aria-label="close"
             @click="animateModal=false"></button>
    </header>
    <section class="modal-card-body">     
     <div class="field dateField">
       <label class="label">Date:</label>
       <div class="control">
        <input class="input" type="text"  disabled :value="fmtDate">
      </div>
     </div>
     <div class="field">
       <label class="label">Description:</label>
       <div class="control">
        <input :class="['input',color]" type="text" placeholder="event..."  v-model.trim="description">
         <transition name="scale">
          <p class="help is-danger" v-if="descriptionInvalid">Please enter valid event</p>
         </transition>
      </div>
     </div>
     <div class="field colorField">
       <label class="label">Color:</label>
      <div class="control">
        <label class="radio">
          <input type="radio" name="color" value="is-success" v-model="color">
          Green
        </label>
         <label class="radio">
          <input type="radio" name="color" value="is-primary" v-model="color">
          Dark Green
        </label>
        <label class="radio">
          <input type="radio" name="color" value="is-danger" v-model="color">
          Red
        </label>
        <label class="radio">
          <input type="radio" name="color" value="is-warning" v-model="color">
          Yellow
        </label>
         <label class="radio">
          <input type="radio" name="color" value="is-info" v-model="color">
          Blue
        </label>
         <label class="radio">
          <input type="radio" name="color" value="is-link" v-model="color">
          Dark Blue
        </label>
      </div>
      </div>
      <div class="field  is-grouped">
        <div class="control">
          <transition name="fade" mode="out-in">
            <button :class="{'button is-primary':true,'is-loading':isProcessing}" @click="addEvent" v-if="isUpdate" key="1">            
              <span class="icon">
                <i class="fas fa-save"></i>
              </span>
              <span>Save</span>
            </button>          
            <button :class="{'button is-primary':true,'is-loading':isProcessing}" @click="addEvent" v-else key="2">
              <span class="icon">
                <i class="fas fa-plus"></i>
              </span>
              <span>Add</span>
            </button>          
          </transition>
        </div>     
        <transition name="fade">
         <div class="control" v-if="isUpdate">
           <button :class="{'button is-danger':true,'is-loading':isProcessing}" @click="showConfirmMsg=true">
             <span class="icon">
               <i class="fas fa-trash"></i>
             </span>
              <span>Delete</span>
            </button>
        </div>
        </transition> 
        <div class="control">
          <button class="button is-text"  @click="animateModal=false">Cancel</button>
        </div>  
      </div>   
       <transition name="slide">
        <article class="message is-danger" v-if="isUpdate && showConfirmMsg">
          <div class="message-header">
            <p>Wait...</p>
            <button class="delete" aria-label="delete" @click="showConfirmMsg=false"></button>
          </div>
          <div class="message-body">
            <p class="content">Are you sure?</p>
            <div class="field is-grouped">
              <div class="control">
                <div class="button is-outlined is-success" @click="deleteEvent">Yes</div>
              </div>
              <div class="control">
                <div class="button is-outlined is-dark" @click="showConfirmMsg=false">No</div>
              </div>
            </div>
          </div>
        </article>
      </transition>
    </section>
    
  </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: {
    showModal:{
      type:Boolean,
      required:true
    },
    date:{
      type:Date,
      required:true
    },
    eventId:{
      type:Number,
      required:true
    }
  },
  computed:{
    fmtDate(){
      var year = this.date.getFullYear();
      var month = (1 + this.date.getMonth()).toString().padStart(2, '0');
      var day = this.date.getDate().toString().padStart(2, '0');
      return month + '/' + day + '/' + year;
    }
  },
  data(){
    return {animateModal:false,description:'',color:'is-danger',isProcessing:false,
     descriptionInvalid:false,isUpdate:false,showConfirmMsg:false}
  },
  watch:{
    showModal(newVal,oldVal){
      if(newVal==true){
        this.$nextTick(()=>{
           this.animateModal=newVal;
        });
      }      
    },  
    animateModal(newVal,oldVal){
      if(newVal==false){
        setTimeout(()=>{
          this.$emit('closeModal');
        },500);
      }
    },
    eventId(newVal,oldVal){      
      if(newVal>0){
        this.isUpdate=true;
        var dt=this.$store.getters.findEvent(this.eventId)
        this.description=dt.name;
        this.color=dt.color;
        this.showConfirmMsg=false;
      }
      else{
        this.isUpdate=false;
      }
    }
  },
  methods:{
    addEvent(){
      this.isProcessing=true;
      this.descriptionInvalid=false;
      if(this.description==''){
        this.$nextTick(()=>{
            this.isProcessing=false;
            this.descriptionInvalid=true;
        });
      }
      else{
         this.$nextTick(()=>{
           if(this.isUpdate){
             this.$store.dispatch({type:'updateEvent',name:this.description,date:this.date,fullDay:true,color:this.color,id:this.eventId});
           }
           else{
            this.$store.dispatch({type:'addEvent',name:this.description,date:this.date,fullDay:true,color:this.color});
           }
          this.isProcessing=false;
          this.animateModal=false;
         });
      }
    },
    deleteEvent(){
      this.showConfirmMsg=false;
      this.isProcessing=true;
       this.$nextTick(()=>{
          this.$store.dispatch({type:'deleteEvent',id:this.eventId});
           this.isProcessing=false;
          this.animateModal=false;
       });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.is-modal{
  position:fixed;
  height:100%;
  width:100%;
  z-index:200;
}
.modal-card{
   min-height:100vh;
}

.modal-enter-active,
.modal-leave-active{
  transition:all 0.5s;
}

.modal-enter,
.modal-leave-to{
  transform:translateX(50rem);
}

.slide-enter-active,.slide-leave-active{
  transition:all 0.5s;
}
.slide-enter,.slide-leave-to{
  transform: translateY(-2rem);
}
</style>