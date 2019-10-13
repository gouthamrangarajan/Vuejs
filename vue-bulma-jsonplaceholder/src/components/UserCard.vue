<template>
    <div class="card">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <p class="icon">
                        <i class="fas fa-user fa-3x"></i>
                    </p>
                </div>
                <div class="media-content">
                    <div class="content">                                            
                        <strong>{{user.name}}</strong>&nbsp;<small>@{{user.username}}</small>                                                                                                
                        <br/><i class="fas fa-envelope"></i>&nbsp;{{user.email}}                                            
                        <br/><i class="fas fa-phone-alt"></i>&nbsp;{{user.phone}}
                        <br/><i class="fas fa-globe"></i>&nbsp;<a>{{user.website}}</a>
                        <address class="is-pulled-right">                
                            <i class="fas fa-home"></i>&nbsp;                            
                            {{user.address.street}},{{user.address.suite}}
                            <br/>                                            
                            {{user.address.city}},{{user.address.zipcode}}
                        </address>                                                                                                                                                                                        
                    </div>
                </div>
            </div>
        </div>
    </div>  
</template>
<script>
export default {
    name:'UserCard',
    props:{
        user:{
            type:Object,
            required:true
        }
    }
}
</script>
<style scoped>
 .icon{
        padding-top:2.5rem;
    }
.media{
    border-top:0;
}
</style>