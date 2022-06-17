<template>
 <div>    
  <v-data-table
      :items="tblData"
      :headers="headers"     
      :loading="loading"
      :server-items-length="dataLength"
      :options.sync="tblOptions"
      loading-text="Fetching data..."
      class="elevation-2"
    >
        <template v-slot:top>
            <span class="px-4 green--text text-h5 font-weight-bold">Todo List</span>
        </template>
        <template v-slot:item.completed="{item}">
          <v-icon v-if="item.completed" color="green">mdi-check</v-icon>
        </template>
        <template v-slot:item.userName="{item}">
            <v-skeleton-loader type="table-cell" v-if="item.userName=='loading'"></v-skeleton-loader>
            <span v-else>{{item.userName}}</span>
        </template>
    </v-data-table>
    </div>
</template>
<script>
  import useDataTable from "../composables/useDataTable"
  export default {
    setup(){
       const {headers,loading,tblData,dataLength,tblOptions}=useDataTable();
       return {headers,loading,tblData,dataLength,tblOptions}
    },
   
  }
</script>

