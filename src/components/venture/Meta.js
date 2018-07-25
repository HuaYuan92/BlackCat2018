/*
* 如果后期表头不变，可以考虑提取更多的公共元素
* */
const entColumnBase = [
  {
    title: '企业名称',
    key: 'name',
    align: 'center',
  },
  {
    title: '统一社会信用代码',
    key: 'code',
    align: 'center',
    render: (h, params) => {
      const num = params.row.code ? params.row.code : '暂无';
      return h('div', num)
    },

  },
];
const perColumnBase= [
  {
    title: '姓名',
    key: 'name',
    align: 'center',
  },
  {
    title: '身份证号',
    key: 'code',
    align: 'center',
    render: (h, params) => {
      const num = params.row.code ? params.row.code : '暂无';
      return h('div', num)
    },

  },
];
/*
* 进行中/已完成
* */
let columns1 = [
  {
    title: '预警范围',
    key: 'date',
    align: 'center',
    render: (h, params) => {
      return h('div', params.row.date)
    },
  },
  {
    title: '扫描周期（天）',
    key: 'date',
    align: 'center',
    render: (h, params) => {
      return h('div', params.row.date)
    },
  },
  {
    title: '最近预警时间',
    key: 'date',
    align: 'center',
    render: (h, params) => {
      return h('div', params.row.date)
    },
  },
  {
    title: '风险等级',
    key: 'date',
    align: 'center',
    width: 100,
    render: (h, params) => {
      return h('div', params.row.date)
    },
  },
  {
    title: '预警数量',
    key: 'date',
    align: 'center',
    width: 100,
    render: (h, params) => {
      return h('div', params.row.date)
    },
  },
];
/*
* 已终止监控
* */
let columns3 = [
  {
    title: '预警范围',
    key: 'date',
    align: 'center',
    render: (h, params) => {
      return h('div', params.row.date)
    },
  },
  {
    title: '扫描周期（天）',
    key: 'date',
    align: 'center',
    render: (h, params) => {
      return h('div', params.row.date)
    },
  },
  {
    title: '终止时间',
    key: 'date',
    align: 'center',
    render: (h, params) => {
      return h('div', params.row.date)
    },
  },
  {
    title: '风险等级',
    key: 'date',
    align: 'center',
    width: 100,
    render: (h, params) => {
      return h('div', params.row.date)
    },
  },
  {
    title: '预警数量',
    key: 'date',
    align: 'center',
    width: 100,
    render: (h, params) => {
      return h('div', params.row.date)
    },
  },
];
export default {
  columnsEnt1:entColumnBase.concat(columns1),
  columnsEnt2:entColumnBase.concat(columns1),
  columnsEnt3:entColumnBase.concat(columns3),
  columnsPer1:perColumnBase.concat(columns1),
  columnsPer2:perColumnBase.concat(columns1),
  columnsPer3:perColumnBase.concat(columns3),
}
