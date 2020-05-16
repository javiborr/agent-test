<template>
    <!-- <div class="card-body p-0"> -->
        <div class="btn-toolbar" role="toolbar">
            <div class="col text-nowrap mr-2 producto" :class="classP1">
                <span v-if="ofreceP1"><i class="material-icons align-bottom">add</i>&nbsp;{{nombreP1}}</span>
            </div>
            <div class="col text-nowrap mr-2 producto" :class="classP2">
                <span v-if="ofreceP2"><i class="material-icons align-bottom">add</i>&nbsp;{{nombreP2}}</span>
            </div>
            <div class="col text-nowrap mr-2 producto" :class="classP3">
                <span v-if="ofreceP3"><i class="material-icons align-bottom">add</i>&nbsp;{{nombreP3}}</span>
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
// // https://www.htmlelements.com/demos/tooltip/basic/
// import "smart-webcomponents/source/styles/smart.default.css";
// import "smart-webcomponents/source/smart.elements.js";

import { createNamespacedHelpers } from 'vuex';

const mapcontactmod = createNamespacedHelpers('contactmod')

export default {
    computed: {
        ...mapcontactmod.mapGetters({
            currentContact: 'getCurrent',
            ofreceP1: 'getOfreceP1',
            nombreP1: 'getP1Nombre',
            classP1: 'getP1Class',
            ofreceP2: 'getOfreceP2',
            nombreP2: 'getP2Nombre',
            classP2: 'getP2Class',
            ofreceP3: 'getOfreceP3',
            nombreP3: 'getP3Nombre',
            classP3: 'getP3Class'
        })
    }
}
</script>

<style>
.material-icons {
    font-size: 20px;
}
.producto {
    font-weight: bold;
    font-size: 0.8rem;
    margin-bottom: 2px;
    padding: .3em .3em .3em .3em;
}
.auto {
    background-color: #ff006e;
    color: white;
}
.hogar {
    background-color: #fb5607;
    color: white;
}
.accidentes {
    background-color: #ffbe0b;
    color: black;
}
.vida {
    background-color: #8338ec;
    color: white;
}
.dfj {
    background-color: #3a86ff;
    color: white;
}
.vivienda2 {
    background-color: #a08371;
    color: white;
}
.vehiculo2 {
    background-color: #ffa5ab;
    color: black;
}
</style>
