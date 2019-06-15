<template>
  <div id="app">
    <nav-bar></nav-bar>
    <modal :showModal="showModal" @closeModal="showModal=false" :date="selectedDate"/>
    <confirm-delete :showModal="confirmDelete" @closeModal="confirmDelete=false" @confirm="deleteEvent"></confirm-delete>
    <div class="container">
      <calendar @clicked="calendarClicked" @deleteClicked="showConfirm"></calendar>
      <p class="has-text-danger is-size-7">* Click on current month date(s) to add event...</p>
    </div>
  </div>
</template>

<script>
import modal from './components/Modal'
import calendar from './components/Calendar'
import navBar from './components/NavBar'
import confirmDelete from './components/ConfirmDelete'
export default {
  name: 'app',
  components: {
    calendar,navBar,modal,confirmDelete
  },
   data(){
    return {showModal:false,selectedDate:new Date(),confirmDelete:false,deleteId:0};
  },
  methods:{
    calendarClicked(dat){
      this.showModal=true;
      this.selectedDate=dat;
      this.deleteId=0;
    },
    showConfirm(id){
      this.deleteId=id;
      this.confirmDelete=true;
    },
    deleteEvent(){
      this.$store.dispatch({type:'deleteEvent',id:this.deleteId});
    }
  }
}
</script>

<style>
.container{
  padding-top:6rem;
}
.fade-enter-active,.fade-leave-active{
  transition:opacity 0.5s;
}
.fade-enter,.fade-leave-to{
  opacity: 0;
}
.scale-move{
  transition: all 0.5s;
}
.scale-enter-active,.scale-leave-active{
  transition:all 0.5s;
}
.scale-enter,.scale-leave-to{
  transform: scale(0);
}
</style>
