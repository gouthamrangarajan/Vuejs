<template>
<transition name="nav-slide">
   <div class="navbar-fixed">
    <nav class="white">
      <div class="nav-wrapper row">
        <div class="input-field col s5">
          <input type="search" required placeholder="search" v-model.trim="srchTxt">
          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
          <i class="material-icons hide-on-med-and-down" @click="srchTxt=''">close</i>
        </div>
        <div class="col s3">
          <a class="brand-logo cyan-text text-darken-2 col s3">Nuxt <span class="hide-on-small-only">Auth</span> <span class="hide-on-med-and-down">101</span></a>
        </div>
        <div class="col s4">
          <ul class="right">
            <li><a class="teal-text text-darken-2"><span class="hide-on-small-only">Welcome</span> {{name}}</a></li>
            <li><a class="teal-text" @click="logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</transition>
</template>
<script>
export default {
  computed:{
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
    }
  },
  methods:{
    logout(){
      this.$auth.logout()
      window.location.href=window.location.href
    }
  }
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
nav i{
  margin-top:-0.8rem;
}
</style>
