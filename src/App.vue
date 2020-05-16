<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Prueba Saliente</router-link> |
      <router-link to="/inbound">Prueba Entrante</router-link>
    </div>
    <router-view/> -->
      <loader />
      <contact-form />
  </div>
</template>

<script>
// @ is an alias to /src
import Loader from '@/components/loader.vue'
import ContactForm from '@/components/contact.form.vue'

export default {
  components: {
    Loader,
    ContactForm
  }
}
</script>

<style lang="scss">
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}

#nav {
  padding: 10px 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
