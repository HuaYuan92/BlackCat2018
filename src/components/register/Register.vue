<template>
  <div class="register-wrap">
    <div class="register-left">
      <img :src="img1" class="img1">
      <img :src="img2" class="img2">
    </div>
    <div class="register-right">
      <div class="title">
        免费申请试用
      </div>
      <RegisterStep1 v-show="step===1" :callback="Step"></RegisterStep1>
      <RegisterStep2 v-show="step===2" :callback="Step"></RegisterStep2>
      <RegisterStep3 v-show="step===3" :callback="Step"></RegisterStep3>

    </div>
  </div>

</template>
<script>
  import img1 from '@/assets/image/v2-1.png'
  import img2 from '@/assets/image/v2-59.jpg'

  export default {
    name: "register",
    data: function () {
      return {
        img1,
        img2,
        step: 3,
      }
    },
    methods: {
      Step() {
        this.step++;
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  .register-wrap {
    display: flex;
    color: #475262;
  }

  .register-left {
    flex: 1;
    box-sizing: border-box;
    .img1 {
      position: fixed;
      top: 14px;
      left: 80px;
      width: 118px;
      height: 55px;
      z-index: 2;
    }
    .img2 {
      position: fixed;
      top: 0;
      left: 0;
      width: 50%;
      height: 100%;
      z-index: 1;
    }
  }

  .register-right {
    flex: 1;
    padding: 64px 0;
    .title {
      font-size: 30px;
      margin-bottom: 30px;
      padding-left: 20%;
      text-align: left;
    }
  }
</style>
