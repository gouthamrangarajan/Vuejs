<template>
<transition name="nav-slide" appear>
  <div>
    <div class="navbar-fixed">
    <nav class="white">
      <div class="nav-wrapper row">
        <div class="col s10 l6">
          <transition name="nav-slide">
            <div class="input-field" v-show="showSearch">
              <input id="search" type="search" required placeholder="search" v-model.trim="searchTxt">
              <label class="label-icon" for="search"><i class="material-icons black-text">search</i></label>
              <i class="material-icons" @click="searchTxt=''">close</i>
            </div>
          </transition>
        </div>
        <div class="col l6 s2">
            <a data-target="side-nav" class="sidenav-trigger"><i class="material-icons teal-text text-darken-4">menu</i></a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li :class="{'active':$route.path=='/'}"><nuxt-link to="/"
                 class="waves-effect waves-teal teal-text text-darken-4">Home</nuxt-link></li>
              <li :class="{'active':$route.path=='/posts'}"><nuxt-link to="/posts"
                class="waves-effect waves-teal teal-text text-darken-4">Posts</nuxt-link></li>
              <li :class="{'active':$route.path=='/albums'}"><nuxt-link to="/albums"
                 class="waves-effect waves-teal teal-text text-darken-4">Albums</nuxt-link></li>
              <li :class="{'active':$route.path=='/users'}"><nuxt-link to="/users"
                class="waves-effect waves-teal teal-text text-darken-4">Users</nuxt-link></li>
              <li :class="{'active':$route.path=='/todos'}"><nuxt-link to="/todos"
                class="waves-effect waves-teal teal-text text-darken-4">Todos</nuxt-link></li>
            </ul>
        </div>
      </div>
    </nav>
    </div>
    <ul class="sidenav" id="side-nav">
          <li><div class="user-view"></div></li>
          <li><a class="sidenav-close" ref="closeSideNav" v-show="false">
            Clicking this will close Sidenav</a></li>
          <li :class="{'active':$route.path=='/'}"><nuxt-link to="/"
             class="waves-effect waves-teal teal-text text-darken-4">Home</nuxt-link></li>
          <li :class="{'active':$route.path=='/posts'}"><nuxt-link to="/posts"
             class="waves-effect waves-teal teal-text text-darken-4">Posts</nuxt-link></li>
          <li :class="{'active':$route.path=='/albums'}"><nuxt-link to="/albums"
             class="waves-effect waves-teal teal-text text-darken-4">Albums</nuxt-link></li>
          <li :class="{'active':$route.path=='/users'}"><nuxt-link to="/users"
             class="waves-effect waves-teal teal-text text-darken-4">Users</nuxt-link></li>
          <li :class="{'active':$route.path=='/todos'}"><nuxt-link to="/todos"
             class="waves-effect waves-teal teal-text text-darken-4">Todos</nuxt-link></li>
      </ul>
  </div>
</transition>
</template>
<script>
export default {
  name:'NavBar',
  mounted(){
    if(window.innerWidth<993){
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, {});
    }
  },
  computed:{
      searchTxt:{
          get(){
              return this.$store.state.searchTxt;
          },
          set(value){
              this.$store.dispatch('search',value);
          }
      },
      showSearch(){
        if(this.$route.fullPath=='/')
          return false
        return true
      }
  },
  watch:{
    $route(){
      this.searchTxt='';
      if(window.innerWidth<993){
        this.$refs.closeSideNav.click()
      }
    }
  }
}
</script>
<style scoped>
nav{
  line-height: 3rem;
  height: 3rem;
}
.input-field{
  height: 2.3rem;
}
i{
  margin-top:-0.5rem;
  cursor: pointer;
}
.input-field i{
  margin-top:-1rem;
}
.input-field input{
  margin-top:0.5rem!important;
}
.nav-slide-enter-active,
.nav-slide-leave-active{
  transition: all 0.3s;
}
.nav-slide-enter,
.nav-slide-leave-to{
   transform:translateY(-45rem);
}
li.active{
  background-color: #004d40!important;
}
li.active a{
  color: #fff!important;
}
</style>
