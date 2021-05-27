<template>
  <div>
    <div class="py-2 flex flex-col">
      <div class="px-4 pt-2 flex flex-col items-center mb-1">
        <span class="text-xl text-black">Github</span>
        <span class="text-gray-600"
          >Recent collection in Vue.js & Asp .Net</span
        >
      </div>
      <TrickyCardRow id="githubItems" :itemsLength="info.length">
        <template v-slot:items>
          <TrickyProjectCard
            v-for="(item, index) in info"
            :key="index"
            :project="item"
            :occupyFull="info.length == 1"
          ></TrickyProjectCard>
        </template>
      </TrickyCardRow>
    </div>
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
<style scoped>
@media only screen and (min-width: 992px) {
  .cloud {
    max-width: 63rem;
  }
}
</style>
