import mockjs from 'mockjs'
import { getRule, postRule } from './mock/rule'
import {
  getActivities,
  getNotice,
  getFakeList,
  getFakeActivities,
  getFakeActivitiesList
} from './mock/api'
import { getFakeChartData } from './mock/chart'
import { imgMap } from './mock/utils'
import { getProfileBasicData } from './mock/profile'
import { getProfileAdvancedData } from './mock/profile'
import { getNotices } from './mock/notices'
import { format, delay } from 'roadhog-api-doc'
import { moduleDelete, moduleInsert } from './mock/module'
// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true'

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /back/currentUser': {
    $desc: '获取当前用户接口',
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2
      }
    },
    $body: {
      name: 'Serati Ma',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/dRFVcIqZOYPcSNrlJsqQ.png',
      userid: '00000001',
      notifyCount: 12
    }
  },
  // GET POST 可省略
  'GET /back/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ],
  'GET /back/project/notice': getNotice,
  'GET /back/rule': getRule,
  'POST /back/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2
      }
    },
    $body: postRule
  },
  'POST /back/forms': (req, res) => {
    res.send({ message: 'Ok' })
  },
  'GET /back/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }]
  }),
  'GET /back/fake_list': getFakeList,
  'GET /back/fake_chart_data': getFakeChartData,
  'GET /back/profile/basic': getProfileBasicData,
  'GET /back/profile/advanced': getProfileAdvancedData,
  'POST /back/systemManager/loginVerify': (req, res) => {
    const { userAccount, password } = req.body
    if (userAccount === 'admin' && password === '888888') {
      res.send({
        code: 0,
        data: {
          msg: '登录成功！',
          code: 0,
          systemManager: {
            addTime: '2017-11-03 15:37:48',
            frozen: 0,
            id: 5,
            managerType: 0,
            password: '',
            userAccount: 'user555'
          }
        }
      })
    } else {
      res.send({
        code: -1
      })
    }
  },
  'POST /back/login/mobile': (req, res) => {
    res.send({ status: 'ok', type: 'mobile' })
  },
  'POST /back/systemManager/updatePassword': (req, res) => {
    res.send({
      code: 0,
      data: {
        msg: '修改密码成功！',
        code: 0
      },
      msg: '请求成功'
    })
  },
  'GET /bacc/systemManager/frozenManager': (req, res) => { },
  'GET /back/notices': getNotices,
  'POST /back/systemManager/queryAllManager': {
    code: 0,
    data: {
      msg: '查询成功！',
      code: 0,
      managerList: [
        {
          addTime: '2017-11-01 17:08:31',
          frozen: 0,
          id: 1,
          managerType: 0,
          userAccount: 'zhangsan'
        },
        {
          addTime: '2017-11-01 17:09:13',
          frozen: 1,
          id: 2,
          managerType: 0,
          userAccount: 'lishi'
        },
        {
          addTime: '2017-11-01 17:09:13',
          frozen: 1,
          id: 3,
          managerType: 0,
          userAccount: 'wangwu'
        },
        {
          addTime: '2017-11-01 17:09:13',
          frozen: 1,
          id: 4,
          managerType: 0,
          userAccount: 'zhaoliu'
        }
      ]
    },
    msg: '请求成功'
  },
  'POST /back/systemManager/resetPassword': {
    code: 0,
    data: {
      msg: '重置密码成功！',
      code: 0
    },
    msg: '请求成功'
  },
  'POST /back/systemManager/addNewManager': {
    code: 0,
    data: {
      msg: '新增管理员成功！',
      code: 0
    },
    msg: '请求成功'
  },
  'POST /back/systemActivity/addNewActivity': {
    code: 0,
    data: {
      msg: '创建活动成功！',
      code: 0
    },
    msg: '请求成功'
  },
  'POST /back/systemActivity/modify': {},
  'POST /back/systemActivity/updateShareImage': {
    code: 0,
    data: {
      msg: '更新图文分享信息成功！',
      code: 0
    },
    msg: '请求成功'
  },
  'POST /back/systemActivity/queryActivity': getFakeActivities,
  'GET /back/systemTemplate/query': {
    code: 0,
    data: {
      templates: [
        {
          addTime: '2017-11-30 15:07:16',
          id: 1,
          templateName: 'A',
          templateUrl: '2017113015071615860988403.jpg'
        },
        {
          addTime: '2017-11-30 15:09:05',
          id: 2,
          templateName: 'B',
          templateUrl: '2017113015090468619907247.jpg'
        },
        {
          addTime: '2017-11-30 15:07:16',
          id: 3,
          templateName: 'C',
          templateUrl: '2017113015071615860988403.jpg'
        },
        {
          addTime: '2017-11-30 15:09:05',
          id: 4,
          templateName: 'D',
          templateUrl: '2017113015090468619907247.jpg'
        }
      ]
    },
    msg: '请求成功'
  },
  'POST /back/systemTemplate/add': {
    code: 0,
    data: {
      msg: '新增成功',
      code: 0,
      systemTemplate: {
        addTime: '2017-11-30 15:09:04',
        id: 2,
        templateName: '狂打豆豆',
        templateUrl: '2017113015090468619907247.jpg'
      }
    },
    msg: '请求成功'
  },
  'GET /back/systemModule/queryModule': {
    code: 0,
    data: {
      msg: '查询成功！',
      code: 0,
      systemModuleList: [
        {
          addTime: '2017-10-31 15:55:29',
          id: 1,
          moduleName: '个人拍照',
          moduleUrl: 'AA'
        },
        {
          addTime: '2017-10-31 17:38:49',
          id: 2,
          moduleName: '人脸识别',
          moduleUrl: 'E:\\IntelijIdea_workspace\\ljj\\target\\ljjmodule/10/bb'
        },
        {
          addTime: '2017-10-31 17:42:02',
          id: 3,
          moduleName: '云摄影',
          moduleUrl:
            'E:\\IntelijIdea_workspace\\ljj\\target\\ljj\\module\\11\\bb'
        },
        {
          addTime: '2017-10-31 17:42:02',
          id: 4,
          moduleName: '专业展示',
          moduleUrl:
            'E:\\IntelijIdea_workspace\\ljj\\target\\ljj\\module\\11\\bb'
        },
        {
          addTime: '2017-10-31 17:42:02',
          id: 5,
          moduleName: '3D打印',
          moduleUrl:
            'E:\\IntelijIdea_workspace\\ljj\\target\\ljj\\module\\11\\bb'
        },
        {
          addTime: '2017-10-31 17:42:02',
          id: 6,
          moduleName: '大数据统计',
          moduleUrl:
            'E:\\IntelijIdea_workspace\\ljj\\target\\ljj\\module\\11\\bb'
        }
      ]
    },
    msg: '请求成功'
  },
  'DELETE /back/systemModule/delete': moduleDelete,
  'POST /back/systemModule/insert': moduleInsert,
}

export default (noProxy ? {} : delay(proxy, 1000))
