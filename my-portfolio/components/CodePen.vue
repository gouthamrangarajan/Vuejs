<template>
  <div class="py-2 flex flex-col">
    <div class="px-4 pt-2 flex flex-col items-center mb-1">
      <span class="text-xl text-black">CODEPEN</span>
      <span class="text-gray-600">Recent collection in HTML, CSS & Vue.js</span>
    </div>
    <trickyCardRow id="codepenitems" :itemsLength="collection.length">
      <template v-slot:items>
        <trickyCodePenCard
          :project="item"
          v-for="item in collection"
          :key="item.id"
          :id="'item_' + item.id"
        >
        </trickyCodePenCard>
      </template>
    </trickyCardRow>
  </div>
</template>
<script>
export default {
  data() {
    return {
      collection: [],
    }
  },
  async created() {
    let data = await import('../static/data.json')
    data.info.codePen.forEach((el) => {
      let id = Math.random().toString(16).slice(8)
      this.collection.push({
        id,
        url: el.url,
        imgSrc: el.imgSrc,
        title: el.title,
      })
    })
  },
  components: {
    trickyCodePenCard: () => import('../components/TrickyProjectCard.vue'),
    trickyCardRow: () => import('../components/TrickyCardRow.vue'),
  },
  methods: {},
}
</script>

<style scoped></style>
