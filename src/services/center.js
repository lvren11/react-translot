import request from '@/utils/request';
import { stringify } from 'qs';

export async function changepassword(params) {
  return request('/api/password', {
    method: 'POST',
    data: params,
  });
}

export async function inform() {
    return request(`/api/notice`);
}

export async function system(params) {
  return request(`/api/center/system?${stringify(params)}`);
}

export async function getuser(params) {
  return request(`/api/user/${params}`);
}

export async function changeother(params) {
  return request(`/api/user/${params.id}`,{
    method: 'PUT',
    data: params.user,
  });
}
