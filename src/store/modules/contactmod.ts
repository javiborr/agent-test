import { EventBus } from "@/eventbus/event.bus";
import ContactProxy from '@/api/contactproxy';

function getProductClassByName(p: string) {
  let res = '';
  if (/^Auto/.test(p)) {
    res = 'auto';
  } else
  if (/^Hogar/.test(p)) {
    res = 'hogar';
  } else
  if (/^Acci/.test(p)) {
    res = 'accidentes';
  } else
  if (/^Vida/.test(p)) {
    res = 'vida';
  } else
  if (/^DFJ/.test(p)) {
    res = 'dfj';
  } else
  if (/^2.+Viv/.test(p)) {
    res = 'vivienda2';
  } else
  if (/^2.+veh/.test(p)) {
    res = 'vehiculo2';
  }
  return res;
}

export const state = {
  // entorno: 'test',
  current: {
    campana: {
      nombre: ''
    }
  },
  llamada: { 
    telephone: ''
  },
  telefono: '',
  llamadafocus: { 
    llamadaid: 0,
    comentario: ''
  },
  tipificacion1list: [],
  tipificacion2list: [],
  tipificacion1: {},
  tipificacion2: {},
  contactado: false,
  tipificacionok: false,
  tipificacionusamotivo: false,
  tipificacionalt: ''
}
export const getters = {
  getTelefono: (pstate: any) => {
    return pstate.telefono;
  },
  getCurrent: (pstate: any) => {
    //console.log(`VUEX getCurrent [${pstate.current}]`);
    return pstate.current;
  },
  getTieneHogar: (pstate: any) => {
    return (pstate.current.polizaHogar === true);
  },
  getTieneAutos: (pstate: any) => {
    return (pstate.current.polizaAutos === true);
  },
  // P1
  getOfreceP1: (pstate: any) => {
    const s = pstate.current ? pstate.current.p1Nombre : null;
    return (s && 0 !== s.length && !(/^\s*$/.test(s)));
  },
  getP1Nombre: (pstate: any) => {
    return pstate.current.p1Nombre;
  },
  getP1Class: (pstate: any) => {
    return getProductClassByName(pstate.current.p1Nombre);
  },
  // P2
  getOfreceP2: (pstate: any) => {
    const s = pstate.current ? pstate.current.p2Nombre : null;
    return (s && 0 !== s.length && !(/^\s*$/.test(s)));
  },
  getP2Nombre: (pstate: any) => {
    return pstate.current.p2Nombre;
  },
  getP2Class: (pstate: any) => {
    return getProductClassByName(pstate.current.p2Nombre);
  },
  // P3
  getOfreceP3: (pstate: any) => {
    const s = pstate.current ? pstate.current.p3Nombre : null;
    return (s && 0 !== s.length && !(/^\s*$/.test(s)));
  },
  getP3Nombre: (pstate: any) => {
    return pstate.current.p3Nombre;
  },
  getP3Class: (pstate: any) => {
    return getProductClassByName(pstate.current.p3Nombre);
  },
  //
  getLlamada: (pstate: any) => {
    //console.log(`VUEX getLlamada [${pstate.llamada}]`);
    return pstate.llamada;
  },
  getHayLlamada: (pstate: any) => {
    const bhayllamada = typeof(pstate.llamada) === 'object' && typeof(pstate.llamada.llamadaid) !== 'undefined';
    //console.log(`VUEX getHayLlamada [${bhayllamada}]`);
    return bhayllamada;
  },
  getLlamadaList: (pstate: any) => {
    //console.log(`VUEX getLlamadaList [${pstate.llamada}]`);
    let res = [];
    // SI hay datos
    if (pstate.current && typeof(pstate.current.llamada) !== 'undefined') {
        res = pstate.current.llamada.map((ll: any) => 
        {
          const target = {};
          const o = Object.assign(target, ll);
          o.motivono = (ll.motivono) ? ll.motivono.descripcion : ''
          o.resultado = (ll.resultado) ? ll.resultado.descripcion : ''
          o.busoutcome = '';
          // SI hay LCMOutcome
          if (ll.resultado && ll.resultado.lcmoutcomeid) {
            switch(ll.resultado.lcmoutcomeid) {
                case 133: o.busoutcome = 'Acepta'; break;
                case 134: o.busoutcome = 'No acepta'; break;
                default: o.busoutcome = 'Neutral'; break;
            }
          }
          // SI hay agente
          if (ll.agente && ll.agente.firstname) {
            o.agente = `${ll.agente.firstname}&nbsp;${ll.agente.lastname}`
          } else {
            o.agente = '';
          }
          return o;
        });
        console.log(`Hay ${res.length} llamadas`);
        //console.log(res);
    }
    else {
        console.log('No hay llamadas');
    }
    return res;
  },
  getTipificacion1List: (pstate: any) => {
    //console.log(`VUEX getTipificacion1List`);
    let res = [];
    // SI hay datos
    if (pstate.tipificacion1list && pstate.tipificacion1list.length && pstate.tipificacion1list.length > 0) {
        res = pstate.tipificacion1list.map((tp1: any) => 
        {
            const target = {};
            const o = Object.assign(target, tp1);
            o.busoutcome = '';
            if (tp1.lcmoutcomeid) {
                switch(tp1.lcmoutcomeid) {
                    case 133: o.busoutcome = 'Acepta'; break;
                    case 134: o.busoutcome = 'No acepta'; break;
                    default: o.busoutcome = 'Neutral'; break;
                }
            }
            return o;
        });
        console.log(`Hay ${res.length} tp1`);
        //console.log(res);
    }
    else {
        console.log('No hay tipificacion1list');
    }
    return res;
  },
  getTipificacion2List: (pstate: any) => {
    //console.log(`VUEX getTipificacion2List`);
    let res = [];
    // SI hay datos
    if (pstate.tipificacion2list && pstate.tipificacion2list.length && pstate.tipificacion2list.length > 0) {
        res = pstate.tipificacion2list;
        console.log(`Hay ${res.length} tp2`);
        //console.log(res);
    }
    else {
        console.log('No hay tipificacion2list');
    }
    return res;
  },
  getTipificacion1: (pstate: any) => {
    //console.log(`VUEX getTipificacion1 [${pstate.tipificacion1.descripcion}]`);
    return pstate.tipificacion1.descripcion;
  },
  getTipificacion2: (pstate: any) => {
    //console.log(`VUEX getTipificacion2 [${pstate.tipificacion2.descripcion}]`);
    return pstate.tipificacion2.descripcion;
  },
  getContactado: (pstate: any) => {
    //console.log(`VUEX getContactado [${pstate.contactado}]`);
    return pstate.contactado;
  },
  getTipificacionOK: (pstate: any) => {
    //console.log(`VUEX getTipificacionOK [${pstate.tipificacionok}]`);
    return pstate.tipificacionok;
  },
  getTipificacionUsaMotivo: (pstate: any) => {
    //console.log(`VUEX getTipificacionUsaMotivo [${pstate.tipificacionusamotivo}]`);
    return pstate.tipificacionusamotivo;
  },
  getTipificacionAlt: (pstate: any) => {
    //console.log(`VUEX getTipificacionUsaMotivo [${pstate.tipificacionalt}]`);
    return pstate.tipificacionalt;
  }
}
export const actions = {
  setTelefono({ commit }: any, ptelefono: string) {
    commit('SET_TELEFONO', ptelefono);
  },
  async fetchContact({ commit, rootState }: any, pid: number) {
      try {
        console.log(`fetchContact pid[${pid}]`);
        const contactproxy = new ContactProxy(rootState.entorno);
        const res = await contactproxy.getContact(pid);
        // SI OK
        if (res.ok === true) {
          //console.log(JSON.stringify(res.data).substr(0,90)+'...');
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
  async fetchLlamadaContact({ commit, state, rootState, dispatch }: any, pid: number) {
    try {
      console.log(`fetchLlamadaContact pid[${pid}]`);
      const contactproxy = new ContactProxy(rootState.entorno);
      const res = await contactproxy.getLlamadaContact(pid);
      // SI OK
      if (res.ok === true && res.data !== null) {
        //console.log(JSON.stringify(res.data.llamada).substr(0,90)+'...');
        //console.log(JSON.stringify(res.data.contact).substr(0,90)+'...');
        // SI el telefono grabado en la llamada es distinto del telefono que nos ha pasado Finesse
        if(res.data.llamada && res.data.llamada.telephone !== state.telefono) {
          console.log(`CAMBIO telefono[${res.data.llamada.telephone}-->${state.telefono}]`);
          res.data.llamada.telephone = state.telefono;
          // TODO grabar
        }
        commit('SET_CURRENT', res.data.contact);
        commit('SET_LLAMADA', res.data.llamada);
        // SI hay llamadas
        if (res.data.llamada && res.data.llamada.length > 0) {
          commit('SET_LLAMADAFOCUS', res.data.llamada[0]);
        }
        // TODO asignar llamada a agente
        // SI el agente grabado en la llamada es distinto del agenet que nos ha pasado Finesse
        if(res.data.llamada && res.data.llamada.agenteid !== rootState.usermod.currentuser.userid) {
          console.log(`CAMBIO agente[${res.data.llamada.agenteid}-->${rootState.usermod.currentuser.userid}]`);
          res.data.llamada.agenteid = rootState.usermod.currentuser.userid;
          // TODO grabar
        }
        // TODO Tipificaciones
        await dispatch('fetchTipificaciones');
        // SI llamada NO tiene resultado
        if (res.data.llamada.resultadoid === null) {
          commit('SET_TIPIFICACION1', {});
          commit('SET_TIPIFICACION2', {});
        } else {
          await dispatch('setTipificacion1', res.data.llamada.resultadoid);
          // SI llamada tiene motivo
          if (res.data.llamada.motivonoid !== null) {
            await dispatch('setTipificacion2', res.data.llamada.motivonoid);
          }
        }
        commit('UPDATE_TIPIFICACIONALT');
        //
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
  async setAutoriza1({ commit, state, rootState }: any, p: number) {
    try {
      console.log(`setAutoriza1 [${typeof(p)}:${p}]`);
      let val = null;
      switch(p) {
        case 1: val = true; break;
        case 2: val = false; break;
        default: break;
      }
      // SI cambia
      if ( state.current && val !== state.current.autoriza1) {
        commit('SET_AUTORIZA1', val);
        const c = state.current;
        const contactproxy = new ContactProxy(rootState.entorno);
        const res = await contactproxy.updateAutoriza(
          c.easycode, c.autoriza1, c.autoriza2, c.autoriza3
        );
        console.log(res);
        // errcode: 0
        // message: "UpdateAutoriza OK contacto[84:RAFAEL MARIA][True:False:True]"
        // ok: true
        // SI OK
        if (res.ok === true && res.data !== null) {
          // TODO
          const msg = `setAutoriza1 OK`;
          console.log(msg);
          //EventBus.$emit("merror", msg);
        } else {
          // TODO
          const msg = `setAutoriza1 ERROR! ${res.message}`;
          console.log(msg);
          EventBus.$emit("merror", msg);
        }
      }
    } catch(ex){
      const msg = `setAutoriza1 ERROR! ${ex.message}`;
      console.log(msg);
      EventBus.$emit("merror", msg);
    }
  },
  async setAutoriza2({ commit, state, rootState }: any, p: number) {
    try {
      console.log(`setAutoriza2 [${typeof(p)}:${p}]`);
      let val = null;
      switch(p) {
        case 1: val = true; break;
        case 2: val = false; break;
        default: break;
      }
      // SI cambia
      if ( state.current && val !== state.current.autoriza2) {
        commit('SET_AUTORIZA2', val);
        const c = state.current;
        const contactproxy = new ContactProxy(rootState.entorno);
        const res = await contactproxy.updateAutoriza(
          c.easycode, c.autoriza1, c.autoriza2, c.autoriza3
        );
        console.log(res);
        // SI OK
        if (res.ok === true && res.data !== null) {
          // TODO
          const msg = `setAutoriza2 OK`;
          console.log(msg);
          //EventBus.$emit("merror", msg);
        } else {
          // TODO
          const msg = `setAutoriza2 ERROR! ${res.message}`;
          console.log(msg);
          EventBus.$emit("merror", msg);
        }
      }
    } catch(ex){
      const msg = `setAutoriza2 ERROR! ${ex.message}`;
      console.log(msg);
      EventBus.$emit("merror", msg);
    }
  },
  async setAutoriza3({ commit, state, rootState }: any, p: number) {
    try {
      console.log(`setAutoriza3 [${typeof(p)}:${p}]`);
      let val = null;
      switch(p) {
        case 1: val = true; break;
        case 2: val = false; break;
        default: break;
      }
      // SI cambia
      if ( state.current && val !== state.current.autoriza3) {
        commit('SET_AUTORIZA3', val);
        const c = state.current;
        const contactproxy = new ContactProxy(rootState.entorno);
        const res = await contactproxy.updateAutoriza(
          c.easycode, c.autoriza1, c.autoriza2, c.autoriza3
        );
        console.log(res);
        // SI OK
        if (res.ok === true && res.data !== null) {
          // TODO
          const msg = `setAutoriza3 OK`;
          console.log(msg);
          //EventBus.$emit("merror", msg);
        } else {
          // TODO
          const msg = `setAutoriza3 ERROR! ${res.message}`;
          console.log(msg);
          EventBus.$emit("merror", msg);
        }
      }
    } catch(ex){
      const msg = `setAutoriza3 ERROR! ${ex.message}`;
      console.log(msg);
      EventBus.$emit("merror", msg);
    }
  },
  setLlamadaFocus({ commit }: any, p: any) {
    try {
      console.log(`setLlamadaFocus [${typeof(p)}]`);
      //console.log(p);
      commit('SET_LLAMADAFOCUS', p);
    } catch(ex){
      const msg = `setLlamadaFocus ERROR! ${ex.message}`;
      console.log(msg);
      EventBus.$emit("merror", msg);
    }
  },
  async fetchTipificaciones({ commit, state, rootState }: any /*, ptipo: number*/) {
    try {
      // SI OK
      if ( state.current && state.current.campana && state.current.campana.nombre ) {
        const campname =  state.current.campana.nombre;
        console.log(`fetchTipificaciones [${campname}]`);
        const contactproxy = new ContactProxy(rootState.entorno);
        // PARA CADA tipo
        [1,2].forEach( async function(ptipo) {
          const res = await contactproxy.getTipificacion(campname, ptipo);
          // SI OK
          if (res.ok === true) {
            //console.log(JSON.stringify(res.data).substr(0,90)+'...');
            commit(`SET_TIPIFICACION${ptipo}LIST`, res.data);
          } else {
            const msg = `fetchTipificaciones ERROR! ${res.message}`;
            console.log(msg);
            EventBus.$emit("merror", msg);
          }
          });
      } else {
        console.log('NO sabemos el nombre de la campana');  
      }
    } catch(ex){
      const msg = `fetchTipificaciones ERROR! ${ex.message}`;
      console.log(msg);
      EventBus.$emit("merror", msg);
    }
  },
  clearTipificacion( { commit }: any ) {
    commit('SET_TIPIFICACION1', {});
    commit('SET_TIPIFICACION2', {});
    commit('UPDATE_TIPIFICACIONALT');
  },
  async setTipificacion1({ commit, state, rootState }: any, ptip1id: number) {
    try {
      console.log(`setTipificacion1 [${ptip1id}:${typeof(ptip1id)}]`);
      console.log(ptip1id);
      const ls = state.tipificacion1list.filter((ptp: any) => ptp.code === ptip1id);
      // SI OK
      if (ls && ls.length && ls.length > 0) {
        // {code: 9, callType: "CONTRATO", descripcion: "Contrato Grabado", lcmoutcomeid: 133, campana: "BilbaoVida"}
        commit('SET_TIPIFICACION1', ls[0]);
        commit('SET_TIPIFICACION2', {});
        commit('UPDATE_TIPIFICACIONALT');
        // Server
        const ll = state.llamada;
        const contactproxy = new ContactProxy(rootState.entorno);
        const res = await contactproxy.updateResultadoMotivo(
          ll.llamadaid, ll.resultadoid, ll.motivonoid
        );
        console.log(res);
        // SI OK
        if (res.ok === true && res.data !== null) {
          // TODO
          const msg = `setTipificacion1 OK`;
          console.log(msg);
          //EventBus.$emit("merror", msg);
        } else {
          // TODO
          const msg = `setTipificacion1 ERROR! ${res.message}`;
          console.log(msg);
          EventBus.$emit("merror", msg);
        }
      }
    } catch(ex){
      const msg = `setTipificacion1 ERROR! ${ex.message}`;
      console.log(msg);
      EventBus.$emit("merror", msg);
    }
  },
  async setTipificacion2({ commit, state, rootState }: any, ptip2id: number) {
    try {
      console.log(`setTipificacion2 [${ptip2id}:${typeof(ptip2id)}]`);
      console.log(ptip2id);
      const ls = state.tipificacion2list.filter((ptp: any) => ptp.code === ptip2id);
      // SI OK
      if (ls && ls.length && ls.length > 0) {
        // {code: 0, callType: "NO_PROP", descripcion: "No es Propietario", campana: "BilbaoVida"}
        commit('SET_TIPIFICACION2', ls[0]);
        commit('UPDATE_TIPIFICACIONALT');
        // Server
        const ll = state.llamada;
        const contactproxy = new ContactProxy(rootState.entorno);
        const res = await contactproxy.updateResultadoMotivo(
          ll.llamadaid, ll.resultadoid, ll.motivonoid
        );
        console.log(res);
        // SI OK
        if (res.ok === true && res.data !== null) {
          // TODO
          const msg = `setTipificacion1 OK`;
          console.log(msg);
          //EventBus.$emit("merror", msg);
        } else {
          // TODO
          const msg = `setTipificacion1 ERROR! ${res.message}`;
          console.log(msg);
          EventBus.$emit("merror", msg);
        }
      }
    } catch(ex){
      const msg = `setTipificacion2 ERROR! ${ex.message}`;
      console.log(msg);
      EventBus.$emit("merror", msg);
    }
  }
}
export const mutations = {
  SET_CURRENT: (pstate: any, p: any) => {
    console.log(`VUEX SET_CURRENT [${typeof(p)}]`);
    console.log(p);
    pstate.current = p;
    console.log('EventBus setcurrent ->');
    EventBus.$emit("setcurrent");
  },
  SET_TELEFONO: (pstate: any, p: string) => {
    //console.log(`VUEX SET_AUTORIZA1 [${typeof(p)}:${p}]`);
    pstate.telefono = p;
    pstate.llamada = pstate.llamada ? pstate.llamada : {};
    pstate.llamada.telephone = p;
  },
  SET_AUTORIZA1: (pstate: any, p: any) => {
    //console.log(`VUEX SET_AUTORIZA1 [${typeof(p)}:${p}]`);
    pstate.current = pstate.current ? pstate.current : {};
    pstate.current.autoriza1 = p;
  },
  SET_AUTORIZA2: (pstate: any, p: any) => {
    //console.log(`VUEX SET_AUTORIZA2 [${typeof(p)}:${p}]`);
    pstate.current = pstate.current ? pstate.current : {};
    pstate.current.autoriza2 = p;
  },
  SET_AUTORIZA3: (pstate: any, p: any) => {
    //console.log(`VUEX SET_AUTORIZA3 [${typeof(p)}:${p}]`);
    pstate.current = pstate.current ? pstate.current : {};
    pstate.current.autoriza3 = p;
  },
  SET_LLAMADA: (pstate: any, p: any) => {
    console.log(`VUEX SET_LLAMADA [${typeof(p)}]`);
    console.log(p);
    pstate.llamada = p;
  },
  SET_LLAMADAFOCUS: (pstate: any, p: any) => {
    //console.log(`VUEX SET_LLAMADAFOCUS [${typeof(p)}]`);
    // console.log(p);
    pstate.llamadafocus = p;
    console.log('EventBus setllamadafocus ->');
    EventBus.$emit("setllamadafocus", p);
  },
  SET_TIPIFICACION1LIST: (pstate: any, p: any) => {
    //console.log(`VUEX SET_TIPIFICACION1LIST [${typeof(p)}]`);
    if (p && p.length && p.length > 0) console.log(p[0]);
    pstate.tipificacion1list = p;
    console.log('EventBus settip1list ->');
    EventBus.$emit("settip1list", p);
  },
  SET_TIPIFICACION1: (pstate: any, p: any) => {
    //console.log(`VUEX SET_TIPIFICACION1 [${typeof(p)}:${p.callType}:${p.code}:${p.lcmoutcomeid}]`);
    console.log(p);
    pstate.tipificacion1 = p;
    pstate.llamada.resultadoid = p.code;
    pstate.llamada.resultado = p;
    // extra
    pstate.tipificacion2 = {};
    pstate.llamada.motivonoid = null;
    pstate.llamada.motivono = null;
    // SI datos ok
    if (p && typeof(p.lcmoutcomeid) !== 'undefined') {
      pstate.tipificacionusamotivo = (p.lcmoutcomeid === 134);
      pstate.contactado = (p.lcmoutcomeid !== 135);
      pstate.tipificacionok = (p && typeof(p.code) !== 'undefined' && !pstate.tipificacionusamotivo);
    } else {
      pstate.tipificacionok = false;
      pstate.contactado = false;
    }
    console.log(`tipificacionusamotivo[${pstate.tipificacionusamotivo}]tipificacionok[${pstate.tipificacionok}]`);
  },
  SET_TIPIFICACION2LIST: (pstate: any, p: any) => {
    //console.log(`VUEX SET_TIPIFICACION2LIST [${typeof(p)}]`);
    if (p && p.length && p.length > 0) console.log(p[0]);
    pstate.tipificacion2list = p;
    console.log('EventBus settip2list ->');
    EventBus.$emit("settip2list", p);
  },
  SET_TIPIFICACION2: (pstate: any, p: any) => {
    //console.log(`VUEX SET_TIPIFICACION2 [${typeof(p)}:${p.callType}:${p.code}]`);
    console.log(p);
    pstate.tipificacion2 = p;
    pstate.llamada.motivonoid = p.code;
    pstate.llamada.motivono = p;
    // SI es ok
    if (p && typeof(p.code) !== 'undefined') {
      pstate.tipificacionok = true;
    }
    console.log(`tipificacionok[${pstate.tipificacionok}]`);
  },
  UPDATE_TIPIFICACIONALT: (pstate: any) => {
    //console.log(`VUEX UPDATE_TIPIFICACIONALT`);
    const s1 = typeof(pstate.tipificacion1.callType) !== 'undefined' ? pstate.tipificacion1.callType : '';
    const s2 = typeof(pstate.tipificacion2.callType) !== 'undefined' ? pstate.tipificacion2.callType : '';
    pstate.tipificacionalt = `${s1}${s2}`;
    console.log(pstate.tipificacionalt);
  }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }