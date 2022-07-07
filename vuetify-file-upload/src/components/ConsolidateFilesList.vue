<template>
 <v-card
    width="400"
    class="mx-auto"
  >
       <v-toolbar
      color="light-blue"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>My files</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-view-module</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list
        subheader
        two-line
        >
        <v-list-item
        v-for="(file,idx) in files"
        :key="idx+'_'+file.name"
      >
        <v-list-item-avatar>
          <v-icon
            class="blue"
            dark
            v-text="'mdi-clipboard-text'"
          ></v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="file.name"></v-list-item-title>

          <v-list-item-subtitle v-text="file.size"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
</v-card>
</template>

<script>
    export default {
        name:'ConsolidatedFileList',
        props:['files']
    }
</script>


