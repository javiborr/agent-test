<template>
    <div class="card-body pl-0 pr-0" id="telefonos_cardbody">
        <div class="btn-toolbar" role="toolbar">
            <div class="btn-group mr-2" role="group" 
                v-for="telef in listPhones" :key="telef">
                <button type="button" class="btn btn-outline-secondary" 
                    :id="`reprograma_btn_${telef}`"
                    @click="eligeTelefReprogramar($event)"
                    >
                    <i class="material-icons">phone</i>&nbsp;<span class="align-top">{{ telef }}&nbsp;</span>
                </button>
                <smart-tooltip :id="`reprograma_ttip_${telef}`" 
                    :selector="`#reprograma_btn_${telef}`"
                    class="animation material" 
                    arrow-direction='top' arrow>
                    Reprograma llamada a {{ telef }}
                </smart-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
// https://www.htmlelements.com/demos/tooltip/basic/
import "smart-webcomponents/source/styles/smart.default.css";
import "smart-webcomponents/source/smart.elements.js";

import { createNamespacedHelpers } from 'vuex';
//import { EventBus } from "@/eventbus/event.bus";

const mapcontactmod = createNamespacedHelpers('contactmod')
const maprepromod   = createNamespacedHelpers('reprogramamod')

export default {
    methods: {
        ...maprepromod.mapActions(['eligeTelefonoRepro'])
        ,
        eligeTelefReprogramar(pevent) {
            // innerText: "phone 912708353"
            const txt = pevent.target.innerText;
            const telef = txt.replace('phone ','').trim();
            this.eligeTelefonoRepro(telef);
            console.log(`eligeTelefReprogramar [${telef}]`);
            //console.log(pevent.target);
        }
    },
    computed: {
        ...mapcontactmod.mapGetters({
            currentContact: 'getCurrent'
        }),
        listPhones() {
            const c = this.currentContact;
            const ls = [];
            if ( c.telefono1 ) ls.push(c.telefono1);
            if ( c.telefono2 ) ls.push(c.telefono2);
            if ( c.telefono3 ) ls.push(c.telefono3);
            if ( c.telefono4 ) ls.push(c.telefono4);
            return ls;
        }
    },
    updated() {
        console.log(`updated telefonos_cardbody`);
        // Es necesario mover los tooltips fuera del DIV
        // <div class="btn-toolbar" role="toolbar">
        // Para poder mostrarlos debajo de los botones
        const parent = document.getElementById('telefonos_cardbody');
        const ttpls = parent.querySelectorAll('smart-tooltip');
        let left = 10;
        ttpls.forEach(pttip => {
            // SI aun no
            if ( pttip.parentNode !== parent ) {
                parent.appendChild(pttip);
                pttip.arrow = true;
                pttip.arrowDirection = 'top';
                pttip.style.left = `${left}px`;
                left =+ 65;
                // reprograma_ttip_${telef} reprograma_btn_${telef}
                const btnid = pttip.id.replace('ttip','btn');
                const btn = document.getElementById(btnid);
                // SI OK
                if (btn) {
                    //console.log(`addEventListener TOOLTIP [${pttip}:${btn}]`);
                    btn.addEventListener('mouseenter', function () {
                        pttip.open();
                    });
                    btn.addEventListener('mouseleave', function () {
                        pttip.close();
                    });
                } else {
                    console.log(`addEventListener ERROR [${pttip}:${btn}]`);
                }
            } else {
                console.log('NO mueve los tooltips');
            }
        });
    }
}
</script>

<style>
.material-icons {
    font-size: 20px;
}
.btn {
    font-size: .8rem;
}
</style>
