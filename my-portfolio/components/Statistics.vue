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
    <div
      class="
        bg-white
        rounded
        px-6
        py-4
        flex flex-col
        w-full
        lg:w-auto
        h-40
        space-y-3
      "
    >
      <span class="text-red-700 text-xl">Media</span>
      <div class="flex flex-row">
        <div class="flex flex-col">
          <template v-if="info.media.length > 0">
            <div v-for="item in info.media" :key="item.id" class="px-0 lg:px-2">
              {{ item.name }}:
            </div>
          </template>
          <template v-else>
            <div class="animate-pulse w-48 mt-1 px-2">
              <div class="rounded bg-gray-400 h-4 w-full"></div>
            </div>
            <div class="animate-pulse w-10/12 mt-2 px-2">
              <div class="rounded bg-gray-400 h-4 w-full"></div>
            </div>
          </template>
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
    <div
      class="flex w-full lg:w-auto space-x-1 lg:space-x-24 items-center h-40"
    >
      <div
        class="
          bg-white
          rounded
          py-4
          px-6
          flex flex-col
          w-full
          lg:w-auto
          h-40
          -mt-2
        "
      >
        <span class="text-red-700 text-xl mb-1">Github Repos</span>
        <template v-if="info.github.length > 0">
          <div v-for="item in info.github" :key="item.id" class="px-2">
            <a
              class="cursor-pointer text-blue-700"
              @click="openUrl(item.url)"
              >{{ item.name }}</a
            >
          </div>
        </template>
        <template v-else>
          <div class="animate-pulse w-10/12">
            <div class="rounded bg-gray-400 h-4 w-full"></div>
          </div>
          <div class="animate-pulse w-10/12 mt-2">
            <div class="rounded bg-gray-400 h-4 w-full"></div>
          </div>
        </template>
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
