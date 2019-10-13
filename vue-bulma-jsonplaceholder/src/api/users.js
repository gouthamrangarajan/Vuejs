//simple api file to call json placeholder
//called from vuex modules

import axios from "axios"
const apiUrl="https://jsonplaceholder.typicode.com/"
export default  {   
    async getAll(fn){
        try{
            var {data}=await axios.get(apiUrl+'users');                       
            fn(data);
        }
        catch(err){
            console.log(err);
        }

    }
}