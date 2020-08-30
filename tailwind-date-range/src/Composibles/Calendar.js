import {ref,computed} from 'vue'

export default function useCalendar(){
    const dayNames=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    const dayNamesShort=['S','M','T','W','T','F','S']
    const monthNames=["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const monthNamesShort=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const startMonthIndex=ref(new Date().getMonth())
    const endMonthIndex=ref(new Date().getMonth()+1)
    const startYear=ref(new Date().getFullYear())
    const endYear=ref(new Date().getFullYear())
    const todayDate=new Date().getDate()
    const todayYear=new Date().getFullYear()
    const todayMonthIndex=new Date().getMonth()

    function increaseMonth(){
        if(startMonthIndex.value!=11)
           startMonthIndex.value++
        else
        {
            startMonthIndex.value=0
            increaseYear()
        }
        setEndMonth()
    }
    function decreaseMonth(){
        if(startMonthIndex.value!=0)
            startMonthIndex.value--
        else
        {
            startMonthIndex.value=11
            decreaseYear()
        }
        setEndMonth()
    }
    function increaseYear(){
        startYear.value++        
    }
    function decreaseYear(){
        startYear.value--        
    }
    function setEndMonth(){
        endMonthIndex.value=startMonthIndex.value+1
        endYear.value=startYear.value
        if(endMonthIndex.value==12){
            endMonthIndex.value=0
            endYear.value++
        }
    }
    const startMonthData=computed(()=>{        
        return generateMonthData(startYear.value,startMonthIndex.value)
    })
    const endMonthData=computed(()=>{        
        return generateMonthData(endYear.value,endMonthIndex.value)
    })
    setEndMonth()
    return {dayNames,dayNamesShort,monthNames,monthNamesShort,startMonthIndex,endMonthIndex,startYear,endYear,todayDate,
            todayYear,todayMonthIndex,increaseMonth,decreaseMonth,startMonthData,endMonthData}
}

function generateMonthData(year,month){
    var retDt=[];
    var firstDt=new Date(year,month,1)    
    var dy=firstDt.getDay()      
    var firstArr=[{date:1,ind:'curr'}]           
    while(dy>0)
    {
        if(firstArr[0].date==1)
        {
            var prevMonthLastDate=new Date(year,month,0).getDate()            
            firstArr.unshift({date:prevMonthLastDate,ind:'prev'})
        }
        else
        {           
            firstArr.unshift({date:firstArr[0].date-1,ind:'prev'})
        }
        dy--;           
        }  
    while(firstArr.length<7)   {                 
        firstArr.push({date:firstArr[firstArr.length-1].date+1,ind:'curr'})
    }
    retDt.push(firstArr)
    var lastDate=  new Date(year,month+1,0).getDate()
    var lastEntry=firstArr[firstArr.length-1].date
    var completed=false
    while(lastEntry<lastDate && !completed)
    {
        var otherArr=[]
        for(i=1;i<=7;i++){
            if(lastEntry+i<=lastDate)
            {             
                otherArr.push({date:lastEntry+i,ind:'curr'})
            }
        }
        var i=1;
        while(otherArr.length<7)
        {
            completed=true             
            otherArr.push({date:i,ind:'next'})
            i++
        }
        retDt.push(otherArr)
        lastEntry=otherArr[otherArr.length-1].date
    }
    return retDt          
}