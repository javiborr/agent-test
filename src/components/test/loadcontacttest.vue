<template>
  <div class="text-align-center">
    <input type="text" 
        v-model="contactid"
        id="contactidinput" placeholder="ID del contacto">
    <button @click="actionClick()">Click</button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { EventBus } from "@/main";

const mapcontactmod = createNamespacedHelpers('contactmod')

export default {
    data() {
        return {
            contactid: 0
        }
    },
    methods: {
        ...mapcontactmod.mapActions(['fetchContact'])
        ,
        async actionClick() {
            const id = parseInt(this.contactid);
            console.log(`actionClick [${this.contactid}:${id}]`);
            //this.$store.commit('ui/SET_UI_BUSY', true);
            //const inputValue = event.target.value
            await this.fetchContact(id);
            EventBus.$emit("msuccess", `Prueba realizada [${this.contactid}]`);
        }
    }
}
</script>