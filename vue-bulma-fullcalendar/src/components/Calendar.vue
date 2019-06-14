<template>
<transition name="fade" appear>
 <table class="table is-fullwidth fullCalendar" v-if="display">
   <thead>
     <tr>
         <th colspan="2">
           <span class="is-pulled-left tag is-dark" @click="reduceYear">
              &lt;&lt;
           </span>
           <span class="is-pulled-left tag is-dark" @click="reduceMonth">
              &lt;
           </span>
        </th>
         <th colspan="3">
          <h4 class="is-size-3 has-text-centered">
          {{monthNames[currMonthIndex]}} {{currYear}}
          </h4>
        </th>
        <th colspan="2">         
          <div class="is-pulled-right tag is-dark" @click="increaseYear">
            &gt;&gt;
          </div>
          <div class="is-pulled-right tag is-dark" @click="increaseMonth"> 
             &gt;
          </div>
        </th>
       </tr>
       <tr>
      <th v-for="(name,ind) in dayNames" :key="ind">
        <h5 class="is-size-4 has-text-centered">{{name}}</h5>
       </th>
    </tr>
   </thead>
   <tbody>
      <tr v-for="(dt,ind) in weeksData" :key="ind">
        <td v-for="(idt,ind1) in dt" :key="'tr_'+ind+'_'+ind1"
         @click.stop="emitClicked(idt.date,idt.ind)">
            <h5 :class="{'is-size-6 is-pulled-right':true,'has-text-grey-light':idt.ind!='curr',
                        'has-text-success has-text-weight-bold':idt.ind=='curr' && idt.date==todayDate
                        && currMonthIndex==todayMonthIndex
                        && currYear==todayYear}">{{idt.date}}</h5>  
            <transition-group name="scale" appear>  
              <div :class="['tag',event.color]" 
                v-for="(event,ind2) in idt.events" :key="ind2">              
              {{event.name}}              
              </div>     
            </transition-group>
        </td>
    </tr>
   </tbody>

 </table>
</transition>
</template>

<script>
export default {
  name: 'Calendar',
  props: {
    msg: String
  },
  data(){
     return {
     dayNames:
     ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
      monthNames:["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
     currMonthIndex:new Date().getMonth(),
     currYear:new Date().getFullYear(),  
     todayDate:new Date().getDate(),
     todayYear:new Date().getFullYear(),  
     todayMonthIndex:new Date().getMonth(),             
     display:true
   }
  },
  methods:{
    emitClicked(date,index){
      if(index=='curr')
      this.$emit('clicked',new Date(this.currYear,this.currMonthIndex,date));
    },
    toggleDisplay(){
      this.display=false;
      this.$nextTick(()=>{
        this.display=true;
      });
    },
     reduceYear(){
      if(this.currYear!=1900)
      this.currYear--;
      this.toggleDisplay();
    },
    reduceMonth(){
      if(this.currMonthIndex!=0)
      this.currMonthIndex--;
      else
        {
          this.currMonthIndex=11;
          this.reduceYear();
        }
         this.toggleDisplay();
    },
    increaseYear(){
      if(this.currYear!=9999)
       this.currYear++;
        this.toggleDisplay();
    },
    increaseMonth(){
      if(this.currMonthIndex!=11)
        this.currMonthIndex++;
      else
        {
          this.currMonthIndex=0;
          this.increaseYear();
        }
         this.toggleDisplay();
    },
     getEvents(date,month,year){   
      return this.$store.getters.filterEvents(date,month,year);      
    }
  },
  computed:{
    
    weeksData(){
      var retDt=[];
      var firstDt=new Date(this.currYear,this.currMonthIndex,1);
      var dy=firstDt.getDay();
      var lclEvents=this.getEvents(1,this.currMonthIndex,this.currYear);
      var firstArr=[{date:1,ind:'curr',events:lclEvents}];	            
      while(dy>0)
      {
        if(firstArr[0].date==1)
          {
            var prevMonthLastDate=
              new 
              Date(this.currYear,this.currMonthIndex,0)
                .getDate();
            lclEvents=this.getEvents(prevMonthLastDate,this.currMonthIndex-1,this.currYear);
            firstArr.unshift({date:prevMonthLastDate,ind:'prev',events:lclEvents});
          }
        else
          {
           lclEvents=this.getEvents(firstArr[0].date-1,this.currMonthIndex-1,this.currYear);
          firstArr.unshift({date:firstArr[0].date-1,ind:'prev',events:lclEvents});
          }
        dy--;        
       }  
      while(firstArr.length<7)   {       
          lclEvents=this.getEvents(firstArr[firstArr.length-1].date+1,this.currMonthIndex,this.currYear);
          firstArr.push({date:firstArr[firstArr.length-1].date+1,ind:'curr',events:lclEvents});                       
      }
      retDt.push(firstArr);
      var lastDate=  new Date(this.currYear,this.currMonthIndex+1,0).getDate();
      var lastEntry=firstArr[firstArr.length-1].date;
      var completed=false;    
      while(lastEntry<lastDate && !completed)
        {
          var otherArr=[];
          for(i=1;i<=7;i++){
            if(lastEntry+i<=lastDate)
              {
                lclEvents=this.getEvents(lastEntry+i,this.currMonthIndex,this.currYear);
            otherArr.push({date:lastEntry+i,ind:'curr',events:lclEvents});
              }
          }
          var i=1;
          while(otherArr.length<7)
          {
           completed=true;
             lclEvents=this.getEvents(i,this.currMonthIndex+1,this.currYear);
           otherArr.push({date:i,ind:'next'}); 
           i++;
          }
           retDt.push(otherArr);
          lastEntry=otherArr[otherArr.length-1].date;         
        }
      return retDt;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tag{
  cursor: pointer;
}

table{
  box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
}

.fullCalendar{  
 min-height:35rem!important;  
}

td{
  max-width:2rem!important;
  vertical-align:top;
 border-top:0.1rem solid rgba(34, 36, 38, 0.15)!important;
  border-left:0.1rem solid rgba(34, 36, 38, 0.15);
   cursor:pointer;
}

td>.tag
{   
   max-width:100%;
   max-height:2rem;
   overflow:hidden;
    cursor:pointer;
}

</style>
