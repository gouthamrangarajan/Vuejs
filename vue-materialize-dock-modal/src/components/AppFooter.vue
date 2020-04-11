<template functional>
    <footer class="page-footer white">            
        <div class="footer-copyright white black-text">
             <div class="container">
            <div class="row">           
               <div class="col l6 s12">
                <h5>About</h5>                
                <p>Simple Dock Modal using Vuejs & Materialize</p>
              </div> 
              <div class="col l4 offset-l2 s12">
                <h5>Contact</h5>
                <ul>
                  <li :key="1"><a class="black-text" href="https://www.linkedin.com/in/gouthamrangarajan/"><i class="material-icons tiny">people</i>&nbsp;Linkedin</a></li>                
                  <li :key="2"><a class="black-text" href="mailTo:rgouthamraja@yahoo.com"><i class="material-icons tiny">email</i>&nbsp;Email</a></li>                
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
