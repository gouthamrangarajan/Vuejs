<script setup lang="ts">
import ChevronUpDownIcon from "@heroicons/vue/24/solid/ChevronUpDownIcon"
import { type searchParamsType, useSearchStore } from "@/stores/search"
import { ref } from "vue"
import { useMotion } from "@vueuse/motion"

const formEl = ref<HTMLFormElement>()
useMotion(formEl, {
    initial: {
        opacity: 0,
        y: -100
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            duration: 600,
            damping: 12
        }
    }
})
const startDate = ref<string>()
const endDate = ref<string>()
const fileType = ref<string>()
const fileName = ref<string>()
const fileStatus = ref<string>()

const { setParams, clearParams } = useSearchStore()
const formSubmit = () => {
    let formData: searchParamsType = {
        endDate: endDate.value || "",
        fileName: fileName.value || "",
        fileStatus: fileStatus.value || "",
        fileType: fileType.value || "",
        startDate: startDate.value || ""
    }
    setParams(formData);
}
const clear = () => {
    clearParams()
    endDate.value = undefined
    startDate.value = undefined
    fileName.value = undefined
    fileStatus.value = undefined
    fileType.value = undefined
}
</script>

<template>
    <form @submit.prevent="formSubmit" ref="formEl"
        class="border-2 rounded border-teal-600 border-dashed py-4 px-6 flex flex-wrap gap-3 md:gap-8 lg:gap-20 shadow items-start xl:w-8/12 xl:mx-auto">
        <div class="flex flex-col gap-3">
            <label class="font-semibold text-gray-800 text-lg">Search</label>
            <div class="flex flex-col gap-1 p-1">
                <label class="text-gray-700">Start Date</label>
                <input type="date" name="startDate" v-model="startDate"
                    class="appearance-none outline-none rounded py-1 px-3 border border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-indigo-50 transition-all duration-300 w-40">
            </div>
            <div class="flex flex-col gap-1 p-1">
                <label class="text-gray-700">End Date</label>
                <input type="date" name="endDate" v-model="endDate"
                    class="appearance-none outline-none rounded py-1 px-3 border border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-indigo-50 transition-all duration-300 w-40">
            </div>
        </div>
        <div class="flex flex-col gap-[1.4rem]">
            <div class="flex flex-col gap-1 pt-11">
                <label class="text-gray-700">File Type</label>
                <div
                    class="relative rounded  border border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-indigo-50 transition-all duration-300 w-40">
                    <select class="appearance-none outline-none py-1 px-3 w-full bg-transparent" name="fileType"
                        v-model="fileType">
                        <option v-for="dt in ['Pdf', 'Excel', 'Zip', 'Text']" :key="dt" :value="dt">{{ dt }}</option>
                    </select>
                    <ChevronUpDownIcon class="text-gray-500 -z-10 absolute top-2 right-2 w-4 h-4"></ChevronUpDownIcon>
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <label class="text-gray-700">File Status</label>
                <div
                    class="relative rounded  border border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-indigo-50 transition-all duration-300 w-40">
                    <select class="appearance-none outline-none py-1 px-3 w-full bg-transparent" name="fileStatus"
                        v-model="fileStatus">
                        <option v-for="dt in ['Processed', 'Error', 'Queued']" :key="dt" :value="dt">{{ dt }}</option>
                    </select>
                    <ChevronUpDownIcon class="text-gray-500 -z-10 absolute top-2 right-2 w-4 h-4"></ChevronUpDownIcon>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-[1.4rem]">
            <div class="flex flex-col p-1 md:p-0 md:pt-11 gap-1">
                <label class="text-gray-700">File Name</label>
                <input type="text" name="fileName" v-model.trim="fileName"
                    class="appearance-none outline-none rounded py-1 px-3 border border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-indigo-50 transition-all duration-300 w-[21rem] md:w-72">
            </div>
            <div class="flex justify-end w-full md:pt-7 gap-2">
                <button type="submit"
                    class="rounded py-1 px-3 appearance-none outline-none bg-teal-600 text-white focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 focus:ring-offset-teal-50 transition-all duration-300 hover:bg-opacity-80">Submit</button>
                <button type="button" @click.stop="clear"
                    class="rounded py-1 px-3 appearance-none outline-none bg-gray-200  focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 transition-all duration-300 hover:bg-opacity-80">Clear</button>
            </div>
        </div>
    </form>
</template>

<style scoped></style>