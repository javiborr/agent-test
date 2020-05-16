<template>
    <div id="llamadas_decliente_grid"></div>
</template>

<script>
// https://www.htmlelements.com/demos/grid/init-from-tag/
import "smart-webcomponents/source/styles/smart.default.css";
import "smart-webcomponents/source/smart.elements.js";
//import {smartGrid} from "smart-webcomponents/source/modules/smart.llamadas_decliente_grid.js";
//import { Grid } from "smart-webcomponents/source/typescript/smart.elements";

import { createNamespacedHelpers } from 'vuex';
import { EventBus } from "@/eventbus/event.bus";

const mapcontactmod = createNamespacedHelpers('contactmod')
const mapuimod      = createNamespacedHelpers('uimod')

window.Smart.License = 'B3EAE359-9D40-477C-912D-FF7C804FC812';
console.log(window.Smart.License);

export default {
    data() {
        return {
            mygrid: null
        }
    },
    methods: {
        ...mapcontactmod.mapActions(['setLlamadaFocus'])
        ,
        initGrid() {
            console.log('initGrid');
            console.log(this.listLlamadas);
            this.mygrid = new window.Smart.Grid(
                "#llamadas_decliente_grid", {
                    columns: [
                        { label: 'NIF',        dataField: 'nif',       width: 70/* , columnGroup: 'call' */, freeze: true },
                        { label: 'Telefono',   dataField: 'telephone', width: 70/* , columnGroup: 'call' */, freeze: true },
                        { label: 'Creada',     dataField: 'createdon', width: 130, columnGroup: 'call', 
                            cellsFormat: 'ddd yyyy/MM/dd hh:mm' },
                        { label: 'Agente',     dataField: 'agente',    width: 110, columnGroup: 'call',
                            formatFunction: function(psettings) {
                                // SI OK
                                if (psettings.row.grid.isInitialized && psettings.row.data && psettings.row.data.agente) {
                                    psettings.template = `<span title="${psettings.row.data.agente}"><i class="material-icons">person</i>&nbsp;${psettings.row.data.agente}</span>`;
                                }
                            }
                         },
                        { label: 'Resultado',  dataField: 'resultado', width: 130, columnGroup: 'call',
                            formatFunction: function(psettings) {
                                // SI OK
                                if (psettings.row.grid.isInitialized && psettings.row.data && psettings.row.data.busoutcome) {
                                    switch(psettings.row.data.busoutcome) {
                                        case 'Acepta': 
                                            psettings.cell.background = '#d7f3e2';
                                            psettings.cell.color = '#000';
                                            psettings.template = `<span title="${psettings.row.data.resultado}"><i class="material-icons">check</i>&nbsp;${psettings.row.data.resultado}</span>`;
                                            break;
                                        case 'No acepta': 
                                            psettings.cell.background = '#F9DC5C';
                                            psettings.cell.color = '#000';
                                            psettings.template = `<span title="${psettings.row.data.resultado}"><i class="material-icons">thumb_down</i>&nbsp;${psettings.row.data.resultado}</span>`;
                                            break;
                                        default: 
                                            psettings.cell.background = '#FCEADE';
                                            psettings.cell.color = '#000';
                                            psettings.template = `<span title="${psettings.row.data.resultado}"><i class="material-icons">phone_callback</i>&nbsp;${psettings.row.data.resultado}</span>`;
                                            break;
                                    }
                                }
                                //psettings.value = '$' + new Number(psettings.value).toFixed(2);
                            }
                         },
                        { label: 'Motivo',     dataField: 'motivono', width: 130, columnGroup: 'call', 
                            formatFunction: function(psettings) {
                                // SI OK
                                if (psettings.row.grid.isInitialized && psettings.row.data && psettings.row.data.busoutcome) {
                                    switch(psettings.row.data.busoutcome) {
                                        case 'Acepta': 
                                            psettings.cell.background = '#d7f3e2';
                                            psettings.cell.color = '#000';
                                            psettings.template = `<span title="${psettings.row.data.motivono}">${psettings.row.data.motivono}</span>`;
                                            break;
                                        case 'No acepta': 
                                            psettings.cell.background = '#F9DC5C';
                                            psettings.cell.color = '#000';
                                            psettings.template = `<span title="${psettings.row.data.motivono}">${psettings.row.data.motivono}</span>`;
                                            break;
                                        default: 
                                            psettings.cell.background = '#FCEADE';
                                            psettings.cell.color = '#000';
                                            psettings.template = `<span title="${psettings.row.data.motivono}">${psettings.row.data.motivono}</span>`;
                                            break;
                                    }
                                }
                                //psettings.value = '$' + new Number(psettings.value).toFixed(2);
                            }
                        },
                        { label: 'Comentario', dataField: 'comentario', width: 100, columnGroup: 'call',
                            formatFunction: function(psettings) {
                                // SI OK
                                if (psettings.row.grid.isInitialized && psettings.row.data && psettings.row.data.comentario) {
                                    // SI largo
                                    if (psettings.row.data.comentario.length > 40) {
                                        psettings.template = `<span title="${psettings.row.data.comentario}">${psettings.row.data.comentario}</span>`;
                                    }
                                }
                                //psettings.value = '$' + new Number(psettings.value).toFixed(2);
                            }
                        },
                        { label: 'Rellamada',  dataField: 'rellamadaon', width: 130, columnGroup: 'call',
                            cellsFormat: 'ddd yyyy/MM/dd hh:mm' 
                        },
                        { label: 'Marcador',  dataField: 'dialersenton', width: 130, columnGroup: 'dialer',
                            cellsFormat: 'ddd yyyy/MM/dd hh:mm' 
                        },
                        { label: 'Intentos',  dataField: 'dialertries', width: 50, columnGroup: 'dialer' },
                        { label: 'Ultimo intento',  dataField: 'dialerlaston', width: 130, columnGroup: 'dialer',
                            cellsFormat: 'ddd yyyy/MM/dd hh:mm' 
                        },
                        { label: 'Resultado',  dataField: 'dialerlasttelout', width: 70, columnGroup: 'dialer' },
                        { label: 'Clave',  dataField: 'dialerkey', width: 80, columnGroup: 'dialer' }
                    ],
                    columnGroups: [
                        { label: 'Datos de la llamada', align: 'center', name: 'call' },
                        { label: 'Datos de marcador', align: 'center', name: 'dialer' }
                        ],
                    dataSource: new window.Smart.DataAdapter({
                        dataSource: this.listLlamadas,
                        dataFields:
                        [
                            'llamadaid: number',
                            'nif: string',
                            'telephone: string',
                            'createdon: date',
                            'agente: string',
                            'resultado: string',
                            'motivono: string',
                            'comentario: string',
                            'rellamadaon: date',
                            'busoutcome: string',
                            'dialersenton: date',
                            'dialerlaston: date',
                            'dialerlasttelout: string',
                            'dialerkey: string',
                            'dialertries: number'
                        ]
                    }),
                    behavior: { columnResizeMode: 'growAndShrink' },
                    appearance: {
                        showRowHeader: true,
                        showRowHeaderSelectIcon: true,
                        showRowHeaderFocusIcon: true,
                        showRowHeaderEditIcon: false,
                        // allowColumnStickyPosition: false,
                        // allowRowDetailToggleAnimation: true
                    },
                    // layout: {
                    //     rowHeight: 'auto',
                    //     allowCellsWrap: true
                    // },
                    selection: {
                        enabled: true,
                        allowRowHeaderSelection: true,
                        mode: 'extended'
                    },
                    // sorting: {
                    //     enabled: true
                    // },
                    // scrolling: 'physical',
                    // paging: {
                    //     enabled: true
                    // },
                    // pager: {
                    //     visible: true
                    // },
                    // Callback function, which is called when the Grid needs a cell value to render it.
                    // When you implement this function, you can override the default cell value rendering.
                    onCellValue: (pcell) => {
                        // SI fecha NULL
                        if (pcell.column.dataType === 'date' && !(pcell.value instanceof Date)) {
                            // SI comprobacion adicional
                            if (typeof(pcell.value) === 'number' && pcell.value === 0) {
                                //console.log(`onCellValue dataType[${pcell.column.dataType}:${pcell.value}:`+typeof(pcell.value)+`:`+(pcell.value instanceof Date)+`]textContent[${pcell.element.textContent}]`)
                                //console.log(`CHANGE CELL [${typeof(pcell.value)}:${pcell.value}]`)
                                pcell.value = '';
                            }
                        }
                    },
                    locale: 'es',
                    messages: {
                        extend: true,
                        'es': this.i18nestxt
                    }
                }
            );
            // SI ????
            if (Array.isArray(this.mygrid)) {
                console.log(`WARNING isArray this.mygrid[${this.mygrid.length}}`);
                this.mygrid = this.mygrid[1];
            }
            // SI OK
            if (typeof(this.mygrid) !== 'undefined' && typeof(this.mygrid.addEventListener) === 'function') {
                window.BT = window.BT || {};
                window.BT.lamadaoutlist = this;
                this.mygrid.addEventListener('change', function (pevent) {
                    if (typeof(pevent.target.getSelection) === 'function') {
                        const result = pevent.target.getSelection();
                        console.log('SELECTION CHANGED');
                        // SI OK
                        if (result && result.rows && result.rows.length > 0) {
                            //const rowid = result.rows[0].id;
                            console.log(`llamadaid[${result.rows[0].row.data.llamadaid}]`);
                            window.BT.lamadaoutlist.setLlamadaFocus(result.rows[0].row.data);
                        } else {
                            console.log('SELECTION CHANGED NOTHING');
                            console.log(result);
                        }
                    }
                });
            } else {
                console.log(`ERROR this.mygrid[${typeof(this.mygrid)}]`);
            }
        },
        loadGrid() {
            try {
                console.log('loadGrid');
                console.log(this.listLlamadas);
                this.mygrid.beginUpdate();
                this.mygrid.dataSource.dataSource = this.listLlamadas;
                //this.mygrid.render();
                // SI hay llamadas
                if (this.listLlamadas.length > 0) {
                    const result = this.mygrid.getSelection();
                    // SI OK
                    if (result && result.rows && result.rows.length > 0) {
                        const rowid = result.rows[0].id;
                        this.mygrid.unselect(rowid);
                        this.mygrid.uncheckRow(rowid);
                    }
                    this.mygrid.select(0);
                    //this.setLlamadaFocus(this.listLlamadas[0]);
                }
                this.mygrid.endUpdate();
            } catch(ex) {
                console.log(`loadGrid ERROR! [${ex.message}]`);
            }
        }
    },
    computed: {
        ...mapuimod.mapGetters({
            i18nestxt: 'geti18nes'
        }),
        ...mapcontactmod.mapGetters({
            currentContact: 'getCurrent',
            listLlamadas: 'getLlamadaList'
        }),
    },
    mounted() {
        this.initGrid();
        //EventBus.$off("setcurrent");
        EventBus.$on("setcurrent", () => {
            console.log('EventBus -> setcurrent -> llamada.out.list');
            this.loadGrid();
        });
    }
}
</script>

<style>
#llamadas_decliente_grid {
    --smart-grid-column-header-height: 10px;
    width: inherit;
    margin: 0px;
    max-width: 900px;
    /* max-height: 370px; */
    /* height: inherit; */
    height: 330px;
    /* min-width: 750px;*/
}
#llamadas_decliente_grid smart-grid-column {
    font-size: .9em;
    font-weight: bold;
    height: 10px;
}
</style>
