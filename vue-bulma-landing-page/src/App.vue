<template>
  <div id="app">
     <section class="hero is-info is-bold is-medium">
    <div class="hero-head">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item is-family-sans-serif
                       is-size-2">
             Brand
          </a>         
        </div>
        <div class="navbar-menu is-active"><!-- is-active to keep it shown in mobile devices-->
          <div class="navbar-end">
           <a :class="{'navbar-item':true,
                      'is-active':mn.active}" 
              v-for="(mn,ind)  in menus" :key="ind"
              @click="setMenuActive(ind)">
              {{mn.name}}
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
     <div class="hero-body">
    <div class="container has-text-centered">
      <p class="title">
        Simple Landing Page
      </p>
      <p class="subtitle">
        Designed with Vue js & Bulma css
      </p>
    </div>
  </div>
      <div class="hero-foot">
    <nav class="tabs is-boxed is-fullwidth">
      <div class="container">
        <ul>
          <li v-for="(tb,ind) in tabs"  :key="ind"
              :class="{'is-active':tb.active}"
              @click="setTabActive(ind)">
            <a>{{tb.name}}</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
  </section>
  <section class="section">
  <transition name="fade" mode="out-in" appear>
    <!--Keep alive to cache -->
    <keep-alive>
      <tab1 v-if="tabs[0].active" key="1"></tab1>
      <tab2 v-if="tabs[1].active" key="2"></tab2>   
      <tab3 v-if="tabs[2].active" key="3"></tab3>   
      <tab4 v-if="tabs[3].active" key="4"></tab4>   
    </keep-alive>
  </transition>
      </section>
  </div>
</template>

<script>
import tab1 from './components/Tab1'
import tab2 from './components/Tab2'
import tab3 from './components/Tab3'
import tab4 from './components/Tab4'
export default {
  name: 'app',
  components: {
    tab1,tab2,tab3,tab4
  },
  data(){
    return {   
    menus:[
      {name:'Menu 1',active:true},
      {name:'Menu 2',active:false},
      {name:'Menu 3',active:false}
    ],
      tabs:[
      {name:'Tab 1',active:true},
      {name:'Tab 2',active:false},
      {name:'Tab 3',active:false},
      {name:'Tab 4',active:false}
    ]
    }
  },
  methods:{
    setMenuActive(ind){
      this.menus.forEach(el=>el.active=false);
      this.menus[ind].active=true;
    },
     setTabActive(ind){
      this.tabs.forEach(el=>el.active=false);
      this.tabs[ind].active=true;
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active{
  transition:opacity 0.5s;
}
.fade-enter,
.fade-leave-to{
  opacity:0;
}
</style>
