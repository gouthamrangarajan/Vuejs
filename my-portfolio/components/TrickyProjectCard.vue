<template>
  <div class="card bg-white rounded-t cursor-pointer">
    <div class="py-4 px-6 h-32">
      <a
        class="cursor-pointer underline text-blue-700 text-justify text-lg"
        @click="launch(project.url)"
      >
        <template v-if="project.title">
          {{ project.title }}
        </template>
        <template v-else>
          {{ project.url }}
        </template>
      </a>
      <template v-if="project.description">
        <p class="px-4 mt-1 text-justify text-sm text-gray-600">
          {{ project.description }}
        </p>
      </template>
    </div>
    <template v-if="project.imgSrc">
      <img :src="project.imgSrc" class="rounded-b shadow object-contain" />
    </template>
  </div>
</template>
<script>
export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
    occupyFull: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    launch(url) {
      window.open(url)
    },
  },
}
</script>
<style scoped>
.card {
  width: 600px;
  min-width: 600px;
  box-shadow: -1rem 0 3rem #f7fafc;
  transition: all 0.3s;
}
@media only screen and (max-width: 991px) {
  .card {
    width: 400px;
    min-width: 400px;
  }
}
img {
  height: 19rem;
}
</style>
