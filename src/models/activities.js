import {
  queryActivities,
  queryTemplate,
  queryModule,
  queryAllManager
} from '../services/api'
import { routerRedux } from 'dva/router'

export default {
  namespace: 'activities',

  state: {
    activityVOList: [],
    loading: true,
    selectedActivity: {
      moduleList: [],
      activityName: '',
      addTime: '',
      belongManager: -1,
      id: -1,
      shareImage: '',
      shareText: '',
      status: -1,
      templateId: -1,
      updateTime: -1
    }
  },

  effects: {
    *fetchList(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true
      })

      const response = yield call(queryActivities)
      const { activityVOList } = response.data

      yield put({
        type: 'saveList',
        payload: activityVOList
      })

      yield put({
        type: 'changeLoading',
        payload: false
      })
    },
    *configActivity({ payload }, { call, put }) {
      yield put({ type: 'initSetting', payload })
      yield put({
        type: 'changeLoading',
        payload: true
      })
      const response = yield call(queryTemplate)
      yield put({ type: 'saveTemplate', payload: response.data.templates })

      const moduleResponse = yield call(queryModule)
      console.log(moduleResponse.data.systemModuleList)
      yield put({
        type: 'saveSystemModule',
        payload: moduleResponse.data.systemModuleList
      })

      const managerResponse = yield call(queryAllManager)
      console.log('====================================')
      console.log(managerResponse.data.managerList)
      console.log('====================================')
      yield put({
        type: 'saveManager',
        payload: managerResponse.data.managerList
      })

      yield put(routerRedux.push('/activities/setting'))
      yield put({
        type: 'changeLoading',
        payload: false
      })
    }
  },

  reducers: {
    saveList(state, action) {
      return {
        ...state,
        activityVOList: action.payload
      }
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload
      }
    },
    initSetting(state, action) {
      return {
        ...state,
        selectedActivity: action.payload
      }
    },
    saveTemplate(state, action) {
      return {
        ...state,
        templateList: action.payload
      }
    },
    saveSystemModule(state, action) {
      return {
        ...state,
        systemModuleList: action.payload
      }
    },
    saveManager(state, action) {
      return {
        ...state,
        managerList: action.payload
      }
    }
  }
}
