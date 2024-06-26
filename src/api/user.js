import request from '@/utils/request'

// 登录接口
export const loginAPI = data => {
  return request.post('/auth/login', data)
}

// 获取用户信息
export const getUserAPI = () => {
  return request('/auth/currentUser')
}

// 获取统计数据
export const getLineAPI = () => {
  return request('/analysis/DailyVisitTrend')
}
