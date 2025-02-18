<template>
  <div class="dtComment">
    <!-- 搜索表单 -->
    <el-form label-width="70px" size="middle" class="search-form">
      <!-- 表单输入区 -->
      <div class="form-input">
        <el-form-item label="评者检索" class="input-user">
          <el-input
            style="width: 100%"
            placeholder="评论者名"
            v-model="dtCommentDto.userName"
          ></el-input>
        </el-form-item>
        <el-form-item label="发表时间" class="input-date">
          <el-date-picker
            v-model="createTimes"
            type="daterange"
            range-separator="To"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
      </div>
      <!-- 表单执行按钮区 -->
      <div class="form-btns">
        <el-button type="primary" size="middle" @click="searchDtComment">
          搜索
        </el-button>
        <el-button type="warning" size="middle" @click="reset">重置</el-button>
      </div>
    </el-form>
    <!--- 评论数据表格 -->
    <div class="comment-table">
      <el-table :data="commentList" stripe>
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="knowledgeId" label="知识ID" width="100" />
        <el-table-column
          prop="type"
          label="知识类型"
          width="120"
          #default="scope"
        >
          {{ scope.row.type == 0 ? '问答贴' : '文章' }}
        </el-table-column>
        <el-table-column prop="userName" label="评论者" width="180" />
        <el-table-column prop="parentId" label="上级评论ID" width="120" />
        <el-table-column
          prop="content"
          label="评论内容"
          min-width="120"
          show-overflow-tooltip
        >
          <template #default="scope">
            {{
              scope.row.parentId != 0 || scope.row.type == 1
                ? scope.row.content
                : '所属问答帖的一级评论建议通过预览完整查看'
            }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="发表时间" width="160" />
        <el-table-column
          label="操作"
          align="center"
          width="200"
          #default="scope"
        >
          <el-button
            type="success"
            size="small"
            @click="showDtComment(scope.row)"
          >
            预览
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click="deleteDtComment(scope.row.id)"
          >
            删评
          </el-button>
        </el-table-column>
      </el-table>
      <!-- 分页条 -->
      <el-pagination
        class="comment-pagination"
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
      class="dtCommentDialog"
      align-center
      center
      overflow
    >
      <template #header>
        <div class="dialog-header">
          <h1>CodeQnA 预览评论内容</h1>
        </div>
      </template>
      <div v-html="dtCommentVo.content"></div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="success" @click="close">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { DeleteDtComment, GetDtCommentList } from '@/api/dtComment'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, ref } from 'vue'

// 分页条数据模型
const total = ref(0)

// 定义评论表格数据模型
const commentList = ref([])

// 分页数据
const pageParamsForm = {
  pageNum: 1, // 当前页码
  pageSize: 10, // 每页记录数
}

// 将pageForms包装成支持响应式的对象
const pageParams = ref(pageParamsForm)

// 搜索表单输入存储数据
const dtCommentDto = ref({
  userName: '',
  beginCreateTime: '',
  endCreateTime: '',
})

// 开始和结束时间数据模型
const createTimes = ref([])

// 预览对话框显示设置变量
const dialogVisible = ref(false)

// 设置存储评论信息的数据
const dtCommentVoForm = {
  id: null,
  knowledgeId: null,
  type: null,
  userName: '',
  parentId: null,
  content: '',
  createTime: '',
}

// 将dtCommentVoForm包装成支持响应式的对象
const dtCommentVo = ref(dtCommentVoForm)

// 挂载
onMounted(() => {
  fetchData()
})

// 页面匹配数据
const fetchData = async () => {
  // 获取开始和结束时间
  if (createTimes.value.length == 2) {
    dtCommentDto.value.beginCreateTime = createTimes.value[0]
    dtCommentDto.value.endCreateTime = createTimes.value[1]
  }
  const { code, data, message } = await GetDtCommentList(
    pageParams.value.pageNum,
    pageParams.value.pageSize,
    dtCommentDto.value
  )
  if (code === 200) {
    commentList.value = data.list
    total.value = data.total
  } else {
    ElMessage.error(message)
  }
}

// 搜索按钮功能
const searchDtComment = () => {
  fetchData()
}

// 重置按钮功能
const reset = () => {
  if (createTimes.value.length > 0) {
    createTimes.value = []
    dtCommentDto.value.beginCreateTime = ''
    dtCommentDto.value.endCreateTime = ''
  }
  dtCommentDto.value.userName = ''
  fetchData()
}

// 预览按钮功能
const showDtComment = row => {
  dtCommentVo.value = { ...row }
  dialogVisible.value = true
}

// 关闭按钮功能
const close = () => {
  dialogVisible.value = false
}

// 删评按钮功能
const deleteDtComment = async id => {
  ElMessageBox.confirm('此操作将永久删除该记录，是否继续？', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const { code, data, message } = await DeleteDtComment(id)
    if (code === 200) {
      ElMessage.success('删评成功')
      fetchData()
    } else {
      ElMessage.error(message)
    }
  })
}
</script>

<style lang="scss" scoped>
.dtComment {
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

      .input-user {
        width: 40%;
        min-width: 200px;
        margin-right: 20px;
      }

      .input-date {
        flex: 1;
        min-width: 300px;
      }
    }

    .form-btns {
      flex: 1;
      min-width: 150px;
      display: flex;
      justify-content: center;
    }
  }

  .comment-table {
    min-width: 720px;
    border: 1px solid #ebeef5;
    border-radius: 3px;
    background-color: #fff;
    margin: 5px 0;
    /* 增加阴影效果 */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    /* 使子组件超出父组件范围的内容进行隐藏 */
    overflow: hidden;

    .comment-pagination {
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
