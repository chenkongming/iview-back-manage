import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
const router = new VueRouter({
  base: __dirname,
  routes: [
    {
      path: '/login',
      name:"login",
      component: function (resolve) {
        require(['views/login/login'], resolve)
      }
    },
    {
      path: '/',
      component: function (resolve) {
        require(['views/login/login'], resolve)
      }
    },
    {
      path: '/home',
      component: function (resolve) {
        require(['views/home'], resolve)
      },
      children: [
        //账单中心
        {
          path: '/bill-manage',
          component: function (resolve) {
            require(['views/bill-manage/bill-manage'], resolve)
          }
        },
          {
          path: '/bill-detail',
          component: function (resolve) {
            require(['views/bill-manage/bill-detail'], resolve)
          }
        },
        //经营报表
        {
          path: '/business-resume',
          component: function (resolve) {
            require(['views/operations-report/business-resume'], resolve)
          }
        },
        {
          path: '/hot-sell-food',
          component: function (resolve) {
            require(['views/operations-report/hot-sell-food'], resolve)
          }
        },
        {
          path: '/revenue-report',
          component: function (resolve) {
            require(['views/operations-report/revenue-report'], resolve)
          }
        },
        //资源管理
        {
          path: '/category-manage',
          component: function (resolve) {
            require(['views/resource-manage/category-manage'], resolve)
          }
        },
        {
          path: '/food-manage',
          component: function (resolve) {
            require(['views/resource-manage/food-manage'], resolve)
          }
        },
        {
          path: '/table-manage',
          component: function (resolve) {
            require(['views/resource-manage/table-manage'], resolve)
          }
        },
        {
          path: '/peripheral-manage',
          component: function (resolve) {
            require(['views/resource-manage/peripheral-manage'], resolve)
          }
        },
        //通告管理
        {
          path: '/notification-manage',
          component: function (resolve) {
            require(['views/notification-manage/notification-manage'], resolve)
          }
        },
        //权限管理
        {
          path: '/account-list',
          component: function (resolve) {
            require(['views/authority-manage/account-list'], resolve)
          }
        },
        {
          path: '/account-add',
          component: function (resolve) {
            require(['views/authority-manage/account-add'], resolve)
          }
        },
        {
          path: '/role-list',
          component: function (resolve) {
            require(['views/authority-manage/role-list'], resolve)
          }
        },
        {
          path: '/role-add',
          component: function (resolve) {
            require(['views/authority-manage/role-add'], resolve)
          }
        },
      ]
    },
  ],
  linkActiveClass: "router-active"
});
router.beforeEach((to, from, next) => {
  if ((to.path !== '/login') && (!$lm.getToken("token"))) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
});
export default router
