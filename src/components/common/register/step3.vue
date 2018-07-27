<template>
  <div class="register-step3">
    <el-form
      :model="registerInfo"
      :rules="rules"
      ref="registerInfo"
      label-width="100px"
      label-position="top"
    >
      <el-form-item label="联系人姓名" prop="linkName" class="form-item item1">
        <el-input
          v-model="registerInfo.linkName"
          placeholder="请输入联系人姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile" class="form-item item2">
        <el-input
          v-model="registerInfo.mobile"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="imgCode" class="form-item item3">
        <el-input
          v-model="registerInfo.imgCode"
          placeholder="请输入验证码"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机验证码" prop="telCode" class="form-item item3">
        <el-input
          v-model="registerInfo.telCode"
          placeholder="请输入手机验证码"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="register-agreement">

    </div>
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
    props: ['callback'],
    mounted() {
    },
    data: function () {
      const isValidIP = function (ip) {
        let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        return reg.test(ip);
      };
      const validateIP = (rule, value, callback) => {
        if (value) {
          let arr = value.split(';');
          for (let i of arr) {
            if (i === '') {
              continue
            }
            if (!isValidIP(i)) {
              callback(new Error('IP格式有误'));
              break
            }
          }
          callback()
        }
      };
      return {
        rules: {
          linkName: [
            {required: true, message: '请输入联系人姓名', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入手机号', trigger: 'blur'}
          ],
          imgCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
          ],
          telCode: [
            {required: true, message: '请输入手机验证码', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      ...mapGetters(['registerInfo']),
      disabled: function () {
        let flag = true;
        let that = this.registerInfo;
        if (that.userGroup && that.entName && that.entCode && that.photoUrl && that.entEmail && that.uniform && this.$refs['registerInfo']) {
          this.$refs['registerInfo'].validate((valid) => {
            flag = !valid
          });
        }
        return flag;
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
  .register-step3 {
    text-align: left;
    padding-left: 20%;
    color: #3A3B46;
    .form-item {
      width: 380px;
      margin-bottom: 14px;
    }
    .el-form--label-top .el-form-item__label {
      padding: 0;
    }
    .el-form--label-top .el-form-item__label:before {
      display: none;
    }

    .item3 .el-form-item__content {
      display: flex;
    }

    .btn {
      padding-top: 16px;
      .el-button--primary {
        width: 160px;
        height: 50px;
      }
      .el-button--primary.is-disabled {
        background-color: #DBDBE3;
        border-color: #DBDBE3;
      }

    }
  }

</style>
