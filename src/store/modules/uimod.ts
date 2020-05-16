export default {
    namespaced: true,
    state: {
        busy: false,
        nb2level: '',
        nb2text: '',
        i18nes: {
            "pagerSummaryString": "de",
            "pagerSummaryPrefix": "de",
            "columnMenuItemSortAsc": "Ordena {{mode}}",
            "columnMenuItemSortDesc": "Ordena {{mode}}",
            "columnMenuItemRemoveSort": "No Ordena",
            "columnMenuItemFilter": "Filtra",
            "columnMenuItemRemoveFilter": "No Filtra",
            "columnMenuItemGroupBy": "Agrupa por esta columna",
            "columnMenuItemRemoveGroupBy": "No Agrupa",
            "commandBarBatchRevert": "Cancela",
            "commandBarBatchSave": "Graba",
            "calendar": {
                "/": "/",
                ":": ":",
                "firstDay": 1,
                "days": {
                    "names": [
                        "Domingo",
                        "Lunes",
                        "Martes",
                        "Miercoles",
                        "Jueves",
                        "Viernes",
                        "Sabado"
                    ],
                    "namesAbbr": [
                        "Dom",
                        "Lun",
                        "Mar",
                        "Mie",
                        "Jue",
                        "Vie",
                        "Sab"
                    ],
                    "namesShort": [
                        "Do",
                        "Lu",
                        "Ma",
                        "Mi",
                        "Ju",
                        "Vi",
                        "Sa"
                    ]
                },
                "months": {
                    "names": [
                        "Enero",
                        "Febrero",
                        "Marzo",
                        "Abril",
                        "Mayo",
                        "Junio",
                        "Julio",
                        "Agosto",
                        "Septiembre",
                        "Octubre",
                        "Noviembre",
                        "Diciembre",
                        ""
                    ],
                    "namesAbbr": [
                        "Ene",
                        "Feb",
                        "Mar",
                        "Abr",
                        "May",
                        "Jun",
                        "Jul",
                        "Ago",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dic",
                        ""
                    ]
                },
                "AM": [
                    "AM",
                    "am",
                    "AM"
                ],
                "PM": [
                    "PM",
                    "pm",
                    "PM"
                ],
                "eras": [
                    {
                        "name": "A.D.",
                        "start": null,
                        "offset": 0
                    }
                ]
            },
            "currencySymbol": "€",
            "currencySymbolPosition": "before",
            "decimalSeparator": ',',
            "thousandsSeparator": '.'
        }
    },
    getters: {
      // getnb2text: pstate => {
      //   console.log(`VUEX GETTER getnb2text [${pstate.nb2text}]`);
      //   return pstate.nb2text;
      // },
      geti18nes: (pstate: any) => {
        //console.log(`VUEX GETTER geti18nes [${pstate.i18nes}]`);
        return pstate.i18nes;
      },
    },
    actions: {
    },
    mutations: {
      SET_UI_BUSY: (pstate: any, p: boolean) => {
        console.log(`VUEX MUTA isbusy [${p}]`);
        pstate.busy = p;
      },
      SET_NB2TEXT: (pstate: any, p: string) => {
        console.log(`VUEX MUTA nb2text [${p}]`);
        pstate.nb2text = p;
      }
    }
  }