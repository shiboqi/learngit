import { routerRedux } from 'dva/router';
import { fakeAccountLogin, fakeMobileLogin } from '../services/api';

export default {
  /* combine到rootReducer的key值 */
  namespace: 'login',
  /* initialState */
  state: {
    status: undefined,
    info: {
      addTime: '',
      frozen: 0,
      id: -1,
      managerType: 0,
      userAccount: '',
    },
  },
  /* 对应saga */
  effects: {
    *accountSubmit({ payload }, { call, put }) {
      // 对应action的名字
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
    },
    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
        },
      });
      yield put(routerRedux.push('/user/login'));
    },
    *setting(_, { put }) {
      yield put(routerRedux.push('/user/setting'));
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.data.code,
        type: payload.data.systemManager.managerType,
        info: { ...payload.data.systemManager },
      };
    },
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      };
    },
  },
};
