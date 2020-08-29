<template>
   <div class="h-full -mt-8 p-2" @click.stop="showModal=false">
    <table class="table-fixed w-full bg-white">
        <thead>
             <tr>
               <th colspan="7" class="p-1 font-normal">
                   <div class="flex justify-evenly items-center w-1/2">
                    <a class="btn cursor-pointer px-4 py-2 border border-gray-300 hover:bg-gray-200 rounded" @click="setToday">Today</a>
                    <div class="flex-inline">
                        <a class="btn py-2 px-4 cursor-pointer hover:bg-gray-200 rounded-full text-lg" @click="reduceMonth">&lt;</a>
                        <a class="btn py-2 px-4 cursor-pointer hover:bg-gray-200 rounded-full text-lg" @click="increaseMonth">&gt;</a>
                    </div>
                    <h4 class="text-lg">{{monthNames[currMonthIndex]}} {{currYear}}</h4>
                   </div>
               </th>
            </tr>           
        </thead>
        <transition :name="transition" mode="out-in" appear>
            <tbody v-show="display">
                <tr v-for="(dt,index) in weeksData" :key="index">
                    <td v-for="(idt,index1) in dt" :key="'td_'+index+'_'+index1" class="border border-gray-300 h-32 text-sm cursor-pointer">
                        <div class="td__container flex flex-col w-full h-full items-center" 
                             :id="'div_'+index+'_'+index1" @click.stop="toggleshowModal('div_'+index+'_'+index1,idt.date,currMonthIndex,currYear)">
                            <template v-if="index==0">
                            <span>{{dayNames[index1]}}</span>
                            </template>
                           <h5 :class="{'text-gray-500':idt.ind!='curr','px-2 py-1 text-center mb-1':true,
                                    'bg-blue-600 rounded-full text-white':currMonthIndex==todayMonthIndex && currYear==todayYear
                                    && idt.date==todayDate && idt.ind=='curr'}">{{idt.date}}&nbsp;
                                <template v-if="idt.date==1 && index==0">
                                    {{monthNamesShort[currMonthIndex]}}
                                </template>
                                <template v-else-if="idt.date==1">
                                    {{monthNamesShort[currMonthIndex+1]}}
                                </template>
                            </h5> 
                            <transition-group name="scale">
                                <div v-for="event in getEvents(idt.date,currMonthIndex,currYear,idt.ind)" :key="event.id"
                                    :class="['truncate w-48 p-1 bg-'+event.color+'-600 flex items-center rounded text-white mb-1']"
                                    @click.stop="editEvent(event.id,'td_'+index+'_'+index1)">
                                    <template v-if="event.icon">
                                        <i class="material-icons">{{event.icon}}</i>
                                    </template>
                                    <span>&nbsp;&nbsp;{{event.name}}</span>
                                </div>
                            </transition-group>
                        </div>
                    </td>
                </tr>
            </tbody>
        </transition>
    </table>
    <addEventModal v-model="showModal" v-bind="modalData" @saveEvent="saveEvent"></addEventModal>
   </div>
</template>
<script>
export default {
    data(){
        return {
            dayNames:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
            monthNames:["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            currMonthIndex:new Date().getMonth(),
            currYear:new Date().getFullYear(),  
            todayDate:new Date().getDate(),
            todayYear:new Date().getFullYear(),  
            todayMonthIndex:new Date().getMonth(),             
            display:true,
            transition:'slide-left',
            events:[{id:1,date:new Date(),name:'get started',color:'indigo',icon:'touch_app'}],
            nextEventId:2,
            showModal:false,
            modalData:{
                offset:{
                    left:50,
                    top:50
                },
                eventDate:null,
                eventId:0,
                eventName:'',
                title:'Add Event'
            }            
        }
  },
  components:{
      addEventModal:()=>import('@/components/AddEventModal.vue')
  },
  methods:{      
    setToday(){
        let prevSetMonthIndex=this.currMonthIndex
        let prevSetYear=this.currYear
        
        if(prevSetYear>this.todayYear){
            this.transition='slide-right'
        }
        else if(prevSetMonthIndex>this.todayMonthIndex){
            this.transition='slide-right'
        }
        else{
            this.transition='slide-left'
        }
        if(prevSetMonthIndex!=this.todayMonthIndex|| prevSetYear!=this.todayYear){
            this.display=false
            setTimeout(()=>{
                this.currMonthIndex=this.todayMonthIndex
                this.currYear=this.todayYear       
                this.display=true
            },50)
        }
    },
    reduceYear(){
      if(this.currYear!=1900)
        this.currYear--      
    },
    reduceMonth(){
        this.transition='slide-right'
        this.display=false
        setTimeout(()=>{
            if(this.currMonthIndex!=0)
                this.currMonthIndex--
            else
                {
                    this.currMonthIndex=11
                    this.reduceYear()                
                }         
            this.display=true
        },50)
    },
    increaseYear(){
      if(this.currYear!=9999)
       this.currYear++        
    },
    increaseMonth(){
        this.transition='slide-left'
        this.display=false
        setTimeout(()=>{
            if(this.currMonthIndex!=11)
                this.currMonthIndex++
            else
                {
                    this.currMonthIndex=0
                    this.increaseYear()
                }
            this.display=true
        },50)      
    },
    getEvents(dayPart, monthIndex, year,ind){
        if(ind=='curr')
            return this.events.filter(el=>el.date.getFullYear()==year && el.date.getMonth()==monthIndex && dayPart==el.date.getDate());
        else
            return [];
    },
    toggleshowModal(elId,dayPart,monthIndex,year){
        if(this.showModal)
            this.showModal=false
        else{
            let el=document.getElementById(elId)
            const {x,y}=el.getBoundingClientRect()
            this.modalData.offset.top=y
            this.modalData.offset.left=x-300
            if(this.modalData.offset.left<0){
                this.modalData.offset.left=x
            }
            this.modalData.date=new Date(year,monthIndex,dayPart)
            this.modalData.eventId=0
            this.modalData.eventName=''
            this.modalData.title='Add Event'
            this.showModal=true
        }   
    },
    editEvent(eventId,elId){
         if(this.showModal)
            this.showModal=false
        else{
            let el=document.getElementById(elId)
            const {x,y}=el.getBoundingClientRect()
            this.modalData.offset.top=y
            this.modalData.offset.left=x-300
            if(this.modalData.offset.left<0){
                this.modalData.offset.left=x
            }
            let ft=this.events.filter(el=>el.id==eventId)[0]
            this.modalData.date=ft.date
            this.modalData.eventId=eventId
            this.modalData.eventName=ft.name
            this.modalData.title='Edit Event'
            this.showModal=true
        }   
    },
    saveEvent(data){
        if(data.id==0){
            this.events.push({id:this.nextEventId,color:'indigo',name:data.name,date:data.date})
            this.nextEventId++
        }
        else{
            let ft=this.events.filter(el=>el.id==data.id)[0]
            if(ft)
            {
                ft.name=data.name
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
.slide-right-enter-active{
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
.scale-move{
    transform:all 0.3s;
}
.scale-enter-active,
.scale-leave-active{
    transition:all 0.3s;
}
.scale-enter,
.scale-leave-to{
    transform:scale(0);
    opacity: 0;
}
i{
    font-size: 1.2rem;
}
.td__container{
    max-height: 8rem;
    overflow: auto;
}

.td__container::-webkit-scrollbar{
    width:0.5rem;
}
.td__container::-webkit-scrollbar-thumb {
  background-color:#a0aec0;
  outline: 1px solid #a0aec0;
  border-radius:4px;
}
</style>