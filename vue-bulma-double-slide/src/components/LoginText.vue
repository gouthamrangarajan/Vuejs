<template>
    <article class="notification is-danger is-bold">
        <p class="title">
        Members !
        </p>
        <div class="subtitle">
            <br/> Are you already registered? 
            <br/><br/><br/><br/><br/>
            <a class="button is-danger
                is-rounded is-inverted"
            @click.stop="$emit('show-login')">Sign In
            </a>
        </div>
    </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class LoginText extends Vue{
    
}
</script> 