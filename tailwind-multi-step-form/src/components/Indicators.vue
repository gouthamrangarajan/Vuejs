<script setup lang="ts">
import { ref, watch } from "vue";
const props = defineProps({ step: Number });
const indicatorClass = ref("-left-3");
watch(
  () => props.step,
  (newVal, _) => {
    switch (newVal) {
      case 1: {
        indicatorClass.value = "-left-3";
        break;
      }
      case 2: {
        indicatorClass.value = "left-[31%]";
        break;
      }
      case 3: {
        indicatorClass.value = "left-[65%]";
        break;
      }
    }
  }
);
</script>
<template>
  <div
    class="w-full flex items-center justify-center space-x-2 lg:space-x-3 relative"
  >
    <div
      class="flex flex-col w-1/3 justify-center items-center space-y-1"
      v-for="el in 3"
      key="el"
    >
      <div class="h-2 w-full bg-gray-300 rounded-full relative"></div>
      <span
        v-if="el == 1"
        :class="[
          'w-full truncate transition duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text italic text-sm',
          { 'font-semibold': step == el },
        ]"
        >Personal Information</span
      >
      <span
        v-if="el == 2"
        :class="[
          'w-full truncate transition duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text italic text-sm',
          { 'font-semibold': step == el },
        ]"
        >Email &amp; Password</span
      >
      <span
        v-if="el == 3"
        :class="[
          'w-full truncate transition duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text italic text-sm',
          { 'font-semibold': step == el },
        ]"
        >Mobile &amp; OTP</span
      >
    </div>
    <div
      :class="[
        'h-2 w-1/3 bg-purple-600 rounded-full absolute top-0  transition-all duration-300',
        indicatorClass,
      ]"
    ></div>
  </div>
</template>
<style scoped>
.slide-left-enter-active,
.slide-right-enter-active {
  transition: all 0.3s ease-in-out;
}
.slide-left-enter-from,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX("-100%");
}
.slide-right-leave-from,
.slide-right-enter-to {
  opacity: 0;
  transform: translateX("100%");
}
</style>
