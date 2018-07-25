let Meta = {
  ent_info: {
    ent_name: "企业名称",
    credit_no: "统一社会信用代码",
    reg_no: "工商注册号",
    org_no: "组织机构代码",
    tax_code: "税务码",
    reg_time: "成立日期",
    auth_date: "经营期限起始时间",
    op_to: "经营期限截止时间",
    valid_time: "有效时间",
    ent_status: "企业状态",
    reg_capital: "主体归属地",
    ent_type: "企业类型",
    legal_man: "法人代表",
    reg_address: "注册地址",
    reg_org: "登记机关",
    appr_date: "核准日期",
    can_date: "吊销日期",
    rev_date: "注销日期",
  },
  title: {
    sp: "高法失信被执行人",
    ag: "农业领域行政处罚",
    cb: "银监会行政处罚",
    ci: "保监会行政处罚",
    cm: "建筑市场违法欺骗",
    cs: "证监会处罚",
    cu: "海关失信企业",
    dp: "发展改革委受惩黑名单",
    fm: "食药监局黑名单",
    gp: "政府采购失信",
    mt: "重大税收违法",
    oe: "企业异常名录",
    qb: "质量黑名单",
    sb: "安全生产黑名单",
    tr: "旅游不良信息",
    ta: "欠税公告",
    ap: "政府类行政处罚",
    ja: "司法拍卖",
    cf: "开庭公告",
    ws: "企业涉诉"
  },
  content: {
    sp: {
      court: "执行法院",
      province: "省份",
      case_date: "立案时间",
      case_no: "案号",
      obligation: "生效法律文书确定的义务",
      status: "被执行人的履行情况",
      memo: "失信被执行人行为具体情形",
      pub_date: "发布时间"
    },
    ag: {
      case_no: "案件编号",
      case_name: "案件名称",
      pun_type: "处罚类型",
      illegal_entity: "违法主体",
      pun_date: "处罚生效日期",
      pun_org: "处罚机构",
      pun_dept: "处罚部门",
      pun_reason: "处罚原因",
      pun_by: "处罚依据",
      pun_result: "处罚结果"
    },
    cb: {
      case_no: "文书编号",
      org_level: "机构等级",
      case_fact: "违法主体",
      pun_date: "处罚生效日期",
      law_item: "处罚依据",
      decision: "处罚结果",
      pun_org: "处罚机构"
    },
    ci: {
      case_no: "文书编号",
      pub_date: "发布时间",
      org_level: "机构等级",
      content: "处罚内容"
    },
    cm: {
      pun_date: "处罚决定日期",
      pun_reason: "处罚原因",
      pun_content: "处罚内容",
      pun_org: "执法部门",
      case_no: "处罚文书号码",
      effective_date: "有效日期"
    },
    cs: {
      case_no: "文书编号",
      pun_date: "处罚日期",
      pun_org: "执法部门",
      org_level: "机构等级",
      pun_type: "处罚类型",
      pun_content: "处罚内容"
    },
    cu: {},
    dp: {},
    fm: {
      medicine_certno: "医药生产许可证",
      check_reason: "检查原因",
      check_org: "查询机构",
      pub_date: "发布时间",
      pub_mode: "处罚形式",
      problem: "发现的问题",
      operation: "处罚措施"
    },
    gp: {
      pun_content: "处罚原因",
      pun_result: "处罚结果",
      pun_by: "处罚依据",
      pun_date: "处罚日期",
      gist_unit: "处罚单位"
    },
    mt: {
      pun_type: "处罚类型",
      pun_content: "主要违法事实"
    },
    oe: {
      pun_org: "处罚机构",
      report_year: "处罚年份",
      pun_date: "处罚日期",
      pun_reason: "处罚原因",
      case_no: "处罚文号"
    },
    qb: {},
    sb: {
      pun_date: "处罚日期",
      death_num: "死亡和失踪人数",
      acc_content: "事故简要说明",
      info_source: "信息来源"
    },
    tr: {
      permit_no: "许可证编号",
      pun_reason: "处罚依据原因",
      pun_content: "处罚内容",
      pun_by: "处罚依据",
      start_time: "开始时间",
      end_time: "结束时间",
      description: "描述"
    },
    ap: {
      case_no: "决定书文号",
      punish_name: "处罚名称",
      punish_type2: "处罚类别",
      punish_type1: "处罚类别",
      punish_result: "处罚结果",
      punish_reason: "处罚事由",
      law_item: "处罚依据",
      punish_agent: "处罚机构",
      punish_date: "处罚决定日期",
      offical_updtime: "数据更新日期",
    },
    ta: {
      tax_type: "欠税税种",
      tax_balance: "欠税余额",
      pub_date: "欠税日期"
    },
    ja: {
      title:"拍卖标题",
      court_name:"处置法院",
      court_date:"公告日期",
      content:"公告内容",
    },
    cf: {
      case: "案件标题",
      act_card: "案号",
      act_cause: "案由",
      act_type: "案件类型",
      alltake_name: "承办部门",
      court_date: "开庭时间",
      court_name: "法院名称",
      courtroom_name: "法庭名称",
      plai_name: "原告",
      defe_name: "被告",
      judge_name: "庭审人员",

    },
    ws: {
      caseName:"案件名称",
      caseType:"案件类型",
      trialProcedure:"审理程序",
      judgementDate:"裁判日期",
      caseID:"案号",
      courtName:"审理法院",
    }
  }
};
export default Meta
