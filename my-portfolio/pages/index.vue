<template>
  <div class="bg-gray-100">
    <Banner></Banner>
    <About :info="about"></About>
    <div class="mt-2"></div>
    <Statistics :info="statistics"></Statistics>
    <div class="mt-2"></div>
    <Cloud :info="cloudItems"></Cloud>
    <div class="mt-2"></div>
    <GithubItems :info="githubItems"></GithubItems>
    <div class="mt-2"></div>
    <CodePen :info="codePenItems"></CodePen>
  </div>
</template>

<script>
export default {
  data() {
    return {
      statistics: { media: [], github: [] },
      about: '',
      cloudItems: [],
      githubItems: [],
      codePenItems: [],
    }
  },
  async created() {
    let data = await import('../static/data.json')
    data.info.media.forEach((el) => {
      let id = Math.random().toString(16).slice(8)
      this.statistics.media.push({ id, url: el.url, name: el.name })
    })
    data.info.gitHub.forEach((el) => {
      let id = Math.random().toString(16).slice(8)
      this.statistics.github.push({ id, url: el.url, name: el.name })
    })
    this.about = data.info.about
    Object.keys(data.info.cloud)
      .sort((a, b) => {
        if (a == 'firebase') return -1
        else if (b == 'firebase') return 1
        else if (a == 'netlify') return -1
        else if (b == 'netlify') return 1
        else if (a == 'aws') return -1
        else if (b == 'aws') return 1
        else return 0
      })
      .forEach((el) => {
        let id = Math.random().toString(16).slice(8)
        let collection = data.info.cloud[el]
        this.cloudItems.push({ id, name: el, collection })
      })
    data.info.gitHub.forEach((el) => {
      if (el.items) {
        el.items.forEach((inel) => {
          let id = Math.random().toString(16).slice(8)
          this.githubItems.push({
            id,
            url: inel.url,
            title: inel.title,
            imgSrc: inel.imgSrc,
            description: inel.description,
          })
        })
      }
    })
    data.info.codePen.forEach((el) => {
      let id = Math.random().toString(16).slice(8)
      this.codePenItems.push({
        id,
        url: el.url,
        imgSrc: el.imgSrc,
        title: el.title,
      })
    })
  },
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
