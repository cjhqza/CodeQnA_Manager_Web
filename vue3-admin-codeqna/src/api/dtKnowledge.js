import request from '@/utils/request'

const base_api = '/admin/data/dtKnowledge'

// 知识列表
export const GetDtKnowledgeList = (pageNum, pageSize, dtKnowledgeDto) => {
  return request({
    url: `${base_api}/findByPage/${pageNum}/${pageSize}`,
    method: 'post',
    params: dtKnowledgeDto,
  })
}

// 修改知识状态
export const EditDtKnowledge = id => {
  return request({
    url: `${base_api}/editDtKnowledge/${id}`,
    method: 'put',
  })
}

// 获取未审批的知识列表
export const GetDtKnowledgeListByOrder = (pageNum, pageSize) => {
  return request({
    url: `${base_api}/findByPageByOrder/${pageNum}/${pageSize}`,
    method: 'post',
  })
}

// 处理审批知识
export const ProcessDtKnowledge = (id, status) => {
  return request({
    url: `${base_api}/processDtKnowledge/${id}/${status}`,
    method: 'put',
  })
}
