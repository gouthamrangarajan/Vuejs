<template>
<transition name="fade" appear>
    <div class="container">
      <h4>Simple template using</h4>
       <ul class="collection with-header">         
        <li v-for="item in collectionItems" :key="item.topic"
           :class="[item.header?'collection-header '+header:'collection-item']">
            <template v-if="item.header">
              <h5>{{item.topic}}</h5>
            </template>
            <template v-else>
              {{item.topic}}
            </template>            
           </li>        
      </ul>           
    </div>
</transition>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name:'About',
  data(){
    return {
      collectionItems:[
                      {topic:'Vue js',header:true},
                       {topic:'Vuex',header:false},
                      {topic:'Vue Router',header:false},
                      {topic:'Materialize css',header:true},
                      {topic:'Card',header:false},
                      {topic:'Colors',header:false},
                      {topic:'Nav',header:false},
                      {topic:'SideNav',header:false},
                      {topic:'Collection',header:false},
                      {topic:'Form',header:false},
                      {topic:'Icons',header:false},
                      {topic:'Google charts',header:true},
                      {topic:'Bar',header:false},
                      {topic:'Line',header:false}
                      ]
    }
  },
  computed:{
    ...mapState(['theme']), 
    header(){
        return this.theme.replace(/\s/g, '-text ').replace("darken-1","darken-4") 
    }  
  }
}
</script>