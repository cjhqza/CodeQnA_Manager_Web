<template>
  <div class="dtChat">
    <!--- 聊天会话数据表格 -->
    <div class="chat-table">
      <el-table :data="chatList" stripe>
        <el-table-column prop="id" label="会话ID" width="120" />
        <el-table-column prop="userName1" label="用户A" width="160" />
        <el-table-column prop="userName2" label="用户B" width="160" />
        <el-table-column
          prop="lastMessageTime"
          label="最近发送时间"
          width="240"
        />
        <el-table-column prop="createTime" label="创建时间" width="240" />
        <el-table-column
          label="操作"
          align="center"
          min-width="200"
          #default="scope"
        >
          <el-button type="warning" size="small" @click="getMessage(scope.row)">
            聊天记录
          </el-button>
        </el-table-column>
      </el-table>
      <!-- 分页条 -->
      <el-pagination
        class="chat-pagination"
        :pager-count="7"
        v-model:current-page="pageParams.pageNum"
        v-model:page-size="pageParams.pageSize"
        @size-change="fetchData"
        @current-change="fetchData"
        :page-sizes="[5, 10, 20, 50]"
        small
        background
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
      />
    </div>

    <!-- 聊天记录对话框 -->
    <el-dialog
      v-model="dialogVisible"
      class="dtChatDialog"
      align-center
      center
      overflow
    >
      <template #header>
        <div class="dialog-header">
          <h1>CodeQnA 聊天记录</h1>
        </div>
      </template>
      <div class="message-container">
        <div v-for="message in messageList" :key="message.id" class="message">
          <div
            v-if="message.senderId === dtChatVo.user1Id"
            class="message-user1"
          >
            <div class="message-content">
              {{ dtChatVo.userName1 }} : {{ message.content }}
            </div>
          </div>
          <div v-else class="message-user2">
            <div class="message-content">
              {{ dtChatVo.userName2 }} : {{ message.content }}
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="success" @click="close">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { GetDtChatList, GetMessageByChatId } from '@/api/dtChat'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, ref } from 'vue'

// 分页条数据模型
const total = ref(0)

// 定义评论表格数据模型
const chatList = ref([])

// 分页数据
const pageParamsForm = {
  pageNum: 1, // 当前页码
  pageSize: 10, // 每页记录数
}

// 将pageForms包装成支持响应式的对象
const pageParams = ref(pageParamsForm)

// 聊天记录对话框定义变量
const dialogVisible = ref(false)

// 聊天记录列表
const messageList = ref([])

// 设置存储会话用户相关信息
const dtChatVoForm = {
  id: null,
  userName1: '',
  userName2: '',
  lastMessageTime: '',
  createTime: '',
  user1Id: null,
  user2Id: null,
}

// 将dtChatVoForm包装成支持响应式的对象
const dtChatVo = ref(dtChatVoForm)

// 挂载
onMounted(() => {
  fetchData()
})

// 匹配页面数据
const fetchData = async () => {
  const { code, data, message } = await GetDtChatList(
    pageParams.value.pageNum,
    pageParams.value.pageSize
  )
  if (code === 200) {
    chatList.value = data.list
    total.value = data.total
  } else {
    ElMessage.error(message)
  }
}

// 聊天记录按钮功能
const getMessage = row => {
  ElMessageBox.confirm(
    '此操作涉及到用户隐私，请确保义务不泄露用户隐私，是否继续查看？',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    const { code, data, message } = await GetMessageByChatId(row.id)
    if (code === 200) {
      messageList.value = data
      dtChatVo.value = { ...row }
      // 打开消息记录对话框
      dialogVisible.value = true
    } else {
      ElMessage.error(message)
    }
  })
}

// 关闭按钮功能
const close = () => {
  dialogVisible.value = false
}
</script>

<style lang="scss" scoped>
.dtChat {
  .search-form {
    display: flex;
    min-width: 700px;
    height: 50px;
    padding-top: 15px;
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid #ebeef5;
    border-radius: 3px;
    background-color: #fff;
    /* 增加阴影效果 */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

    .form-input {
      display: flex;
      width: 85%;
      min-width: 500px;
      margin-right: 20px;

      .input-userA {
        width: 50%;
        min-width: 200px;
        margin-right: 20px;
      }

      .input-userB {
        flex: 1;
        min-width: 200px;
      }
    }

    .form-btns {
      flex: 1;
      min-width: 150px;
      display: flex;
      justify-content: center;
    }
  }

  .chat-table {
    min-width: 720px;
    border: 1px solid #ebeef5;
    border-radius: 3px;
    background-color: #fff;
    margin: 5px 0;
    /* 增加阴影效果 */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    /* 使子组件超出父组件范围的内容进行隐藏 */
    overflow: hidden;

    .chat-pagination {
      margin: 5px 0;
      width: 100%;
      min-width: 700px;
      box-sizing: border-box;
    }
  }

  :deep(.el-dialog) {
    min-width: 800px;

    .el-dialog__body {
      background-color: #eee;
      border-top: 1px solid #aaa;
      border-bottom: 1px solid #aaa;
      height: 500px;
      overflow: auto;
    }
  }

  .message-container {
    width: 100%;
    margin: 0 auto;

    .message {
      display: flex;
      margin-bottom: 10px;

      .message-content {
        padding: 10px;
        border-radius: 10px;
        background-color: #f1f1f1;
      }

      .message-user1 .message-content {
        background-color: #d1e7dd;
      }

      .message-user2 .message-content {
        background-color: #cfe2ff;
      }
    }
  }
}
</style>
