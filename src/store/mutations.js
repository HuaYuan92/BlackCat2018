import * as types from './type'
import axios from 'axios'
import Vue from 'vue'
import Router from '../router/index'
import md5 from 'js-md5'
import util from '../lib/util'

const vue = new Vue();
//http请求返回代码200/403
const {axiosError, setCookie, getCookie, deleteCookie, batchData, entFilter, entNum, entClass, entInfo, codeValid, JRFilter} = util;
const nameReg = /^[\u4e00-\u9fa5]{1,10}[·.]{0,1}[\u4e00-\u9fa5]{1,10}$/i;
const telReg = /^1[0-9]{10}$/i;
// axios添加cookie
axios.defaults.withCredentials = true;
//判断用户登录状态
const loginIng = function (state) {
  if (!state.MongoUsers._id) {
    vue.$Message.error('您尚未登录 ');
    Router.push({path: '/login'});
    return true
  }
};
const state = {
  logininfo: {
    name: !!getCookie('user') ? JSON.parse(getCookie('user')).name : '',
    password: !!getCookie('user') ? JSON.parse(getCookie('user')).password : '',
    entname: '',
    newpsd: '',
    api: [],
    ent_api: null,
    two_api: null,
    three_api: null,
    four_api: null,
    balance: 0,
    consumption_params: {
      typelist: [
        {
          label: '全部',
          value: 2
        },
        {
          label: '企业',
          value: 1
        },
        {
          label: '个人',
          value: 0
        },
      ],
      type: 2,
      search_status: 2,
      data: []
    },
    consumption_table: {
      data: {},
      current: 1,
      sort: -1,
      totalPage: 1,
      table: []
    },
    update: {
      show: false,
      text: '升级中~~~~~~~',
      id: ''
    }
  },
  search: {
    keyword: '',
    personname: '',
    personcord: '',
    personphone: '',
    success: true,
    success_per: true,
    time: '1',
    search_type: 'name'
  },
  //已保存企业
  enttable: {
    data: {},
    keyword: '',
    current: 1,
    sort: -1,
    totalPage: 1,
    table: []
  },
  entresult: {
    frist: true,
    show: true,
    sum: {
      name: '',
      code: '',
    },
    entinfo: {},
    score_class: 'ring ring1',
    detail: {},
    data: {},
  },
  //已保存个人
  persontable: {
    data: {},
    keyword: '',
    current: 1,
    sort: -1,
    totalPage: 1,
    table: []
  },
  personresult: {
    frist: true,
    show: true,
    sum: {
      name: '',
      code: '',
      phone: ''
    },
    detail: {
      gaofashixin: "",
      duotoujiedai: "",
      fanzuixinxi: "",
      jinrongyuqi: "",
      jinrongyuqi_v2: "",
      fanzuixinxi_v2: ''
    }
  },
  t: {
    num0: "",
    num1: "",
    num2: "",
    num3: "",
    num4: ""
  },
  MongoUsers: {},
  applyinfo: {
    status: 0,
    trial: 0,
    group: []
  },
  img: {},
  //批量
  array: {
    person: {
      data: {},
      current: 1,
      sort: -1,
      totalPage: 1,
      table: []
    }
  },
  //忘记密码
  forgetinfo: {
    current: 0,
  }
};
//登录+获取授权接口
const userCheck = function (url) {
  console.log('登录......');
  let path = url ? url : '/companies';
  let password = md5(state.logininfo.password);
  axios.get("/api/v1/login", {
    params: {
      userName: state.logininfo.name,
      password: password,
      platform: 'hmc'
    }
  }).then(function (res) {
    let data = res.data;
    console.log('登录返回结果');
    console.log(data);
    vue.$Message.config({
      top: 50,
      duration: 3,
    });
    if (res.status == 201) {
      state.MongoUsers = data;
      vue.$Message.success('登录成功!');
      Router.push({path: '/companies'});
      console.log(path);
      axios.get("/api/v1/users/" + data._id + "/apis").then(function (res) {
        let arr = [];
        console.log('获取授权API返回结果');
        Router.push({path: path});
        console.log(res.data);
        let data = res.data;
      }).catch(function (err) {
        console.log(err);
      });
      setCookie('user', JSON.stringify(state.logininfo));
      state.logininfo.entname = data.company;

    } else {
      vue.$Message.error('登录失败!');
      deleteCookie('user');
      deleteCookie('balance');
      Router.push({path: '/login'});

    }
  }).catch(function (err) {
    deleteCookie('user');
    deleteCookie('balance');
    console.log(err.response);
    if (err.response.status == 400) {
      vue.$Message.error('账号或密码不正确');
    } else if (err.response.status == 503) {
      axiosError(err);
    } else {
      vue.$Message.error('网络请求错误!');
    }
  })
};
//根据url决定属性
const urlProp = function (url) {
  let str = '';
  switch (url) {
    case "/api/v1/api1":
      str = 'gaofashixin';
      break;
    case "/api/v1/api2":
      str = 'duotoujiedai';
      break;
    case "/api/v1/api3":
      str = 'fanzuixinxi';
      break;
    case "/api/v1/api4":
      str = 'jinrongyuqi';
      break;
    case "/api/v1/api15":
      str = 'jinrongyuqi_v2';
      break;
    case "/api/v1/api18":
      str = 'fanzuixinxi_v2';
      break;
  }
  return str
}
// 遍历api，查询个人数据库 等待用axios.all()优化
const apiPerson = function (api_arr, data) {
  //清空上一次查询结果
  state.personresult.detail = {
    gaofashixin: "",
    duotoujiedai: "",
    fanzuixinxi: "",
    jinrongyuqi: "",
    jinrongyuqi_v2: "",
    fanzuixinxi_v2: ""
  }

  let arr = api_arr;
  let params = data;
  let flag = false;
  let num = 0;
  for (let k in arr) {
    let url = arr[k].uri;
    let param = {...params};
    param.apply_id = arr[k]._id;
    axios.get(url,
      {
        params: param
      }).then(function (res) {
      num++;
      let data = res.data;
      console.log(data);
      if (data == 'OK' || data.length == 0 || JSON.stringify(data) == '{}' || (data.errorCode && data.errorCode != '200')) {
        data = '';
      }
      console.log('个人查询接口' + url + '返回结果');
      console.log(data);
      let str = urlProp(url);
      if (url == '/api/v1/api15') {
        state.personresult.detail[str] = data ? JRFilter(data) : "";
      } else {
        state.personresult.detail[str] = data ? data : "";
      }

      console.log(state.personresult.detail)

      //如果数据存在
      if (data) {
        flag = true;
        state.search.success_per = true;
        state.personresult.show = true;
        state.personresult.sum.name = state.search.personname;
        state.personresult.sum.code = state.search.personcord;
        state.personresult.sum.phone = state.search.personphone;
        Router.push({path: '/persondetail'});
      }
      if (num == arr.length) {
        if (!flag) {
          state.search.success_per = true;
          state.personresult.show = false;
        }
      }
    }).catch(function (res, err) {
      num++;
      console.log('查询失败');
      let str = urlProp(url);
      state.personresult.detail[str] = "";
      state.search.success_per = true;
      state.personresult.show = false;
      if (num == arr.length) {
        if (flag) {
          state.search.success_per = true;
          state.personresult.show = true;
          state.personresult.sum.name = state.search.personname;
          state.personresult.sum.code = state.search.personcord;
          state.personresult.sum.phone = state.search.personphone;
          Router.push({path: '/persondetail'});
        } else {
          state.search.success_per = true;
          state.personresult.show = false;
        }
      }
      console.log(res.response);
      if (res.response.status == 403 && res.response.data == '余额不足') {
        vue.$Message.error(res.response.data)
      }
    });

  }
};
// 个人查询
const personSearch = function () {
  if (state.logininfo.api.length == 0) {
    vue.$Message.error('您尚未开通个人查询服务');
    return
  }
  state.search.success_per = false;
  let groupId = new Date().getTime() + "" + Math.floor(Math.random() * 100000000000);
  let params = {
    identity_name: state.search.personname,
    identity_code: state.search.personcord,
    user_id: state.MongoUsers._id,
    mobile: !!state.search.personphone ? state.search.personphone : "",
    group_id: groupId
  };
  apiPerson(state.logininfo.api, params);
  console.log(state.personresult.detail);
};
//  企业查询
const entSearch = function (type) {
  let uri = state.logininfo.ent_api.uri ? state.logininfo.ent_api.uri : '';
  if (!uri) {
    vue.$Message.error('您尚未开通企业查询服务');
    return;
  }
  state.search.success = false;
  let groupId = new Date().getTime() + "" + Math.floor(Math.random() * 100000000000);
  let params = {
    user_id: state.MongoUsers._id,
    apply_id: state.logininfo.ent_api._id,
    group_id: groupId
  };
  if (type == 'name') {
    params.identity_name = state.search.keyword;
  } else if (type == 'code') {
    params.identity_code = state.search.keyword;
  }
  axios.get(uri, {
    params: params
  }).then(function (res) {
    console.log('查询企业返回结果');
    let msg = '';
    let data = res.data;
    console.log(data);
    if (data.message) {
      msg = data.message;
      vue.$Message.error(msg);
    }
    if (JSON.stringify(data) != '{}') {
      state.search.success = true;
      state.entresult.show = true;
      let ent_data = data.ent_info ? data.ent_info : {};
      let ent_detail = entFilter(data.data, state);
      state.entresult.sum.name = data.ent_name;
      state.entresult.sum.code = data.credit_no;
      state.entresult.detail = ent_detail;
      state.entresult.sum.num = entNum(ent_detail);
      state.entresult.entinfo = entInfo(data);
      state.entresult.data = data;
      state.entresult.score_class = entClass(data.ent_score);
      console.log(ent_data);
      Router.push({path: '/entdetail'});
    } else {
      state.search.success = true;
      state.entresult.show = false;
    }
  }).catch(function (err) {
    console.log(err);
    state.search.success = true;
    state.entresult.show = false;
    console.log(err.response);
    if (err.response.status == 403 && err.response.data == '余额不足') {
      vue.$Message.error(err.response.data)
    } else {
      axiosError(err);
    }
  });
};
//  拉取保存名单处理
const holdFilter = function (data) {
  let arr = [];
  for (let i in data) {
    if (data[i].query_type == 0) {
      let item = JSON.parse(data[i].query);
      let time = data[i].created;
      let _id = data[i]._id;
      let save_time = new Date(time).getFullYear() + '-' + (new Date(time).getMonth() + 1) + '-' + new Date(time).getDate();
      let param = {
        name: item.identity_name,
        code: item.identity_code,
        mobile: item.mobile ? item.mobile : '',
        date: save_time,
        query_type: data[i].query_type,
        _id: _id,
        query: data[i].query
      };
      arr.push(param)
    } else {
      let item = JSON.parse(data[i].data);
      let time = data[i].created;
      let _id = data[i]._id;
      let save_time = new Date(time).getFullYear() + '-' + (new Date(time).getMonth() + 1) + '-' + new Date(time).getDate();
      let param = {
        name: item.ent_name,
        code: item.credit_no,
        date: save_time,
        query_type: data[i].query_type,
        _id: _id,
        query: data[i].query
      };
      arr.push(param)
    }
  }
  console.log(arr);
  return arr;
};
//  拉取已保存名单
const fetchHold = function (type) {
  if (type == 'ent') {
    let offset = (state.enttable.current - 1) * 10;
    axios.get('/api/v1/users/' + state.MongoUsers._id + '/saved_queries', {
      params: {
        offset: offset,
        limit: 10,
        sort: state.enttable.sort,
        charKey: state.enttable.keyword,
        query_type: 1
      }
    }).then(function (res) {
      let data = res.data;
      console.log('拉取已保存企业名单结果');
      console.log(data);
      state.enttable.data = data;
      state.enttable.totalPage = data.totalPage;
      state.enttable.table = holdFilter(data.rows);
    }).catch(function (err) {
      axiosError(err);
      console.log(err);
    });
  } else if (type == 'person') {
    let offset = (state.persontable.current - 1) * 10;
    axios.get('/api/v1/users/' + state.MongoUsers._id + '/saved_queries', {
      params: {
        offset: offset,
        limit: 10,
        sort: state.persontable.sort,
        charKey: state.persontable.keyword,
        query_type: 0
      }
    }).then(function (res) {
      let data = res.data;
      console.log('拉取已保存个人名单');
      console.log(data);
      state.persontable.data = data;
      state.persontable.totalPage = data.totalPage;
      state.persontable.table = holdFilter(data.rows);
    }).catch(function (err) {
      axiosError(err);
      console.log(err);
    });
  }
};
//  拉取消费详情
const fetchList = function () {
  let start_date = state.logininfo.consumption_params.data[0] ? Date.parse(state.logininfo.consumption_params.data[0]) : Date.parse(new Date('2017-01-01'));
  let end_date = state.logininfo.consumption_params.data[1] ? Date.parse(state.logininfo.consumption_params.data[1]) : Date.parse(new Date());
  let offset = (state.logininfo.consumption_table.current - 1) * 10;
  axios.get('/api/v1/users/' + state.MongoUsers._id + '/consumptions', {
    params: {
      offset: offset,
      limit: 10,
      sort: state.logininfo.consumption_table.sort,
      query_type: state.logininfo.consumption_params.type,
      query_status: state.logininfo.consumption_params.search_status,
      start_date: start_date,
      end_date: end_date,
      platform: 'hmc'
    }
  }).then(function (res) {
    let data = res.data;
    console.log('拉取消费详单');
    console.log(data);
    state.logininfo.consumption_table.data = data;
    state.logininfo.consumption_table.totalPage = data.totalPage;
    state.logininfo.consumption_table.table = data.rows;
  }).catch(function (err) {
    axiosError(err, 'fetchList');
    console.log(err.response);
    state.logininfo.consumption_table.data = {};
    state.logininfo.consumption_table.totalPage = 0;
    state.logininfo.consumption_table.table = [];
  });
};
//  拉取个人批量下载列表
const batchLsit = function () {
  let offset = (state.array.person.current - 1) * 10;
  axios.get('/api/v1/uploads/' + state.MongoUsers._id + '/batch_logs', {
    params: {
      offset: offset,
      limit: 10,
      sort: state.array.person.sort,
      query_type: 0,
    }
  }).then(function (res) {
    let data = res.data;
    // console.log('batch');
    // console.log(data);
    state.array.person.data = data;
    state.array.person.totalPage = data.totalPage;
    state.array.person.table = batchData(data.rows, 'person', state);

  }).catch(function (err) {
    console.log(1231231);
    axiosError(err);
    console.log(err.response);
    state.array.person.data = {};
    state.array.person.totalPage = 0;
    state.array.person.table = [];
  });
}
//  发送邮件
const email = function () {
  if (!state.forgetinfo.email) {
    vue.$Message.error('信息丢失，请重新填写');
    Router.push({path: '/forget/step1'});
    return
  }
  console.log('send email');
  axios.get('/api/v1/users/auth/' + state.forgetinfo.email, {
    params: {
      type: 0
    }
  }).then(function (res) {
    let data = res.data;
    console.log(data);
    if (data.result) {
      vue.$Message.success('发送成功');
    } else {
      vue.$Message.error('发送失败');
    }
  }).catch(function (err) {
    console.log(err.response);
    axiosError(err);
  });
}
// 无状态不跳转登录
const noneUser = ['/register', '/forget', '/forget/step1', '/forget/step2', '/forget/step3', '/forget/step4'];
const mutations = {
  // 登录
  [types.LOGIN_CHECK](state) {
    userCheck();
  },
  [types.Read_Local](state) {
    let path = location.pathname + location.search;
    console.log(path);
    if (noneUser.indexOf(path) != -1) {
      return
    }
    if (state.logininfo.name && state.logininfo.password) {
      userCheck(path);
    } else {
      Router.push({path: '/login'});
    }
  },
  // 查询企业
  [types.Search_Name](state) {
    if (loginIng(state)) {
      return
    }
    state.search.search_type = 'name';
    state.search.keyword = state.search.keyword.trim();
    if (!state.search.keyword) {
      vue.$Message.error('请输入公司名称 ');
      return
    }
    state.entresult.frist = false;
    entSearch('name');
  },
  [types.Search_Code](state) {
    if (loginIng(state)) {
      return
    }
    state.search.search_type = 'code';
    state.search.keyword = state.search.keyword.trim();
    if (!state.search.keyword) {
      vue.$Message.error('请输入公司统一社会信用代码');
      return
    }
    state.entresult.frist = false;
    entSearch('code');
  },
  // 查询个人
  [types.Search_Person](state) {
    if (loginIng(state)) {
      return
    }
    state.search.personname = state.search.personname.trim();
    state.search.personcord = state.search.personcord.trim();
    state.search.personphone = state.search.personphone.trim();
    if (!state.search.personname || !state.search.personcord) {
      vue.$Message.error('请补全搜索信息!');
      return
    }
    if (!nameReg.test(state.search.personname)) {
      vue.$Message.error('姓名格式不正确!');
      return
    }
    if (state.search.personcord && state.search.personcord.length != 18) {
      vue.$Message.error('身份证位数错误');
      return
    }
    let codeReg = codeValid(state.search.personcord);
    if (!codeReg) {
      vue.$Message.error('身份证格式错误');
      return
    }
    if (state.search.personphone && state.search.personphone.length != 11) {
      vue.$Message.error('手机号应为11位');
      return
    }
    if (state.search.personphone && !telReg.test(state.search.personphone)) {
      vue.$Message.error('手机号格式不正确!');
      return
    }
    state.personresult.frist = false;
    personSearch();
  },
  // 统计数据
  [types.Select_Time](state) {
    if (loginIng(state)) {
      return
    }
    let user_id = state.MongoUsers._id;
    console.log('统计数据params');
    console.log(user_id);
    axios.get('/api/v1/users/statistics', {
      params: {
        user_id: user_id
      }
    }).then(function (res) {
        console.log('统计数据返回数据');
        console.log(res.data);
        let data = res.data;
        if (data.code == '201') {
          let info = data.detail;
          state.t.num0 = info.company_total;
          state.t.num1 = info.company_hit;
          state.t.num2 = info.person_total;
          state.t.num3 = info.person_hit;
          state.t.num4 = info.total;
        } else {
          state.t.num0 = 0;
          state.t.num1 = 0;
          state.t.num2 = 0;
          state.t.num3 = 0;
          state.t.num4 = 0;
        }
      }
    ).catch(function (err) {
      axiosError(err);
      console.log(err);
    });
  },
  // 修改密码
  [types.User_Change](state) {
    if (loginIng(state)) {
      return
    }
    let psd = md5(state.logininfo.newpsd);
    axios.put('/api/v1/users/' + state.MongoUsers._id, {
      password: psd,
      platform: 'hmc'
    }).then(function (res) {
      console.log('修改密码返回数据');
      console.log(res.data);
      let data = res.data;
      if (data.msg == '密码修改成功') {
        vue.$Message.success('密码修改成功');
        setTimeout(function () {
          deleteCookie('user');
          deleteCookie('balance');
          window.location.reload()
        }, 2000)
      } else {
        vue.$Message.error('修改失败');
      }
    }).catch(function (err) {
      console.log(err);
      axiosError(err);
    })
  },
  //拉取已保存
  [types.Hold_Fetch_Ent](state) {
    if (loginIng(state)) {
      return
    }
    fetchHold('ent');
  },
  [types.Hold_Fetch_Person](state) {
    if (loginIng(state)) {
      return
    }
    fetchHold('person');
  },
  //登出
  [types.Quit](state) {
    console.log(JSON.parse(getCookie('user')));
    console.log(333);
    deleteCookie('user');
    setCookie('user', JSON.stringify({name: state.logininfo.name, password: ''}));
    console.log(JSON.parse(getCookie('user')));
    deleteCookie('balance');
    window.location.reload();
  },
  Hold_Search(state, type) {
    if (loginIng(state)) {
      return
    }
    if (type == 'ent') {
      state.enttable.current = 1;
      fetchHold('ent');
    } else {
      state.persontable.current = 1;
      fetchHold('person');
    }
  },
  //保存接口
  hold(state, type) {
    if (loginIng(state)) {
      return
    }
    if (type == 'ent') {
      //企业保存
      if (!state.entresult.sum.name) {
        vue.$Message.error('数据丢失');
        return
      }
      let params = {
        identity_name: state.entresult.sum.name,
        identity_code: state.entresult.sum.code,
      };
      axios.post('/api/v1/users/' + state.MongoUsers._id + '/saved_queries', {
        data: state.entresult.data,
        query: params,
        query_type: 1
      }).then(function (res) {
        console.log('企业保存返回数据');
        console.log(res.data);
        if (res.data) {
          vue.$Message.success('保存成功');
        } else {
          vue.$Message.error('保存失败');
        }
      }).catch(function (err) {
        axiosError(err, 'hold');
      })
    } else {
      //个人保存
      if (!state.personresult.sum.name) {
        vue.$Message.error('数据丢失');
        return
      }
      let params = {
        identity_name: state.personresult.sum.name,
        identity_code: state.personresult.sum.code,
        mobile: state.personresult.sum.phone,
      };
      axios.post('/api/v1/users/' + state.MongoUsers._id + '/saved_queries', {
        data: state.personresult.detail,
        query: params,
        query_type: 0
      }).then(function (res) {
        console.log('个人保存返回数据');
        console.log(res.data);
        if (res.data) {
          vue.$Message.success('保存成功');
        } else {
          vue.$Message.error('保存失败');
        }
      }).catch(function (err) {
        axiosError(err, 'hold');
      })
    }
  },
  //查看详情
  toDetail(state, params) {
    if (loginIng(state)) {
      return
    }
    console.log('已保存查看详情接口参数');
    console.log(params);
    if (params.type == 'ent') {
      //企业查看详情
      axios.get('/api/v1/users/' + state.MongoUsers._id + '/saved_queries/' + params.query + '/' + params.query_type).then(function (res) {
        console.log('企业保存查看详情结果');
        let data = res.data.data ? JSON.parse(res.data.data) : '';
        console.log(data);
        //function
        if (data) {
          let ent_detail = entFilter(data.data, state);
          state.entresult.sum.name = data.ent_name;
          state.entresult.sum.code = data.credit_no;
          state.entresult.detail = ent_detail;
          state.entresult.sum.num = entNum(ent_detail);
          state.entresult.entinfo = entInfo(data);
          state.entresult.data = data;
          state.entresult.score_class = entClass(data.ent_score);
          Router.push({path: '/entdetail', query: {hold: 1}});
        } else {
          vue.$Message.error('拉取失败');
        }
      }).catch(function (err) {
        axiosError(err);
        console.log(err);
      });
    } else {
      //个人查看详情
      axios.get('/api/v1/users/' + state.MongoUsers._id + '/saved_queries/' + params.query + '/' + params.query_type).then(function (res) {
        console.log('个人保存查看详情结果');
        console.log(res.data);
        if (res.data) {
          let query = JSON.parse(res.data.query) ? JSON.parse(res.data.query) : {};
          state.personresult.sum.name = query.identity_name;
          state.personresult.sum.code = query.identity_code;
          state.personresult.sum.phone = query.mobile ? query.mobile : '- -';
          state.personresult.detail = JSON.parse(res.data.data);
          Router.push({path: '/persondetail', query: {hold: 1}});
        } else {
          vue.$Message.error('拉取失败');
        }

      }).catch(function (err) {
        axiosError(err);
        console.log(err);
      })
    }
    ;
  },
  //删除已保存名单
  remove(state, params) {
    if (loginIng(state)) {
      return
    }
    console.log(params);
    let arr = [];
    for (let i = 0; i < params.params.length; i++) {
      arr.push(params.params[i]._id)
    }
    console.log('删除已保存参数');
    console.log(arr);
    if (params.type == 'ent') {
      axios.delete('/api/v1/users/' + state.MongoUsers._id + '/saved_queries', {params: arr}).then(function (res) {
        console.log('企业删除已保存返回结果');
        console.log(res.data);
        if (res.data) {
          vue.$Message.success('删除成功!');
          fetchHold('ent');
        } else {
          vue.$Message.error('删除失败!');
        }
      }).catch(function (err) {
        axiosError(err);
        console.log(err);
      });
    } else {
      axios.delete('/api/v1/users/' + state.MongoUsers._id + '/saved_queries', {params: arr}).then(function (res) {
        console.log('个人删除已保存');
        console.log(res.data);
        if (res.data) {
          vue.$Message.success('删除成功!');
          fetchHold('person');
        } else {
          vue.$Message.error('删除失败!');
        }
      }).catch(function (err) {
        axiosError(err);
        console.log(err);
      });
    }
  },
  //拉取消费明细
  fetchList(state) {
    if (loginIng(state)) {
      return
    }
    state.logininfo.consumption_table.current = 1;
    fetchList();
  },
  page(state, params) {
    if (loginIng(state)) {
      return
    }
    console.log('翻页接口参数');
    console.log(params);
    if (params.type == 'ent') {
      state.enttable.current = params.index;
      fetchHold('ent');
    } else if (params.type == 'person') {
      state.persontable.current = params.index;
      fetchHold('person');
    } else if (params.type == 'consum') {
      state.logininfo.consumption_table.current = params.index;
      fetchList();
    } else if (params.type == 'batch') {
      state.array.person.current = params.index;
      batchLsit();
    }
  },
  sort(state, params) {
    if (loginIng(state)) {
      return
    }
    console.log('排序接口参数');
    console.log(params);
    if (params.type == 'ent') {
      state.enttable.sort = params.sort;
      fetchHold('ent');
    } else if (params.type == 'person') {
      state.persontable.sort = params.sort;
      fetchHold('person');
    } else if (params.type == 'consum') {
      state.logininfo.consumption_table.sort = params.sort;
      fetchList();
    }
  },
  status(state, params) {
    if (loginIng(state)) {
      return
    }
    state.logininfo.consumption_params.search_status = params;
    fetchList();
  },
  //消费列表下载
  consumDownload(state) {
    if (loginIng(state)) {
      return
    }
    let start_date = state.logininfo.consumption_params.data[0] ? Date.parse(state.logininfo.consumption_params.data[0]) : Date.parse(new Date('2017-01-01'));
    let end_date = state.logininfo.consumption_params.data[1] ? Date.parse(state.logininfo.consumption_params.data[1]) : Date.parse(new Date());
    axios.get('/api/v1/transformed/pdf', {
      params: {
        user_id: state.MongoUsers._id,
        time: Date.parse(new Date()),
        query_type: state.logininfo.consumption_params.type,
        start_date: start_date,
        end_date: end_date,
      }
    }).then(function (res) {
      let data = res.data;
      console.log('excel下载');
      console.log(data);
      window.open(data.url);
    }).catch(function (err) {
      axiosError(err);
      console.log(err);
    });
  },
  //申请试用-图片验证码
  imgcode(state) {
    axios.get('/api/v1/svg').then(function (res) {
      state.img = res.data;
    }).catch(function (err) {
      axiosError(err);
      console.log(err);
    });
  },
  //申请试用-短信验证码
  telcode(state) {
    console.log('短信验证码');
    axios.get('/api/v1/sms/' + state.applyinfo.mobile, {
      params: {
        code: state.applyinfo.imgcode,
        created: Date.parse(new Date())
      }
    }).then(function (res) {
      if (res.status == 201) {
        vue.$Message.success('发送成功');
      }
    }).catch(function (err) {
      try {
        axiosError(err, 'telcode');
        state.applyinfo.flag = true;
      } catch (err) {
        vue.$Message.error('网络请求错误');
        state.applyinfo.flag = true;
      }
      state.applyinfo.flag = true;
      console.log(err.response);
    });
  },
  //申请试用
  apply(state) {
    console.log('试用参数');
    console.log(state.applyinfo);
    axios.post('/api/v1/users/' + state.applyinfo.telcode, state.applyinfo
    ).then(function (res) {
      if (res.status == 201) {
        vue.$Message.success('提交成功，我们会尽快审核');
        setTimeout(function () {
          Router.push({path: '/login'});
          window.location.reload();
        }, 2000)
      }
    }).catch(function (err) {
      axiosError(err, 'apply');
      console.log(err);
    });
  },
  //批量查询-上传
  upload(state, data) {
    if (loginIng(state)) {
      return
    }
    console.log(data);
    let batch_id = new Date().getTime() + "" + Math.floor(Math.random() * 100000000000);
    axios.post('/api/v1/uploads/' + state.MongoUsers._id + '/batch_queries/0',
      {
        batch_id: batch_id,
        file: data,
        user_id: state.MongoUsers._id,
        apis: state.logininfo.api
      }
    ).then(function (res) {
      if (res.status == 200) {
        vue.$Message.success('上传成功!');
      }
    }).catch(function (err) {
      axiosError(err, 'upload');
      console.log(err);
    });
  },
  excelDownload(state, uri) {
    window.open(uri)
  },
  //获取客户标签
  userGroup(state) {
    axios.get('/api/v1/user_group').then(function (res) {
      console.log(res.data);
      if (res.status == 201) {
        state.applyinfo.group = res.data;
      } else {
        state.applyinfo.group = [];
      }
    }).catch(function (err) {
      state.applyinfo.group = [];
      console.log(err.response);
    });
  },
  //批量查询-下载列表
  batchLsit(state) {
    if (loginIng(state)) {
      return
    }
    batchLsit();
  },
  //跳转到登录页
  toLogin(state) {
    Router.push({path: '/login'});
  },
  //重置密码
  step(state, num) {
    state.forgetinfo.current = num;
  },
  resetPassword(state, num) {
    if (num == 0) {
      // 提交验证码
      axios.get('/api/v1/users/codes/' + state.forgetinfo.imgcode).then(function (res) {
        console.log(res.status);
        if (res.status == 200) {
          Router.push({path: '/forget/step2'});
          email();
        }
      }).catch(function (err) {
        axiosError(err, 'telcode')
      });
    } else if (num == 1) {

    } else if (num == 2) {
      // 重置密码
      let password = md5(state.forgetinfo.password);
      axios.put('/api/v1/users/reset/' + state.forgetinfo.email,
        {
          secret: state.forgetinfo.secret,
          password: password,
          platform: 'hmc'
        }).then(function (res) {
        console.log(res.status);
        if (res.status == 200) {
          Router.push({path: '/forget/step4'});
          setTimeout(function () {
            Router.push({path: '/login'});
          }, 2000);
        }
      }).catch(function (err) {
        axiosError(err, 'telcode')
      });

    }
  },
  //发送邮件
  email(state) {
    email();
  },
  //升级提示
  update(state) {
    let timestamp = Date.parse(new Date());
    axios.get('/api/v1/version/upgrade?',
      {
        params: {
          timestamp: timestamp,
          target: 'web端用户',
        }
      }
    ).then(function (res) {
      let data = res.data;
      if (res.status == 200) {
        if (data.code == 200) {
          let id = getCookie('update') ? getCookie('update') : '';
          if (id != data.row._id) {
            state.logininfo.update.show = true;
            state.logininfo.update.text = data.row.content;
            state.logininfo.update.id = data.row._id;
          }
        } else {
          state.logininfo.update.show = false;
        }
      }
    }).catch(function (err) {
      state.logininfo.update.show = false;
    });
  },
  //关闭升级提示
  updateClose(state) {
    setCookie('update', state.logininfo.update.id);
    state.logininfo.update.show = false;
  }
};
const getters = {
  img: state => state.img,
  logininfo: state => state.logininfo,
  search: state => state.search,
  enttable: state => state.enttable,
  entresult: state => state.entresult,
  persontable: state => state.persontable,
  personresult: state => state.personresult,
  t: state => state.t,
  MongoUsers: state => state.MongoUsers,
  applyinfo: state => state.applyinfo,
  array: state => state.array,
  forgetinfo: state => state.forgetinfo
};
export default {
  state,
  mutations,
  getters
}
