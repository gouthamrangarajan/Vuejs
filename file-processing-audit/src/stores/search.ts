import { shallowRef,  readonly } from 'vue'
import { defineStore } from 'pinia'

export interface searchParamsType {startDate:string,endDate:string,fileType:string,fileStatus:string,fileName:string}

export const useSearchStore = defineStore('search', () => {
  const params=shallowRef<searchParamsType>();
  const setParams=(val:searchParamsType)=>{
    params.value=val        
  }
  const clearParams=()=>{
    params.value=undefined
  }
  return { params:readonly(params),setParams,clearParams }
})
