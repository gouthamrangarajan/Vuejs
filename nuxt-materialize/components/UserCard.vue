<template>
<div class="card blue-grey lighten-5">
        <div class="card-image">
          <i class="material-icons large right">person</i>
          <span class="card-title teal-text">{{user.name}}</span>
        </div>
        <div class="card-content">
            @{{user.username}}
            <br/><i class="material-icons tiny">email</i>&nbsp;{{user.email}}
            <br/><i class="material-icons tiny">phone</i>&nbsp;{{user.phone}}
            <br/><i class="material-icons tiny">perm_media</i>&nbsp;<a>{{user.website}}</a>
            <address class="right">
                <i class="material-icons tiny">home</i>&nbsp;
                {{user.address.street}},{{user.address.suite}}
                <br/>
                {{user.address.city}},{{user.address.zipcode}}
            </address>
        </div>
</div>
</template>
<script>
export default {
  props:{
        user:{
            type:Object,
            required:true
        }
   }
}
</script>
<style scoped>
.card-image{
  height: 3.7rem;
}
</style>
