### vuetify-datatable
- A simple vuetify datable implementation with server side pagination 

```vue
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
- Everytime options changes (page/sort etc.) ,  request is sent to server

```javascript
 watch(tblOptions, async (newVal) => {
    loading.value = true;
    let { page, itemsPerPage } = newVal;
    let resp = await callTodoApi(page, itemsPerPage);
    tblData.value = resp;
    loading.value = false
});
```
### For every page which is configurable 

- Call Todo Api to fetch page data 
- For every todo call user api to fetch user data (background fetch, does not wait and shows skeleton loading in table cell)
- Can be extended to send sorting information to server and sorting can be achieved as well
- Composition api is used here but the similar approach can be achieved in options api

### Demo
See [Codepen](https://codepen.io/GouthamRangarajan/pen/yLvwRyx).

### Screenshot
![Screenshot](https://github.com/gouthamrangarajan/Vuejs/blob/master/vuetify-datatable/Screenshot.png)
### Official Vuetify link 
see [https://vuetifyjs.com/en/components/data-tables/#server-side-paginate-and-sort](https://vuetifyjs.com/en/components/data-tables/#server-side-paginate-and-sort)