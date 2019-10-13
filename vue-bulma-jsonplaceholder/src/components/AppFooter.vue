<template>
    <footer class="footer">
        <div class="content has-text-centered container">
            <p>
                <strong>RG</strong>               
            </p>
            <div class="columns is-mobile">
                <div class="column is-one-third">
                    <figure class="image is-64x64">
                            <img src="./../assets/logo.png"/>
                    </figure>
                </div>
                <div class="column is-one-third is-padding-two">
                    <figure class="image is-128x128">
                        <img src="./../assets/bulma-logo.png"/>
                    </figure>
                </div>
                <div class="column is-hidden-mobile is-padding-two">
                   <p class="title is-size-4">
                       JSONPlaceholder
                   </p>
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
.is-padding-two{
    padding-top:2rem;
}
</style>