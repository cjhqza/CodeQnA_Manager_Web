import request from '@/utils/request'

const base_api = '/admin/data/dtComment'

// 知识列表
export const GetDtCommentList = (pageNum, pageSize, dtCommentDto) => {
  return request({
    url: `${base_api}/findByPage/${pageNum}/${pageSize}`,
    method: 'post',
    params: dtCommentDto,
  })
}

// 删评
export const DeleteDtComment = id => {
  return request({
    url: `${base_api}/deleteDtComment/${id}`,
    method: 'delete',
  })
}
