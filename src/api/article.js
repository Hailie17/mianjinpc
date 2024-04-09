/**
 * 面经相关接口
 */

import request from '@/utils/request'

// 获取文章列表
export const getArticleListAPI = params => {
  return request.get('/admin/interview/query', { params })
}

// 添加文章
export const addArticleAPI = data => {
  return request.post('/admin/interview/create', data)
}

// 删除面经
export const deleteArticleAPI = id => {
  return request({
    url: '/admin/interview/remove',
    method: 'DELETE',
    data: { id }
  })
}

// 获取面经详情
export const getArticleAPI = id => {
  return request({
    url: '/admin/interview/show',
    params: { id }
  })
}

// 修改面经
export const updateArticleAPI = data => {
  return request({
    method: 'PUT',
    url: '/admin/interview/update',
    data: data
  })
}
