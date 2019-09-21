//simple api file to call express js 
//called from vuex modules

import axios from "axios"
const apiUrl="http://localhost:3000/"
export default  {   
    async getPageData(filterTxt,page,sortInfo,fn){
        try{
            var {data}=await axios.post(apiUrl+'employee',{filterTxt:filterTxt,page:page,sortInfo:sortInfo});                       
            fn(data);
        }
        catch(err){
            console.log(err);
        }

    }
}