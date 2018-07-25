import axios from 'axios'
import Vue from 'vue'
import util from '../../lib/util'

const vue = new Vue();
const {axiosError, nameReg, telReg, codeReg, cardReg} = util;
axios.defaults.withCredentials = true;

//钱包模块

const state = {
  ve_card: {
    identity_name: '',
    identity_code: '',
    mobile: '',
    card: '',
    step: 0
  },
  ve_mobile: {
    identity_name: '',
    identity_code: '',
    mobile: '',
    step: 0
  },
  ve_id: {
    identity_name: '',
    identity_code: '',
    step: 0
  },
  ve_positon_home: {
    identity_name: '',
    identity_code: '',
    mobile: '',
    longitude: '',
    latitude: '',
    description:'',
    step: 0
  },
  ve_positon_work: {
    identity_name: '',
    identity_code: '',
    mobile: '',
    longitude: '',
    latitude: '',
    description:'',
    step: 0
  }
};

// getters
const getters = {
  ve_card: state => state.ve_card,
  ve_mobile: state => state.ve_mobile,
  ve_id: state => state.ve_id,
  ve_positon_home: state => state.ve_positon_home,
  ve_positon_work: state => state.ve_positon_work,
};

// actions
const actions = {
  /*
   * 银行卡验证
   * 董小卯
   * 420802198705260613
   * 18611588134
   * 6217002700001619037
   * */
  VeCard({commit, state, rootState}) {
    let {four_api} = rootState.mutations.logininfo;
    let uri = four_api ? four_api.uri : null;
    if (!uri) {
      vue.$Message.error('您尚未开通该查询服务');
      return;
    }
    let user_id = rootState.mutations.MongoUsers._id;
    let group_id = new Date().getTime() + "" + Math.floor(Math.random() * 100000000000);
    if (nameReg(state.ve_card.identity_name) && codeReg(state.ve_card.identity_code) && telReg(state.ve_card.mobile) && cardReg(state.ve_card.card)) {
      let {identity_name, identity_code, mobile} = state.ve_card;
      commit('StepCard', 1);
      axios.get(uri, {
        params: {
          user_id,
          group_id,
          apply_id: four_api._id,
          identity_name,
          identity_code,
          mobile,
          cardNo: state.ve_card.card
        }
      }).then(function (res) {
          let {data} = res;
          console.log(data);
          if (data.code == 200) {
            if (data.data.RSL.length > 0) {
              /*一致*/
              if (data.data.RSL[0].RS.code == '0') {
                commit('StepCard', 2);
              } else {
                /*不一致*/
                commit('StepCard', 3);
              }
            } else {
              commit('StepCard', 4);
            }
          } else {
            commit('StepCard', 4);
          }
        }
      ).catch(function (err) {
        axiosError(err);
        commit('StepCard', 4);
      });

    }


  },
  /*
   * 运营商验证
   * 马加恩
   * 330282199411162817
   * 18662166124  /5
   * */
  VeMolile({commit, state, rootState}) {
    let {three_api} = rootState.mutations.logininfo;
    let uri = three_api ? three_api.uri : null;
    if (!uri) {
      vue.$Message.error('您尚未开通该查询服务');
      return;
    }
    let user_id = rootState.mutations.MongoUsers._id;
    let group_id = new Date().getTime() + "" + Math.floor(Math.random() * 100000000000);
    if (nameReg(state.ve_mobile.identity_name) && codeReg(state.ve_mobile.identity_code) && telReg(state.ve_mobile.mobile)) {
      let {identity_name, identity_code, mobile} = state.ve_mobile;
      commit('StepMolile', 1);
      axios.get(uri, {
        params: {
          user_id,
          group_id,
          apply_id: three_api._id,
          identity_name,
          identity_code,
          mobile
        }
      }).then(function (res) {
          let {data} = res;
          console.log(data);
          if (data) {
            /*一致*/
            if (data.data.code == '0') {
              commit('StepMolile', 2);
              /*不一致*/
            } else if (data.data.code == '1') {
              commit('StepMolile', 3);
            } else {
              commit('StepMolile', 4);
            }
          } else {
            commit('StepMolile', 4);
          }
        }
      ).catch(function (err) {
        axiosError(err);
        commit('StepMolile', 4);
      });
    }


  },
  /*
   * 身份证验证
   * 侯宇凡
   *  210104198709276167
   *  123555555555555555
   *  330282199411162817
   * */
  VeID({commit, state, rootState}) {
    let {two_api} = rootState.mutations.logininfo;
    let uri = two_api ? two_api.uri : null;
    if (!uri) {
      vue.$Message.error('您尚未开通该查询服务');
      return;
    }
    let user_id = rootState.mutations.MongoUsers._id;
    let group_id = new Date().getTime() + "" + Math.floor(Math.random() * 100000000000);
    if (nameReg(state.ve_id.identity_name) && codeReg(state.ve_id.identity_code)) {
      let {identity_name, identity_code} = state.ve_id;
      commit('StepID', 1);
      axios.get(uri, {
        params: {
          user_id,
          group_id,
          apply_id: two_api._id,
          identity_name,
          identity_code,
        }
      }).then(function (res) {
          let {data} = res;
          console.log(data);
          if (data) {
            /*一致*/
            if (data.data && data.data.code === '0') {
              commit('StepID', 2);
              /*不一致*/
            } else if (data.data && data.data.code === '1') {
              commit('StepID', 3);
            } else {
              commit('StepID', 4);
            }
          } else {
            commit('StepID', 4);
          }

        }
      ).catch(function (err) {
        axiosError(err);
        commit('StepID', 4);
      });
    }
  },
  /*
  * 居住位置核验
  * 马加恩
  * 330282199411162817
  * 18662166124  /5
  * */
  VePositionHome({commit, state, rootState}) {
    let {three_api} = rootState.mutations.logininfo;
    let uri = three_api ? three_api.uri : null;
    if (!uri) {
      vue.$Message.error('您尚未开通该查询服务');
      return;
    }
    let user_id = rootState.mutations.MongoUsers._id;
    let group_id = new Date().getTime() + "" + Math.floor(Math.random() * 100000000000);
    if (nameReg(state.ve_mobile.identity_name) && codeReg(state.ve_mobile.identity_code) && telReg(state.ve_mobile.mobile)) {
      let {identity_name, identity_code, mobile} = state.ve_mobile;
      commit('StepPositionHome', 1);
      axios.get(uri, {
        params: {
          user_id,
          group_id,
          apply_id: three_api._id,
          identity_name,
          identity_code,
          mobile
        }
      }).then(function (res) {
          let {data} = res;
          console.log(data);
          if (data) {
            /*一致*/
            if (data.data.code == '0') {
              commit('StepPositionHome', 2);
              /*不一致*/
            } else if (data.data.code == '1') {
              commit('StepPositionHome', 3);
            } else {
              commit('StepPositionHome', 4);
            }
          } else {
            commit('StepPositionHome', 4);
          }
        }
      ).catch(function (err) {
        console.log(err);
        commit('StepPositionHome', 4);
      });
    }


  },
  /*
  * 工作位置核验
  * 马加恩
  * 330282199411162817
  * 18662166124  /5
  * */
  VePositionWork({commit, state, rootState}) {
    let {three_api} = rootState.mutations.logininfo;
    let uri = three_api ? three_api.uri : null;
    if (!uri) {
      vue.$Message.error('您尚未开通该查询服务');
      return;
    }
    let user_id = rootState.mutations.MongoUsers._id;
    let group_id = new Date().getTime() + "" + Math.floor(Math.random() * 100000000000);
    if (nameReg(state.ve_mobile.identity_name) && codeReg(state.ve_mobile.identity_code) && telReg(state.ve_mobile.mobile)) {
      let {identity_name, identity_code, mobile} = state.ve_mobile;
      commit('StepPositionWork', 1);
      axios.get(uri, {
        params: {
          user_id,
          group_id,
          apply_id: three_api._id,
          identity_name,
          identity_code,
          mobile
        }
      }).then(function (res) {
          let {data} = res;
          console.log(data);
          if (data) {
            /*一致*/
            if (data.data.code == '0') {
              commit('StepPositionWork', 2);
              /*不一致*/
            } else if (data.data.code == '1') {
              commit('StepPositionWork', 3);
            } else {
              commit('StepPositionWork', 4);
            }
          } else {
            commit('StepPositionWork', 4);
          }
        }
      ).catch(function (err) {
        commit('StepPositionWork', 4);
      });
    }


  },
}

// mutations
const mutations = {
  StepCard(state, num) {
    state.ve_card.step = num;
  },
  StepMolile(state, num) {
    state.ve_mobile.step = num;
  },
  StepID(state, num) {
    state.ve_id.step = num;
  },
  StepPositionHome(state, num) {
    state.ve_positon_home.step = num;
  },
  StepPositionWork(state, num) {
    state.ve_positon_work.step = num;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
