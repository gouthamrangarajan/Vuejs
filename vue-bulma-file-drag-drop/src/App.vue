<template>
  <div id="app">
    <NavBar></NavBar>    
    <div class="margin-top-6">
      <FilesContainer></FilesContainer>    
    </div>
  </div>
</template>

<script lang="ts">
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Component, Vue } from 'vue-property-decorator';
import NavBar from './components/NavBar.vue';
import FilesContainer from './components/FilesContainer.vue'

@Component({
   components: {
    NavBar,FilesContainer
  }
})
export default class App extends Vue {
 
}
</script>

<style>
.fade-enter-active,
.fade-leave-active{
  transition:all 0.3s;
}
.fade-enter,.fade-leave-to{
  opacity: 0;
}
.margin-top-6{
  margin-top:6rem;
}
.item-move{
  transition:all 0.3s;
}

.item-enter-active,
.item-leave-active{
  transition:all 0.3s;
}

.item-enter,
.item-leave-to{
  opacity:0;
  transform:translateX(1rem);
}
</style>
