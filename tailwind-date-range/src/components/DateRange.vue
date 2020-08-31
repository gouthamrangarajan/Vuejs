<template>
    <div class="rounded p-1 date-range">
        <div class="input-field flex flex-col md:flex-row space-y-2 md:space-y-0 w-full justify-around">
            <div class="flex flex-col border border-gray-300 shadow btn-group md:h-64">
                <a class="btn hover:bg-gray-200 py-1 px-3 cursor-pointer rounded w-40" @click="setToday">Today</a>
                <hr/>
                <a class="btn hover:bg-gray-200 py-1 px-3 cursor-pointer rounded w-40" @click="setThisWeek">This Week</a>
                <hr/>
                <a class="btn hover:bg-gray-200 py-1 px-3 cursor-pointer rounded w-40" @click="setLastWeek">Last Week</a>
                <hr/>
                <a class="btn hover:bg-gray-200 py-1 px-3 cursor-pointer rounded w-40" @click="setThisMonth">This Month</a>
                <hr/>
            </div>
            <div class="flex flex-col">
                <input :class="{'outline-none shadow appearance-none py-2 px-4 rounded cursor-pointer border':true,'border-blue-600':selectedField=='start_date'}"
                     placeholder="Start" readonly @click="selectedField='start_date'" :value="displayDate(startDate)">
                <table class="table-fixed w-64">
                     <thead>
                        <tr>
                            <th colspan="7" class="p-1 font-normal">
                                <div class="flex justify-between items-center pl-1">     
                                    <a class="btn p-1 hover:bg-gray-200 cursor-pointer rounded" @click="changeAnimationAnddecreaseMonth">&lt;</a>                                                   
                                    <h4 class="text-base">{{monthNamesShort[startMonthIndex]}} {{startYear}}</h4>                                   
                                </div>
                            </th>
                        </tr>           
                    </thead>
                    <transition-group :name="transition" tag="tbody">
                        <tr :key="-1">
                            <td v-for="day in dayNames" :key="day" class="text-xs text-center">
                                {{day}}
                            </td>
                        </tr>
                         <tr v-for="(dt,index) in startMonthData" :key="monthNamesShort[startMonthIndex]+'_'+index">
                            <td v-for="(idt,index1) in dt" :key="'td_'+index+'_'+index1" :class="{'text-xs cursor-pointer':true,
                                        'bg-blue-500 text-white':checkRange(startYear,startMonthIndex,idt.date,idt.ind),
                                        'rounded-l-full':startDate!=null &&idt.date== startDate.getDate() && startMonthIndex==startDate.getMonth(),
                                        'rounded-r-full':endDate!=null && idt.date==endDate.getDate() && startMonthIndex==endDate.getMonth()}" 
                                :id="'td_'+index+'_'+index1"   @click="selectDate(startYear,startMonthIndex,idt.date,idt.ind)">
                                <div class="td__container flex flex-col w-full h-full items-center">
                                     <h5 :class="{'text-gray-500':idt.ind!='curr','p-1 text-center':true}">
                                        {{idt.date}}
                                    </h5>  
                                </div>
                            </td>
                        </tr>
                    </transition-group>
                </table>
            </div>
            <div class="flex flex-col">
                <input :class="{'outline-none shadow appearance-none py-2 px-4 rounded cursor-pointer border':true,'border-blue-600':selectedField=='end_date'}"
                     placeholder="End" readonly @click="selectedField='end_date'" :value="displayDate(endDate)">            
                <table class="table-fixed w-64">
                     <thead>
                        <tr>
                            <th colspan="7" class="p-1 font-normal">
                                <div class="flex justify-between items-center pl-1">                                                        
                                    <h4 class="text-base">{{monthNamesShort[endMonthIndex]}} {{endYear}}</h4>     
                                     <a class="btn p-1 hover:bg-gray-200 cursor-pointer rounded" @click="changeAnimationAndincreaseMonth">&gt;</a>                                                                                 
                                </div>
                            </th>
                        </tr>           
                    </thead>
                    <transition-group :name="transition" tag="tbody">
                        <tr :key="-1">
                            <td v-for="day in dayNames" :key="day" class="text-xs text-center">
                                {{day}}
                            </td>
                        </tr>
                        <tr v-for="(dt,index) in endMonthData" :key="monthNamesShort[endMonthIndex]+'_'+index">
                            <td v-for="(idt,index1) in dt" :key="'td_'+index+'_'+index1" :class="{'text-xs cursor-pointer':true,
                                'bg-blue-500 text-white':checkRange(endYear,endMonthIndex,idt.date,idt.ind),
                                'rounded-l-full':startDate!=null &&idt.date== startDate.getDate() && endMonthIndex==startDate.getMonth(),
                                'rounded-r-full':endDate!=null && idt.date==endDate.getDate() && endMonthIndex==endDate.getMonth()}" 
                                :id="'td_'+index+'_'+index1" @click="selectDate(endYear,endMonthIndex,idt.date,idt.ind)">
                                <div class="td__container flex flex-col w-full h-full items-center">
                                     <h5 :class="{'text-gray-500':idt.ind!='curr','p-1 text-center':true}">                                     
                                        {{idt.date}}
                                    </h5>  
                                </div>
                            </td>
                        </tr>
                    </transition-group>
                </table>
            </div>
        </div>        
    </div>
