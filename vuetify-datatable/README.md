### vuetify-datatable
- a simple implementation vuetify datable with server side pagination 

```
vuejs
<v-data-table
      :items="tblData"
      :headers="headers"     
      :loading="loading"
      :server-items-length="dataLength"
      :options.sync="tblOptions"
      loading-text="Fetching data..."
      class="elevation-2"
    >

```
- everytime options changes (page/sort etc.) , it will be watched and request is sent to server

```
javascript
 watch(tblOptions, async (newVal) => {
    loading.value = true;
    let { page, itemsPerPage } = newVal;
    let resp = await callTodoApi(page, itemsPerPage);
    tblData.value = resp;
    loading.value = false
});
```
- composition api is used but the similar approach can be achived in composition api

### Demo
See [Codepen](https://codepen.io/GouthamRangarajan/pen/yLvwRyx).

### Official Vuetify link for this functionality
see [https://vuetifyjs.com/en/components/data-tables/#server-side-paginate-and-sort](https://vuetifyjs.com/en/components/data-tables/#server-side-paginate-and-sort)