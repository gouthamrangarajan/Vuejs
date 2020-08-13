<template>
    <transition name="slide-down">
        <table class="table-fixed bg-white border rounded shadow absolute w-64" v-show="display" @click.stop>
            <thead>
                <tr>
                    <th colspan="7" class="p-1 font-normal">
                        <div class="flex justify-between items-center pl-2">                                                        
                            <h4 class="text-base">{{monthNames[currMonthIndex]}} {{currYear}}</h4>
                            <div class="flex-inline">
                                <a class="btn p-1 cursor-pointer hover:bg-gray-200 rounded" @click="reduceMonth">&lt;</a>
                                <a class="btn p-1 cursor-pointer hover:bg-gray-200 rounded" @click="increaseMonth">&gt;</a>
                            </div>
                        </div>
                    </th>
                </tr>           
            </thead>
            <transition :name="transition" mode="out-in" appear>
                <tbody v-show="bodyDisplay">
                    <tr>
                        <td v-for="(day,index) in dayNames" :key="index" class="text-xs text-center">
                            {{day}}
                        </td>
                    </tr>
                    <tr v-for="(dt,index) in weeksData" :key="index">
                        <td v-for="(idt,index1) in dt" :key="'td_'+index+'_'+index1" class="text-xs cursor-pointer"
                            :id="'td_'+index+'_'+index1" @click.stop="emitDate(idt.date,idt.ind)">
                            <div class="td__container flex flex-col w-full h-full items-center">                                   
                               <h5 :class="{'text-gray-500':idt.ind!='curr','p-1 text-center':true,
                                        'bg-blue-600 rounded text-white':currMonthIndex==todayMonthIndex && currYear==todayYear
                                        && idt.date==todayDate && !checkSelectedDate(idt.date),
                                        'bg-teal-600 rounded text-white':checkSelectedDate(idt.date,idt.ind)}">{{idt.date}}&nbsp;                                                                                
                                </h5>                                     
                            </div>
                        </td>
                    </tr>
                </tbody>
            </transition>
        </table>
    </transition>
</template>
<script>
export default {
    props:{
        display:{
            type:Boolean,
            required:false,
            default:true
        },
        selectedDate:{
            type:Date,
            required:false,
            default:null
        }
    },
     data(){
        return {
            dayNames:['S','M','T','W','T','F','S'],
            monthNames:["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],            
            currMonthIndex:new Date().getMonth(),
            currYear:new Date().getFullYear(),  
            todayDate:new Date().getDate(),
            todayYear:new Date().getFullYear(),  
            todayMonthIndex:new Date().getMonth(),             
            bodyDisplay:true,
            transition:'slide-left'            
        }
  },
  methods:{
     reduceYear(){
      if(this.currYear!=1900)
        this.currYear--      
    },
    reduceMonth(){
        this.transition='slide-right'
        this.bodyDisplay=false
        setTimeout(()=>{
            if(this.currMonthIndex!=0)
                this.currMonthIndex--
            else
                {
                    this.currMonthIndex=11
                    this.reduceYear()                
                }         
            this.bodyDisplay=true
        },50)
    },
    increaseYear(){
      if(this.currYear!=9999)
       this.currYear++        
    },
    increaseMonth(){
        this.transition='slide-left'
        this.bodyDisplay=false
        setTimeout(()=>{
            if(this.currMonthIndex!=11)
                this.currMonthIndex++
            else
                {
                    this.currMonthIndex=0
                    this.increaseYear()
                }
            this.bodyDisplay=true
        },50)      
    },
    checkSelectedDate(day,ind){
        if(this.selectedDate!=null && ind=='curr'){
            if(this.selectedDate.getFullYear()==this.currYear && this.selectedDate.getMonth()==this.currMonthIndex
                && day==this.selectedDate.getDate()){
                    return true
                }
        }

        return false
    },
    emitDate(day,ind){
        if(ind=='curr'){
            let dt=new Date(this.currYear,this.currMonthIndex,day)
            this.$emit('select',dt)
        }
    }
  },
  watch:{
      display(newVal){
          if(newVal && this.selectedDate!=null){
              let mnthIndex=this.selectedDate.getMonth()
              let year=this.selectedDate.getFullYear()
              while(this.currMonthIndex>mnthIndex || this.currYear>year){
                    if(this.currMonthIndex!=0)
                        this.currMonthIndex--
                    else
                        {
                            this.currMonthIndex=11
                            this.reduceYear()                
                        }    
              }
              while(this.currMonthIndex<mnthIndex || this.currYear<year){
                   if(this.currMonthIndex!=11)
                         this.currMonthIndex++
                else
                    {
                        this.currMonthIndex=0
                        this.increaseYear()
                    }
              }
          }
      }
  },
  computed:{    
    weeksData(){
      var retDt=[];
      var firstDt=new Date(this.currYear,this.currMonthIndex,1)
      var dy=firstDt.getDay()      
      var firstArr=[{date:1,ind:'curr'}]           
      while(dy>0)
      {
        if(firstArr[0].date==1)
          {
            var prevMonthLastDate=new Date(this.currYear,this.currMonthIndex,0).getDate()            
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
      var lastDate=  new Date(this.currYear,this.currMonthIndex+1,0).getDate()
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
  }

}
</script>
<style scoped>
.btn{
    transition:all 0.3s;
}

.slide-left-enter-active,
.slide-right-enter-active,
.slide-down-enter-active,
.slide-down-leave-active{
    transition: all 0.3s;
}
.slide-left-enter,
.slide-left-leave-to{    
    transform:translateX(2px);
}
.slide-right-enter,
.slide-right-leave-to{    
    transform:translateX(-2px);
}

.slide-down-enter,
.slide-down-leave-to{    
    transform:translateY(-2px);
}

i{
    font-size: 0.8rem;
}

</style>