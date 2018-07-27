<template>
  <div class="register-step1">
    <div class="tip">
      <i class="el-icon-warning"></i>
      <span>选择您感兴趣的产品，至少选择一项</span>
    </div>
    <el-checkbox-group v-model="registerInfo.apiList">
      <div class="checkbox-title">个人产品</div>
      <div class="checkbox-item" v-for="i of arr1">
        <el-checkbox :label="i.value" :key="i.value">
          {{i.tip}}
        </el-checkbox>
      </div>
      <div class="checkbox-title">企业产品</div>
      <div class="checkbox-item" v-for="i of arr2">
        <el-checkbox :label="i.value" :key="i.value">
          {{i.tip}}
        </el-checkbox>
      </div>
    </el-checkbox-group>
    <div class="btn">
      <el-button type="primary" :disabled="disabled" @click="callback()">
        下一步
      </el-button>
    </div>

  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "step1",
    props:['callback'],
    data: function () {
      return {
        arr1: [
          {
            tip: '高法失信被执行人',
            value: 1
          }, {
            tip: '犯罪不良信息核查',
            value: 2
          }, {
            tip: '个人违约风险预测',
            value: 3
          }, {
            tip: '金融信贷逾期',
            value: 4
          }, {
            tip: '身份实名认证',
            value: 5
          }, {
            tip: '个人风险预测',
            value: 6
          }, {
            tip: '多头借贷信息',
            value: 7
          }, {
            tip: '运营商实名认证',
            value: 8
          }, {
            tip: '银行卡实名认证',
            value: 9
          }],
        arr2: [
          {
            tip: '企业负面信息',
            value: 10
          },
          {
            tip: '企业风险核验',
            value: 11
          }]
      }
    },
    computed: {
      ...mapGetters(['registerInfo']),
      disabled: function () {
        if (this.registerInfo.apiList.length === 0) {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
  .register-step1 {
    text-align: left;
    padding-left: 20%;
    color: #3A3B46;
    .tip {
      span {
        display: inline-block;
        color: #9394AA;
        font-size: 12px;
        height: 16px;
        line-height: 6px;
        padding-left: 8px;
      }
    }
    .checkbox-title {
      height: 50px;
      line-height: 50px;
      font-size: 14px;
    }
    .checkbox-item {
      padding: 10px 0;
    }
    .btn {
      padding-top: 16px;
      .el-button--primary {
        width: 160px;
        height: 50px;
      }
      .el-button--primary.is-disabled{
        background-color: #DBDBE3;
        border-color:#DBDBE3;
      }

    }
  }

</style>
