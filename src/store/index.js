import Vue from 'vue'
import Vuex from 'vuex'
import Login from './modules/Login'
import Register from './modules/Register'
import Wallet from './modules/wallet'
import Verification from './modules/verification'
import Venture from './modules/venture'

Vue.use(Vuex);
export default new Vuex.Store({
  modules:{
    // mutations,
    Login,
    Register,
    Wallet,
    Verification,
    Venture
  },
})
