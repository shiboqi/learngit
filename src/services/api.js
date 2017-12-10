import { stringify } from 'qs'
import request from '../utils/request'

export async function queryModule() {
  return request('/back/systemModule/queryModule')
}
export async function queryActivities() {
  return request('/back/systemActivity/queryActivity', {
    method: 'POST',
    body: {}
  })
}
export async function queryTemplate() {
  return request('/back/systemTemplate/query')
}

export async function queryAllManager() {
  return request('/back/systemManager/queryAllManager', {
    method: 'POST',
    body: {}
  })
}

export async function queryProjectNotice() {
  return request('/back/project/notice')
}

export async function queryRule(params) {
  return request(`/back/rule?${stringify(params)}`)
}

export async function removeRule(params) {
  return request('/back/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete'
    }
  })
}

export async function addRule(params) {
  return request('/back/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post'
    }
  })
}

export async function fakeSubmitForm(params) {
  return request('/back/forms', {
    method: 'POST',
    body: params
  })
}

export async function fakeChartData() {
  return request('/back/fake_chart_data')
}

export async function queryTags() {
  return request('/back/tags')
}

export async function queryBasicProfile() {
  return request('/back/profile/basic')
}

export async function queryAdvancedProfile() {
  return request('/back/profile/advanced')
}

export async function queryFakeList(params) {
  return request(`/back/fake_list?${stringify(params)}`)
}

export async function fakeAccountLogin(params) {
  return request('/back/systemManager/loginVerify', {
    method: 'POST',
    body: params
  })
}

export async function fakeMobileLogin(params) {
  return request('/back/login/mobile', {
    method: 'POST',
    body: params
  })
}

export async function fakeRegister(params) {
  return request('/back/register', {
    method: 'POST',
    body: params
  })
}

export async function queryNotices() {
  return request('/back/notices')
}

export async function resetPasword(params) {
  return request('/back/systemManager/updatePassword', {
    method: 'POST',
    body: params
  })
}
