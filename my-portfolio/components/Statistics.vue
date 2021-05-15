<template>
  <div
    class="
      flex flex-col
      lg:flex-row
      justify-center
      items-center
      space-y-2
      lg:space-x-24
      p-1
    "
  >
    <div class="bg-white rounded px-6 py-4 flex flex-row w-full lg:w-auto">
      <div class="flex flex-col">
        <span class="text-red-700 text-xl">Media</span>
        <div v-for="item in media" :key="item.id" class="px-0 lg:px-2">
          {{ item.name }}:
        </div>
      </div>
      <div class="flex flex-col w-full">
        <div class="text-xl">&nbsp;</div>
        <div v-for="item in media" :key="item.id">
          <a
            class="cursor-pointer underline text-blue-700 text-sm lg:text-base"
            @click="openUrl(item.url)"
            >{{ item.url }}</a
          >
        </div>
      </div>
    </div>
    <div class="bg-white rounded py-4 px-6 flex flex-col w-full lg:w-auto">
      <span class="text-red-700 text-xl">Github Repos</span>
      <div v-for="item in github" :key="item.id" class="px-2">
        <a class="cursor-pointer text-blue-700" @click="openUrl(item.url)">{{
          item.name
        }}</a>
      </div>
    </div>
    <div class="bg-white rounded py-4 px-6 flex flex-col w-full lg:w-auto">
      <span class="text-blue-700 text-xl"
        >Resume&nbsp;&nbsp;
        <a
          class="cursor-pointer float-right text-green-700"
          href="/Goutham Rangarajan.docx"
          download
        >
          <i class="material-icons">file_download</i>
        </a>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      media: [],
      github: [],
    }
  },
  async created() {
    let data = await import('../static/data.json')
    data.info.media.forEach((el) => {
      let id = Math.random().toString(16).slice(8)
      this.media.push({ id, url: el.url, name: el.name })
    })
    data.info.gitHub.forEach((el) => {
      let id = Math.random().toString(16).slice(8)
      this.github.push({ id, url: el.url, name: el.name })
    })
  },
  methods: {
    openUrl(url) {
      window.open(url)
    },
  },
}
</script>
<style scoped>
i {
  font-size: 1rem !important;
}
</style>
