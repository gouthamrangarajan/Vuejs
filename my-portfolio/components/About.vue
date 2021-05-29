<template>
  <div class="flex w-full items-center justify-center p-1">
    <div
      class="
        flex flex-col
        items-start
        rounded
        px-6
        py-4
        shadow
        bg-white
        w-full
        lg:w-9/12
        xl:w-7/12
        h-40
        md:h-32
      "
    >
      <span class="text-teal-700 text-xl">About</span>
      <template v-if="info != ''">
        <p class="text-md">{{ info }}</p>
      </template>
      <template v-else>
        <div class="animate-pulse w-11/12">
          <div class="rounded bg-gray-400 h-4 w-full"></div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: String,
      required: true,
    },
  },
}
</script>
