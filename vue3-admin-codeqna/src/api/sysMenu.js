import request from '@/utils/request'

const api_name = '/admin/system/sysMenu'

// 菜单列表
export const FindNodes = () => {
  return request({
    url: `${api_name}/findNodes`,
    method: 'get',
  })
}

// 菜单添加
export const AddSysMenu = sysMenu => {
  return request({
    url: `${api_name}/addSysMenu`,
    method: 'post',
    data: sysMenu,
  })
}

// 菜单修改
export const EditSysMenu = sysMenu => {
  return request({
    url: `${api_name}/editSysMenu`,
    method: 'put',
    data: sysMenu,
  })
}

// 菜单删除
export const DeleteSysMenuById = id => {
  return request({
    url: `${api_name}/deleteSysMenuById/${id}`,
    method: 'delete',
  })
}
