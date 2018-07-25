import axios from 'axios'
import Vue from 'vue'
import Router from '../../router/index'
import md5 from 'js-md5'
import util from '../../lib/util'
const vue = new Vue();
const {parseTwo, axiosError}=util;
axios.defaults.withCredentials = true;

//钱包模块

const state = {
  id: null,
  balance: 0,
  balance_class: 'balance_hide',
  paytable: {
    data: {},
    keyword: '',
    current: 1,
    sort: -1,
    totalPage: 1,
    table: []
  },
  pay: {
    amount: '',
    qrcode: null,
    out_trade_no: null
  }
}

// getters
const getters = {
  balance: state => state.balance,
  balance_class: state => state.balance_class,
  paytable: state => state.paytable,
  pay: state => state.pay,
}

// actions
const actions = {
  //获取余额
  Wallet ({commit, state, rootState}) {
    let id = rootState.mutations.MongoUsers._id;
    commit('ID', id);
    axios.get(`/api/v1/users/banlance/${id}`).then(function (res) {
        console.log('余额数据');
        console.log(res.data);
        let balance = parseTwo(res.data.balance);
        commit('Wallet', balance)
      }
    ).catch(function (err) {
      console.log(err);
    });
  },
  //获取支付列表
  PayList({commit, state, rootState}, page = 1){
    let id = rootState.mutations.MongoUsers._id;
    let offset = (page - 1) * 10;
    axios.get(`/api/v1/payment/${id}`, {
      params: {
        offset: offset,
        limit: 10,
        sort: state.paytable.sort,
        query_type: 0,
      }
    }).then(function (res) {
      console.log(res.data);
      commit('PayList', res.data, page)
    }).catch(function (err) {
      axiosError(err);
    });
  },
//  充值页面
  toPay({commit, state, rootState}, to = 1){
    if (to <= 3) {
      Router.push({path: `/pay${to}`});
    } else {
      setTimeout(function () {
        Router.push({path: `/wallet`});
      }, 2000)
    }

  },
  //充值方式选择- 微信支付
  toNext({commit, state, rootState}){
    let user_id = rootState.mutations.MongoUsers._id;
    let amount = parseInt(state.pay.amount);
    if (amount && amount >= 10 && amount <= 50000) {
      axios.get(`/api/v1/weixin/creat_code`, {
        params: {
          money: amount,
          user_id,
          product: 0

        }
      }).then(function (res) {
        let data = res.data;
        console.log("weixin");
        console.log(data);
        commit('WePay', data);
        Router.push({path: `/pay2`});
      }).catch(function (err) {
        axiosError(err);
        Router.push({path: `/pay2`});
      });

    } else {
      vue.$Message.error('请输入正确的充值金额');
    }
  },
  //支付宝支付
  AliPay({commit, state, rootState}){
    let user_id = rootState.mutations.MongoUsers._id;
    axios.get(`/api/v1/alipay/creat_code`, {
      params: {
        money: parseInt(state.pay.amount),
        user_id,
        product: 0
      }
    }).then(function (res) {
      let data = res.data;
      console.log(data);
      window.open(data.data)
    }).catch(function (err) {
      axiosError(err);
    });
  },
  ReturnWX({commit, state, rootState}){
    let user_id = rootState.mutations.MongoUsers._id;
    let out_trade_no = state.pay.out_trade_no;
    axios.get(`/api/v1/weixin/${user_id}/${out_trade_no}/over`).then(function (res) {
      // console.log(res);
      // console.log("weixinRETURN");
      if (res.status == 200) {
        Router.push({path: `/pay3`});
      }
    }).catch(function (err) {
    });
  }

}

// mutations
const mutations = {
  Wallet(state, balance){
    state.balance = balance;
    balance = parseInt(balance);
    if (balance >= 2000) {
      state.balance_class = 'balance_hide';
    } else {
      state.balance_class = 'balance_show';
    }
  },
  PayList(state, data, page){
    state.paytable.data = data;
    state.paytable.totalPage = data.totalPage;
    state.paytable.current = page;
    state.paytable.table = data.rows;
  },
  ID(state, id){
    state.id = id;
  },
  WePay(state, data){
    state.pay.qrcode = data.result.code_url;
    state.pay.out_trade_no = data.product_id ? data.product_id : "";
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
