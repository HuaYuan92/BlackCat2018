import Vue from 'vue'
import Router from 'vue-router'
import Components from './../components/index'


Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/login',
      meta: {
        title: '登录',
        requireAuth: false
      },
      component: Components.Login
    },
    {
      path: '/agreement',
      meta: {
        title: '服务协议',
        requireAuth: false
      },
      component: Components.Agreement
    },
    {
      path: '/register',
      meta: {
        title: '用户注册',
        requireAuth: false
      },
      component: Components.Register,
    },
    {
      path: '/forget',
      component: Components.Forget,
      children: [
        {
          path: '',
          redirect: 'step1',
        },
        {
          path: 'step1',
          component: Components.Step1,
        },
        {
          path: 'step2',
          component: Components.Step2,
        },
        {
          path: 'step3',
          component: Components.Step3,
        },
        {
          path: 'step4',
          component: Components.Step4,
        },
      ]
    },
    {
      path: '/',
      component: Components.Home,
      children: [
        {
          path: '',
          redirect: '/companies',
        },
        {
          path: 'individuals',
          component: Components.PersonResult,
        },
        {
          path: 'individualsarray',
          component: Components.PersonArr,
        },
        {
          path: 'persondetail',
          component: Components.PersonDetail,
        },
        {
          path: 'saved_individuals',
          component: Components.PersonHold ,
        },
        {
          path: 'companies',
          meta: {
            title: '用户注册',
            requireAuth: true
          },
          component: Components.EntResult,
        },
        {
          path: 'entdetail',
          component: Components.EntDetail,
        },
        {
          path: 'saved_companies',
          component: Components.EntHold,
        },
        {
          path: 'statistics',
          component: Components.InfoList,
        },
        {
          path: 'consumptionlist',
          component: Components.ConsumptionList,
        },
        {
          path: 'profile',
          component: Components.UserInfo,
        },
        {
          path: 'password',
          component: Components.UserChange,
        },
        {
          path: 'wallet',
          component: Components.Wallet,
        },
        {
          path: 'pay1',
          component: Components.Pay1,
        },
        {
          path: 'pay2',
          component: Components.Pay2,
        },
        {
          path: 'pay3',
          component: Components.Pay3,
        },
        {
          path: 'idverification',
          component: Components.IDVerification,
        },
        {
          path: 'mobileverification',
          component: Components.MobileVerification,
        },
        {
          path: 'cardverification',
          component: Components.CardVerification,
        },
        {
          path: 'workposition',
          component: Components.WorkPosition,
        },
        {
          path: 'homeposition',
          component: Components.HomePosition,
        },
        {
          path: 'forecastventure',
          component: Components.ForecastVenture,
        },
        {
          path: 'venturedetail',
          component: Components.VentureDetail,
        },
        {
          path: 'entventure',
          component: Components.EntVenture,
        },
        {
          path: 'entventuredetail',
          component: Components.EntVentureDetail,
        },
        {
          path: 'perventure',
          component: Components.PerVenture,
        },
        {
          path: 'perventuredetail',
          component: Components.PerVentureDetail,
        },
      ]
    },
    {
      path: '/*',
      component: Components.Login
    },
  ]
})
