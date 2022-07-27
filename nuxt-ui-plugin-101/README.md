### A simple UI plugin demo for Vue & Nuxt

#### An idea to show UI from plugin instead of component

##### Following are the steps
- Create UI as regular component 
```html
 <div class="flex flex-col">
        <span class="text-2xl text-yellow-600 font-semibold">{{msg}}</span>
        <transition-group name="fade">
            <div class="mt-6 flex flex-col space-y-2" v-for="dept in depts" :key="getDepartment(dept).id" >
                <div class="flex flex-col space-y-1">
                    <label class="text-gray-700">Department Name</label>
                    <input type="text" class="w-64 appearance-none outline-none border border-indigo-600 transition duration-300
                            focus:border-transparent focus:ring-1 focus:ring-indigo-600 py-1 px-3 rounded "
                            ....

```
- Create a plugin and attach this component to Vue global instance
```javascript
import Vue from 'vue'
//below few lines are not needed if typescript is not used
//@ts-ignore
import RepeatableForm from '../components/RepeatableForm/index.vue';

declare module 'vue/types/vue' {
    interface Vue {

    }
}

Vue.component('RepeatableForm', RepeatableForm)
```
- Optional: for nuxt project make sure to remove auto import components so that the UI comes from plugins

```javascript 
nuxt.config.js
export default {
    ...
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/repeatableForm'
    ],
    // Auto import components: https://go.nuxtjs.dev/config-components
    components: false,
```

- Use plugin like any other component
```html
<RepeatableForm/>
```
### Screenshot
![Screenshot](https://github.com/gouthamrangarajan/Vuejs/tree/master/nuxt-ui-plugin-101/Screenshot1.gif)


### further improvements
- Communicate to/from plugins using eventbus/vuex
