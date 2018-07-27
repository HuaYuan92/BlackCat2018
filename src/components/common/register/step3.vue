<template>
  <div class="register-step2">
    <el-form
      :model="registerInfo"
      :rules="rules"
      ref="registerInfo"
      label-width="100px"
      label-position="top"
    >
      <el-form-item label="行业类型" prop="userGroup" class="form-item item1">
        <el-select v-model="registerInfo.userGroup" placeholder="请选择行业类型">
          <el-option v-for="i of userGroup" :label="i.name" :value="i._id" :key="i._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业名称" prop="entName" class="form-item item2">
        <el-input
          v-model="registerInfo.entName"
          placeholder="请输入企业名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="社会统一信用代码" prop="entCode" class="form-item item3">
        <el-input
          v-model="registerInfo.entCode"
          placeholder="请输入社会统一信用代码"
          :maxlength="18"
        ></el-input>
      </el-form-item>
      <el-form-item label="公司邮箱" prop="entEmail" class="form-item item5">
        <el-input
          v-model="registerInfo.entEmail"
          placeholder="公司邮箱将作为您登陆系统的用户名并接受系统通知"
        ></el-input>
      </el-form-item>
      <el-form-item label="公网IP" prop="uniform" class="form-item item6">
        <el-input
          v-model="registerInfo.uniform"
          placeholder="请输入公网IP，多个IP地址用英文分号分割"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button type="primary" :disabled="disabled" @click="callback()">
        下一步
      </el-button>
    </div>
    <el-dialog
      title="营业执照"
      custom-class="register-img"
      :visible.sync="imgVisible"
      center
    >
      <img :src="url">
      <div slot="footer"></div>
    </el-dialog>

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
        url: '',
        imgVisible:false,
        userGroup: [],
        rules: {
          userGroup: [
            {required: true, message: '请选择行业类型', trigger: 'change'}
          ],
          entName: [
            {required: true, message: '请输入企业名称', trigger: 'blur'}
          ],
          entCode: [
            {required: true, message: '请输入社会统一信用代码', trigger: 'blur'}
          ],
          photoUrl: [
            {required: false, message: '', trigger: 'blur'}
          ],
          entEmail: [
            {required: true, message: '请输入公司邮箱', trigger: 'blur'},
            {type: 'email', message: '邮箱格式有误', trigger: 'blur'}
          ],
          uniform: [
            {required: true, message: '请输入公网IP，多个IP地址用英文分号分割', trigger: 'blur'},
            {validator: validateIP, trigger: 'blur'}
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
  .register-step2 {
    text-align: left;
    padding-left: 20%;
    color: #3A3B46;
    .form-item {
      width: 380px;
      margin-bottom: 14px;
    }
    .el-select {
      width: 380px;
    }
    .el-form--label-top .el-form-item__label {
      padding: 0;
    }
    .el-form--label-top .el-form-item__label:before {
      display: none;
    }
    #img_box {
      width: 120px;
      height: 140px;
      background: rgba(251, 253, 255, 1);
      border-radius: 3px;
      border: 1px dashed rgba(201, 212, 225, 1);
      cursor: pointer;
      z-index: 11;
    }
    #img_box:before {
      position: absolute;
      content: "+";
      display: inline-block;
      height: 0;
      font-size:26px;
      top: 30%;
      left:52px;
      color: #9394AA;
      z-index: -1;
    }
    #img_box:after {
      width:48px;
      height:0px;
      font-size:12px;
      position: absolute;
      content: "点击上传";
      display: inline-block;
      top: 60%;
      left: 38px;
      color: #9394AA;
      z-index: -1;
    }
    #img {
      width: 120px;
      height: 140px;
      border: none;
      visibility: hidden;
    }
    #img:hover:before{
      position: absolute;
      content: "点击上传";
      display: inline-block;
    }
    .item4 .el-form-item__content {
      display: flex;
    }
    .photo {
      width: 120px;
      height: 140px;
      margin-left: 20px;
      border: 1px solid #C9D4E1;
      cursor: pointer;
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
    .register-img{
      width: 540px;
      img{
        width: 480px;
        margin: 0 auto;
      }
      .el-dialog__header{
        border-bottom: 1px solid #C9D4E1;
        padding: 20px;
      }
    }
  }

</style>
