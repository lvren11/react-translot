import { stringify } from 'qs';
import request from '@/utils/request';

//获取接受文章
export async function getaccept(params) {
  return request(`/api/accept?${stringify(params)}`);
}

export async function getacceptuser(params) {
  return request(`/api/user?${stringify(params)}`);
}

export async function postprogress(params) {
  return request(`/api/accept/${params.id}`,{
    method: 'PUT',
    data: {progress:params.progress},
  });
}

export async function queren(params) {
  return request(`/api/accept/${params}`);
}

export async function postaccept(params) {
  return request('/api/accept',{
    method: 'POST',
    data: params,
  });
}

export async function postmessage(params) {
  return request('/api/dialogue',{
    method: 'POST',
    data: params,
  });
}

export async function getmessage(params) {
  return request(`/api/dialogue/${params}`);
}
export async function getfiles(params) {
  return request(`/api/upload/${params}`);
}

export async function getaccept_deatil(params) {
  return request(`/api/accept?${stringify(params)}`);
}
