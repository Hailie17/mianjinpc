/**
 * 面经相关接口
 */

import request from '@/utils/request'

// 获取文章列表
export const getArticleListAPI = params => {
  return request.get('/admin/interview/query', { params })
}
