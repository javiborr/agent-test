<template>
  <div>
    <!-- <load-contact-tester /> -->
      <loader />
      <contact-form />
  </div>
</template>

<script>
// @ is an alias to /src
//import LoadContactTester from '@/components/test/loadcontacttest.vue'
import Loader from '@/components/loader.vue'
import ContactForm from '@/components/contact.form.vue'
//import LlamadasOutLista from '@/components/llamada.out.list.vue'

export default {
  name: 'TestOutbound',
  components: {
    //LoadContactTester,
    //LlamadasOutLista,
    Loader,
    ContactForm
  }
}
</script>
