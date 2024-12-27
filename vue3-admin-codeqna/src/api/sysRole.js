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
