<template>
<div class="page">
<transition name="scale" appear>
<div class="column is-three-fifths is-offset-one-fifth message box">
    <div class="message-header">
        <p>Register</p>
    </div>
    <div class="message-body">
        <transition name="slide" appear>
        <div class="notification is-danger" v-if="showApiError">            
            <button class="delete" @click="showApiError=false"></button>
           Unknown error... Please check Api
        </div>
        </transition>
        <div class="field">        
            <label class="label">First Name</label>
            <div class="control">
                <input type="text" :class="{'input':true,'is-danger':firstNameInvalid}" 
                    v-model.trim.lazy="firstName" @keyup.enter="submit">
            </div>
            <transition name="fade">
                <p class="help is-danger" v-if="firstNameInvalid">*Please enter valid name</p>
            </transition>
        </div>
        <div class="field">        
            <label class="label">Last Name</label>
            <div class="control">
                <input type="text" :class="{'input':true,'is-danger':lastNameInvalid}"
                     v-model.trim.lazy="lastName" @keyup.enter="submit">
            </div>
            <transition name="fade">
                <p class="help is-danger" v-if="lastNameInvalid">*Please enter valid name</p>
            </transition>
        </div>
        <div class="field">
            <label class="label">Screens:</label>
            <div class="control">
                <label class="checkbox">
                    <input type="checkbox" v-model="screens" value="Home" @keyup.enter="submit">
                     Home
                </label>&nbsp;
                <label class="checkbox">
                    <input type="checkbox" v-model="screens" value="About" @keyup.enter="submit">
                    About
                </label>&nbsp;
                <label class="checkbox">
                    <input type="checkbox" v-model="screens" value="View1" @keyup.enter="submit">
                    View1
                </label>&nbsp;
                <label class="checkbox">
                    <input type="checkbox" v-model="screens" value="View2" @keyup.enter="submit">
                    View2
                </label>
            </div>
             <transition name="fade">
                <p class="help is-danger" v-if="screensInvalid">*Please select one or more screen(s)</p>
            </transition>
        </div>
        <div class="field">
            <div class="control is-expanded">
                <button :class="{'button is-link':true,'is-loading':isProcessing}" @click="submit">Submit</button>
            </div>
        </div>
    </div>
</div>
</transition>
</div>
</template>
<script>
export default {
    name:'register',
    data(){
        return {firstName:'',lastName:'',screens:[],firstNameInvalid:false,lastNameInvalid:false,
        screensInvalid:false,isProcessing:false,showApiError:false}
    },
    methods:{
        submit(){    
            if(!this.isProcessing){        
                this.firstNameInvalid=false;
                this.lastNameInvalid=false;
                this.screensInvalid=false;
                if(this.firstName=='' || this.lastName=='' || this.screens.length==0){
                    this.$nextTick(()=>{
                        if(this.firstName=='')
                            this.firstNameInvalid=true;
                        if(this.lastName=='')
                            this.lastNameInvalid=true;
                        if(this.screens.length==0)
                            this.screensInvalid=true;
                    });
                }
                else{
                    this.isProcessing=true;
                    this.$store.dispatch('registerUser',{firstName:this.firstName,lastName:this.lastName,screens:this.screens});
                }
            }
        }
    },
    watch:{
      firstName(newVal,oldVal){
          if(newVal!=''){
              this.firstNameInvalid=false;
          }
      },
      lastName(newVal,oldVal){
          if(newVal!=''){
              this.lastNameInvalid=false;
          }
      },
      screens:{
          deep:true,
          handler(newVal,oldVal){
              if(newVal.length>0){
                  this.screensInvalid=false;
              }
          }
      },
      strScreens:{
          deep:true,
            handler(newVal,oldVal){  
                if(newVal.length>0){                          
                    this.$router.push(newVal[0]);           
                }
            }
      },
      apiError(newVal,oldVal){
          if(newVal==true)
            this.showApiError=true;
          else
            this.showApiError=false;
      }
    },
    computed:{
        apiError(){
            return this.$store.state.apiError;
        },
        strScreens(){
           return this.$store.state.screens;
        }
    }
}
</script>
<style scoped>

.button{
    width:100%;
}
.slide-enter-active,.slide-leave-active{
    transition:all 0.5s;
}
.slide-enter,.slide-leave-to{
    transform: translateY(-2rem);
}
.page{
    background-color:hsl(0, 0%, 96%);
    height: 100vh;
    padding-top:12rem;
}
</style>

