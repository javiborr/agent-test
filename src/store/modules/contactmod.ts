import { EventBus } from "@/main";
import ContactProxy from '@/api/contactproxy';

export const state = {
  current: {
    campana: {
      nombre: ''
    }
  },
  llamada: { 
    telephone: ''
  }
}
export const getters = {
  getCurrent: (pstate: any) => {
    console.log(`VUEX getCurrent [${pstate.current}]`);
    return pstate.current;
  },
  getLlamada: (pstate: any) => {
    console.log(`VUEX getLlamada [${pstate.llamada}]`);
    return pstate.llamada;
  }
}
export const actions = {
  async fetchContact({ commit }: any, pid: number) {
      try {
        console.log(`fetchContact pid[${pid}]`);
        const contactproxy = new ContactProxy('dev');
        const res = await contactproxy.getContact(pid);
        // SI OK
        if (res.ok === true) {
          console.log(JSON.stringify(res.data).substr(0,90)+'...');
          commit('SET_CURRENT', res.data);
        } else {
          const msg = `fetchContact ERROR! ${res.message}`;
          console.log(msg);
          EventBus.$emit("merror", msg);
        }
      } catch(ex){
        const msg = `fetchContact ERROR! ${ex.message}`;
        console.log(msg);
        EventBus.$emit("merror", msg);
      }
  },
  async fetchLlamadaContact({ commit }: any, pid: number) {
    try {
      console.log(`fetchLlamadaContact pid[${pid}]`);
      const contactproxy = new ContactProxy('dev');
      const res = await contactproxy.getLlamadaContact(pid);
      // SI OK
      if (res.ok === true && res.data !== null) {
        console.log(JSON.stringify(res.data.llamada).substr(0,90)+'...');
        console.log(JSON.stringify(res.data.contact).substr(0,90)+'...');
        commit('SET_CURRENT', res.data.contact);
        commit('SET_LLAMADA', res.data.llamada);
      } else {
        const msg = `fetchContact ERROR! ${res.message}`;
        console.log(msg);
        EventBus.$emit("merror", msg);
      }
    } catch(ex){
      const msg = `fetchContact ERROR! ${ex.message}`;
      console.log(msg);
      EventBus.$emit("merror", msg);
    }
}
}
export const mutations = {
  SET_CURRENT: (pstate: any, p: any) => {
    console.log(`VUEX SET_CURRENT [${p}]`);
    pstate.current = p;
  },
  SET_LLAMADA: (pstate: any, p: any) => {
    console.log(`VUEX SET_LLAMADA [${p}]`);
    pstate.llamada = p;
  }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }