function queryAllManager(res, req) {
  return {
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
          userAccount: 'zhangsan',
        },
        {
          addTime: '2017-11-01 17:09:13',
          frozen: 1,
          id: 2,
          managerType: 0,
          userAccount: 'lishi',
        },
        {
          addTime: '2017-11-01 17:09:13',
          frozen: 1,
          id: 3,
          managerType: 0,
          userAccount: 'wangwu',
        },
        {
          addTime: '2017-11-01 17:09:13',
          frozen: 1,
          id: 4,
          managerType: 0,
          userAccount: 'zhaoliu',
        },
      ],
    },
    msg: '请求成功',
  };
}

export default {
  queryAllManager,
};
