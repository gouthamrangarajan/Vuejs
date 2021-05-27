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
    <div class="bg-white rounded px-6 py-4 flex flex-col w-full lg:w-auto">
      <span class="text-red-700 text-xl">Media</span>
      <div class="flex flex-row">
        <div class="flex flex-col">
          <div v-for="item in info.media" :key="item.id" class="px-0 lg:px-2">
            {{ item.name }}:
          </div>
        </div>
        <div class="flex flex-col w-full">
          <div v-for="item in info.media" :key="item.id">
            <a
              class="
                cursor-pointer
                underline
                text-blue-700 text-sm
                lg:text-base
              "
              @click="openUrl(item.url)"
              >{{ item.url }}</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded py-4 px-6 flex flex-col w-full lg:w-auto">
      <span class="text-red-700 text-xl">Github Repos</span>
      <div v-for="item in info.github" :key="item.id" class="px-2">
        <a class="cursor-pointer text-blue-700" @click="openUrl(item.url)">{{
          item.name
        }}</a>
      </div>
    </div>
    <div class="bg-white rounded py-4 px-6 flex flex-col w-full lg:w-auto">
      <span class="text-blue-700 text-xl flex items-center space-x-2"
        ><span>Resume</span>
        <a
          class="cursor-pointer text-green-700 mt-1"
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
  props: {
    info: {
      type: Object,
      required: true,
    },
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
