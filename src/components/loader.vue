<script>
import { createNamespacedHelpers } from 'vuex';
// import { EventBus } from "@/eventbus/event.bus";

const mapcontactmod = createNamespacedHelpers('contactmod')
const maprepromod   = createNamespacedHelpers('reprogramamod')
const usermod       = createNamespacedHelpers('usermod')

export default {
    data() {
        return {
            llamadaid: 32,
            telefono: ''
            // myuser: {
            //     userid: 2003, 
            //     nombre: 'Javier	Borrajo', 
            //     loginname: 'jborrajo'
            // }
        }
    },
    methods: {
        ...usermod.mapActions(['setCurrentUser','fetchUserById'])
        ,
        ...mapcontactmod.mapActions(['fetchLlamadaContact','setTelefono'])
        ,
        ...maprepromod.mapActions(['fetchUsers'])
        ,
        async receiveMessage(pevent) {
            console.log('receiveMessage');
            console.log(pevent);
            // Do we trust the sender of this message?
            // if (pevent.origin !== "http://example.com:8080")
            //     return;
            // SI entorno
            if (pevent.data.entorno) {
                console.log(`Recibe entorno[${pevent.data.entorno}]`)
                //this.$store.setEntorno(pevent.data.entorno);
                this.$store.state.entorno = pevent.data.entorno;
            }
            // SI telefono
            if (pevent.data.telefono && pevent.data.telefono !== '') {
                console.log(`Recibe telefono[${typeof(pevent.data.telefono)}:${pevent.data.telefono}]`)
                this.telefono = pevent.data.telefono;
                this.setTelefono(this.telefono);
            }
            // SI userid
            if (pevent.data.userid && parseInt(pevent.data.userid) >= 0) {
                console.log(`Recibe userid[${typeof(pevent.data.userid)}:${pevent.data.userid}]`)
                await this.fetchUserById(pevent.data.userid);
            }
            // SI llamadaid
            if (pevent.data.llamadaid && parseInt(pevent.data.llamadaid) >= 0) {
                console.log(`Recibe llamadaid[${typeof(pevent.data.llamadaid)}:${pevent.data.llamadaid}]`)
                this.llamadaid = parseInt(pevent.data.llamadaid);
                await this.fetchLlamadaContact(this.llamadaid);
            }
        }
    },
    // created() {
    //     this.setCurrentUser(this.myuser);
    // },
    mounted() {
        console.log(`loader mounted`);
        this.fetchUsers();
        //EventBus.$emit("myuser", this.myuser);
        // popup
        window.addEventListener("message", this.receiveMessage, false);
        window.opener.postMessage("READY","*");
    }
}
</script>