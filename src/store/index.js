import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import Wallet from './modules/wallet'
import Verification from './modules/verification'
import Venture from './modules/venture'
import actions from './action'

Vue.use(Vuex);
export default new Vuex.Store({
  modules:{
    mutations,
    Wallet,
    Verification,
    Venture
  },
  actions
})
