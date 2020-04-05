<template>
  <div class="home">
    <diV>
      <LoadContactTester />
    </diV>
    <diV>
      <ContactForm />
    </diV>
  </div>
</template>

<script>
// @ is an alias to /src
import LoadContactTester from '@/components/test/loadcontacttest.vue'
import ContactForm from '@/components/contact.form.vue'

export default {
  name: 'TestOutbound',
  components: {
    LoadContactTester,
    ContactForm
  }
}
</script>
