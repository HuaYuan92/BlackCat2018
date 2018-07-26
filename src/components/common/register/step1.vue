<template>
  <div class="register-step1">
    <div class="tip">
      <i class="el-icon-warning"></i>
      <span>选择您感兴趣的产品，至少选择一项</span>
    </div>
    <div class="checkbox ">

    </div>
  </div>

</template>

<script>
  export default {
    name: "step1"
  }
</script>

<style  lang="less" rel="stylesheet/less" type="text/less">
  .register-step1 {
    text-align: left;
    padding-left: 20%;
    .tip {
      span{
        display: inline-block;
        color: #9394AA;
        font-size: 12px;
        height: 16px;
        line-height: 6px;
        padding-left: 8px;
      }
    }
  }

</style>
