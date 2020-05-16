<template>
    <!-- <div class="card-body p-0 container-fluid"> -->
    <div class="btn-toolbar bg-primary text-white" role="toolbar">
        <div class="col-0 mr-1 autoriza">
            <div class="form-group mb-0">
                <label for="autoriza_llamada_ddwon">Autoriza llamada</label>
                <smart-drop-down-list id="autoriza_llamada_ddwon" class="autoriza_ddown" >
                    <smart-list-item value="0"></smart-list-item>
                    <smart-list-item value="1">SI autoriza</smart-list-item>
                    <smart-list-item value="2">NO autoriza</smart-list-item>
                </smart-drop-down-list>
            </div>
        </div>
        <div class="col-0 mr-1 autoriza">
            <div class="form-group mb-0">
                <label for="cierre_lopd_ddwon">Cierre LOPD</label>
                <smart-drop-down-list id="cierre_lopd_ddwon" class="autoriza_ddown" >
                    <smart-list-item value="0"></smart-list-item>
                    <smart-list-item value="1">SI autoriza</smart-list-item>
                    <smart-list-item value="2">NO autoriza</smart-list-item>
                </smart-drop-down-list>
            </div>
        </div>
        <div class="col-0 autoriza">
            <div class="form-group mb-0">
                <label for="contrato_dgs_ddwon">Contrato DGS</label>
                <smart-drop-down-list id="contrato_dgs_ddwon" class="autoriza_ddown" >
                    <smart-list-item value="0"></smart-list-item>
                    <smart-list-item value="1">SI autoriza</smart-list-item>
                    <smart-list-item value="2">NO autoriza</smart-list-item>
                </smart-drop-down-list>
            </div>
        </div>
    </div>
</template>

<script>
// https://www.htmlelements.com/demos/tooltip/basic/
import "smart-webcomponents/source/styles/smart.default.css";
import "smart-webcomponents/source/smart.elements.js";

import { createNamespacedHelpers } from 'vuex';
import { EventBus } from "@/eventbus/event.bus";

const mapcontactmod = createNamespacedHelpers('contactmod')

export default {
    methods: {
        ...mapcontactmod.mapActions([
            'setAutoriza1',
            'setAutoriza2',
            'setAutoriza3'
            ])
        ,
        initComponent() {
            console.log('initComponent autoriza.form');
            // 1
            const auto1ddown = document.getElementById("autoriza_llamada_ddwon");
            auto1ddown.addEventListener('change', this.cambiaAutorizaLlamada);
            // 2
            const auto2ddown = document.getElementById("cierre_lopd_ddwon");
            auto2ddown.addEventListener('change', this.cambiaCierreLOPD);
            // 3
            const auto3ddown = document.getElementById("contrato_dgs_ddwon");
            auto3ddown.addEventListener('change', this.cambiaContratoDGS);
        },
        refreshData() {
            console.log(`autoriza.form refreshData`);
            let selidx = [0];
            // 1
            switch(this.currentContact.autoriza1) {
                case true: selidx = [1]; break;
                case false: selidx = [2]; break;
                default: selidx = [0]; break;
            }
            const auto1ddown = document.getElementById("autoriza_llamada_ddwon");
            auto1ddown.selectedIndexes = selidx;
            console.log(selidx);
            // 2
            switch(this.currentContact.autoriza2) {
                case true: selidx = [1]; break;
                case false: selidx = [2]; break;
                default: selidx = [0]; break;
            }
            const auto2ddown = document.getElementById("cierre_lopd_ddwon");
            auto2ddown.selectedIndexes = selidx;
            console.log(selidx);
            // 3
            switch(this.currentContact.autoriza3) {
                case true: selidx = [1]; break;
                case false: selidx = [2]; break;
                default: selidx = [0]; break;
            }
            const auto3ddown = document.getElementById("contrato_dgs_ddwon");
            auto3ddown.selectedIndexes = selidx;
            console.log(selidx);        
        },
        cambiaAutorizaLlamada() {
            const auto1ddown = document.getElementById("autoriza_llamada_ddwon");
            const selvals = auto1ddown.selectedValues;
            // console.log('cambiaAutorizaLlamada');
            // console.log(selvals);
            // SI elige 
            if (Array.isArray(selvals) && selvals.length > 0) {
                console.log(`cambiaAutorizaLlamada[${typeof(selvals[0])}:${selvals[0]}]`);
                this.setAutoriza1(parseInt(selvals[0]));
            }
        },
        cambiaCierreLOPD() {
            const auto1ddown = document.getElementById("cierre_lopd_ddwon");
            const selvals = auto1ddown.selectedValues;
            // console.log('cambiaCierreLOPD');
            // console.log(selvals);
            // SI elige 
            if (Array.isArray(selvals) && selvals.length > 0) {
                console.log(`cambiaCierreLOPD[${typeof(selvals[0])}:${selvals[0]}]`);
                this.setAutoriza2(parseInt(selvals[0]));
            }
        },
        cambiaContratoDGS() {
            const auto1ddown = document.getElementById("contrato_dgs_ddwon");
            const selvals = auto1ddown.selectedValues;
            // console.log('cambiaContratoDGS');
            // console.log(selvals);
            // SI elige 
            if (Array.isArray(selvals) && selvals.length > 0) {
                console.log(`cambiaContratoDGS[${typeof(selvals[0])}:${selvals[0]}]`);
                this.setAutoriza3(parseInt(selvals[0]));
            }
        }
    },
    computed: {
        ...mapcontactmod.mapGetters({
            currentContact: 'getCurrent'
        })
    },
    mounted() {
        console.log(`autoriza.form mounted`);
        this.initComponent();
        //EventBus.$off("setcurrent");
        EventBus.$on("setcurrent", () => {
            console.log('EventBus -> setcurrent -> autoriza.form');
            this.refreshData();
        });
    }
}
</script>

<style>
.autoriza_ddown {
    font-weight: bold;
    width: 90px;
    margin: 0px;
    --smart-editor-drop-down-min-width: 120px;
    --smart-editor-drop-down-min-height: 85px;
}
.autoriza {
    font-size: 0.8rem;
    margin-bottom: 2px;
    padding: .3em .3em .3em .3em;
    z-index: 99;
}
div.autoriza label {
    font-size: 0.8rem;
    font-weight: bold;
}
</style>
