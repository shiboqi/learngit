import { stringify } from 'qs';
import request from '../utils/request';

/* ---------------活动管理----------------------- */
export async function queryActivities(body) {
  return request('/back/systemActivity/queryActivity', {
    method: 'POST',
    body,
  });
}

export async function deleteActivity(body) {
  return request('/back/systemActivity/deleteActivity', {
    method: 'POST',
    body,
  });
}

export async function modifyActivity() {
  return request('/back/systemAcitivity/modify');
}

export async function modifyStatus() {
  return request('/back/systemAcitivity/modifyStatus');
}

export async function updateModuleOrder() {
  return request('/back/systemAcitivity/updateModuleOrder');
}

export async function updateShareImage() {
  return request('/back/systemActivity/updateShareImage');
}

export async function queryModule() {
  return request('/back/systemModule/queryModule');
}

// -----------------------账户管理------------------------

export async function addNewManager(body) {
  return request('/back/systemManager/addNewManager', {
    method: 'POST',
    body,
  });
}

export async function frozenManager(body) {
  return request('/back/systemManager/frozenManager', {
    method: 'POST',
    body,
  });
}

export async function queryAllManager(body) {
  return request('/back/systemManager/queryAllManager', {
    method: 'POST',
    body,
  });
}

export async function thawManager(body) {
  return request('/back/systemManager/thawManager', {
    method: 'POST',
    body,
  });
}

export async function resetPasword(params) {
  return request('/back/systemManager/resetPasword', {
    method: 'POST',
    body: params,
  });
}

export async function updatePasword(params) {
  return request('/back/systemManager/updatePasword', {
    method: 'POST',
    body: params,
  });
}

export async function loginVerify(params) {
  return request('/back/systemManager/loginVerify', {
    method: 'POST',
    body: params,
  });
}

export async function logout(params) {
  return request('/back/systemManager/logout', {
    method: 'POST',
    body: params,
  });
}

// ------------------------设备管理----------------------
export async function addSystemDevice(param) {
  return request('/back/systemDevice/add', {
    method: 'POST',
    body: param,
  });
}

export async function deleteSystemDevice(param) {
  return request('/back/systemDevice/delete', {
    method: 'POST',
    body: param,
  });
}

export async function querySystemDevice(param) {
  return request('/back/systemDevice/list', {
    method: 'POST',
    body: param,
  });
}

export async function allocateActivityToDevice(param) {
  return request('/back/systemDevice/allocateActivityToDevice', {
    method: 'POST',
    body: param,
  });
}

export async function allocateDeviceToManager(param) {
  return request('/back/systemDevice/allocateDeviceToManager', {
    method: 'POST',
    body: param,
  });
}

// -------------------------专业展示--------------------------
export async function addProfessionalShow(param) {
  return request('/back/professionalExhibition/addNewProfessionalExhibition', {
    method: 'POST',
    body: param,
  });
}

export async function deleteProfessionalShow(param) {
  return request('/back/professionalExhibition/delete', {
    method: 'POST',
    body: param,
  });
}

export async function modifyProfessionalShow(param) {
  return request('/back/professionalExhibition/modify', {
    method: 'POST',
    body: param,
  });
}

// -------------------------模板---------------------

export async function queryTemplate() {
  return request('/back/systemTemplate/query');
}

export async function addTemplate(param) {
  return request('/back/systemTemplate/add', {
    method: 'POST',
    body: param,
  });
}

//-------------------------

export async function queryProjectNotice() {
  return request('/back/project/notice');
}

export async function queryRule(params) {
  return request(`/back/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/back/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/back/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/back/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/back/fake_chart_data');
}

export async function queryTags() {
  return request('/back/tags');
}

export async function queryBasicProfile() {
  return request('/back/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/back/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/back/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/back/systemManager/loginVerify', {
    method: 'POST',
    body: params,
  });
}

export async function fakeMobileLogin(params) {
  return request('/back/login/mobile', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/back/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/back/notices');
}

// ------------------模块管理-------------------

export async function deleteModule(params) {
  return request('/back/systemModule/delete', {
    method: 'DELETE',
    body: params,
  });
}

export async function insertModule(params) {
  return request('/back/systemModule/insert', {
    method: 'POST',
    body: params,
  });
}
