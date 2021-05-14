<template>
  <div>
    <div class="flex justify-end">
      <a
        class="btn cursor-pointer px-2 pb-1 pt-2 bg-green-500 hover:bg-green-700 text-white text-sm rounded-full"
        @click="launch"
      >
        <i class="material-icons">launch</i>
      </a>
    </div>
    <div class="img__container">
      <nuxt-img :src="imgSrc" class="object-contain rounded" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: false,
      default: 450,
    },
    width: {
      type: Number,
      required: false,
      default: 600,
    },
    imgSrc: {
      type: String,
      required: true,
    },
  },
  methods: {
    launch() {
      window.open(this.url)
    },
  },
}
</script>
<style scoped>
i {
  font-size: 1rem !important;
}
.btn {
  transition: all 0.3s;
}
.img__container {
  width: 600px;
}
@media only screen and (max-width: 991px) {
  .img__container {
    width: 400px;
  }
}
</style>
