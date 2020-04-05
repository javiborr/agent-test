import axios from 'axios';
import { EventBus } from "@/main";

export default class ContactProxy {
    entorno: string;
    contactbaseurl: string;
    llamadabaseurl: string;

    constructor(pentorno: string) {
        this.entorno = (pentorno || 'dev').toLowerCase();
        let baseurl = "";
        // SEGUN el entorno
        switch(this.entorno) {
            case 'test': baseurl = 'https://gcobtmprelcm.grupocatalanaoccidente.com/BT.Campaigns.WebAPI/api'; break;
            case 'pro': baseurl = 'https://gcobtmlcmcore1.grupocatalanaoccidente.com/BT.Campaigns.WebAPI/api'; break;
            default: baseurl = 'http://10.19.100.59/BT.Campaigns.WebAPI/api'; break;
        }
        this.contactbaseurl = `${baseurl}/contacto`;
        this.llamadabaseurl = `${baseurl}/llamada`;
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
}