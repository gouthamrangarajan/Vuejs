<template>
<div>
  <div class="right">
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large red">
        <i class="large material-icons">menu</i>
      </a>
      <ul>
        <li>
          <a class="btn-floating orange darken-1 waves-effect waves-light tooltipped"
              data-position="top" data-tooltip="Logout" @click="logout">
           <i class="material-icons">exit_to_app</i>
          </a>
        </li>
        <li><nuxt-link to="/changePwd"
         class="btn-floating green waves-effect waves-light tooltipped" data-position="top" data-tooltip="Change Password">
          <i class="material-icons">mode_edit</i>
          </nuxt-link>
        </li>
        <li><nuxt-link to="/register"
         class="btn-floating blue waves-effect waves-light tooltipped" data-position="top" data-tooltip="Add a user">
          <i class="material-icons">add</i>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>
<script>
export default {
  mounted(){
    if(process.client){
      let elems = document.querySelectorAll('.tooltipped')
      let instances = M.Tooltip.init(elems, {});
      elems = document.querySelectorAll('.fixed-action-btn');
      instances = M.FloatingActionButton.init(elems, {
        direction:'left'
      });
    }
  },
  methods:{
    logout(){
      this.$auth.logout()
      setTimeout(()=>{window.location.href=window.location.href},300)
    }
  }
}
</script>
<style scoped>

</style>
