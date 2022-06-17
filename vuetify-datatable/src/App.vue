<template>
  <v-app>
    <v-app-bar
      app
      color="white black--text"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-light.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-light.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
        <span class="mr-2">Datatable</span>      
    </v-app-bar>
    <v-main>      
      <v-container>
        <Datatable></Datatable>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Datatable from './components/Datatable.vue';

export default {
  name: 'App',

  components: {
    Datatable
},

  data: () => ({
    //
  }),
};
</script>
