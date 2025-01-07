import request from '@/utils/request'

const base_api = '/admin/system/sysRole'

// 分页查询角色列表数据
export const GetSysRoleListByPage = (pageNum, pageSize, sysRoleDto) => {
  return request({
    url: `${base_api}/findByPage/${pageNum}/${pageSize}`, // 接口路径
    method: 'post', // 提交方式
    // 如果接口有@RequestBody，则使用data: 名称，会以JSON格式传输
    // 否则，则使用params: 名称
    data: sysRoleDto,
  })
}

// 角色添加
export const AddSysRole = sysRole => {
  return request({
    url: `${base_api}/addSysRole`,
    method: 'post',
    data: sysRole,
  })
}

// 角色修改
export const EditSysRole = sysRole => {
  return request({
    url: `${base_api}/editSysRole`, // 路径
    method: 'put', // 提交方式
    data: sysRole, // 其他参数
  })
}

// 角色删除
export const DeleteSysRole = roleId => {
  return request({
    url: `${base_api}/deleteSysRoleById/${roleId}`, // 路径
    method: 'delete', // 提交方式
  })
}

// 角色集合
export const GetRolesList = userId => {
  return request({
    url: `${base_api}/findAllRoles/${userId}`,
    method: 'get',
  })
}

// 查询所有菜单以及根据角色id查找对应的菜单id
export const FindMenuIdByRoleId = roleId => {
  return request({
    url: `${base_api}/findMenuIdByRoleId/${roleId}`,
    method: 'get',
  })
}

// 分配菜单提交
export const DoAssign = assignMenuDto => {
  return request({
    url: `${base_api}/doAssign`,
    method: 'post',
    data: assignMenuDto,
  })
}
