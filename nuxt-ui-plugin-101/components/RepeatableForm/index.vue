<script lang="ts">
type department={
    name:string;
    items:work[];
    id:number;
}
type work={
    name:string;
    id:number;
    unit:number;
    co:number;
    value:number;
    phi:number;
    amt:number;    
}
const DEFAULT_DEPT:department={id:1,name:'',items:[{name:'',id:1,unit:0,co:0,value:0,phi:0,amt:0}]};
import Vue, { computed, ref } from 'vue'

export default Vue.extend({
    setup () {                
        let maxDepId=1;
        const depts=ref<department[]>([{...DEFAULT_DEPT,id:maxDepId++,items:[{...DEFAULT_DEPT.items[0]}]}]);     
        const getDepartment=(dept:any)=>{
           return dept as department;
        }   
        const addItem=(deptId:number)=>{
            let dept=depts.value.filter(el=>el.id==deptId)[0];
            let id=dept.items.length+1;
            dept.items.push({...DEFAULT_DEPT.items[0],id});
        }
        const addDept=()=>{
            depts.value.push({...DEFAULT_DEPT,id:maxDepId++,items:[{...DEFAULT_DEPT.items[0]}]});            
        }
        const total=computed(()=>{
              let amt=0;
              depts.value.forEach(el=>{
                el.items.forEach(inEl=>amt+=parseInt(inEl.amt.toString()));
              });
              return amt;
        });
        
        return {msg:'Welcome',depts,getDepartment,addDept,addItem,total}
    }
})
</script>   
<template>
    <div class="flex flex-col">
        <span class="text-2xl text-yellow-600 font-semibold">{{msg}}</span>
        <transition-group name="fade">
            <div class="mt-6 flex flex-col space-y-2" v-for="dept in depts" :key="getDepartment(dept).id" >
                <div class="flex flex-col space-y-1">
                    <label class="text-gray-700">Department Name</label>
                    <input type="text" class="w-64 appearance-none outline-none border border-indigo-600 transition duration-300
                            focus:border-transparent focus:ring-1 focus:ring-indigo-600 py-1 px-3 rounded "
                             v-model="getDepartment(dept).name"/>                
                </div>
                <div class="flex flex-col space-y-2 p-1" >
                    <transition-group name="fade">                    
                        <div class="flex flex-col lg:flex-row lg:items-center lg:flex-wrap gap-2" v-for="item in getDepartment(dept).items" :key="item.id">
                            <div class="flex flex-col">
                                <label class="text-gray-700">Work Name</label>   
                                <input type="text" class="w-64 appearance-none outline-none border border-indigo-600 transition duration-300
                                    focus:border-transparent focus:ring-1 focus:ring-indigo-600 py-1 px-3 rounded "
                                    v-model="item.name"/>                
                            </div>
                            <div class="flex flex-col">
                                <label class="text-gray-700">Id</label>   
                                <input type="text" class="w-24 appearance-none outline-none border border-indigo-600 transition duration-300
                                    focus:border-transparent focus:ring-1 focus:ring-indigo-600 py-1 px-3 rounded "
                                    v-model="item.id"/>                
                            </div>
                            <div class="flex flex-col">
                                <label class="text-gray-700">Unit</label>   
                                <input type="text" class="w-24 appearance-none outline-none border border-indigo-600 transition duration-300
                                    focus:border-transparent focus:ring-1 focus:ring-indigo-600 py-1 px-3 rounded "
                                    v-model="item.unit"/>                
                            </div>
                            <div class="flex flex-col">
                                <label class="text-gray-700">Co</label>   
                                <input type="text" class="w-24 appearance-none outline-none border border-indigo-600 transition duration-300
                                    focus:border-transparent focus:ring-1 focus:ring-indigo-600 py-1 px-3 rounded "
                                    v-model="item.co"/>                
                            </div>
                            <div class="flex flex-col">
                                <label class="text-gray-700">Value</label>   
                                <input type="text" class="w-24 appearance-none outline-none border border-indigo-600 transition duration-300
                                    focus:border-transparent focus:ring-1 focus:ring-indigo-600 py-1 px-3 rounded "
                                    v-model="item.value"/>                
                            </div>
                            <div class="flex flex-col">
                                <label class="text-gray-700">phi</label>   
                                <input type="text" class="w-24 appearance-none outline-none border border-indigo-600 transition duration-300
                                    focus:border-transparent focus:ring-1 focus:ring-indigo-600 py-1 px-3 rounded "
                                    v-model="item.phi"/>                
                            </div>
                            <div class="flex flex-col">
                                <label class="text-gray-700">Amount</label>   
                                <input type="text" class="w-48 appearance-none outline-none border border-indigo-600 transition duration-300
                                    focus:border-transparent focus:ring-1 focus:ring-indigo-600 py-1 px-3 rounded "
                                    v-model="item.amt"/>                
                            </div>                        
                        </div>                                            
                    </transition-group>
                </div>
                <button class="appearance-none outline-none py-1 px-3 bg-indigo-300 rounded transition duration-300
                                            focus:ring-2 focus:ring-indigo-300  focus:ring-offset-2 focus:ring-offset-indigo-50
                                        w-48 ml-1"
                                @click="addItem(getDepartment(dept).id)">
                                            + New item
                </button>
            </div>
        </transition-group>
        <button class="mt-3 appearance-none outline-none py-1 px-3 bg-green-300 rounded transition duration-300
                        focus:ring-2 focus:ring-green-300  focus:ring-offset-2 focus:ring-offset-green-50
                    w-48 ml-1"
            @click="addDept">
                + New Department
        </button>
        <div class="w-full flex justify-end items-center space-x-4 lg:pr-32">
            <label class="text-gray-700">Total</label>   
            <input type="text" class="w-48 appearance-none outline-none border border-indigo-600 transition duration-300
                focus:border-transparent focus:ring-1 focus:ring-indigo-600 py-1 px-3 rounded "
                readonly
                :value="total"/>    
        </div>
    </div>
</template>
<style scoped>
.fade-move{
    transition:transform 0.3s ease;
}
.fade-enter-active,.fade-leave-active{
    transition:opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to{
    opacity:0;
}
.fade-enter-to,
.fade-leave-from{
    opacity:1;
}
</style>
