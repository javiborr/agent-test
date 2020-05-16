import { EventBus } from "@/eventbus/event.bus";
import ContactProxy from '@/api/contactproxy';

export const state = {
  //entorno: 'test',
  fechaelegida: new Date(),
  telefonoelegido: '',
  agenteelegidoid: 0,
  puedoreprogramar: false,
  llamadareprogramada: false,
  allusers: [],
  llamadasreprogbydate: [],
  llamadareprogfocus: {}
}
export const getters = {
  getFechaElegida: (pstate: any) => {
    //console.log(`VUEX REPRO getFechaElegida [${pstate.fechaelegida}]`);
    return pstate.fechaelegida;
  },
  getTelefonoElegido: (pstate: any) => {
    //console.log(`VUEX REPRO getTelefonoElegido [${pstate.telefonoelegido}]`);
    return pstate.telefonoelegido;
  },
  getPuedoReprogramar: (pstate: any) => {
    //console.log(`VUEX REPRO getPuedoReprogramar [${pstate.puedoreprogramar}]`);
    return pstate.puedoreprogramar;
  },
  getLlamadaReprogramada: (pstate: any) => {
    //console.log(`VUEX REPRO getLlamadaReprogramada [${pstate.llamadareprogramada}]`);
    return pstate.llamadareprogramada;
  },
  getLlamadasReprogramadasByDate: (pstate: any) => {
    //console.log(`VUEX REPRO getLlamadasReprogramadasByDate [${typeof(pstate.llamadasreprogbydate)}]`);
    return pstate.llamadasreprogbydate;
  },
  getAgentesList: (pstate: any) => {
    //console.log(`VUEX getAgentesList`);
    let res = [];
    // SI hay datos
    if (pstate.allusers && pstate.allusers.length && pstate.allusers.length > 0) {
        res = pstate.allusers.filter((u: any) => u.supervisor === false);
        console.log(`Hay ${res.length} agentes`);
        //console.log(res);
    }
    else {
        console.log('No hay agentes');
    }
    return res;
  }
}
export const actions = {
  eligeTelefonoRepro({ commit, state, dispatch }: any, ptelef: string) {
      try {
        console.log(`eligeTelefonoRepro [${state.telefonoelegido}]-->[${ptelef}]llamadareprogramada[${state.llamadareprogramada}]`);
        // SI cambia
        if (state.telefonoelegido !== ptelef) {
          // SI aun NO esta reprogramada
          if (state.llamadareprogramada === false) {
            commit('SET_TELEF_REPRO', ptelef);
            dispatch('validaPuedoReprogramar');
          } else {
            const msg = `No puedes cambiar el teléfono porque la llamada ya esta reprogramada`;
            console.log(msg);
            EventBus.$emit("merror", msg);
          }
        } else {
          console.log('NO hay cambio');
        }
      } catch(ex){
        const msg = `eligeTelefonoRepro ERROR! ${ex.message}`;
        console.log(msg);
        EventBus.$emit("merror", msg);
      }
  },
  eligeAgenteRepro({ commit, state, dispatch }: any, pageid: number) {
    try {
      console.log(`eligeAgenteRepro [${typeof(state.agenteelegidoid)}:${state.agenteelegidoid}]-->[${typeof(pageid)}:${pageid}]llamadareprogramada[${state.llamadareprogramada}]`);
      // SI cambia
      if (state.agenteelegidoid !== pageid) {
        const antyear  = state.fechaelegida.getFullYear();
        const antmonth = state.fechaelegida.getMonth();
        const antday   = state.fechaelegida.getDate();
        // SI aun NO esta reprogramada
        if (state.llamadareprogramada === false) {
          commit('SET_AGENTE_REPRO', pageid);
          dispatch('fetchLlamadasReprogByDate');
        } else {
          const msg = `No puedes cambiar el agente porque la llamada ya esta reprogramada`;
          console.log(msg);
          EventBus.$emit("merror", msg);
        }
      } else {
        console.log('NO hay cambio');
      }
    } catch(ex){
      const msg = `eligeAgenteRepro ERROR! ${ex.message}`;
      console.log(msg);
      EventBus.$emit("merror", msg);
    }
  },
  eligeFechaRepro({ commit, state, dispatch }: any, pdate: Date) {
    try {
      console.log(`eligeFechaRepro [${state.fechaelegida}]-->[${pdate}]llamadareprogramada[${state.llamadareprogramada}]`);
      // SI cambia
      if (state.fechaelegida !== pdate) {
        const antyear  = state.fechaelegida.getFullYear();
        const antmonth = state.fechaelegida.getMonth();
        const antday   = state.fechaelegida.getDate();
        // SI aun NO esta reprogramada
        if (state.llamadareprogramada === false) {
          commit('SET_FECHA_REPRO', pdate);
          dispatch('validaPuedoReprogramar');
          // SI cambia el dia
          if(antyear !== pdate.getFullYear() || antmonth !== pdate.getMonth() || antday !== pdate.getDate()) {
            dispatch('fetchLlamadasReprogByDate');
          }
        } else {
          const msg = `No puedes cambiar la fecha/hora porque la llamada ya esta reprogramada`;
          console.log(msg);
          EventBus.$emit("merror", msg);
        }
      } else {
        console.log('NO hay cambio');
      }
    } catch(ex){
      const msg = `eligeFechaRepro ERROR! ${ex.message}`;
      console.log(msg);
      EventBus.$emit("merror", msg);
    }
  },
  validaPuedoReprogramar({ commit, state }: any) {
    let msg = 'OK';
    const bfechaok = (state.fechaelegida instanceof Date);
    const btelefok = (typeof(state.telefonoelegido) === 'string');
    // 9 digits?
    const telefre = /\d{9}\d*/;
    const btelef9 = telefre.test(state.telefonoelegido);
    // SI OK
    if (!btelef9) {
      msg = `Teléfono debe tener al menos 9 dígitos no vale[${state.telefonoelegido}]`
    }
    // SI OK
    if (btelefok && btelef9 && bfechaok) {
      // SI futuro
      if (state.fechaelegida.getTime() > (new Date()).getTime()) {
        commit('SET_PUEDO_REPRO', true);
        EventBus.$emit("puedoreprogramar", {ok: true, msg});
      } else {
        msg = `La fecha/hora debe estar en el futuro no vale[${state.fechaelegida}]`
        commit('SET_PUEDO_REPRO', false);
        EventBus.$emit("puedoreprogramar", {ok: false, msg});
      }
    } else {
      msg = `Revisa fecha/hora y teléfono no vale[${state.telefonoelegido}:${state.fechaelegida}]`
      commit('SET_PUEDO_REPRO', false);
      EventBus.$emit("puedoreprogramar", {ok: false, msg});
    }
  },
  fetchUsers({ commit, rootState }: any) {
      console.log(`fetchUsers`);
      const contactproxy = new ContactProxy(rootState.entorno);
      const res = contactproxy.getAllUsers( function(pres: any) {
        try {
          // SI OK
          if (pres) {
            if (pres.ok === true) {
              console.log(JSON.stringify(pres.data).substr(0,90)+'...');
              commit(`SET_ALL_USERS`, pres.data);
              EventBus.$emit("agentescargados");
            } else {
              const msg = `fetchUsers ERROR! ${pres.message}`;
              console.log(msg);
              EventBus.$emit("merror", msg);
            }
          }
        } catch(ex){
          const msg = `fetchUsers ERROR! ${ex.message}`;
          console.log(msg);
          EventBus.$emit("merror", msg);
        }
      });
  },
  async fetchLlamadasReprogByDate({ commit, state, rootState }: any) {
    try {
      //const peripheralnumberid = rootState.usermod.currentuser.userid;
      let peripheralnumberid = state.agenteelegidoid;
      console.log(`fetchLlamadasReprogByDate [${peripheralnumberid}][${state.fechaelegida}]`);
      // SI NO hay agente elegido
      if (peripheralnumberid === 0) {
        peripheralnumberid = rootState.usermod.currentuser.userid;
      }
      console.log(`fetchLlamadasReprogByDate [${peripheralnumberid}][${state.fechaelegida}]`);
      const contactproxy = new ContactProxy(rootState.entorno);
      const res = await contactproxy.getLlamadasReprogByDateAndAgent(
        state.fechaelegida, peripheralnumberid);
      // SI OK
      if (res) {
        if (res.ok === true) {
          console.log(JSON.stringify(res.data).substr(0,90)+'...');
          commit(`SET_LLAMADAS_REPROG`, res.data);
          EventBus.$emit("llamadasreprogbydate");
        } else {
          const msg = `fetchLlamadasReprogByDate ERROR! ${res.message}`;
          console.log(msg);
          EventBus.$emit("merror", msg);
        }
      }
    } catch(ex){
      const msg = `fetchLlamadasReprogByDate ERROR! ${ex.message}`;
      console.log(msg);
      EventBus.$emit("merror", msg);
    }
  },
  setLlamadaReprogFocus({ commit }: any, p: any) {
    try {
      console.log(`setLlamadaReprogFocus [${typeof(p)}]`);
      //console.log(p);
      commit('SET_LLAMADA_REPRO_FOCUS', p);
    } catch(ex){
      const msg = `setLlamadaReprogFocus ERROR! ${ex.message}`;
      console.log(msg);
      EventBus.$emit("merror", msg);
    }
  }
}
export const mutations = {
  SET_AGENTE_REPRO: (pstate: any, p: string) => {
    pstate.agenteelegidoid = p;
  },
  SET_TELEF_REPRO: (pstate: any, p: string) => {
    //console.log(`VUEX REPRO SET_TELEF_REPRO [${p}]`);
    pstate.telefonoelegido = p;
  },
  SET_FECHA_REPRO: (pstate: any, p: Date) => {
    //console.log(`VUEX REPRO SET_FECHA_REPRO [${p}]`);
    pstate.fechaelegida = p;
  },
  SET_PUEDO_REPRO: (pstate: any, p: boolean) => {
    //console.log(`VUEX REPRO SET_PUEDO_REPRO [${p}]`);
    pstate.puedoreprogramar = p;
  },
  SET_ALL_USERS: (pstate: any, p: any) => {
    //console.log(`VUEX REPRO SET_ALL_USERS [${typeof(p.data)}]`);
    pstate.allusers = p.data;
  },
  SET_LLAMADAS_REPROG: (pstate: any, p: any) => {
    //console.log(`VUEX REPRO SET_LLAMADAS_REPROG [${typeof(p)}]`);
    console.log(p);
    pstate.llamadasreprogbydate = p;
  },
  SET_LLAMADA_REPRO_FOCUS: (pstate: any, p: any) => {
    //console.log(`VUEX REPRO SET_LLAMADA_REPRO_FOCUS [${typeof(p)}]`);
    pstate.llamadareprogfocus = p;
  }
  
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }