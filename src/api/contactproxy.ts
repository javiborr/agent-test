import axios from 'axios';
import { EventBus } from "@/main";

export default class ContactProxy {
    entorno: string;
    baseurl: string;

    constructor(pentorno: string) {
        this.entorno = (pentorno || 'dev').toLowerCase();
        // SEGUN el entorno
        switch(this.entorno) {
            case 'test': this.baseurl = 'https://gcobtmprelcm.grupocatalanaoccidente.com/BT.Campaigns.WebAPI/api/contacto'; break;
            case 'pro': this.baseurl = 'https://gcobtmlcmcore1.grupocatalanaoccidente.com/BT.Campaigns.WebAPI/api/contacto'; break;
            default: this.baseurl = 'http://10.19.100.59/BT.Campaigns.WebAPI/api/contacto'; break;
        }
    }
    // Obtiene un contacto con sus llamadas
    async getContact(peasycode: number) {
        let res = null;
        const url = `${this.baseurl}/${peasycode}`;
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
}