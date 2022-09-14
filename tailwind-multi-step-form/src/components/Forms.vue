<script lang="ts" setup>
import { ref } from "vue";
import { useMotion } from "@vueuse/motion";
import Step1 from "../components/Step1.vue";
import Step2 from "../components/Step2.vue";
import Step3 from "../components/Step3.vue";
import Indicators from "../components/Indicators.vue";

const currStep = ref(1);
const prevStep = ref(0);
const slideDownEl = ref<HTMLDivElement>();

const goNext = () => {
  if (currStep.value < 3) {
    prevStep.value = currStep.value;
    currStep.value = currStep.value + 1;
  }
};
const goPrev = () => {
  if (currStep.value > 1) {
    prevStep.value = currStep.value;
    currStep.value = currStep.value - 1;
  }
};
useMotion(slideDownEl, {
  initial: { opacity: 0, y: "-100%" },
  enter: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 5 },
  },
});
</script>
<template>
  <div
    class="bg-white shadow-2xl shadow-indigo-300 py-4 px-6 pt-6 rounded-xl w-11/12 md:w-9/12 lg:w-5/12 xl:w-4/12 flex flex-col justify-between overflow-hidden h-[24rem]"
    ref="divEl"
  >
    <Indicators :step="currStep"></Indicators>
    <div class="mt-6">
      <transition :name="prevStep > currStep ? 'slide-right' : 'slide-left'">
        <div v-if="currStep == 1" :key="1"><Step1></Step1></div>
        <div v-else-if="currStep == 2" :key="2"><Step2></Step2></div>
        <div v-else-if="currStep == 3" :key="3"><Step3></Step3></div>
      </transition>
    </div>
    <div class="mt-4 flex justify-between">
      <button
        class="appearance-none outline-none py-2 px-4 rounded hover:opacity-90 bg-black text-white transition duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-black focus:ring-offset-gray-50 disabled:cursor-not-allowed disabled:bg-gray-400"
        :disabled="currStep == 1"
        @click="goPrev"
      >
        &lt; Prev
      </button>
      <button
        class="appearance-none outline-none py-2 px-4 rounded hover:opacity-90 bg-black text-white transition duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-black focus:ring-offset-gray-50 disabled:cursor-not-allowed disabled:bg-gray-400"
        @click="goNext"
        :disabled="currStep == 3"
      >
        Next &gt;
      </button>
    </div>
  </div>
</template>
<style scoped>
.slide-left-enter-active,
.slide-right-enter-active {
  transition: all 0.3s ease-in-out;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translateX(10px);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
