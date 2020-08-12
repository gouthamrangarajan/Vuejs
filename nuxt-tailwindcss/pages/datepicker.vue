<template>
    <div class="py-4 px-6 bg-white rounded flex w-full space-x-24">
        <div class="flex w-1/4 flex-col mb-64">
            <label class="text-lg text-orange-600">Select Date:</label>
            <input class="outline-none px-3 py-1 border border-blue-600 rounded" type="date" readonly :value="format(date1)"
                 @focus="showDatePicker1=true" @click.stop>
            <div>
                <datePickerComp :display="showDatePicker1" :selectedDate="date1" @select="date1=$event"></datePickerComp>
            </div>
        </div>
         <div class="flex w-1/4 flex-col mb-64">
            <label class="text-lg text-orange-600">Select Date:</label>
            <input class="outline-none px-3 py-1 border border-blue-600 rounded" type="date" readonly :value="format(date2)"
                 @focus="showDatePicker2=true" @click.stop>
            <div>
                <datePickerComp :display="showDatePicker2" :selectedDate="date2" @select="date2=$event"></datePickerComp>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            showDatePicker1:false,
            showDatePicker2:false,
            date1:null,
            date2:null
        }
    },
    created(){
        if(process.client && window)
            window.addEventListener('click',this.hideDatePickers)
    },
    destroyed(){
        if(process.client && window)
            window.removeEventListener('click',this.hideDatePickers)
    },
    methods:{
        hideDatePickers(){
            this.showDatePicker1=false
            this.showDatePicker2=false
        },
        format(dt){
            if(dt!=null)
                return dt.getFullYear()+"-"+this.padZero((dt.getMonth()+1))+"-"+this.padZero(dt.getDate())
            else
                return null
        },
        padZero(num){
            if(num<10)
                return "0"+num
            else
                return num
        }
    },
    components:{
        datePickerComp:()=>import('@/components/DatePickerComp.vue')
    }
}
</script>
