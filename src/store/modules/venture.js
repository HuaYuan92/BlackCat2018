import axios from 'axios'
import Vue from 'vue'
import util from '../../lib/util'
import Router from '../../router/index'

const vue = new Vue();
const {parseTwo, axiosError, nameReg, telReg, codeReg} = util;
axios.defaults.withCredentials = true;

//钱包模块

const state = {
  /*个人风险预测*/
  forecast_data: {
    identity_name: '',
    identity_code: '',
    mobile: '',
    step: 0,
    level: 'a',
    probability: 0
  },
  /*企业监控数据*/
  ent_venture: {
    ent_table: {
      type: 1,//0：终止   1：进行中   2：已完成
      data: {},
      keyword: '',
      current: 1,
      sort: -1,
      totalPage: 1,
      table: []
    },
    detail:{}
  },
  /*个人监控数据*/
  per_venture: {
    per_table: {
      type: 1,//0：终止   1：进行中   2：已完成
      data: {},
      keyword: '',
      current: 1,
      sort: -1,
      totalPage: 1,
      table: []
    },
    detail:{}
  },
}

// getters
const getters = {
  forecast_data: state => state.forecast_data,
  ent_venture: state => state.ent_venture,
  per_venture: state => state.per_venture,
}

// actions
const actions = {
  /*
   * 个人违约风险预测
   * */
  Forecast({commit, state, rootState}) {
    let user_id = rootState.mutations.MongoUsers._id;
    let group_id = new Date().getTime() + "" + Math.floor(Math.random() * 100000000000);
    if (nameReg(state.forecast_data.identity_name) && codeReg(state.forecast_data.identity_code) && telReg(state.forecast_data.mobile)) {
      commit('Step', 1);
      axios.get('/api/v1/personal_violation', {
        params: {
          user_id,
          group_id,
          name: state.forecast_data.identity_name,
          idcode: state.forecast_data.identity_code,
          phone: state.forecast_data.mobile,
        }
      }).then(function (res) {
        console.log(res.data);
        commit('Step', 0);
        Router.push({path: `/venturedetail`});
        commit('Level', res.data.score)
      }).catch(function (err) {
        console.log(err.response);
        commit('Step', 4);
        // vue.$Message.error(err.response.data.msg);
      })

    }
  },
  /*
  * 企业列表类型选择
  * */
  EntTypeSelect({commit, state, rootState}, type) {
    commit('EntTypeSelect', type);
  },
  /*
  * 个人列表类型选择
  * */
  PerTypeSelect({commit, state, rootState}, type) {
    commit('PerTypeSelect', type);
  },
  /*
   * 获取监控企业列表
   * */
  EntVentureList({commit, state, rootState},page=1) {
    let id = rootState.mutations.MongoUsers._id;
    let offset =page?(page - 1) * 10:0;
    axios.get('/api/v1/users/' + id + '/saved_queries', {
      params: {
        type:state.ent_venture.ent_table.type,
        offset: offset,
        limit: 10,
        sort: state.ent_venture.ent_table.sort,
        charKey: state.ent_venture.ent_table.keyword,
        query_type: 1
      }
    }).then(function (res) {
      let data = res.data;
      console.log('拉取企业风险预警list');
      console.log(data);
      state.ent_venture.ent_table.data = data;
      state.ent_venture.ent_table.totalPage = data.totalPage;
      state.ent_venture.ent_table.table = data.rows;
    }).catch(function (err) {
      axiosError(err);
      console.log(err);
    });
  },
  /*
   * 获取监控个人列表
   * */
  PerVentureList({commit, state, rootState},page=1) {
    let id = rootState.mutations.MongoUsers._id;
    let offset =page?(page - 1) * 10:0;
    axios.get('/api/v1/users/' + id + '/saved_queries', {
      params: {
        type:state.per_venture.per_table.type,
        offset: offset,
        limit: 10,
        sort: state.per_venture.per_table.sort,
        charKey: state.per_venture.per_table.keyword,
        query_type: 1
      }
    }).then(function (res) {
      let data = res.data;
      console.log('拉取个人风险预警list');
      console.log(data);
      state.per_venture.per_table.data = data;
      state.per_venture.per_table.totalPage = data.totalPage;
      state.per_venture.per_table.table = data.rows;
    }).catch(function (err) {
      axiosError(err);
      console.log(err);
    });
  },

}

// mutations
const mutations = {
  Step(state, num) {
    state.forecast_data.step = num;
  },
  Level(state, pr) {
    state.forecast_data.probability = pr;
    if (pr < 0.25) {
      state.forecast_data.level = "a";
    } else if (pr >= 0.25 && pr <= 0.75) {
      state.forecast_data.level = "b";
    } else {
      state.forecast_data.level = "c";
    }
  },
  EntTypeSelect(state, type) {
    state.ent_venture.ent_table.type = type;
    state.ent_venture.ent_table.current=1;
  },
  PerTypeSelect(state, type) {
    state.per_venture.per_table.type = type;
    state.per_venture.per_table.current=1;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
