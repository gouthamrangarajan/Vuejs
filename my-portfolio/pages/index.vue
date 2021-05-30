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
  async asyncData() {
    const ret = {
      statistics: { media: [], github: [] },
      about: '',
      cloudItems: [],
      githubItems: [],
      codePenItems: [],
    }
    let data = await import('../static/data.json')
    let id = -1
    data.info.media.forEach((el) => {
      ret.statistics.media.push({ id, url: el.url, name: el.name })
      id++
    })
    id = 1
    data.info.gitHub.forEach((el) => {
      ret.statistics.github.push({ id, url: el.url, name: el.name })
      id++
    })
    ret.about = data.info.about
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
        ret.cloudItems.push({ id, name: el, collection })
        id++
      })
    id = 1
    data.info.gitHub.forEach((el) => {
      if (el.items) {
        el.items.forEach((inel) => {
          ret.githubItems.push({
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
      ret.codePenItems.push({
        id,
        url: el.url,
        imgSrc: el.imgSrc,
        title: el.title,
      })
      id++
    })
    return ret
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
