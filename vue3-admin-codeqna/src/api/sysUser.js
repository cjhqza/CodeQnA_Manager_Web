import request from '@/utils/request'

const base_api = '/admin/system/sysUser'

// 管理员列表
export const GetSysUserListByPage = (pageNum, pageSize, sysUserDto) => {
  return request({
    // ``: 模板字符串
    url: `${base_api}/findByPage/${pageNum}/${pageSize}`, // 路径
    method: 'post', // 提交方式
    // 接口@RequestBody     前端 data:名称  ，以json格式传输
    // 接口没有注解，   前端 params:名称
    params: sysUserDto, // 其他参数
  })
}

// 人员添加
export const AddSysUser = sysUser => {
  return request({
    url: `${base_api}/addSysUser`, // 路径
    method: 'post', // 提交方式
    data: sysUser, // 其他参数
  })
}

// 人员修改
export const EditSysUser = sysUser => {
  return request({
    url: `${base_api}/editSysUser`,
    method: 'put',
    data: sysUser,
  })
}

// 人员删除
export const DeleteSysUser = sysUserId => {
  return request({
    url: `${base_api}/deleteSysUserById/${sysUserId}`,
    method: 'delete',
  })
}

// 人员分配角色
export const AssignRoleToUser = assignRoleDto => {
  return request({
    url: `${base_api}/assignRole`,
    method: 'post',
    data: assignRoleDto,
  })
}

// 人员查找
export const GetSysUserById = processorId => {
  return request({
    url: `${base_api}/getSysUserById/${processorId}`,
    method: 'post',
  })
}
