<template>
<li class="collection-item avatar">
  <i class="material-icons circle">person</i>
  <span class="title red-text" v-show="!hideName">{{user.name}}</span>
  <p>
    <i class="material-icons tiny">email</i>&nbsp;{{user.email}}
    <br/><i class="material-icons tiny">phone</i>&nbsp;{{user.phone}}
    <br/><i class="material-icons tiny">perm_media</i>&nbsp;<a>{{user.website}}</a>
  </p>
  <p v-if="windowWidth<993">
      <i class="material-icons tiny">home</i><br/>
        {{user.address.street}},{{user.address.suite}}
        <br/>
        {{user.address.city}},{{user.address.zipcode}}
  </p>
  <p class="secondary-content right-align">
    {{user.username}}<br/>
    <span class="black-text" v-if="windowWidth>=993">
        <i class="material-icons tiny">home</i><br/>
        {{user.address.street}},{{user.address.suite}}
        <br/>
        {{user.address.city}},{{user.address.zipcode}}
    </span>
  </p>
</li>
</template>
<script>
export default {
  props:{
    user:{
      type:Object,
      required:true
    },
    hideName:{
      type:Boolean,
      required:false,
      default:false
    }
  },
  computed:{
    windowWidth(){
      return window.innerWidth
    }
  }
}
</script>

