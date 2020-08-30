<template>
    <div class="rounded border border-gray-300  p-1">
        <div class="input-field flex w-full justify-around">
            <div class="flex flex-col">
                <input :class="{'outline-none shadow appearance-none py-2 px-4 rounded cursor-pointer':true,'border border-blue-600':selectedField=='start_date'}"
                     placeholder="Start" readonly @click="selectedField='start_date'" :value="displayDate(startDate)">
                <table class="table-fixed w-64">
                     <thead>
                        <tr>
                            <th colspan="7" class="p-1 font-normal">
                                <div class="flex justify-between items-center pl-1">     
                                    <a class="btn p-1 hover:bg-gray-200 cursor-pointer rounded" @click="decreaseMonth">&lt;</a>                                                   
                                    <h4 class="text-base">{{monthNamesShort[startMonthIndex]}} {{startYear}}</h4>                                   
                                </div>
                            </th>
                        </tr>           
                    </thead>
                    <tbody>
                        <tr>
                            <td v-for="day in dayNames" :key="day" class="text-xs text-center">
                                {{day}}
                            </td>
                        </tr>
                         <tr v-for="(dt,index) in startMonthData" :key="index">
                            <td v-for="(idt,index1) in dt" :key="'td_'+index+'_'+index1" :class="{'text-xs cursor-pointer':true,
                                        'bg-blue-700 text-white':checkRange(startYear,startMonthIndex,idt.date,idt.ind),
                                        'rounded-l-full':idt.date==startDate.getDate(),'rounded-r-full':idt.date==endDate.getDate()}" 
                                :id="'td_'+index+'_'+index1"   @click="selectDate(startYear,startMonthIndex,idt.date)">
                                <div class="td__container flex flex-col w-full h-full items-center">
                                     <h5 :class="{'text-gray-500':idt.ind!='curr','p-1 text-center':true}">
                                        {{idt.date}}
                                    </h5>  
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex flex-col">
                <input :class="{'outline-none shadow appearance-none py-2 px-4 rounded cursor-pointer':true,'border border-blue-600':selectedField=='end_date'}"
                     placeholder="End" readonly @click="selectedField='end_date'" :value="displayDate(endDate)">            
                <table class="table-fixed w-64">
                     <thead>
                        <tr>
                            <th colspan="7" class="p-1 font-normal">
                                <div class="flex justify-between items-center pl-1">                                                        
                                    <h4 class="text-base">{{monthNamesShort[endMonthIndex]}} {{endYear}}</h4>     
                                     <a class="btn p-1 hover:bg-gray-200 cursor-pointer rounded" @click="increaseMonth">&gt;</a>                                                                                 
                                </div>
                            </th>
                        </tr>           
                    </thead>
                    <tbody>
                        <tr>
                            <td v-for="day in dayNames" :key="day" class="text-xs text-center">
                                {{day}}
                            </td>
                        </tr>
                        <tr v-for="(dt,index) in endMonthData" :key="index">
                            <td v-for="(idt,index1) in dt" :key="'td_'+index+'_'+index1" :class="{'text-xs cursor-pointer':true,
                                'bg-blue-700 text-white':checkRange(endYear,endMonthIndex,idt.date,idt.ind),
                                'rounded-l-full':idt.date==startDate.getDate(),'rounded-r-full':idt.date==endDate.getDate()}" 
                                :id="'td_'+index+'_'+index1" @click="selectDate(endYear,endMonthIndex,idt.date)">
                                <div class="td__container flex flex-col w-full h-full items-center">
                                     <h5 :class="{'text-gray-500':idt.ind!='curr','p-1 text-center':true}">                                     
                                        {{idt.date}}
                                    </h5>  
                                </div>
                            </td>
                        </tr>
                    </tbody>
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
            selectedField:'start_date',
            startDate:null,
            endDate:null
        }
    },
    methods:{
        selectDate(year,month,day){            
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
        }
    }
}
</script>
<style scoped>
input,td{
    transition: all 0.3s;
}
</style>