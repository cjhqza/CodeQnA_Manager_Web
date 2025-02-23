<template>
  <div class="aprvKnowledge">
    <!--- 知识数据表格 -->
    <div class="knowledge-table">
      <el-table :data="knowledgeList" stripe>
        <el-table-column
          prop="type"
          label="知识类型"
          width="120"
          #default="scope"
        >
          {{ scope.row.type == 0 ? '问答贴' : '文章' }}
        </el-table-column>
        <el-table-column prop="userName" label="创作作者" width="140" />
        <el-table-column
          prop="title"
          label="创作标题"
          min-width="140"
          show-overflow-tooltip
        />
        <el-table-column
          prop="tagIds"
          label="相关标签"
          #default="scope"
          show-overflow-tooltip
        >
          <div class="tags-container">
            <el-tag
              v-for="(item, index) in scope.row.tagNames"
              :key="index"
              class="tag-atrr"
            >
              {{ item }}
            </el-tag>
          </div>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column
          label="操作"
          align="center"
          width="200"
          #default="scope"
        >
          <el-button
            type="primary"
            size="small"
            @click="showDtKnowledge(scope.row)"
          >
            预览
          </el-button>
          <el-button
            type="success"
            size="small"
            @click="processDtKnowledge(scope.row.id, 1)"
          >
            通过
          </el-button>
          <el-button
            type="warning"
            size="small"
            @click="processDtKnowledge(scope.row.id, -1)"
          >
            打回
          </el-button>
        </el-table-column>
      </el-table>
      <!-- 分页条 -->
      <el-pagination
        class="knowledge-pagination"
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

    <!-- 预览知识对话框 -->
    <el-dialog
      v-model="dialogVisible"
      class="dtKnowledgeDialog"
      align-center
      center
      overflow
    >
      <template #header>
        <div class="dialog-header">
          <h1>CodeQnA 预览知识内容</h1>
        </div>
      </template>
      <div v-html="dtKnowledgeVo.content"></div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="success" @click="close">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  GetDtKnowledgeListByOrder,
  ProcessDtKnowledge,
} from '@/api/dtKnowledge'
import { GetDtTagListTree } from '@/api/dtTag'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, ref } from 'vue'

// 分页条数据模型
const total = ref(0)

// 定义知识表格数据模型
const knowledgeList = ref([])

// 分页数据
const pageParamsForm = {
  pageNum: 1, // 当前页码
  pageSize: 10, // 每页记录数
}

// 将pageForms包装成支持响应式的对象
const pageParams = ref(pageParamsForm)

// 预览对话框显示设置变量
const dialogVisible = ref(false)

// 设置存储知识信息的数据
const dtKnowledgeVoForm = {
  id: null,
  type: null,
  userName: '',
  title: '',
  content: '',
  status: null,
  createTime: '',
  tagIds: [],
}

// 将dtKnowledgeVoForm包装成支持响应式的对象
const dtKnowledgeVo = ref(dtKnowledgeVoForm)

// 挂载
onMounted(() => {
  fetchData()
})

// 为当前页面匹配数据
const fetchData = async () => {
  const { code, data, message } = await GetDtKnowledgeListByOrder(
    pageParams.value.pageNum,
    pageParams.value.pageSize
  )
  if (code === 200) {
    knowledgeList.value = data.list
    total.value = data.total
  } else {
    ElMessage.error(message)
  }
}

// 预览按钮功能
const showDtKnowledge = row => {
  // 数据回显
  dtKnowledgeVo.value = { ...row }
  // 设置显示对话框
  dialogVisible.value = true
}

// 关闭按钮对话框
const close = () => {
  dialogVisible.value = false
}

// 通过或打回按钮功能
const processDtKnowledge = (id, status) => {
  ElMessageBox.confirm(`确定处理该知识操作？`, 'warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const { code, data, message } = await ProcessDtKnowledge(id, status)
    if (code === 200) {
      ElMessage.success('审批完成')
      fetchData()
    } else {
      ElMessage.error(message)
    }
  })
}
</script>

<style lang="scss" scoped>
.aprvKnowledge {
  .tags-container {
    width: 100%;

    .tag-atrr {
      margin-right: 8px;
    }
  }

  .knowledge-table {
    min-width: 720px;
    border: 1px solid #ebeef5;
    border-radius: 3px;
    background-color: #fff;
    margin: 5px 0;
    /* 增加阴影效果 */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    /* 使子组件超出父组件范围的内容进行隐藏 */
    overflow: hidden;

    .knowledge-pagination {
      margin: 5px 0;
      width: 100%;
      min-width: 700px;
      box-sizing: border-box;
    }
  }

  :deep(.el-dialog) {
    min-width: 800px;

    .el-dialog__body {
      border-top: 1px solid #aaa;
      border-bottom: 1px solid #aaa;
      height: 500px;
      overflow: auto;
    }
  }
}
</style>
