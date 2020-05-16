<template>
    <div id="tipificardiv">
        <smart-list-box id="tipifica_lbox">
            <smart-list-item>No hay datos</smart-list-item>
        </smart-list-box>
        <footer class="blockquote-footer">{{mytip1label}}&nbsp;{{mytip2label}}</footer>
        <footer class="blockquote-footer">{{tipificacionAlt}}</footer>
        <p id="eligemotivodiv" class="oculto bg-primary text-white font-weight-bold pl-1 pb-1">
            <span>Por favor elige motivo:</span>
            <smart-drop-down-list id="tipifica_motivo_ddown"></smart-drop-down-list>
        </p>
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
            mycall: {},
            mytip1listbox: {},
            mytip2dropd: {},
            myeligemotivodiv: {}
        }
    },
    methods: {
        ...mapcontactmod.mapActions(['setTipificacion1','setTipificacion2','clearTipificacion'])
        ,
        initComponent() {
            this.myeligemotivodiv = document.getElementById('eligemotivodiv');
            // Tipificacion2
            this.mytip2dropd = document.getElementById('tipifica_motivo_ddown'); //document.querySelector('smart-drop-down-list');
            this.mytip2dropd.dropDownOpenMode = 'auto';
            this.mytip2dropd.dropDownPosition = 'top', //'overlay-center';
            // Tipificacion1
            this.mytip1listbox = document.getElementById('tipifica_lbox'); //querySelector('smart-list-box');
            this.mytip1listbox.grouped = true;
            this.mytip1listbox.itemTemplate = function(pitem,pdata) {
                // console.log('itemTemplate');
                // console.log(pitem);
                // console.log(pdata);
                // SI OK
                if (pitem && pdata) {
                    const scl = pitem.getElementsByClassName('smart-content-label');
                    // SI OK
                    if (scl && scl.length && scl.length > 0) {
                        let icon = '';
                        switch(pitem.group.trim()) {
                            case 'Acepta': icon = 'check'; break;
                            case 'No acepta': icon = 'thumb_down'; break;
                            case 'Neutral': icon = 'phone_callback'; break;
                            default: break;
                        }
                        // <span class="smart-content-label" role="presentation">No esta el Cliente</span>
                        scl[0].innerHTML = `<span class="smart-content-label" role="presentation"><i class="material-icons">${icon}</i>&nbsp;${pdata.label}</span>`;
                        //console.log(scl[0].innerHTML);
                    }
                    //pitem.innerHTML = `<span title="${psettings.row.data.agente}"><i class="material-icons">person</i>&nbsp;${psettings.row.data.agente}</span>`;
                }
            };
            window.BT = window.BT || {};
            window.BT.tipificarform = this;
            // TP1
            this.mytip1listbox.addEventListener('change', function (pevent) {
                const mythis = window.BT.tipificarform;
                const tp1id = parseInt(pevent.detail.value);
                const text = pevent.detail.label;
                const selected = pevent.detail.selected;
                console.log(`SELECTION CHANGED TP1[${tp1id}:${text}:${selected}]`);
                // SI selected
                if (selected === true) {
                    // mythis.mytip1label = pevent.detail.label;
                    // mythis.mytip2label = '';
                    mythis.setTipificacion1(tp1id);
                    console.log(`tipificacionUsaMotivo [${mythis.tipificacionUsaMotivo}:${mythis.tipificacionAlt}]`);
                    // SI visible
                    if (mythis.tipificacionUsaMotivo === true) {
                        mythis.myeligemotivodiv.classList.remove('oculto');
                        mythis.myeligemotivodiv.classList.remove('visible');
                        mythis.myeligemotivodiv.classList.add('visible');
                    } else {
                        mythis.myeligemotivodiv.selectedIndexes = [0];
                        mythis.myeligemotivodiv.classList.remove('oculto');
                        mythis.myeligemotivodiv.classList.remove('visible');
                        mythis.myeligemotivodiv.classList.add('oculto');
                    }
                }
            });
            // TP2
            this.mytip2dropd.addEventListener('change', function (pevent) {
                const mythis = window.BT.tipificarform;
                const tp2id = parseInt(pevent.detail.value);
                const text = pevent.detail.label;
                const selected = pevent.detail.selected;
                // SI selected
                if (selected === true) {
                    console.log(`SELECTION CHANGED TP2[${tp2id}:${text}:${selected}]`);
                    //mythis.mytip2label = pevent.detail.label;
                    mythis.setTipificacion2(tp2id);
                }
            });
        }
    },
    computed: {
        ...mapuimod.mapGetters({
            i18nestxt: 'geti18nes'
        }),
        ...mapcontactmod.mapGetters({
            tipificacion1list: 'getTipificacion1List',
            tipificacion2list: 'getTipificacion2List',
            tipificacionUsaMotivo: 'getTipificacionUsaMotivo',
            tipificacionAlt: 'getTipificacionAlt',
            mytip1label: 'getTipificacion1',
            mytip2label: 'getTipificacion2',
            tipificacionok: 'getTipificacionOK',
            contactado: 'getContactado'
        }),
        tipificacion1data() {
            const ls = this.tipificacion1list.map(pitem => {
                //console.log('tipificacion1data');
                //console.log(pitem);
                const res = {
                    label: pitem.descripcion, 
                    value: pitem.code, 
                    group: pitem.busoutcome
                }
                //console.log(res);
                return res;
            });
            return ls;
        },
        tipificacion2data() {
            const ls = this.tipificacion2list.map(pitem => {
                return {
                    label: pitem.descripcion, 
                    value: pitem.code
                }
            });
            //console.log('tipificacion2data');
            //console.log(ls);
            ls.unshift({label: '', value: ''});
            return ls;
        }
    },
    mounted() {
        this.initComponent();
        console.log('EventBus.$on settip2list');
        EventBus.$on("settip2list", () => {
            console.log('EventBus -> settip2list -> tipificar.form');
            // https://www.htmlelements.com/demos/listbox/custom-elements/#toc-datasource_any
            this.mytip1listbox.dataSource = this.tipificacion1data;
            this.mytip2dropd.dataSource = this.tipificacion2data;
            this.mytip2dropd.selectedIndexes = [0];
            this.myeligemotivodiv.classList.remove('oculto');
            this.myeligemotivodiv.classList.remove('visible');
            this.myeligemotivodiv.classList.add('oculto');
            this.clearTipificacion();
        });
    }
}
</script>

