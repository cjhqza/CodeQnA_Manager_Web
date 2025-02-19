import request from '@/utils/request'

const base_api = '/admin/data/dtChat'

// 会话列表
export const GetDtChatList = (pageNum, pageSize) => {
  return request({
    url: `${base_api}/findByPage/${pageNum}/${pageSize}`,
    method: 'post',
  })
}

// 会话消息记录
export const GetMessageByChatId = chatId => {
  return request({
    url: `${base_api}/getMessageByChatId/${chatId}`,
    method: 'post',
  })
}
