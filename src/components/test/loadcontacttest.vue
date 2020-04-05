<template>
  <div class="text-align-center">
    <input type="text" 
        v-model="llamadaid"
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
            llamadaid: 1
        }
    },
    methods: {
        ...mapcontactmod.mapActions(['fetchLlamadaContact'])
        ,
        async actionClick() {
            const id = parseInt(this.llamadaid);
            console.log(`actionClick [${this.llamadaid}:${id}]`);
            //this.$store.commit('ui/SET_UI_BUSY', true);
            //const inputValue = event.target.value
            await this.fetchLlamadaContact(id);
            EventBus.$emit("msuccess", `Prueba realizada [${this.llamadaid}]`);
        }
    }
}
</script>