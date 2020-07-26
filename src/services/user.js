import request from '@/utils/request';

export async function postGetLogin(params) {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
}

export async function postRegister(params) {
  return request('/api/user', {
    method: 'POST',
    data: params,
  });
}

export async function postcheck(params) {
  return request('/api/user/check_avail', {
    method: 'POST',
    data: params,
  });
}

export async function postavatar(params) {
  return request('/api/avatar', {
    method: 'POST',
    data: params,
  });
}

export async function deleteCookie() {
  return request('/api/delCookie');
}
