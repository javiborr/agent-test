<template>
    <div class="container-fluid ml-0 pr-0 pl-0">
        <div class="row justify-content-start d-flex" v-if="hayLlamada">
            <div class="col-5 pr-1 flex-grow-1">
                <span class="destaca1 align-middle">{{currentContact.campana.nombre}}</span>
                <span class="destaca2 align-middle">&nbsp;llamada saliente&nbsp;</span>
                <button type="button" class="btn btn-outline-secondary align-middle" 
                    id="reprograma_btn_orig"
                    @click="eligeTelefReprogramar($event)"
                    >
                    <i class="material-icons">phone</i><span class="align-top">&nbsp;{{currentLlamada.telephone}}&nbsp;</span>
                </button>
                <smart-tooltip id="reprograma_ttip_orig" 
                    selector="reprograma_btn_orig"
                    class="animation material" 
                    arrow arrow-direction='top' position="bottom">
                    Reprograma llamada a {{currentLlamada.telephone}}
                </smart-tooltip>
            </div>
            <div class="col-2 pr-1">
                <p class="tiene hogar" v-if="tieneHogar"><i class="material-icons align-bottom">check</i>&nbsp;Tiene Hogar</p>
                <p class="notiene hogar" v-else><i class="material-icons align-bottom">add</i>&nbsp;Ofrecer Hogar</p>
                <p class="tiene autos" v-if="tieneAutos"><i class="material-icons align-bottom">check</i>&nbsp;Tiene Autos</p>
                <p class="notiene autos" v-else><i class="material-icons align-bottom">add</i>&nbsp;Ofrecer Autos</p>
            </div>
            <div class="col-3 pr-1">
                <p class="realizada" v-if="tipificacionok"><i class="material-icons align-bottom">check</i>&nbsp;Tipificación realizada</p>
                <p class="pendiente" v-else><i class="material-icons align-bottom">pan_tool</i>&nbsp;Tipificación pendiente</p>
                <p class="realizada" v-if="contactado"><i class="material-icons align-bottom">contact_phone</i>&nbsp;Cliente contactado</p>
                <p class="pendiente" v-else><i class="material-icons align-bottom">phone_missed</i>&nbsp;NO contactado</p>
            <!-- </div>
            <div class="col pr-2"> -->
                <span class="destaca4 d-inline-block text-truncate" style="max-width: 240px" :title="mytip1label+' '+mytip2label">{{mytip1label}}&nbsp;{{mytip2label}}</span><br/>
                <!-- <span class="destaca4">{{tipificacionAlt}}</span> -->
            </div>
            <div class="col-2 pr-0" id="user_data">
                <div class="container-fluid d-flex pr-0">
                    <div>
                        <i class="material-icons">portrait</i>
                    </div>
                    <div>
                        <span class="destaca3">{{myuser.firstname}}&nbsp;{{myuser.lastname}}&nbsp;({{myuser.userid}})</span><br/>
                        <span>{{myuser.loginname}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-start d-flex" v-else>
            <div class="pr-1 col-10">
                <p>No hay llamada</p>
            </div>
            <div class="container ml-auto col-2 d-flex">
                <div>
                    <i class="material-icons">portrait</i>
                </div>
                <div>
                    <span class="destaca3">{{myuser.nombre}}&nbsp;({{myuser.userid}})</span><br/>
                    <span>{{myuser.loginname}}</span>
                </div>
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
const mapusermod    = createNamespacedHelpers('usermod')

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
        ...mapusermod.mapGetters({
            myuser: 'getCurrentUser'
        }),
        ...mapcontactmod.mapGetters({
            currentContact: 'getCurrent',
            tieneHogar: 'getTieneHogar',
            tieneAutos: 'getTieneAutos',
            currentLlamada: 'getLlamada',
            hayLlamada: 'getHayLlamada',
            tipificacionAlt: 'getTipificacionAlt',
            mytip1label: 'getTipificacion1',
            mytip2label: 'getTipificacion2',
            tipificacionok: 'getTipificacionOK',
            contactado: 'getContactado'
        }),
        telefono() {
            return this.currentLlamada.telephone;
        }
    },
    updated() {
        console.log(`updated`);
    }
}
</script>

<style>
#user_data .material-icons {
    font-size: 36px;
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
.destaca3 {
    font-size: 0.8rem;
    font-weight: bold;
}
.destaca4 {
    font-size: .7rem;
}
.btn {
    font-size: .8rem;
}
.notiene {
    font-size: 0.8rem;
    font-weight: bold;
    margin-bottom: 2px;
    padding: .3em 1.5em .3em 1em;
}
.tiene {
    font-size: 0.8rem;
    margin-bottom: 2px;
    padding: .3em 1.5em .3em 1em;
}
.tiene.hogar {
    background-color: #ffbf70;
    color: black;
}
.notiene.hogar {
    background-color: #fb5607;
    color: white;
}
.tiene.autos {
    background-color: #ffa1dc;
    color: black;
}
.notiene.autos {
    background-color: #ff006e;
    color: white;
}
</style>
