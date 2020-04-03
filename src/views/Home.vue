<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <LoadContactTester />
  </div>
</template>

<script>
// @ is an alias to /src
import LoadContactTester from '@/components/test/loadcontacttest.vue'

export default {
  name: 'Home',
  components: {
    LoadContactTester
  }
}
</script>
