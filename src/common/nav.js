import dynamic from 'dva/dynamic'

// wrapper of dynamic
const dynamicWrapper = (app, models, component) =>
  dynamic({
    app,
    models: () => models.map(m => import(`../models/${m}.js`)),
    component
  })

// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['user', 'login'], () =>
      import('../layouts/BasicLayout')
    ),
    layout: 'BasicLayout',
    name: '首页', // for breadcrumb
    path: '/',
    children: [
      // {
      //   name: 'Dashboard',
      //   icon: 'dashboard',
      //   path: 'dashboard',
      //   children: [
      //     {
      //       name: '分析页',
      //       path: 'analysis',
      //       component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis')),
      //     },
      //     {
      //       name: '监控页',
      //       path: 'monitor',
      //       component: dynamicWrapper(app, ['monitor'], () => import('../routes/Dashboard/Monitor')),
      //     },
      //     {
      //       name: '工作台',
      //       path: 'workplace',
      //       component: dynamicWrapper(app, ['project', 'activities', 'chart'], () => import('../routes/Dashboard/Workplace')),
      //     },
      //   ],
      // },
      {
        name: '活动管理',
        path: 'activities',
        icon: 'form',
        children: [
          {
            name: '新建活动',
            path: 'create',
            component: dynamicWrapper(app, ['form'], () =>
              import('../routes/Activities/createActivity')
            )
          },
          {
            name: '活动列表',
            path: 'list',
            component: dynamicWrapper(app, ['activities'], () =>
              import('../routes/Activities/ActivityList')
            )
          },
          {
            name: '活动设置',
            path: 'setting',
            component: dynamicWrapper(app, ['activities'], () =>
              import('../routes/Activities/Manage')
            )
          }
        ]
      },
      {
        name: '用户管理',
        path: 'account',
        icon: 'idcard',
        children: [
          {
            name: '管理员',
            path: 'create',
            component: dynamicWrapper(app, ['account'], () =>
              import('../routes/Accounts/AccountList')
            )
          }
        ]
      },
      {
        name: '模块管理',
        path: 'modules',
        icon: 'appstore-o',
        children: [
          {
            name: '模块卡片',
            path: 'list',
            component: dynamicWrapper(app, ['list'], () =>
              import('../routes/FuncModules/FuncCardList')
            )
          }
        ]
      },
      // {
      //   name: '表单页',
      //   path: 'form',
      //   icon: 'form',
      //   children: [
      //     {
      //       name: '基础表单',
      //       path: 'basic-form',
      //       component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/BasicForm')),
      //     },
      //     {
      //       name: '分步表单',
      //       path: 'step-form',
      //       component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm')),
      //       children: [
      //         {
      //           path: 'confirm',
      //           component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step2')),
      //         },
      //         {
      //           path: 'result',
      //           component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step3')),
      //         },
      //       ],
      //     },
      //     {
      //       name: '高级表单',
      //       path: 'advanced-form',
      //       component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/AdvancedForm')),
      //     },
      //   ],
      // },
      // {
      //   name: '列表页',
      //   path: 'list',
      //   icon: 'table',
      //   children: [
      //     {
      //       name: '查询表格',
      //       path: 'table-list',
      //       component: dynamicWrapper(app, ['rule'], () => import('../routes/List/TableList')),
      //     },
      //     {
      //       name: '标准列表',
      //       path: 'basic-list',
      //       component: dynamicWrapper(app, ['list'], () => import('../routes/List/BasicList')),
      //     },
      //     {
      //       name: '卡片列表',
      //       path: 'card-list',
      //       component: dynamicWrapper(app, ['list'], () => import('../routes/List/CardList')),
      //     },
      //     {
      //       name: '搜索列表（项目）',
      //       path: 'cover-card-list',
      //       component: dynamicWrapper(app, ['list'], () => import('../routes/List/CoverCardList')),
      //     },
      //     {
      //       name: '搜索列表（应用）',
      //       path: 'filter-card-list',
      //       component: dynamicWrapper(app, ['list'], () => import('../routes/List/FilterCardList')),
      //     },
      //     {
      //       name: '搜索列表（文章）',
      //       path: 'search',
      //       component: dynamicWrapper(app, ['list'], () => import('../routes/List/SearchList')),
      //     },
      //   ],
      // },
      // {
      //   name: '详情页',
      //   path: 'profile',
      //   icon: 'profile',
      //   children: [
      //     {
      //       name: '基础详情页',
      //       path: 'basic',
      //       component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/BasicProfile')),
      //     },
      //     {
      //       name: '高级详情页',
      //       path: 'advanced',
      //       component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/AdvancedProfile')),
      //     },
      //   ],
      // },
      // {
      //   name: '结果',
      //   path: 'result',
      //   icon: 'check-circle-o',
      //   children: [
      //     {
      //       name: '成功',
      //       path: 'success',
      //       component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
      //     },
      //     {
      //       name: '失败',
      //       path: 'fail',
      //       component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
      //     },
      //   ],
      // },
      {
        name: '异常',
        path: 'exception',
        icon: 'warning',
        children: [
          {
            name: '403',
            path: '403',
            component: dynamicWrapper(app, [], () =>
              import('../routes/Exception/403')
            )
          },
          {
            name: '404',
            path: '404',
            component: dynamicWrapper(app, [], () =>
              import('../routes/Exception/404')
            )
          },
          {
            name: '500',
            path: '500',
            component: dynamicWrapper(app, [], () =>
              import('../routes/Exception/500')
            )
          }
        ]
      },
      {
        name: '机器',
        path: 'machine',
        icon: 'laptop',
        children: [
          {
            name: '查看',
            path: 'list',
            component: dynamicWrapper(app, ['list'], () =>
              import('../routes/Machines/MachineList')
            )
          }
        ]
      }
    ]
  },

  {
    component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    path: '/user',
    layout: 'UserLayout',
    children: [
      {
        name: '帐户',
        icon: 'user',
        path: 'user',
        children: [
          {
            name: '登录',
            path: 'login',
            component: dynamicWrapper(app, ['login'], () =>
              import('../routes/User/Login')
            )
          },
          {
            name: '设置',
            path: 'setting', //              对应module里的文件
            component: dynamicWrapper(app, ['setting'], () =>
              import('../routes/User/Setting')
            )
          },
          {
            name: '设置结果',
            path: 'settingResult',
            component: dynamicWrapper(app, [], () =>
              import('../routes/User/SettingResult')
            )
          }
        ]
      }
    ]
  }
]
