<template>
  <nav class="h-40">
    <div class="banner h-48 flex flex-row justify-between">
      <div
        class="flex flex-col items-center pt-6 lg:pt-12 w-full pl-2 lg:pl-24"
      >
        <span class="banner__heading text-2xl text-white">
          Goutham Rangarajan
        </span>
        <span class="banner__heading text-lg text-white italic"> RG </span>
      </div>
      <div class="p-1 w-24 h-24">
        <img
          @click="showModal = true"
          src="../static/my-avatar.jpg"
          class="cursor-pointer rounded-full object-fit mt-2 md:mt-1 lg:mt-0"
        />
      </div>
      <imgModal v-model="showModal"></imgModal>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return { showModal: false }
  },
  components: {
    imgModal: () => import('../components/ImgModal.vue'),
  },
}
</script>
<style scoped>
.banner {
  background: linear-gradient(#000, #edf2f7);
}
</style>