<style>
#tipificardiv {
    width: 260px;
}
#tipifica_lbox {
    width: 250px;
    /* height: 200px;
    min-height: 200px;
    min-width: 90px; */
    /*--smart-list-box-default-height: 15px;*/
    --smart-font-size: 0.8rem;
}
#tipifica_lbox smart-list-item {
    width: 230px;
    height: 1.5rem;
}
#tipifica_motivo_ddown {
    /*margin-top: 1rem;*/
    width: 250px;
    margin-bottom: 2px;
    --smart-font-size: 0.7rem;
/*     --smart-editor-drop-down-min-width: 150px;
    --smart-editor-drop-down-min-height: 100px;
 */}
#tipifica_motivo_ddown smart-list-item {
    height: 1.5rem;
}
.oculto {
    display: none;
}
.visible {
    display: block;
}
.pendiente {
    font-size: 0.8rem;
    background-color: #F9DC5C;
    font-weight: bold;
    margin-bottom: 2px;
    padding: .3em 1.5em .3em 1em;
}
.realizada {
    font-size: 0.8rem;
    background-color: #d7f3e2;
    margin-bottom: 2px;
    padding: .3em 1.5em .3em 1em;
}

div.smart-drop-down-list-inner-container {
    z-index: 0;
}
div {
    z-index: 3;
}

</style>
