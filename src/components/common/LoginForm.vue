<template>
  <div class="login-form">
    <div class="login-form-title">
      用户登录
    </div>
    <el-form
      :model="loginInfo"
      :rules="rules"
      ref="loginInfo"
    >
      <el-form-item prop="userName" class="form-item item1">
        <el-input
          v-model="loginInfo.userName"
          placeholder="请输入用户名"
        >
          <div slot="prefix">
            <img :src="img1">
          </div>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" class="form-item item2">
        <el-input
          v-model="loginInfo.password"
          placeholder="请输入密码"
          type="password"
          :maxlength="6"
        >
          <div slot="prefix">
            <img :src="img2">
          </div>
        </el-input>
      </el-form-item>
      <el-form-item class="form-item item3">
        <div class="checkbox">
          <el-checkbox v-model="checkbox">我已阅读并同意</el-checkbox>
          <div class="agreement" @click="ToAgreement">《黑猫察服务协议》</div>
        </div >
        <div class="to-forget">忘记密码?</div>
      </el-form-item>
      <el-form-item class="form-item item4">
        <el-button
          type="primary"
          @click="SubmitForm('loginInfo')"
        >登录</el-button>
      </el-form-item>
      <el-form-item class="form-item item5">
        还没有账户?<div class="to-apply" @click="ToApply">立即申请试用</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import img1 from '@/assets/image/v2-56.png'
  import img2 from '@/assets/image/v2-57.png'

  export default {
    name: "loginform",
    props: [''],
    data: function () {
      return {
        img1,
        img2,
        checkbox: true,
        rules: {
          userName: [
            {
              required: true, message: '用户名不能为空', trigger: 'blur'
            }
          ],
          password: [
            {
              required: true, message: '密码不能为空', trigger: 'blur'
            },
            {
              min: 6, max: 15, message: '请输入不少于6位密码', trigger: 'blur'
            }
          ]
        }
      }
    },
    computed: mapGetters(['loginInfo']),
    methods: {
      SubmitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('Login');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      ToAgreement(){
        window.open('/agreement')
      },
      ToApply(){
        this.router.push({path:'/apply'})
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
  @blue:#3F7BFF;
  .login-form {
    padding: 0 28px;
    color: #475262;
    .login-form-title {
      font-size: 22px;
      padding-bottom: 40px;
    }
    .form-item {
      .el-input__inner {
        height: 50px !important;
        line-height: 50px !important;
        padding-left: 42px !important;
      }
      .el-input__prefix {
        line-height: 50px !important;
        display: inline-block;
        padding: 0 10px;
        img {
          width: 20px;
          margin-top: 15px;
        }
      }
    }
    .item3 .el-form-item__content{
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      .checkbox{
        flex:3;
        display: flex;
        .agreement{
          color: @blue;
          cursor: pointer;
        }
      }
      .to-forget{
        flex: 1;
        text-align: right ;
        color: @blue;
        cursor: pointer;
      }
    }
    .item4 .el-button{
      width: 100%;
      height: 50px;
      line-height: 50px;
      padding: 0;
      font-size: 16px;
    }
    .item5 .el-form-item__content{
      .to-apply{
        display: inline-block;
        color:@blue;
        cursor: pointer;
      }
    }
    .item5{
      margin: 0;
    }

  }
</style>
