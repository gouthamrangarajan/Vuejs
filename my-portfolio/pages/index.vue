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
    let id = -1
    data.info.media.forEach((el) => {
      this.statistics.media.push({ id, url: el.url, name: el.name })
      id++
    })
    id = 1
    data.info.gitHub.forEach((el) => {
      this.statistics.github.push({ id, url: el.url, name: el.name })
      id++
    })
    this.about = data.info.about
    id = 1
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
        let collection = data.info.cloud[el]
        this.cloudItems.push({ id, name: el, collection })
        id++
      })
    id = 1
    data.info.gitHub.forEach((el) => {
      if (el.items) {
        el.items.forEach((inel) => {
          this.githubItems.push({
            id,
            url: inel.url,
            title: inel.title,
            imgSrc: inel.imgSrc,
            description: inel.description,
          })
          id++
        })
      }
    })
    id = 1
    data.info.codePen.forEach((el) => {
      this.codePenItems.push({
        id,
        url: el.url,
        imgSrc: el.imgSrc,
        title: el.title,
      })
      id++
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
