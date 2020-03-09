<template functional>
    <footer class="page-footer cyan lighten-2">
        <div class="container">
              <div class="row">
                <div class="col s4">
                    <img src="https://nuxtjs.org/logos/nuxt-emoji.png"/>
                </div>
                <div class="col s4">
                  <h4 class="header pink-text text-darken-2">Materialize</h4>
                </div>
                <div class="col s4 hide-on-med-and-down">
                  <h4 class="header white-text">JSONPlaceholder</h4>
                </div>
              </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
              <div class="row">
                <div class="col l6 s6">
                  <h5 class="white-text">About me</h5>
                  <p class="black-text text-lighten-3">Interested in Vue.js javascript framework & Cloud applications</p>
                </div>
                <div class="col l4 offset-l2 s6">
                  <h5 class="white-text">Contact</h5>
                  <ul>
                    <li><a class="black-text" href="https://www.linkedin.com/in/gouthamrangarajan/"><i class="material-icons tiny">people</i>&nbsp;Linkedin</a></li>
                    <li><a class="black-text" href="mailTo:rgouthamraja@yahoo.com"><i class="material-icons tiny">email</i>&nbsp;Email</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
</template>
<script>
export default {
    name:'AppFooter'
}
</script>
<style scoped>
img{
  max-height: 5rem;
  max-width: 5rem;
}

</style>
