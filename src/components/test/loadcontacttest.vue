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
import { EventBus } from "@/eventbus/event.bus";

const mapcontactmod = createNamespacedHelpers('contactmod')
const maprepromod   = createNamespacedHelpers('reprogramamod')
const usermod       = createNamespacedHelpers('usermod')

export default {
    data() {
        return {
            llamadaid: 32,
            myuser: {
                userid: 2003, 
                nombre: 'Javier	Borrajo', 
                loginname: 'jborrajo'
            }
        }
    },
    methods: {
        ...usermod.mapActions(['setCurrentUser'])
        ,
        ...mapcontactmod.mapActions(['fetchLlamadaContact'])
        ,
        ...maprepromod.mapActions(['fetchUsers'])
        ,
        async actionClick() {
            const id = parseInt(this.llamadaid);
            console.log(`actionClick [${this.llamadaid}:${id}]`);
            //this.$store.commit('ui/SET_UI_BUSY', true);
            //const inputValue = event.target.value
            await this.fetchLlamadaContact(id);
            EventBus.$emit("msuccess", `Prueba realizada [${this.llamadaid}]`);
        },
        async receiveMessage(pevent) {
            console.log('receiveMessage');
            console.log(pevent);
            // Do we trust the sender of this message?
            // if (pevent.origin !== "http://example.com:8080")
            //     return;
            const llamadaid = pevent.data.llamadaid;
            const id = parseInt(llamadaid);
            await this.fetchLlamadaContact(id);
        }
    },
    created() {
        this.setCurrentUser(this.myuser);
    },
    mounted() {
        console.log(`loadcontacttest mounted`);
        this.fetchUsers();
        EventBus.$emit("myuser", this.myuser);
        // popup
        window.addEventListener("message", this.receiveMessage, false);
        window.opener.postMessage("READY","*");
    }
}
</script>