<template>
    <div id="reprogramardiv" class="container">
        <div class="row d-flex flex-row">
            <div class="col-auto pl-0" id="repro_fechahoraelegida_div">
                <smart-date-time-picker 
                    id="repro_fechahoraelegida_dtpicker"
                    name='repro_fechahoraelegida_dtpicker'
                    animation = 'simple' auto-close
                    calendar-mode='classic'
                    day-name-format='firstTwoLetters'
                    interval='300000'
                    first-day-of-week='1' format-string='dddd, dd MMMM yyyy HH:mm'
                    locale='es' messages='{"es": {
                        "now": "Ahora",
                        "dateTabLabel": "DIA",
                        "timeTabLabel": "HORA"
                        }}'
                    calendar-button enable-mouse-wheel-action 
                    drop-down-position="center-bottom" 
                    spin-buttons spin-buttons-position="left"
                    theme='material' weeks='9'>
                </smart-date-time-picker>
                <div class="invalid-feedback">{{msgvalfechahorareprog}}</div>
            </div>
            <div class="d-flex flex-row">
                <div class="d-inline">
                    <div>
                        <span class="botonera">
                            <i @click="sumaDias(-7)" class="material-icons align-middle puntero" title="1 semana antes">first_page</i>&nbsp;
                            <i @click="sumaDias(-1)" class="material-icons align-middle puntero" title="1 dia antes">chevron_left</i>&nbsp;
                            <i @click="sumaDias(1)"  class="material-icons align-middle puntero" title="1 dia después">chevron_right</i>&nbsp;
                            <i @click="sumaDias(7)"  class="material-icons align-middle puntero" title="1 semana después">last_page</i>&nbsp;Dia
                        </span>
                    </div>
                    <div>
                        <span class="botonera">
                            <i @click="sumaMinutos(-60)" class="material-icons align-middle puntero" title="1 hora antes">first_page</i>&nbsp;
                            <i @click="sumaMinutos(-5)" class="material-icons align-middle puntero" title="5 minutos antes">chevron_left</i>&nbsp;
                            <i @click="sumaMinutos(5)" class="material-icons align-middle puntero" title="5 minutos después">chevron_right</i>&nbsp;
                            <i @click="sumaMinutos(60)" class="material-icons align-middle puntero" title="1 hora después">last_page</i>&nbsp;Hora
                        </span>
                    </div>
                </div>
                <div class="d-inline d-flex flex-column">
                    <smart-radio-button @click="poneHora('09:30:00')" group-name="A" title="A primera hora">09:30</smart-radio-button>
                    <smart-radio-button @click="poneHora('12:00:00')" group-name="A" title="A media mañana">12:00</smart-radio-button>
                    <smart-radio-button @click="poneHora('20:00:00')" group-name="A" title="Por la tarde">20:00</smart-radio-button>
                </div>
            </div>
        </div>
        <div class="row d-flex flex-row">
            <form class="needs-validation" novalidate>
                <div class="form-row align-items-center">
                    <div class="col-auto">
                        <input id="repro_telefono_input" 
                            type="number" required 
                            class="form-control" placeholder="Al teléfono" 
                            :value="this.telefonoElegido"/>
                        <div class="invalid-feedback">Teléfono debe tener al menos 9 dígitos</div>
                    </div>
                    <div class="col-auto">
                        <label for="repro_agente_ddown" class="col-form-label">Agente:</label>
                    </div>
                    <div class="col-auto">
                        <smart-drop-down-list id="repro_agente_ddown" filterable grouped></smart-drop-down-list>
                    </div>
                </div>
                <!-- <button class="btn btn-primary btn-sm" type="submit">Reprogramar</button> -->
            </form>
        </div>
        <div class="row">
            <llamadas-reprog-lista />
        </div>
    </div>
</template>

<script>
// https://www.htmlelements.com/vue/dist/multilinetextbox/overview/
import "smart-webcomponents/source/styles/smart.default.css";
import "smart-webcomponents/source/smart.elements.js";

