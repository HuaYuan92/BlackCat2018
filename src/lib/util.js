import Vue from 'vue'
import Router from '../router/index'
import UtilJson from "../lib/util.json"
const ent_type = UtilJson["ent_type"];
const vue = new Vue();
// 公共类函数
let util = {
  openModal: (content) => {
    let modal = document.createElement('div')
    modal.id = 'httpModal'
    modal.innerHTML = '<i class=\'ivu-icon ivu-icon-close-circled\' style=\'color: #eb4449\'></i><span style=\'padding-left:12px\'>' + content + '</span>'
    document.body.appendChild(modal)
    setTimeout(function () {
      document.body.removeChild(modal)
    }, 1500)
  },
  //http请求返回代码200/403
  axiosError: (err, type) => {
    console.log(type);
    console.log(err.response);
    let axiosStatus = err.response.status ? err.response.status : 0;
    let str = '';
    switch (axiosStatus) {
      case 503:
        str = '系统正在升级，请稍后';
        break;
      case 400:
        str = '参数有误';
        break;
      case 0:
        str = '';
        break;
      default:
        str = '网络请求错误';
    }
    if (type == 'hold' && axiosStatus == 403) {
      str = '保存失败,该记录可能已保存';
    }
    if (type == 'telcode' || type == 'apply') {
      if (axiosStatus == 400 || axiosStatus == 500) {
        str = err.response.data;
      }
    }
    if (type == 'fetchList' && axiosStatus == 400) {
      str = '';
    }
    if (type == 'upload' && axiosStatus == 403) {
      str = '余额不足';
    }
    if (str != '') {
      vue.$Message.error(str);
    }
  },
  //COOKIE
  setCookie: (name, value) => {
    let Days = 30;
    let exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  },
  getCookie: (name) => {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  },
  deleteCookie: (name) => {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = util.getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  },
  //余额显示处理,两位小数
  parseTwo: (num) => {
    let n = parseFloat(num);
    if (isNaN(n)) {
      return 0
    }
    let u = Math.round(num * 100) / 100;
    let s = u.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0'
    }
    return s
  },
  //批量查询-下载-数据处理
  batchData: (data, type, state) => {
    let lengthApi;
    if (type == "person") {
      lengthApi = state.logininfo.api.length;
    } else {
      lengthApi = 1;
    }
    for (let i in data) {
      data[i].lengthApi = lengthApi;
      let finished = data[i].finished / data[i].total;
      data[i].finished = util.parseTwo(finished);
    }
    ;
    // console.log(data);
    return data;
  },
  //企业详情过滤
  entFilter: (data, state) => {
    let params = data;
    let arr = {};
    for (let i in params) {
      let flag = false;
      let param1 = params[i]
      for (let n in param1) {
        let param2 = param1[n];
        for (let d in param2) {
          let param3 = param2[d];
          for (let e in param3) {
            if ((typeof param3[e] == 'string') && !!param3[e] && (param3[e].trim()) != '') {
              flag = true;
            }
          }
        }
        ;
        if (n == 'cu' || n == 'dp' || n == 'qb') {
          arr[n] = param2[0].create_date ? param2[0].create_date : '';
          param2 = [];
        }
      }
      params[i].flag = flag;
    }
    ;
    state.entresult.cu = arr.cu;
    state.entresult.dp = arr.dp;
    state.entresult.qb = arr.qb;
    console.log(state.entresult);
    return params
  },
  //企业标签数
  entNum: (data) => {
    let obj = {};
    for (let i in data) {
      if (data[i].flag) {
        for (let n in data[i]) {
          if (n != 'flag') {
            if (n == 'cu' || n == 'dp' || n == 'qb') {
              obj[n] = 1;
            } else {
              obj[n] = data[i][n].length;
            }
          }
        }
      }
    }
    console.log(obj);
    return obj;
  },
  //企业基本信息
  entInfo: (data) => {
    let obj = {...data.ent_info};
    obj.ent_name = data.ent_name;
    obj.credit_no = data.credit_no;
    obj.reg_no = data.reg_no;
    obj.org_no = data.org_no;
    obj.reg_time = obj.reg_time ? obj.reg_time.slice(0, 10).replace(/\//g, "-") : null;
    obj.valid_time = obj.valid_time ? obj.valid_time.slice(0, 10).replace(/\//g, "-") : null;
    obj.rev_date = obj.rev_date ? obj.rev_date.slice(0, 10).replace(/\//g, "-") : null;
    obj.ent_type = obj.ent_type ? ent_type[obj.ent_type] : null;
    console.log(obj);
    return obj
  },
  //企业得分显示
  entClass: (data) => {
    let num = Math.ceil((Math.abs(data)) / 10);
    return `ring ring${num}`;
  },
  // 身份证格式校验
  codeValid: (code) => {
    code = code.toString().toUpperCase();
    const city = {
      11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林",
      23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西",
      37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南",
      50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ",
      61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 "
    };
    let tip = "";
    let pass = true;
    if (!code || !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/i.test(code)) {
      tip = "身份证号格式错误";
      pass = false;
    }
    else if (!city[code.substr(0, 2)]) {
      tip = "地址编码错误";
      pass = false;
    }
    else {
      //18位身份证需要验证最后一位校验位
      if (code.length == 18) {
        code = code.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        let [sum, ai, wi] = [0, 0, 0];
        for (let i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        if (parity[sum % 11] != code[17]) {
          tip = "校验位错误";
          pass = false;
        }
      }
    }
    if (!pass) console.log(tip);
    return pass;
  },
  codeReg: (code) => {
    if (code.length != 18) {
      vue.$Message.error('身份证位数错误');
      return false
    }
    if (!util.codeValid(code)) {
      vue.$Message.error('身份证格式错误');
      return false
    } else {
      return true
    }
  },
  nameReg: (code) => {
    let name = /^[\u4e00-\u9fa5]{1,10}[·.]{0,1}[\u4e00-\u9fa5]{1,10}$/i;
    let pass = false;
    if (name.test(code)) {
      pass = true;
    } else {
      vue.$Message.error('姓名格式不正确!')
    }
    return pass

  },
  telReg: (code) => {
    if (code.length != 11) {
      vue.$Message.error('手机号应为11位');
      return false
    }
    let tel = /^1[0-9]{10}$/i;
    let pass = false;
    if (tel.test(code)) {
      pass = true;
    } else {
      vue.$Message.error('手机号格式不正确!');
    }
    return pass
  },
  cardReg: (code) => {
    if (code.length < 13 || code.length > 19) {
      vue.$Message.error('银行卡位数错误!');
      return false
    }
    if (/^[0-9]*$/.test(code)) {
      return true
    } else {
      vue.$Message.error('银行卡格式错误!');
      return false
    }
  },
  JRFilter: (data) => {
    let obj = {
      hasYQ: false,
      hasQZ: false,
      YQ: [],
      QZ: [],
    };
    let arr = data.blackSummary;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].itemValue) {
        if (arr[i].blackType == '逾期') {
          obj.hasYQ = true;
          obj.YQ.push(arr[i]);
        }
        if (arr[i].blackType == '欺诈') {
          obj.hasQZ = true;
          obj.QZ.push(arr[i]);
        }
      }
    }
    return obj
  },

};
export default util
