import request from '@/utils/request'

const api_name = '/admin/statistcs/statsKnowledge'

// 知识统计
export const GetStatsKnowledgeData = statsKnowledgeDto => {
  return request({
    url: `${api_name}/getStatsKnowledgeData`,
    method: 'get',
    params: statsKnowledgeDto,
  })
}
