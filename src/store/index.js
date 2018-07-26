import Vue from 'vue'
import Vuex from 'vuex'
import Login from './modules/Login'
import Wallet from './modules/wallet'
import Verification from './modules/verification'
import Venture from './modules/venture'

Vue.use(Vuex);
export default new Vuex.Store({
  modules:{
    // mutations,
    Login,
    Wallet,
    Verification,
    Venture
  },
})
