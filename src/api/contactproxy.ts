import axios from 'axios';
import { EventBus } from "@/eventbus/event.bus";

export default class ContactProxy {
    entorno: string;
    contactbaseurl: string;
    llamadabaseurl: string;
    tipificabaseurl: string;
    userbaseurl: string;

    constructor(pentorno: string) {
        this.entorno = (pentorno || 'dev').toLowerCase();
        let baseurl = "";
        // SEGUN el entorno
        switch(this.entorno) {
            case 'vs': baseurl = 'http://localhost:9207/api'; break;
            case 'test': baseurl = 'https://gcobtmprelcm.grupocatalanaoccidente.com/BT.Campaigns.WebAPI/api'; break;
            case 'pro': baseurl = 'https://gcobtmlcmcore1.grupocatalanaoccidente.com/BT.Campaigns.WebAPI/api'; break;
            default: baseurl = 'http://10.19.100.59/BT.Campaigns.WebAPI/api'; break;
        }
        this.contactbaseurl = `${baseurl}/contacto`;
        this.llamadabaseurl = `${baseurl}/llamada`;
        this.tipificabaseurl = `${baseurl}/tipificacion`;
        this.userbaseurl = `${baseurl}/user`;
    }
    // Obtiene un contacto con sus llamadas
    async getContact(peasycode: number) {
        let res = null;
        const url = `${this.contactbaseurl}/${peasycode}`;
        try {
            const response = await axios.get(url);
            res = response.data;
        } catch(ex){
            const msg = `getContact ERROR! entorno[${this.entorno}] easycode[${peasycode}] ${ex.message}`;
            console.log(msg);
            EventBus.$emit("merror", msg);
            res = {ok: false, message: ex.message};
        }
        return res;
    }
    // Usa llamadaid para obtener la llamada y luego easycode para obtener el contacto con sus llamadas
    async getLlamadaContact(pllamadaid: number) {
        let res = null;
        const llamadaurl = `${this.llamadabaseurl}/${pllamadaid}`;
        try {
            const llamadaresponse = await axios.get(llamadaurl);
            const llamadadata = llamadaresponse.data;
            // SI OK
            if (llamadadata.ok === true && llamadadata !== null) {
                const easycode = llamadadata.data.easycode;
                // SI OK
                if (Number.isInteger(easycode)) {
                    const contactourl = `${this.contactbaseurl}/${easycode}`;
                    const contactoresponse = await axios.get(contactourl);
                    res = {
                        ok: true, 
                        data: {
                            contact: contactoresponse.data.data,
                            llamada: llamadadata.data
                        },
                        message: 'OK'
                    }
                } else {
                    res = {ok: false, message: `Llamada [${pllamadaid}] tiene easycode [${easycode}] no OK`, data: null}
                }
            } else {
                res = {ok: false, message: 'KO', data: null}
            }
        } catch(ex){
            const msg = `getLlamadaContact ERROR! entorno[${this.entorno}] pllamadaid[${pllamadaid}] ${ex.message}`;
            console.log(msg);
            EventBus.$emit("merror", msg);
            res = {ok: false, message: ex.message, data: null};
        }
        return res;
    }
    // Obtiene todas las llamadas reprogramadas para una fecha
    async getLlamadasReprogByDateAndAgent(pdt: Date, pperipheralnumberid: number) {
        let res = null;
        const url = `${this.llamadabaseurl}/reprog`;
        try {
            const response = await axios({
                method: 'post',
                url: url,
                data: {
                    year: pdt.getFullYear(),
                    month: (pdt.getMonth() + 1),
                    day: pdt.getDate(),
                    peripheralnumberid: pperipheralnumberid
                },
                headers: {
                    "Content-Type": "application/json"
                }
              });
            res = response.data;
        } catch(ex){
            const msg = `getLlamadasReprogByDate ERROR! entorno[${this.entorno}] ${ex.message}`;
            console.log(msg);
            EventBus.$emit("merror", msg);
            res = {ok: false, message: ex.message};
        }
        return res;
    }
    // Obtiene tipificacion de la campaña
    async getTipificacion(pcampname: string, ptipo: number) {
        let res = null;
        const url = `${this.tipificabaseurl}?pcampname=${pcampname}&ptipo=${ptipo}`;
        try {
            const response = await axios.get(url);
            res = response.data;
        } catch(ex){
            const msg = `getTipificacion1 ERROR! entorno[${this.entorno}] pcampname[${pcampname}]ptipo[${ptipo}] ${ex.message}`;
            console.log(msg);
            EventBus.$emit("merror", msg);
            res = {ok: false, message: ex.message};
        }
        return res;
    }
    // Obtiene un user por id
    async getUser(pid: number) {
        let res = null;
        const url = `${this.userbaseurl}/${pid}`;
        try {
            const response = await axios.get(url);
            res = response.data;
        } catch(ex){
            const msg = `getUser ERROR! entorno[${this.entorno}] id[${pid}] ${ex.message}`;
            console.log(msg);
            EventBus.$emit("merror", msg);
            res = {ok: false, message: ex.message};
        }
        return res;
    }
    // Obtiene todos los users
    getAllUsers(pcbk: any) {
        console.log('getAllUsers BEGIN');
        let res = null;
        const url = `${this.userbaseurl}`;
        try {
            axios.get(url).then(function (response) {
                // handle success
                console.log('getAllUsers OK');
                console.log(response);
                res = {ok: true, data: response.data, message: 'OK'};
                pcbk(res);
            })
              .catch(function (error) {
                // handle error
                console.log('getAllUsers ERROR');
                console.log(error);
                res = {ok: false, data: null, message: `${error}`};
                pcbk(res);
              })
              .then(function () {
                // always executed
                console.log('getAllUsers END');
            });
        } catch(ex){
            const msg = `getAllUsers ERROR! entorno[${this.entorno}] ${ex.message}`;
            console.log(msg);
            EventBus.$emit("merror", msg);
            res = {ok: false, data: null, message: ex.message};
            pcbk(res);
        }
    }
    // Update autorizaciones
    async updateAutoriza(peasycode: number, pllamada: boolean, plopd: boolean, pdgs: boolean ) {
        let res = null;
        const url = `${this.contactbaseurl}/updateautoriza`;
        try {
            const response = await axios({
                method: 'post',
                url: url,
                data: {
                    "easycode": peasycode,
                    "llamada": pllamada,
                    "lopd": plopd,
                    "dgs": pdgs
                },
                headers: {
                    "Content-Type": "application/json"
                }
            //   }).then(function (presponse) {
            //     // handle success
            //     console.log('updateAutoriza OK');
            //     console.log(presponse);
            //     res = {ok: true, data: presponse.data, message: 'OK'};
            //     //pcbk(res);
            // })
            //   .catch(function (error) {
            //     // handle error
            //     console.log('updateAutoriza ERROR');
            //     console.log(error);
            //     res = {ok: false, data: null, message: `${error}`};
            //     //pcbk(res);
            //   })
            //   .then(function () {
            //     // always executed
            //     console.log('updateAutoriza END');
            });
            res = response.data;       
        } catch(ex){
            const msg = `updateAutoriza ERROR! entorno[${this.entorno}] easycode[${peasycode}] ${ex.message}`;
            console.log(msg);
            EventBus.$emit("merror", msg);
            res = {ok: false, message: ex.message};
        }
        return res;
    }
    // Update resultado y motivo
    async updateResultadoMotivo(pllamadaid: number, presultadocode: number, pmotivonocode: number) {
        let res = null;
        const url = `${this.llamadabaseurl}/updateresultadomotivo`;
        try {
            const response = await axios({
                method: 'post',
                url: url,
                data: {
                    "llamadaid": pllamadaid,
                    "resultadocode": presultadocode,
                    "motivonocode": pmotivonocode
                },
                headers: {
                    "Content-Type": "application/json"
                }
            });
            res = response.data;       
        } catch(ex){
            const msg = `updateAutoriza ERROR! entorno[${this.entorno}] pllamadaid[${pllamadaid}] ${ex.message}`;
            console.log(msg);
            EventBus.$emit("merror", msg);
            res = {ok: false, message: ex.message};
        }
        return res;
    }
    // Asigna llamada a agente
    async asignaLlamada(pllamadaid: number, pagenteid: number) {
        let res = null;
        const url = `${this.llamadabaseurl}/asignallamada`;
        try {
            const response = await axios({
                method: 'post',
                url: url,
                data: {
                    "llamadaid": pllamadaid,
                    "userid": pagenteid
                },
                headers: {
                    "Content-Type": "application/json"
                }
            });
            res = response.data;       
        } catch(ex){
            const msg = `asignaLlamada ERROR! entorno[${this.entorno}] llamada[${pllamadaid}]user[${pagenteid}] ${ex.message}`;
            console.log(msg);
            EventBus.$emit("merror", msg);
            res = {ok: false, message: ex.message};
        }
        return res;
    }
}