import { ref, watch } from '@vue/composition-api'
export default function useDataTable() {
    const headers = ref([
        {
            text: 'Title',
            value: 'title',
            sortable: false,
            width: '60%',
            class: 'font-weight-medium primary white--text text-subtitle-1'
        },
        {
            text: 'Completed',
            value: 'completed',
            sortable: false,
            width: '15%',
            class: 'font-weight-medium primary white--text text-subtitle-1'
        },
        {
            text: 'User',
            value: 'userName',
            sortable: false,
            width: '25%',
            class: 'font-weight-medium primary white--text text-subtitle-1'
        }
    ])
    const loading = ref(true);
    const tblData = ref([])
    const dataLength = ref(200);
    const tblOptions = ref({ itemsPerPage: 10 });
    watch(tblOptions, async (newVal) => {
        loading.value = true;
        let { page, itemsPerPage } = newVal;
        let resp = await callTodoApi(page, itemsPerPage);
        tblData.value = resp;
        loading.value = false
    });
    return { headers, loading, tblData, dataLength, tblOptions }
}
//mimic server
const callTodoApi = async (page = 1, itemsPerPage = 10) => {
    await delay(1000);
    let rawResp = await fetch('https://jsonplaceholder.typicode.com/todos');
    let resp = await rawResp.json();
    resp = resp.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    for (let idx = 0; idx < resp.length; idx++) {
        let todo = resp[idx];
        todo.userName = 'loading';
        callUserApi(todo); //do not wait username will be updated 
    }
    return resp;
}
const callUserApi = async (todo) => {
    await delay(500);
    let rawResp = await fetch(`https://jsonplaceholder.typicode.com/users/${todo.userId}`);
    let resp = await rawResp.json();
    todo.userName = resp.username;
}
const delay = (number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, number);
    });
}