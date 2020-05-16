
import Vue from 'vue'
import Vuex from 'vuex'

import contactmod    from '@/store/modules/contactmod.ts'
import reprogramamod from '@/store/modules/reprogramamod.ts'
import usermod       from '@/store/modules/usermod.ts'
import uimod         from '@/store/modules/uimod.ts'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    contactmod,
    reprogramamod,
    usermod,
    uimod
  },
  state: {
    entorno: 'test'
  },
  actions: {
    setEntorno({ commit }: any, p: string) {
        commit('SET_ENTORNO', p);
    }
  },
  mutations: {
    SET_ENTORNO: (pstate: any, p: string) => {
      pstate.entorno = p;
    }
  }
})
