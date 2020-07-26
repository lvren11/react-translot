import { stringify } from 'qs';
import request from '@/utils/request';

// 获取文章列表

export async function getArticleList(params) {
  return request(`/api/post?${stringify(params)}`);
}
//获取文章列表（通过uid）

export async function getselfArticleList(params) {
  return request(`/api/post?${stringify(params)}`);
}
// 获取文章详情(通过pid)

export async function getArticleDetail(params) {
  return request(`/api/post?${stringify(params)}`);
}
//修改文章
export async function doarticle(params) {
  return request(`/api/post/${params.id}`,{
    method: 'PUT',
    data: params.article,
  });
}
//删除发布
export async function deletearticle(params) {
  return request(`/api/post/${params}`,{
    method: 'DELETE',
  });
}
//点赞
export async function postlike(params) {
  return request('/api/like',{
    method: 'POST',
    data: params,
  });
}
//取消点赞
export async function postunlike(params) {
  return request('/api/unlike',{
    method: 'POST',
    data: params,
  });
}
// 给文章添加评论

export async function postArticleComment(params) {
  return request('/api/comment', {
    method: 'POST',
    data: params,
  });
}

// 获取文章pid评论列表
export async function getArticleComment(params) {
  return request(`/api/comment?${stringify(params)}`);
}
//获取自己评论
export async function getselfcomment(params) {
  return request(`/api/comment?${stringify(params)}`);
}

// 获取热门文章
export async function getHotArticle(params) {
  return request(`/api/post?${stringify(params)}`);
}

// 获取分类列表

export async function getCategory() {
  return request('/api/tag');
}

//通过分类id获取文章
export async function getCategoryarticle(params) {
  return request(`/api/post?${stringify(params)}`);
}

//发表
export async function postarticle(params) {
  return request('/api/post', {
    method: 'POST',
    data: params,
  });
}

//文件上传
export async function postfiles(params) {
  return request('/api/upload', {
    method: 'POST',
    data: params,
  });
}

//搜索
export async function getserch(params) {
  return request(`/api/search/?q=${params}`);
}

//排序
export async function getsort(params) {
  return request(`/api/post/?${stringify(params)}`);
}

//修改评论
export async function docomment(params) {
  return request(`/api/comment/${params.id}`,{
    method: 'PUT',
    data: params.comment,
  });
}
//删除评论
export async function deletecomment(params) {
  return request(`/api/comment/${params}`,{
    method: 'DELETE',
  });
}
