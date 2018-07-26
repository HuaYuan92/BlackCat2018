import axios from 'axios'
import {Message} from 'element-ui';
import router from '@/router/index'
import md5 from 'js-md5'
import util from '@/lib/util.js'

const {setCookie, getCookie, deleteCookie} = util;


const state = {
  registerInfo: {}
};

// getters
const getters = {
  registerInfo: state => state.registerInfo,
};

const actions = {
  ReadLocal({commit, state, rootState}) {
    let user = getCookie('user') ? JSON.parse(getCookie('user')) : '';
    if (user) {
      console.log('...');
    } else {
      router.push({path: '/login'})
    }
  },
};

const mutations = {
  UserInfo(state, data) {
    state.userInfo = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
}
