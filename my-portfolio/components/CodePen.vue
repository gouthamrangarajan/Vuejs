<template>
  <div class="py-2 flex flex-col">
    <div class="px-4 pt-2 flex flex-col items-center mb-1">
      <span class="text-xl text-black">CODEPEN</span>
      <span class="text-gray-600">Recent collection in HTML, CSS & Vue.js</span>
    </div>
    <TrickyCardRow id="codepenitems" :itemsLength="info.length">
      <template v-slot:items>
        <TrickyProjectCard
          :project="item"
          v-for="item in info"
          :key="item.id"
          :id="'item_' + item.id"
        >
        </TrickyProjectCard>
      </template>
    </TrickyCardRow>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped></style>
