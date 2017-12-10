import request from '../utils/request';

export async function query() {
  return request('/back/users');
}

export async function queryCurrent() {
  return request('/back/currentUser');
}
