import { defineStore, storeToRefs } from "pinia"
import { faker } from '@faker-js/faker'
import {  nextTick, onMounted, onUnmounted, readonly, ref, watch } from "vue"
import { useSearchStore } from "./search"

export interface auditType{
    id:string,
    date:Date,
    fileName:string,
    fileType:"Pdf"|"Excel"|"Zip"|"Text",
    status:"Error"|"Processed"|"Queued",
    statusMsg:string,
    processTime:string,
    additionInfo:string
}

function createRandomAudit():auditType{    
    const extn=faker.helpers.arrayElement(['pdf','xlsx','zip','txt'])
    let fileType:"Pdf"|"Excel"|"Zip"|"Text"="Pdf"
    switch(extn){
        case "xlsx":{
            fileType="Excel"
            break
        }
        case "zip":{
            fileType="Zip"
            break
        }
        case "txt":{
            fileType="Text"
            break
        }
    }
    const fileName=faker.system.commonFileName(extn)
    const status:"Error"|"Processed"|"Queued"=faker.helpers.arrayElement(["Error","Processed","Queued"])
    const date=faker.date.between("2022-01-01","2022-12-31")
    const processTime= status=="Processed"?`${faker.datatype.number({min:0,max:6})} hrs : ${faker.datatype.number({min:1,max:59})} mins`:""
    
    return {
        id:faker.datatype.uuid(),
        date,
        fileName,
        fileType,
        status,
        statusMsg:`File ${fileName} ${status}`,
        processTime,
        additionInfo:faker.lorem.words(faker.datatype.number({min:5,max:10}))
    }
}

export const useAuditStore=defineStore('audit',()=>{
    const data=ref<auditType[]>([])
    const filteredData=ref<auditType[]>([])
    onMounted(()=>{
        for(let idx=1;idx<faker.datatype.number({min:20,max:300});idx++)
            data.value.push(createRandomAudit())     
        data.value=data.value.sort((a,b)=>a.date>b.date?-1:1)   
        filteredData.value=[...data.value]
    })
            
    const expandedRows = ref<string[]>([])
    const toggleExpanded = (id: string) => {
        if (expandedRows.value.includes(id))
            expandedRows.value = expandedRows.value.filter(el => el != id)
        else
            expandedRows.value.push(id)
    }

    const {params:searchParams}=storeToRefs(useSearchStore())
    const watcherStopHandle=watch(searchParams,(newVal)=>{        
        const filter=newVal      
        expandedRows.value.splice(0)
        nextTick(()=>{
            let dt=[...data.value]
            if(filter)
                dt =  dt.filter(el=>{            
                        let ret=true          
                        if(filter){                          
                            if(filter.fileName.trim()!='')
                                ret=el.fileName.toLowerCase().includes(filter.fileName.toLowerCase())
                            if(ret && filter.fileStatus)
                                ret=el.status===filter.fileStatus
                            if(ret && filter.fileType)
                                ret=el.fileType==filter.fileType
                            if(ret && filter.startDate)
                                ret=el.date>=new Date(filter.startDate)
                            if(ret && filter.endDate)
                                ret=el.date<=new Date(filter.endDate+"T23:59:00")
                        }
                        return ret
                    })
            filteredData.value=dt
        })  
    })
    onUnmounted(()=>{
        watcherStopHandle()
    })
    return {data:filteredData,expandedRows:readonly(expandedRows),toggleExpanded}
})