const express = require('express')
const app = express()
const port = process.env.port || 3000
const {employees}=require('./data/employees.json')
const cors = require('cors')
const bodyParser=require('body-parser')

app.use(cors())
app.use(bodyParser.json())

//simple filtering
function filterEmployees(employees,filterTxt){
  return employees.filter(el=>{
    if(el.filter(inel=>{
        if(filterTxt.trim()==''){
          return true;
        }
        if(inel.toLowerCase().indexOf(filterTxt.toLowerCase())>-1){
          return true;
        }
        return false;
      }).length>0)
      return true;
    else
     return false;
  });
}

//simple sorting 
function sortEmployees(employees,sortInfo){
  return employees.sort((a,b)=>{
    if(sortInfo[1]==0)
     if(a[sortInfo[0]]>b[sortInfo[0]])
       return 1;
     else if(a[sortInfo[0]]<b[sortInfo[0]])
        return -1;
     else return 0;
    else 
     if(a[sortInfo[0]]<b[sortInfo[0]])
       return 1;
     else if(a[sortInfo[0]]>b[sortInfo[0]])
        return -1;
     else return 0;
 });
}
app.post('/employee',(req,res)=>{    
    const {body:{filterTxt,page,sortInfo}}=req;
    if(filterTxt==null || page==null || sortInfo==null
        || sortInfo.length<2){
      res.statusCode=400; //if request doesnt have sort, page and filter info reject with invalid request
      return res.json({errors:['Invalid request']});
    }
     var pgLen=10;
     var endInd=(page*pgLen);
     var strtInd=endInd-pgLen;
    if(strtInd<0)
      strtInd=0;
     var ftEmployees=filterEmployees(employees,filterTxt);
     var stEmployess=sortEmployees(ftEmployees,sortInfo);
     //filtered, sorted and paged data
     res.json({employees:stEmployess.slice(strtInd,endInd),totalLength:ftEmployees.length,page:page,pageLength:pgLen});    
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))