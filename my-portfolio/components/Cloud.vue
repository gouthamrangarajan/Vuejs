<template>
  <div>
    <div class="py-2 flex flex-col">
      <div class="px-4 pt-2 flex flex-col items-center">
        <span class="text-xl text-orange-700">Cloud Projects</span>
        <div
          v-for="cloud in info"
          :key="cloud.id"
          class="flex flex-col items-center mt-1"
        >
          <span class="text-xl text-yellow-700 uppercase">
            {{ cloud.name }}</span
          >
          <TrickyCardRow
            :id="cloud.name + 'items'"
            :itemsLength="getProject(cloud.collection).length"
          >
            <template v-slot:items>
              <TrickyProjectCard
                v-for="(item, index) in getProject(cloud.collection)"
                :key="index"
                :project="item"
                :occupyFull="getProject(cloud.collection).length == 1"
              >
              </TrickyProjectCard>
            </template>
          </TrickyCardRow>
        </div>
      </div>
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
  methods: {
    getProject(data) {
      let retData = data
        .filter((el) => {
          if (el.url) return true
          else return false
        })
        .map((el) => el)

      let others = data.filter((el) => {
        if (el.other) return true
        else return false
      })

      if (others.length == 1) others[0].other.forEach((el) => retData.push(el))

      return retData.sort((a, b) => {
        if (a.order > b.order) return 1
        else if (a.order < b.order) return -1
        else return 0
      })
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
