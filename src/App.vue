<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
  }
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
  @import "./assets/css/normalize.css";
  @import "./assets/css/index.css";

  #app {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",SimSun, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color:#475262 ;
    min-width: 1024px;
    margin: 0 auto;
  }

  li {
    list-style: none;
  }

  .fade-appear, .fade-enter-active {
    -webkit-animation-duration: .3s;
    animation-duration: .3s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-play-state: paused;
    animation-play-state: paused
  }

  .fade-leave-active {
    -webkit-animation-duration: .3s;
    animation-duration: .3s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-play-state: paused;
    animation-play-state: paused
  }

  .fade-appear, .fade-enter-active {
    -webkit-animation-name: ivuFadeIn;
    animation-name: ivuFadeIn;
    -webkit-animation-play-state: running;
    animation-play-state: running
  }

  .fade-leave-active {
    -webkit-animation-name: ivuFadeOut;
    animation-name: ivuFadeOut;
    -webkit-animation-play-state: running;
    animation-play-state: running
  }

  .fade-appear, .fade-enter-active {
    opacity: 0;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear
  }

  .fade-leave-active {
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear
  }

  @-webkit-keyframes ivuFadeIn {
    0% {
      opacity: 0
    }
    100% {
      opacity: 1
    }
  }

  @keyframes ivuFadeIn {
    0% {
      opacity: 0
    }
    100% {
      opacity: 1
    }
  }

  @-webkit-keyframes ivuFadeOut {
    0% {
      opacity: 1
    }
    100% {
      opacity: 0
    }
  }

  @keyframes ivuFadeOut {
    0% {
      opacity: 1
    }
    100% {
      opacity: 0
    }
  }


  /*html {*/
  /*text-align: center;*/
  /*height: 100%;*/

  /*}*/

  /*body {*/
  /*width: 100%;*/
  /*min-width: 800px;*/
  /*height: 100%;*/
  /*min-height: 680px;*/
  /*}*/

  /*.ivu-poptip-body {*/
  /*text-align: left !important;*/
  /*}*/

  /*.ivu-table:after {*/
  /*background-color: #fff !important;*/
  /*}*/

  /*.ivu-table-sort {*/
  /*height: 14px;*/
  /*}*/

  /*.ivu-table-large td {*/
  /*height: 80px;*/
  /*}*/

  /*.ivu-poptip-content {*/
  /*width: 180px;*/
  /*}*/

  /*.ivu-table-cell .ivu-poptip-rel {*/
  /*color: #f3484d !important;*/
  /*cursor: pointer;*/
  /*}*/

  /*.ivu-select-large .ivu-select-item {*/
  /*padding: 16px;*/
  /*}*/

  /*.content_search .ivu-select-dropdown {*/
  /*box-shadow: none;*/
  /*}*/

  /*!*.ivu-menu-submenu-title{*!*/
  /*!*width: 160px !important;*!*/
  /*!*}*!*/
  /*.other_content:nth-child(1) .title {*/
  /*background-image: url('./assets/image/tab0.png');*/
  /*}*/

  /*.other_content:last-child .title {*/
  /*background-image: url('./assets/image/tab2.png');*/
  /*}*/

  /*.other_content .title {*/
  /*background-repeat: no-repeat;*/
  /*background-position: 2px 2px;*/
  /*font-size: 16px;*/
  /*color: #353842;*/
  /*line-height: 24px;*/
  /*height: 40px;*/
  /*padding-left: 36px;*/
  /*}*/

  /*.other_content .content_item {*/
  /*margin-bottom: 16px;*/
  /*}*/

  /*.other_content .content_item .key {*/
  /*display: inline-block;*/
  /*font-size: 16px;*/
  /*color: #b4b8c7;*/
  /*line-height: 46px;*/
  /*width: 80px;*/
  /*min-height: 46px;*/
  /*}*/

  /*.other_content .content_item .key_value {*/
  /*display: inline-block;*/
  /*font-size: 16px;*/
  /*color: #6a6f83;*/
  /*vertical-align: top;*/
  /*background: #fafafa;*/
  /*border-radius: 2px;*/
  /*min-width: 400px;*/
  /*max-width: 700px;*/
  /*min-height: 46px;*/
  /*line-height: 32px;*/
  /*margin-left: 26px;*/
  /*padding-left: 24px;*/
  /*padding-right: 24px;*/
  /*padding-top: 6px;*/
  /*}*/

  /*.other_content {*/
  /*padding: 30px 0;*/
  /*position: relative;*/
  /*}*/

  /*.other_content::before {*/
  /*position: absolute;*/
  /*content: "";*/
  /*top: -30px;*/
  /*width: 840px;*/
  /*border-bottom: 1px dashed #dddddd;*/
  /*margin: 0 auto;*/
  /*}*/

  /*.agreement_modal .ivu-modal, .agreement_modal .ivu-modal-content {*/
  /*height: 400px !important;*/
  /*}*/

  /*.agreement_modal .ivu-modal-content {*/
  /*overflow-x: hidden !important;*/
  /*overflow-y: scroll !important;*/
  /*}*/
  /*.ivu-table-wrapper{*/
  /*border:1px solid #dddee1;*/
  /*}*/
  /*.ivu-spin{*/
  /*display: inline-block;*/
  /*}*/
  /*.login_wrap_apply .ivu-form-item-label{*/
  /*font-size: 14px !important;*/
  /*}*/
  /*.login_wrap_apply .ivu-checkbox-group-item span{*/
  /*font-size: 14px;*/
  /*}*/
  /*.ivu-upload{*/
  /*width: 100%;*/
  /*.ivu-btn-ghost{*/
  /*span{*/
  /*font-size: 14px;*/
  /*color:#B4B8C7*/
  /*}*/
  /*}*/
  /*}*/
  /*.agreement_modal {*/

  /*p {*/
  /*text-indent: 28px;*/
  /*font-size: 14px;*/
  /*text-align: left !important;*/
  /*}*/
  /*h4 {*/
  /*text-align: left;*/
  /*font-size: 14px;*/
  /*}*/
  /*.ivu-modal-footer{*/
  /*display: none;*/
  /*}*/

  /*}*/
  /*.apply_modal {*/
  /*.ivu-modal-footer{*/
  /*display: none !important;*/
  /*}*/
  /*}*/
  /*.entbg{*/
  /*text-indent:22px;*/
  /*background-image: url("./assets/image/ent1.png");*/
  /*background-size: 22px;*/
  /*background-position: 0 0;*/
  /*background-repeat: no-repeat;*/
  /*}*/
  /*.perbg{*/
  /*text-indent:22px;*/
  /*background-image: url("./assets/image/person0.png");*/
  /*background-size: 22px;*/
  /*background-position: 0 0;*/
  /*background-repeat: no-repeat;*/
  /*}*/
  /*.forget_wrap .ivu-steps .ivu-steps-tail{*/
  /*left:70px ;*/
  /*}*/
  /*.forget_wrap .ivu-steps .ivu-steps-tail>i:after{*/
  /*left:12px;*/
  /*}*/
  /*.pay_steps .ivu-steps-item.ivu-steps-custom .ivu-steps-head-inner>.ivu-steps-icon{*/
  /*top: 0 !important;*/
  /*}*/
  /*.venture_box th .ivu-table-cell{*/
  /*font-size:12px;*/
  /*color:rgba(144,148,164,1);*/
  /*}*/
  /*.ivu-modal-content .ivu-modal-footer{*/
  /*border: none;*/
  /*}*/
  /*.venture_box .ivu-table-cell{*/
  /*font-size: 12px;*/
  /*}*/
</style>