import LlamadasReprogLista from '@/components/llamada.reprog.list.vue'

import { createNamespacedHelpers } from 'vuex';
import { EventBus } from "@/eventbus/event.bus";

const maprepromod = createNamespacedHelpers('reprogramamod')
const mapusermod  = createNamespacedHelpers('usermod')
const mapuimod    = createNamespacedHelpers('uimod')

export default {
    components: {
        LlamadasReprogLista
    },
    data() {
        return {
            // myfechahoraprog: null,
            msgvalfechahorareprog: ''
            // myuser: null
        }
    },
    methods: {
        ...maprepromod.mapActions([
            'eligeTelefonoRepro',
            'eligeFechaRepro',
            'eligeAgenteRepro'
            ])
        ,
        sumaDias(p) {
            const tin = document.getElementById("repro_fechahoraelegida_dtpicker");
            // const fhbefore = tin.value.toString('f');
            const aft = tin.value.addDays(p, true);
            // const fhafter  = tin.value.toString('f');
            // console.log(`[${p}:${fhbefore} --> ${fhafter}]`);
            tin.value = aft;
            // Store
            this.eligeFechaRepro(tin.value.toDate());
        },
        sumaMinutos(p) {
            const tin = document.getElementById("repro_fechahoraelegida_dtpicker");
            const aft = tin.value.addMinutes(p, true);
            tin.value = aft;
            // Store
            this.eligeFechaRepro(tin.value.toDate());
        },
        poneHora(p) {
            const tin = document.getElementById("repro_fechahoraelegida_dtpicker");
            const bef = tin.value;
            // const fhbefore = bef.toString('f');
            const aftstr  = `${bef.year()}-${bef.month()}-${bef.day()}T${p}`;
            const aft  = new window.Smart.Utilities.DateTime(aftstr);
            // const fhafter  = aft.toString('f');
            tin.value = aft;
            // Store
            this.eligeFechaRepro(tin.value.toDate());
            // console.log(`[${p}:${fhbefore} --> ${aftstr}]`);
            //console.log(`[${p}:${tin.value.toString('f')}]`);
        },
        cambiaAgenteRepro() {
            const agentesddown = document.getElementById('repro_agente_ddown');
            const agsel = agentesddown.selectedValues;
            console.log('cambiaAgenteRepro');
            //console.log(agsel);
            // SI elige agente
            if (Array.isArray(agsel) && agsel.length > 0) {
                console.log(`cambiaAgenteRepro[${typeof(agsel[0])}:${agsel[0]}]`);
                this.eligeAgenteRepro(parseInt(agsel[0]));
            }
        },
        validateFechaHoraRepro() {
            const tin = document.getElementById("repro_fechahoraelegida_dtpicker");
            const fhstr = tin.value.toString('f');
            // SI futuro
            if (tin.value.toDate().getTime() > (new Date()).getTime()) {
                console.log(`FECHA/HORA OK [${fhstr}]`);
                tin.classList.remove('is-invalid');
                tin.classList.add('is-valid');
                // Store
                this.eligeFechaRepro(tin.value.toDate());
            } else {
                this.msgvalfechahorareprog = `Fecha/hora debe estar en el futuro`
                console.log(this.msgvalfechahorareprog);
                tin.classList.remove('is-valid');
                tin.classList.add('is-invalid');
            }
        },
        validateTelefRepro() {
            const tin = document.getElementById("repro_telefono_input");
            const telefregx = /\d{9}\d*/;
            // SI OK
            if (telefregx.test(tin.value)) {
                // console.log(`TELEFONO OK [${tin.value}]`);
                tin.classList.remove('is-invalid');
                tin.classList.add('is-valid');
                // Store
                this.eligeTelefonoRepro(tin.value);
            } else {
                // console.log(`TELEFONO ERROR! [${tin.value}]`);
                tin.classList.remove('is-valid');
                tin.classList.add('is-invalid');
            }
        },
        cargaAgentes() {
            console.log('cargaAgentes');
            // Lista de agentes repro_agente_ddown
            const agentesddown = document.getElementById('repro_agente_ddown');
            agentesddown.dataSource = this.agentesforddown;
            agentesddown.selectedValues = ['0'];
        },
        initComponent() {
            // elige agente reprogramar
            const agentesddown = document.getElementById('repro_agente_ddown');
            agentesddown.addEventListener('change', this.cambiaAgenteRepro);
            // validar fecha/hora reprog
            const datetimepicker = document.getElementById('repro_fechahoraelegida_dtpicker');
            datetimepicker.addEventListener('change', this.validateFechaHoraRepro);
            // Validar telefono reprog
            const reprotelefinput = document.getElementById('repro_telefono_input');
            reprotelefinput.addEventListener('keyup', this.validateTelefRepro);
            reprotelefinput.addEventListener('change', this.validateTelefRepro);
            //
            //EventBus.$off("puedoreprogramar");
            EventBus.$on("puedoreprogramar", ({ok, msg}) => {
                console.log('EventBus -> puedoreprogramar -> reprogramar.form');
                console.log(`${ok} ${msg}`);
                this.msgvalfechahorareprog = msg;
            });
            //
            //EventBus.$off("agentescargados");
            EventBus.$on("agentescargados", () => {
                console.log('EventBus -> agentescargados -> reprogramar.form');
                this.cargaAgentes();
                this.validateTelefRepro();
                this.validateFechaHoraRepro();
            });
            
        }
    },
    computed: {
        ...mapusermod.mapGetters({
            myuser: 'getCurrentUser'
        }),
        ...mapuimod.mapGetters({
            i18nestxt: 'geti18nes'
        }),
        ...maprepromod.mapGetters({
            fechaElegida: 'getFechaElegida',
            telefonoElegido: 'getTelefonoElegido',
            puedoReprogramar: 'getPuedoReprogramar',
            llamadaReprogramada: 'getLlamadaReprogramada',
            agentes: 'getAgentesList',
            llamadasReprogByDate: 'getLlamadasReprogramadasByDate'
        }),
        agentesforddown() {
            const ls = this.agentes.map( a => {
                return {
                    value: a.userid, 
                    label: `${a.firstname} ${a.lastname}`,
                    group: 'Asignar a'
                    };
            });
            // SI se quien soy
            if (this.myuser && this.myuser.nombre) {
                ls.unshift({value: this.myuser.userid, label: this.myuser.nombre, group: 'Responderé yo'});
            }
            ls.unshift({value: 0, label: 'Cualquiera', group: 'No asignar'});
            return ls;
        }
    },
    created() {
        console.log(`reprogramar.form created`);
        //
        // //EventBus.$off("myuser");
        // EventBus.$on("myuser", (pmyuser) => {
        //     console.log('EventBus -> myuser -> reprogramar.form');
        //     console.log(pmyuser);
        //     this.myuser = pmyuser;
        // });
        
    },
    mounted() {
        console.log(`reprogramar.form mounted`);
        this.initComponent();
    },
    updated() {
        //this.cargaAgentes();
        this.validateTelefRepro();
        this.validateFechaHoraRepro();
    }
}
</script>

<style>
#repro_agente_ddown .smart-drop-down.smart-drop-down-container {
    /* border-color: red; */
    /* --smart-editor-drop-down-height: 250px; */
    --smart-editor-drop-down-max-height: 300px;
}
#repro_agente_ddown .smart-list-item {
    --smart-font-size: .9em;
}
.botonera {
    padding: 10px 10px 12px 14px;
}
#repro_fechahoraelegida_div {
    z-index: 888;
}
#repro_fechahoraelegida_dtpicker.is-valid {
    border-color: var(--smart-border);
}
#repro_fechahoraelegida_dtpicker.is-invalid {
    border-color: red;
}
.puntero {
    cursor: pointer;
}
</style>
