import Vue from 'vue'
//@ts-ignore
import RepeatableForm from '../components/RepeatableForm/index.vue';

declare module 'vue/types/vue' {
    interface Vue {

    }
}

Vue.component('RepeatableForm', RepeatableForm)