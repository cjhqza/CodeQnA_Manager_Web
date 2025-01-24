import request from '@/utils/request'

const base_api = '/admin/data/dtTag'

// 标签列表
export const GetDtTagListTree = () => {
  return request({
    url: `${base_api}/findAll`,
    method: 'get',
  })
}

// 标签新建
export const AddDtTag = dtTag => {
  return request({
    url: `${base_api}/addDtTag`,
    method: 'post',
    data: dtTag,
  })
}

// 标签修改
export const EditDtTag = dtTag => {
  return request({
    url: `${base_api}/editDtTag`,
    method: 'put',
    data: dtTag,
  })
}

// 标签删除
export const DeleteDtTag = dtTagId => {
  return request({
    url: `${base_api}/deleteDtTag/${dtTagId}`,
    method: 'delete',
  })
}
