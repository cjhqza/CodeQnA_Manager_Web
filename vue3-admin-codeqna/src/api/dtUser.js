import request from '@/utils/request'

const base_api = '/admin/data/dtUser'

// 用户列表
export const GetDtUserListByPage = (pageNum, pageSize, dtUserDto) => {
  return request({
    // ``: 模板字符串
    url: `${base_api}/findByPage/${pageNum}/${pageSize}`, // 路径
    method: 'post', // 提交方式
    params: dtUserDto, // 其他参数
  })
}

// 修改用户状态
export const EditDtUser = id => {
  return request({
    url: `${base_api}/editDtUser/${id}`,
    method: 'put',
  })
}

// 用户删除
export const DeleteDtUser = dtUserId => {
  return request({
    url: `${base_api}/deleteDtUser/${dtUserId}`,
    method: 'delete',
  })
}
