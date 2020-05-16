<template>
    <div class="card">
        <div class="card-header pb-0">
            <contact-header />
        </div>
        <div id="contact_main_div" class="card-body pt-2 pl-2">
            <div class="d-flex flex-row">
                <div class="card p-2">
                    <h5 class="card-title"><i class="material-icons">face</i>&nbsp;{{ currentContact.nombre}}&nbsp;{{ currentContact.apellido1}}&nbsp;{{ currentContact.apellido2}}</h5>
                    <p class="card-text">NIF: {{ currentContact.nif}}</p>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item pl-0 pr-0"><i class="material-icons">email</i>&nbsp;{{ currentContact.email}}</li>
                        <li class="list-group-item pl-0 pr-0"><i class="material-icons">apartment</i>&nbsp;{{ currentContact.domicilio}}&nbsp;{{ currentContact.cpostal}}&nbsp;{{ currentContact.localidad}}</li>
                        <li class="list-group-item pl-0 pr-0">
                            <autoriza-form />
                        </li>
                        <li class="list-group-item pl-1 pr-0 bg-primary text-white">
                            <p class="card-text mb-0 font-weight-bold">Ofrecer productos</p>
                            <ofrecer-productos />
                        </li>
                    </ul>
                    <contact-telefonos />
                </div>
                <div id="tipificarcard" class="card p-3">
                    <h6 class="card-title">Tipificar llamada</h6>
                    <tipificar-form />
                </div>
                <div id="reprogramarcard" class="card p-3">
                    <h6 class="card-title">Reprogramar llamada</h6>
                    <reprogramar-form></reprogramar-form>
                </div>
            </div>
            <div id="llamadasdiv" class="d-flex flex-row">
                <div class="card llamadascard">
                    <div class="card-body">
                        <h6 class="card-title ">Llamadas de {{ currentContact.nombre}}&nbsp;{{ currentContact.apellido1}}&nbsp;{{ currentContact.apellido2}}</h6>
                        <llamadas-out-lista />
                    </div>
                </div>
                <div class="card llamadascard">
                    <div class="card-body">
                        <h6 class="card-title ">Comentario llamada actual</h6>
                        <llamada-comentario-form />
                        <a href="#" class="btn btn-primary">Graba comentario</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// https://www.htmlelements.com/demos/tooltip/basic/
import "smart-webcomponents/source/styles/smart.default.css";
import "smart-webcomponents/source/smart.elements.js";

import ContactHeader         from '@/components/contact.header.vue'
import ContactTelefonos      from '@/components/contact.telefonos.vue'
import OfrecerProductos      from '@/components/productos.ofrecer.vue'
import AutorizaForm          from '@/components/autoriza.form.vue'
import LlamadasOutLista      from '@/components/llamada.out.list.vue'
import LlamadaComentarioForm from '@/components/llamada.comentario.form.vue'
import TipificarForm         from '@/components/tipificar.form.vue'
import ReprogramarForm       from '@/components/reprogramar.form.vue'

import { createNamespacedHelpers } from 'vuex';
//import { EventBus } from "@/eventbus/event.bus";

const mapcontactmod = createNamespacedHelpers('contactmod')
// const maprepromod = createNamespacedHelpers('reprogramamod')

window.Smart.License = 'B3EAE359-9D40-477C-912D-FF7C804FC812';
console.log(window.Smart.License);

export default {
    components: {
        ContactHeader,
        ContactTelefonos,
        AutorizaForm,
        OfrecerProductos,
        LlamadasOutLista,
        LlamadaComentarioForm,
        TipificarForm,
        ReprogramarForm
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
    // },
    // mounted() {
    //     // EventBus.$off("setcurrent");
    //     EventBus.$on("setcurrent", () => {
    //         console.log('EventBus -> setcurrent -> contact.form');
    //         //this.refreshData();
    //     });
    }
}
</script>

<style>
body {
    font-size: .8rem;
}
contact-header {
    width: inherit;
}
#contact_main_div {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 495px auto;
  /* 495px para Smart Calendar */
}
#llamadasdiv {
    height: 400px;
}
.llamadascard {
    height: 390px;
}
.list-group-item {
    padding: .2em .9em;
}
#tipificarcard {
    width: 260px;
}
#reprogramarcard {
    /* width: 585px; */
    width: 600px;
}
li {
    font-size: 0.9rem;
}
div {
    --smart-grid-cell-font-size: 0.7rem;
}
.material-icons {
    font-size: 20px;
}
.destaca1 {
    font-weight: bold;
    font-size: 1.2rem;
}
.destaca2 {
    font-size: 1.2rem;
}
.btn {
    font-size: .8rem;
}
</style>
