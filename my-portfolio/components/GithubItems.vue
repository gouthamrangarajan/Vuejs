<template>
  <div>
    <div class="py-2 flex flex-col">
      <div class="px-4 pt-2 flex flex-col items-center mb-1">
        <span class="text-xl text-black">Github</span>
        <span class="text-gray-600"
          >Recent collection in Vue.js & Asp .Net</span
        >
      </div>
      <trickyCardRow id="githubItems" :itemsLength="items.length">
        <template v-slot:items>
          <trickyProjectCard
            v-for="(item, index) in items"
            :key="index"
            :project="item"
            :occupyFull="items.length == 1"
          ></trickyProjectCard>
        </template>
      </trickyCardRow>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { items: [] }
  },
  components: {
    trickyCardRow: () => import('../components/TrickyCardRow.vue'),
    trickyProjectCard: () => import('../components/TrickyProjectCard.vue'),
  },
  async created() {
    let data = await import('../static/data.json')
    data.info.gitHub.forEach((el) => {
      if (el.items) {
        el.items.forEach((inel) => {
          let id = Math.random().toString(16).slice(8)
          this.items.push({
            id,
            url: inel.url,
            title: inel.title,
            imgSrc: inel.imgSrc,
            description: inel.description,
          })
        })
      }
    })
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
