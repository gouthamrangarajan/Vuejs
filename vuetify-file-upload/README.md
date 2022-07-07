### vuetify-file-upload
#### A simple vuetify file input + drag and drop file upload

- attach ref to file input and trigger the file input click using ref

```vue
    <v-file-input
        multiple
        hide-input              
        prepend-icon="mdi-cloud-upload"
        class="d-none"   
        ref="fileUplEl"             
        @change="fileUplElChanged"
        ></v-file-input>
        ....
          <v-btn
               class="mt-12"
              color="primary"
              dark
              @click="mimicFileUplClick"
            >
              Upload Files
            </v-btn>
        ....
        const mimicFileUplClick=()=>{
            fileUplEl.value.$refs.input.click()
        }

```

- composable to handle drag and drop events and attach this events to Vuetify/html element where drag and drop functionality is needed

```vue
<v-col cols="12" lg="5" :class="['d-flex flex-column justify-center align-center', {'drag-hover':dragging}]"
    @drop.prevent.stop="dropped" @dragover.prevent.stop="setDrag(true)"  @dragleave.prevent.stop="setDrag(false)">

```
- Drag and drop composable (useDragDrop.js)
```javascript
    ...
    const dropped = (event) => {
            if (event.dataTransfer.files) {
                var fls = event.dataTransfer.files;
                if (fls) {
                    addFiles(fls);
                }
            }
            dragging.value = false;
        }
    ...
```
- Create a computed type to consolidated dropped files and files uploaded via Vuetify file input

```javascript
watch(fileListFromDragDrop,(newVal)=>{
    console.log('filesDropped via drag drop',newVal);
    //if needed callApi with consolidatedFiles
});
const fileUplElChanged=(ev)=>{
    console.log("vuetify file input changed",ev)
    for(let idx=0;idx<ev.length;idx++){
        let file=ev[idx];
        fileListFromUplEl.value.push(file);
    }
    fileUplEl.value.$refs.input.value=null;
    //if needed callApi with consolidatedFiles
}
```


### Screenshots
![Screenshot](https://github.com/gouthamrangarajan/Vuejs/blob/master/vuetify-file-upload/Screenshot1.png)
![Screenshot](https://github.com/gouthamrangarajan/Vuejs/blob/master/vuetify-file-upload/Screenshot2.png)