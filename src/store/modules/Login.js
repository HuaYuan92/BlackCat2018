import axios from 'axios'
import {Message} from 'element-ui';
import router from '@/router/index'
import md5 from 'js-md5'
import util from '@/lib/util.js'

const {setCookie, getCookie, deleteCookie} = util;


const state = {
  loginInfo: {
    userName: '',
    password: ''
  },
  userInfo: {}
};

// getters
const getters = {
  loginInfo: state => state.loginInfo,
  userInfo: state => state.userInfo,
};

const actions = {
  Login({commit, state}) {
    axios.get("/api/v1/login", {
      params: {
        userName: state.loginInfo.userName,
        password: md5(state.loginInfo.password),
        platform: 'hmc'
      }
    }).then((res) => {
      Message({
        message: '登录成功',
        type: 'success',
        center:true
      });
      commit('UserInfo', res.data);
      setCookie('user',JSON.stringify(res.data),1);
      router.push({path:'/search'})
    }).catch((err) => {
      console.log(err);
      Message({
        message: '登录失败',
        type: 'error',
        center:true
      });
    })

  },
  Quit(){
    deleteCookie('user');
    window.location.reload();
  }

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
