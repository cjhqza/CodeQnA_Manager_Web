/*
 * @Descripttion:
 * @version:
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2021-04-21 09:36:55
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
 */
import request from '@/utils/request'

// 管理员用户登录接口
export const Login = data => {
  return request({
    url: '/admin/system/index/login',
    method: 'post',
    data,
  })
}

// 获取图片验证码
export const GetValidateCode = () => {
  return request({
    url: '/admin/system/index/generateValidateCode',
    method: 'get',
  })
}

// 获取登录管理用户信息
export const GetUserinfo = () => {
  return request({
    url: '/admin/system/index/getSysUserInfo',
    method: 'get',
  })
}

// 管理员用户登出功能
export const Logout = () => {
  return request({
    url: '/admin/system/index/logout',
    method: 'get',
  })
}