</template>
<script>
import useCalendar from './../Composibles/Calendar.js'
export default {
    name:'DateRange',
    setup(){        
        const {dayNames,monthNamesShort,startMonthIndex,endMonthIndex,increaseMonth,decreaseMonth,startYear,endYear,
                startMonthData,endMonthData}=useCalendar()                        
        return {dayNames,monthNamesShort,startMonthIndex,endMonthIndex,increaseMonth,decreaseMonth,startYear,endYear,
                startMonthData,endMonthData}
    },
    data(){
        return {
            transition:'records',
            selectedField:'start_date',
            startDate:null,
            endDate:null
        }
    },
    methods:{
        selectDate(year,month,day,ind){            
            if(ind!='curr')
                return;
            if(this.selectedField=='start_date'){
                this.startDate=new Date(year,month,day)
                this.selectedField='end_date'
                if(this.endDate<this.startDate)
                    this.endDate=null          
            }  
            else{
                this.endDate=new Date(year,month,day)
                if(this.startDate>this.endDate)
                    this.startDate=null
            }
            this.emitRange()
        },      
        displayDate(date){
            if(date==null)
                return ''            
            let monthIndex=date.getMonth()            
            return this.monthNamesShort[monthIndex]+" "+date.getDate().toString()+", "+date.getFullYear()
        },
        emitRange(){
            this.$emit('select-range',{startDate:this.startDate,endDate:this.endDate,
                rangeStr:this.displayDate(this.startDate)+" - "+this.displayDate(this.endDate)
            })
        },
        checkRange(year,month,date,indicator){
           if(this.endDate==null || this.startDate==null)
             return false
             if(indicator=='prev')
               return false             
             if(indicator=='next')
                return false
            let dt=new Date(year,month,date)
            if(dt>=this.startDate && dt<=this.endDate){                
                return true
            }
            return false
        },
        resetVisibleDates(){
            let index=this.startDate.getMonth()
            let year=this.startDate.getFullYear()
            let lclindex=1
            
            while( this.startYear>year || (year==this.startYear && this.startMonthIndex>index)){
                if(lclindex>10000)
                    break            
                this.changeAnimationAnddecreaseMonth()
                lclindex++
            }
            lclindex=1
            while(this.startYear<year || (year==this.startYear && this.startMonthIndex<index)){
                if(lclindex>10000)
                    break                
                this.changeAnimationAndincreaseMonth()
                lclindex++;
            }
        },
        setToday(){
            let dt=new Date()
            this.startDate=new Date(dt.getFullYear(),dt.getMonth(),dt.getDate())
            this.endDate=new Date(dt.getFullYear(),dt.getMonth(),dt.getDate())            
            this.resetVisibleDates()
            this.emitRange()
        },
        setThisWeek(){
            let dt=new Date()
            while(dt.getDay()>0){                
                dt.setDate(dt.getDate()-1)                
            }
            this.startDate=new Date(dt.getFullYear(),dt.getMonth(),dt.getDate())
            this.endDate=new Date(dt.getFullYear(),dt.getMonth(),dt.getDate())
            this.endDate.setDate(this.endDate.getDate()+6)
            this.resetVisibleDates()
            this.emitRange()
        },
         setLastWeek(){
            let dt=new Date()
            while(dt.getDay()>0){                
                dt.setDate(dt.getDate()-1)                
            }
            dt.setDate(dt.getDate()-7)
            this.startDate=new Date(dt.getFullYear(),dt.getMonth(),dt.getDate())            
            this.endDate=new Date(dt.getFullYear(),dt.getMonth(),dt.getDate())
            this.endDate.setDate(this.endDate.getDate()+6)
            this.resetVisibleDates()
            this.emitRange()
        },
        setThisMonth(){
            let dt=new Date()
            this.startDate=new Date(dt.getFullYear(),dt.getMonth(),1) 
            this.endDate=new Date(dt.getFullYear(),dt.getMonth()+1,0)  
            this.resetVisibleDates()
            this.emitRange()  
        },
        changeAnimationAnddecreaseMonth(){
            this.transition='records-reverse'
            this.decreaseMonth()
        },
        changeAnimationAndincreaseMonth(){
            this.transition='records'
            this.increaseMonth()
        }
    }
}
</script>
<style scoped>
input,td,.btn-group{
    transition: all 0.3s;
}
.records-enter-active,
.records-reverse-enter-active{
    transition:all 0.3s;
}
.records-enter-from,
.records-leave-to{
    opacity: 0;
    transform:translateX(2px);
}
.records-reverse-enter-from,
.records-reverse-leave-to{
    opacity: 0;
    transform:translateX(-2px);
}
.date-Range{
    overflow-x:hidden;
}
</style>