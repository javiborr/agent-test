import { EventBus } from "@/eventbus/event.bus";
import ContactProxy from '@/api/contactproxy';

export default {
    namespaced: true,
    state: {
      // entorno: 'test',
      currentuser: {}
    },
    getters: {
      getCurrentUser: (pstate: any) => {
        //console.log(`VUEX USER GETTER getCurrentUser [${pstate.currentuser}]`);
        return pstate.currentuser;
      },
    },
    actions: {
        setCurrentUser({ commit }: any, p: any) {
            console.log(`setCurrentUser [${typeof(p)}]`);
            console.log(p);
            commit('SET_CURRENT_USER', p);
        },
        async fetchUserById({ commit, rootState }: any, pid: number) {
          try {
            console.log(`fetchUserById pid[${pid}]`);
            const contactproxy = new ContactProxy(rootState.entorno);
            const res = await contactproxy.getUser(pid);
            // SI OK
            if (res.ok === true) {
              //console.log(JSON.stringify(res.data).substr(0,90)+'...');
              commit('SET_CURRENT_USER', res.data);
            } else {
              const msg = `fetchUserById ERROR! ${res.message}`;
              console.log(msg);
              EventBus.$emit("merror", msg);
            }
          } catch(ex){
            const msg = `fetchUserById ERROR! ${ex.message}`;
            console.log(msg);
            EventBus.$emit("merror", msg);
          }
      },
    },
    mutations: {
      SET_CURRENT_USER: (pstate: any, p: any) => {
        console.log(`VUEX USER MUTA SET_CURRENT_USER`);
        pstate.currentuser = p;
      }
    }
  }