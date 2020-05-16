<template>
    <div>
        <smart-multiline-text-box></smart-multiline-text-box>
    </div>
</template>

<script>
// https://www.htmlelements.com/vue/dist/multilinetextbox/overview/
import "smart-webcomponents/source/styles/smart.default.css";
import "smart-webcomponents/source/smart.elements.js";

import { createNamespacedHelpers } from 'vuex';
import { EventBus } from "@/eventbus/event.bus";

const mapcontactmod = createNamespacedHelpers('contactmod')
const mapuimod      = createNamespacedHelpers('uimod')

export default {
    data() {
        return {
            mycallid: 0,
            mymultilinetbx: null
        }
    },
    methods: {
        initComponent() {
            this.mymultilinetbx = document.querySelector('smart-multiline-text-box');
            // console.log(`initComponent`);
            // console.log(this.mymultilinetbx);
            this.mymultilinetbx.addEventListener('change', function (pevent) {
                const text = pevent.target.value;
                console.log('SELECTION CHANGED');
                console.log(`llamadaid[${this.mycallid}]`);
                console.log(`comentario[${text}]`);
            });
        }
    },
    computed: {
        ...mapuimod.mapGetters({
            i18nestxt: 'geti18nes'
        }),
        ...mapcontactmod.mapGetters({
            currentContact: 'getCurrent'
        }),
        // totalLlamadas() {
        //     return (typeof(this.listLlamadas) !== 'undefined') ? 
        //         this.listLlamadas.length : 0;
        // },
    },
    mounted() {
        this.initComponent();
        console.log('EventBus.$on setllamadafocus');
        console.log(EventBus);
        EventBus.$on("setllamadafocus", ({llamadaid, comentario}) => {
            console.log('EventBus -> setllamadafocus -> llamada.comentario.form');
            console.log(`[${llamadaid}:${comentario}]`);
            this.mycallid = llamadaid;
            this.mymultilinetbx.value = comentario;
        });
    }
}
</script>

<style>
smart-multiline-text-box {
    width: inherit;
    height: inherit;
    min-width: 90px;
    --smart-multiline-text-box-default-height: 220px;
}
div .card {
    min-width: 290px;
}
</style>
