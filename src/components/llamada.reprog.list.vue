<template>
    <div id="repro_llamadas_fecha_grid"></div>
</template>

<script>
// https://www.htmlelements.com/demos/grid/init-from-tag/
import "smart-webcomponents/source/styles/smart.default.css";
import "smart-webcomponents/source/smart.elements.js";

import { createNamespacedHelpers } from 'vuex';
import { EventBus } from "@/eventbus/event.bus";

const maprepromod = createNamespacedHelpers('reprogramamod')
const mapuimod    = createNamespacedHelpers('uimod')

export default {
    data() {
        return {
            mygrid: null
        }
    },
    methods: {
        ...maprepromod.mapActions(['setLlamadaReprogFocus'])
        ,
        initGrid() {
            console.log('initGrid repro_llamadas_fecha_grid');
            // console.log(this.llamadasreprogbydate);
            this.mygrid = new window.Smart.Grid(
                "#repro_llamadas_fecha_grid", {
                    columns: [
                        { label: 'Cuando',     dataField: 'rellamadaon', width: 130/*, freeze: true*/,
                            cellsFormat: 'ddd yyyy/MM/dd hh:mm' },
                        { label: 'Campaña',    dataField: 'campana',   width: 70/*, freeze: true*/ },
                        { label: 'NIF',        dataField: 'nif',       width: 70/*, freeze: true*/ },
                        { label: 'Contacto',   dataField: 'contacto',  width: 90,
                            formatFunction: function(psettings) {
                                // SI OK
                                if (psettings.row.grid.isInitialized && psettings.row.data && psettings.row.data.contacto) {
                                    psettings.template = `<span title="${psettings.row.data.contacto}"><i class="material-icons">face</i>&nbsp;${psettings.row.data.contacto}</span>`;
                                }
                            }
                        },
                        { label: 'Telef1',  dataField: 'telef1', width: 80 },
                        { label: 'Telef2',  dataField: 'telef2', width: 80 },
                        { label: 'Telef3',  dataField: 'telef3', width: 80 },
                        { label: 'Telef4',  dataField: 'telef4', width: 80 },
                        { label: 'TelRep',  dataField: 'telefreprog', width: 80 }
                        /*{ label: 'Comentario', dataField: 'comentario', width: 100,
                            formatFunction: function(psettings) {
                                // SI OK
                                if (psettings.row.grid.isInitialized && psettings.row.data && psettings.row.data.comentario) {
                                    // SI largo
                                    if (psettings.row.data.comentario.length > 40) {
                                        psettings.template = `<span title="${psettings.row.data.comentario}">${psettings.row.data.comentario}</span>`;
                                    }
                                }
                            }
                        }*/
                    ],
                    dataSource: new window.Smart.DataAdapter({
                        dataSource: this.llamadasreprogbydate,
                        dataFields:
                        [
                            'llamadaid: number',
                            'rellamadaon: date',
                            'campana: string',
                            'nif: string',
                            'easycode: number',
                            'contacto: string',
                            'telef1: string',
                            'telef2: string',
                            'telef3: string',
                            'telef4: string',
                            'telefreprog: string'
                            /*'comentario: string',*/
                        ]
                    }),
                    behavior: { columnResizeMode: 'growAndShrink' },
                    appearance: {
                        showRowHeaderNumber: true,
                        allowRowDetailToggleAnimation: true
                    },
                    onRowInit(index, row) {
                        if (index === 0) {
                            row.showDetail = true;
                        }
                    },
                    onRowDetailInit(index, row, detail) {
                        const dts = row.grid.dataSource.dataSource;
                        console.log(`onRowDetailInit [${typeof(dts)}]`);
                        console.log(dts);
                        const grid = document.createElement('div');
                        detail.appendChild(grid);
                                
                        const gridInstance = new window.Smart.Grid(grid, {
                            dataSource: new window.Smart.DataAdapter(
                            {
                                dataSource: dts[index].llamadas,
                                dataFields:
                                [
                                    'llamadaid: number',
                                    'createdon: date',
                                    'rellamadaon: date',
                                    'agente: string',
                                    'resultado: string',
                                    'busoutcome: string',
                                    'motivono: string',
                                    'comentario: string'
                                ]
                            }),
                            columns: [
                               { label: 'Cuando',       dataField: 'createdon',   width: 130,
                                    cellsFormat: 'ddd yyyy/MM/dd hh:mm' },
                                { label: 'Agente',      dataField: 'agente',      width: 90,
                                    formatFunction: function(psettings) {
                                        // SI OK
                                        if (psettings.row.grid.isInitialized && psettings.row.data && psettings.row.data.agente) {
                                            psettings.template = `<span title="${psettings.row.data.agente}"><i class="material-icons">person</i>&nbsp;${psettings.row.data.agente}</span>`;
                                        }
                                    }
                                },
                                { label: 'Resultado',  dataField: 'resultado', width: 90,
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
                                { label: 'Motivo',     dataField: 'motivono', width: 90,
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
                                { label: 'Próxima',     dataField: 'rellamadaon', width: 130,
                                    cellsFormat: 'ddd yyyy/MM/dd hh:mm' }
                            ]
                        });					
                    },
                    rowDetail: {
                        enabled: true,
                        visible: true, 
                        height: 300
                        /* dialog: {
                            enabled: true
                        } */
                    },
                    selection: {
                        enabled: true,
                        //allowRowHeaderSelection: true,
                        mode: 'extended'
                    },
                    // Callback function, which is called when the Grid needs a cell value to render it.
                    // When you implement this function, you can override the default cell value rendering.
                    onCellValue: (pcell) => {
                        // SI fecha NULL
                        if (pcell.column.dataType === 'date' && !(pcell.value instanceof Date)) {
                            // SI comprobacion adicional
                            if (typeof(pcell.value) === 'number' && pcell.value === 0) {
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
            // NOTA: usar Smart.Grid con un selector "#id" para evitar duplicados
            // SI OK
            if (typeof(this.mygrid) !== 'undefined' && typeof(this.mygrid.addEventListener) === 'function') {
                window.BT = window.BT || {};
                window.BT.llamadasreproglist = this;
                this.mygrid.addEventListener('change', function (pevent) {
                    if (typeof(pevent.target.getSelection) === 'function') {
                        const result = pevent.target.getSelection();
                        console.log('SELECTION CHANGED');
                        // SI OK
                        if (result && result.rows && result.rows.length > 0) {
                            //const rowid = result.rows[0].id;
                            console.log(`llamadaid[${result.rows[0].row.data.llamadaid}]`);
                            window.BT.llamadasreproglist.setLlamadaReprogFocus(result.rows[0].row.data);
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
                console.log('loadGrid repro_llamadas_fecha_grid');
                console.log(this.llamadasreprogbydate);
                this.mygrid.beginUpdate();
                this.mygrid.dataSource.dataSource = [];
                this.mygrid.endUpdate();
                this.mygrid.refreshView();
                this.mygrid.beginUpdate();
                this.mygrid.dataSource.dataSource = this.llamadasreprogbydate;
                // SI hay llamadas
                if (this.llamadasreprogbydate.length > 0) {
                    const result = this.mygrid.getSelection();
                    // SI OK
                    if (result && result.rows && result.rows.length > 0) {
                        const rowid = result.rows[0].id;
                        this.mygrid.unselect(rowid);
                        this.mygrid.uncheckRow(rowid);
                    }
                    //this.mygrid.select(0);
                    //this.setLlamadaReprogFocus(this.llamadasreprogbydate[0]);
                }
                this.mygrid.endUpdate();
                this.mygrid.refreshView();
            } catch(ex) {
                console.log(`loadGrid repro_llamadas_fecha_grid ERROR! [${ex.message}]`);
            }
        }
    },
    computed: {
        ...mapuimod.mapGetters({
            i18nestxt: 'geti18nes'
        }),
        ...maprepromod.mapGetters({
            llamadasreprogbydate: 'getLlamadasReprogramadasByDate'
        }),
    },
    created() {
        //EventBus.$off("llamadasreprogbydate");
        EventBus.$on("llamadasreprogbydate", () => {
            console.log('EventBus -> llamadasreprogbydate -> llamada.reprog.list');
            // TODO datasource tabla
            this.loadGrid();
        });
    },
    mounted() {
        this.initGrid();
        // EventBus.$on("setcurrent", () => {
        //     console.log('EventBus -> setcurrent -> llamada.out.list');
        //     this.loadGrid();
        // });
    }
}
</script>

<style>
#repro_llamadas_fecha_grid {
    --smart-grid-column-header-height: 10px;
    width: inherit;
    margin: 0px;
    max-width: 600px;
    /* max-height: 370px; */
    /* height: inherit; */
    height: 300px;
    /* min-width: 750px;*/
}
#repro_llamadas_fecha_grid smart-grid-column {
    font-size: .9em;
    font-weight: bold;
    height: 10px;
}
#repro_llamadas_fecha_grid .smart-grid-row-detail smart-grid {
	margin-left: 10px;
	margin-top: 10px;
	line-height: initial;
	height: auto;
	width: calc(100% - 40px);
}
</style>
