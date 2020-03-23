<template>
  <div class="navbar-fixed">
    <nav class="white">
      <div class="nav-wrapper row">
        <div class="col s5">
          <transition name="fade" appear>
            <div class="input-field" v-show="showSearch">
              <input type="search" required placeholder="search" v-model.trim="srchTxt">
              <label class="label-icon" for="search"><i class="material-icons">search</i></label>
              <i class="material-icons hide-on-med-and-down" @click="srchTxt=''">close</i>
            </div>
          </transition>
        </div>
        <div class="col s3">
          <a class="brand-logo cyan-text text-darken-2 col s3">Nuxt <span class="hide-on-small-only">Auth</span> <span class="hide-on-med-and-down">101</span></a>
        </div>
        <div class="col s4">
          <transition name="nav-slide">
            <ul class="right"  v-if="isLoggedIn">
              <li><a class="teal-text text-darken-2"><span class="hide-on-small-only">Welcome</span> {{name}}</a></li>
            </ul>
          </transition>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  computed:{
    isLoggedIn(){
      return this.$auth.loggedIn;
    },
    name(){
      return this.$auth.user.name
    },
    srchTxt:{
      get(){
        return this.$store.state.searchTxt
      },
      set(val){
        this.$store.dispatch('search',val)
      }
    },
    showSearch(){
      if(this.$route.path=='/')
        return true
      else
        return false
    },

  },
  methods:{

  },
}
</script>
<style scoped>
.nav-slide-enter-active,
.nav-slide-leave-active{
  transition:all 0.3s;
}
.nav-slide-enter,
.nav-slide-leave-to{
  opacity: 0;
  transform: translateY(-30rem);
}
nav{
  height: 2.8rem;
  line-height: 2.8rem;
}
i{
  margin-top:-1.3rem;
}
.input-field{
  margin-top:0.5rem!important;
}
</style>
