<script setup lang="ts">
import { useAuditStore } from '@/stores/audit'
import { useDateFormat } from "@vueuse/core"
import { useMotion } from '@vueuse/motion'
import { storeToRefs } from "pinia"
import { ref } from 'vue'
import PlusIcon from "@heroicons/vue/24/solid/PlusIcon"
import MinusIcon from "@heroicons/vue/24/solid/MinusIcon"

const { data, expandedRows } = storeToRefs(useAuditStore())
const { toggleExpanded } = useAuditStore()

const divEl = ref<HTMLDivElement>()
useMotion(divEl, {
    initial: {
        opacity: 0,
        y: 100
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

</script>
<template>
    <div class="shadow-2xl rounded-lg w-full py-4 px-6 overflow-x-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-green-100"
        ref="divEl">
        <table class="lg:table-fixed w-full">
            <thead>
                <tr class="shadow shadow-gray-300">
                    <th class="py-1 px-3 lg:w-[5%]"></th>
                    <th class="py-1 px-3 text-left text-gray-600 lg:w-[12.5%]">Date</th>
                    <th class="py-1 px-3 text-left text-gray-600 lg:w-[27.5%]">File</th>
                    <th class="py-1 px-3 text-left text-gray-600 lg:w-[12.5%]">Status</th>
                    <th class="py-1 px-3 text-left text-gray-600 lg:w-[30%]">Message</th>
                    <th class="py-1 px-3 text-left text-gray-600 lg:w-[12.5%]">Processing Time</th>
                </tr>
            </thead>
            <TransitionGroup tag="tbody" name="items" class="relative">
                <template v-for="dt in data" :key="dt.id">
                    <tr :class="[' cursor-pointer', { 'shadow shadow-gray-300': !expandedRows.includes(dt.id) }]">
                        <td class="py-1 px-3">
                            <button @click="toggleExpanded(dt.id)"
                                class="apperance-none outline-none p-1 rounded-full bg-red-600 transition-all duration-300 text-white focus:ring-1 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50">
                                <transition name="fade" mode="out-in">
                                    <PlusIcon class="w-3 h-3" v-if="!expandedRows.includes(dt.id)" :key="1">
                                    </PlusIcon>
                                    <MinusIcon class="w-3 h-3" v-else :key="2"></MinusIcon>
                                </transition>
                            </button>
                        </td>
                        <td :class="['py-1 px-3 text-gray-700']">{{ useDateFormat(dt.date, "YYYY-MM-DD").value }}</td>
                        <td :class="['py-1 px-3 text-gray-700']">{{ dt.fileName }}</td>
                        <td
                            :class="['py-1 px-3 font-semibold', dt.status == 'Error' ? 'text-red-600' : dt.status == 'Queued' ? 'text-indigo-600' : 'text-teal-600']">
                            {{ dt.status }}</td>
                        <td :class="['py-1 px-3 text-gray-700']">{{ dt.statusMsg }}</td>
                        <td :class="['py-1 px-3 text-gray-500 italic text-sm']">{{ dt.processTime }}</td>
                    </tr>
                    <tr v-if="expandedRows.includes(dt.id)" class="shadow shadow-gray-300">
                        <td class="py-1 px-3 text-gray-700 text-center" colspan="6">
                            {{ dt.additionInfo }}
                        </td>
                    </tr>
                </template>
            </TransitionGroup>
        </table>
    </div>
</template>
<style scoped>
.items-move {
    transition: all 0.3s ease-in-out;
}

.items-enter-active,
.items-leave-active {
    transition: all 0.3s ease-in-out;
}

.items-enter-from,
.items-leave-to {
    opacity: 0;
    transform: translateY(-2px);
}

.items-leave-active {
    position: absolute;
}
</style>