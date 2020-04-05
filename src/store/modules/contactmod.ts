import { EventBus } from "@/main";
import ContactProxy from '@/api/contactproxy';

export const state = {
  current: {
    campana: {
      nombre: ''
    }
  }
}
export const getters = {
  getCurrent: (pstate: any) => {
    console.log(`VUEX getCurrent [${pstate.current}]`);
    return pstate.current;
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
  }
}
export const mutations = {
  SET_CURRENT: (pstate: any, p: any) => {
    console.log(`VUEX SET_CURRENT [${p}]`);
    pstate.current = p;
  }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }