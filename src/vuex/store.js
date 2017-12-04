import Vue from 'vue'
import Vuex from 'vuex'
import * as type from './mutation-types'
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    menuFolded:false,
  },
  mutations:{
    [type.SET_MENUFOLDED](state,flag){
      state.menuFolded=flag
    },

  },
  actions:{
    setMenuFolded(context,flag){
      context.commit(type.SET_MENUFOLDED,flag)
    },
  }
});
export default store
