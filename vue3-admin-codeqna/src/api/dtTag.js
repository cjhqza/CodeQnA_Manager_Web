import request from '@/utils/request'

const base_api = '/admin/data/dtTag'

// 标签列表
export const GetDtTagListByPage = (pageNum, pageSize, dtTagDto) => {
  return request({
    // ``: 模板字符串
    url: `${base_api}/findByPage/${pageNum}/${pageSize}`, // 路径
    method: 'post', // 提交方式
    params: dtTagDto, // 其他参数
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
