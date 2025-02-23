import request from '@/utils/request'

const base_api = '/admin/approval/aprvReport'

// 举报列表
export const GetAprvReportList = (pageNum, pageSize, status) => {
  return request({
    url: `${base_api}/findByPage/${pageNum}/${pageSize}/${status}`,
    method: 'post',
  })
}

// 举报信息获取
export const GetTargetInfo = (targetType, targetId) => {
  return request({
    url: `${base_api}/findTargetByTypeAndId/${targetType}/${targetId}`,
    method: 'post',
  })
}

// 获取被举报者信息
export const GetReportedUserInfo = (targetType, targetId) => {
  return request({
    url: `${base_api}/findReportedUserByTypeAndId/${targetType}/${targetId}`,
    method: 'post',
  })
}

// 提交举报处理结果
export const ProcessReport = (status, aprvReportProcess) => {
  return request({
    url: `${base_api}/processReport/${status}`,
    method: 'post',
    params: aprvReportProcess,
  })
}

// 获取举报处理结果
export const GetResolvedReport = reportId => {
  return request({
    url: `${base_api}/getResolvedReport/${reportId}`,
    method: 'post',
  })
}
