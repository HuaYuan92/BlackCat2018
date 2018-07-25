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
          :maxlength="6"
        >
          <div slot="prefix">
            <img :src="img2">
          </div>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import img1 from '@/assets/image/v2-56.png'
  import img2 from '@/assets/image/v2-57.png'
  export default {
    name: "loginform",
    props: ['callback'],
    data: function () {
      return {
        img1,
        img2,
        loginInfo: {
          name: '',
          psd: ''
        },
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
              min: 6, max: 12, message: '请输入不少于6位密码', trigger: 'blur'
            }
          ]
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
  .login-form {
    padding: 0 28px;
    .login-form-title {
      font-size: 22px;
      color: rgba(71, 82, 98, 1);
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
        img{
          width: 20px;
          margin-top: 15px;
        }
      }
    }

  }
</style>
