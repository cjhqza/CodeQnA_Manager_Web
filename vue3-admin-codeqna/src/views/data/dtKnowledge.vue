<template>
  <div class="dtKnowledge">
    <!-- 搜索表单 -->
    <el-form label-width="70px" size="middle" class="search-form">
      <!-- 表单输入区 -->
      <div class="form-input">
        <el-form-item label="标题检索" class="input-title">
          <el-input
            style="width: 100%"
            placeholder="标题名"
            v-model="dtKnowledgeDto.title"
          ></el-input>
        </el-form-item>
        <el-form-item label="作者检索" class="input-user">
          <el-input
            style="width: 100%"
            placeholder="作者名"
            v-model="dtKnowledgeDto.userName"
          ></el-input>
        </el-form-item>
        <el-form-item label="标签检索" class="input-tag">
          <el-cascader
            v-model="dtKnowledgeDto.tagId"
            :options="options"
            :props="mergedProps"
            :show-all-levels="false"
            placeholder="请选择相关标签"
            @change="tagHandleChange"
            clearable
          />
        </el-form-item>
      </div>
      <!-- 表单执行按钮区 -->
      <div class="form-btns">
        <el-button type="primary" size="middle" @click="searchDtKnowledge">
          搜索
        </el-button>
        <el-button type="warning" size="middle" @click="reset">重置</el-button>
      </div>
    </el-form>
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
              v-for="(item, index) in scope.row.tagIds"
              :key="index"
              class="tag-atrr"
            >
              {{ tagMap[item] }}
            </el-tag>
          </div>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          #default="scope"
          width="120"
        >
          {{
            scope.row.status == -1
              ? '未通过'
              : scope.row.status == 0
              ? '待审批'
              : '已通过'
          }}
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column
          label="操作"
          align="center"
          width="200"
          #default="scope"
        >
          <el-button
            v-if="scope.row.status == 1"
            type="danger"
            size="small"
            @click="editDtKnowledge(scope.row.id)"
          >
            重审
          </el-button>
          <el-button v-else type="info" size="small" disabled>
            重审
          </el-button>
          <el-button
            type="success"
            size="small"
            @click="showDtKnowledge(scope.row)"
          >
            预览
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
      <!-- <el-form>
        <el-form-item prop="tagName">
          <el-input prefix-icon="PriceTag" v-model="dtTag.tagName" placeholder="标签名" clearable />
        </el-form-item>
        <el-form-item>
          <el-upload drag class="avatar-uploader" action="http://localhost:8501/admin/data/tagImgfileUpload"
            :show-file-list="false" :on-success="handleAvatarSuccess" :headers="headers">
            <img v-if="dtTag.img" :src="dtTag.img" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <upload-filled />
              <div class="avatar-uploader-text">
                拖拽文件 或
                <em>点击上传 标签代表图</em>
              </div>
            </el-icon>
            <template #tip>
              <div class="avatar-uploader-tip">
                * 未有文件上传将默认为该标签的代表图
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item prop="tagIntro">
          <div class="tagIntro-border">
            <el-input type="textarea" resize="none" style="border: 0" :rows="5" v-model="dtTag.tagIntro"
              placeholder="可以输入给出更多标签详细介绍" />
          </div>
        </el-form-item>
      </el-form> -->
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
import { EditDtKnowledge, GetDtKnowledgeList } from '@/api/dtKnowledge'
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

// 搜索表单输入存储数据
const dtKnowledgeDto = ref({
  title: '',
  userName: '',
  tagId: null,
})

// 级联选择器属性设置
const props = { checkStrictly: true }

// 级联选择器配置设置
const cascaderProps = {
  value: 'id',
  label: 'tagName',
  children: 'children',
}

// 合并级联选择器设置
const mergedProps = ref({
  ...cascaderProps,
  ...props,
})

// 级联选择器选项
const options = ref([])

// 标签映射集合
const tagMap = ref({})

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
  getTagListTree()
  fetchData()
})

// 为当前页面匹配数据
const fetchData = async () => {
  const { code, data, message } = await GetDtKnowledgeList(
    pageParams.value.pageNum,
    pageParams.value.pageSize,
    dtKnowledgeDto.value
  )
  if (code === 200) {
    knowledgeList.value = data.list
    total.value = data.total
  } else {
    ElMessage.error(message)
  }
}

// 获取标签树
const getTagListTree = async () => {
  const { code, data, message } = await GetDtTagListTree()
  if (code === 200) {
    options.value = data
    // 清空
    tagMap.value = {}
    buildTagMap(data)
  } else {
    ElMessage.error(message)
  }
}

// 递归构建标签映射
const buildTagMap = nodes => {
  nodes.forEach(node => {
    console.log(node)
    tagMap.value[node.id] = node.tagName
    if (node.children && node.children.length) {
      buildTagMap(node.children)
    }
  })
}

// 标签选项变动
const tagHandleChange = value => {
  dtKnowledgeDto.value.tagId = value[value.length - 1] // 只保留最后一个标签id值
}

// 搜索按钮功能
const searchDtKnowledge = () => {
  fetchData()
}

// 重置按钮功能
const reset = () => {
  dtKnowledgeDto.value.title = ''
  dtKnowledgeDto.value.userName = ''
  dtKnowledgeDto.value.tagId = null
  fetchData()
}

// 重申按钮功能
const editDtKnowledge = id => {
  ElMessageBox.confirm(`确定将该知识进行重新审核操作？`, 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const { code, data, message } = await EditDtKnowledge(id)
    if (code === 200) {
      ElMessage.success('已提交重申')
      fetchData()
    } else {
      ElMessage.error(message)
    }
  })
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
</script>

<style lang="scss" scoped>
.dtKnowledge {
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
      min-width: 600px;
      margin-right: 20px;

      .input-title {
        width: 40%;
        min-width: 200px;
        margin-right: 20px;
      }

      .input-user {
        width: 25%;
        min-width: 200px;
        margin-right: 20px;
      }

      .input-tag {
        flex: 1;
        min-width: 150px;
      }
    }

    .form-btns {
      flex: 1;
      min-width: 150px;
      display: flex;
      justify-content: center;
    }
  }

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
