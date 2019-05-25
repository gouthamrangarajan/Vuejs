<template>
  <div>
     <div class="container">
      <div class="column is-10">
        <div class="card">
  <header class="card-header">
    <p class="card-header-title">
      To Do List
    </p>
     </header>
  <div class="card-content">
     <transition-group name="list" tag="ol" appear>
       <li v-for="(item,ind) in  items" :key="item.id"
           :is="listItemCompName[ind]"
           :value="item.completed"
           :data="item.name"
           @edit-clicked="editItem(item.id)"
           v-model="item.completed"
           @cancel="item.edit=false"
           @change="changeItemName(item.id,...arguments)">       
       </li>
    </transition-group>
  </div>
  <footer class="card-footer">
    <a class="card-footer-item" @click="addItem">
      <i class="fa fa-plus"></i>&nbsp;Add</a>
  </footer>
</div>
      </div>
     </div>
  </div>
</template>

<script>
import listItem from './components/listItem'
import listItemEdit from './components/listItemEdit'

export default {
  name: 'app',
  components: {
      listItem,
      listItemEdit     
  },
  data(){
      return {message:'hi',
            items:[{id:1,name:'Sample Item',completed:false,edit:false}],
              maxId:2
           }
  },
  methods:{
    addItem(){
      this.items.push({id:this.maxId,name:'Item Name',completed:false,edit:false});
      this.maxId++;
    },
    editItem(id){     
      this.items.filter(el=>el.id==id)[0].edit=true;
    },
    completeChanged(id){
      this.items.filter(el=>el.id==id)[0].edit=false;
      this.items.filter(el=>el.id==id)[0].completed=
        !this.items.filter(el=>el.id==id)[0].completed;
    },
    changeItemName(id,value){
       var item= this.items.filter(el=>el.id==id)[0];
      item.edit=false;
      item.name=value;
    }
  },
  components:{
    listItem,
    listItemEdit
  },
  computed:{
    listItemCompName(){
      var ret=[];
      this.items.forEach(el=>{
        if(el.edit){
          ret.push('listItemEdit');
        }
        else
          {
            ret.push('listItem');
          }
      });
      return ret;
    }
  }
}
</script>

<style>
.container{
  padding-top:2rem;
}

#app{
  background: hsl(0, 0%, 96%);
  min-height:100vh;
}

.strike-through{
  text-decoration:line-through;
}

ol{
  margin-left:2rem;
}

ol li{
  padding:0.3rem;
}
.list-move{
  transition: all 0.5s;
}

.list-enter-active,.list-leave-active{
  transition:all 0.5s;
}

.list-enter,.list-leave-to{
  opacity:0;
  transform:translateX(1rem);
}

.fade-enter-active,.fade-leave-active{
  transition:opacity 0.5s;
}

.fade-enter,.fade-leave-to{
  opacity:0;  
}

</style>
