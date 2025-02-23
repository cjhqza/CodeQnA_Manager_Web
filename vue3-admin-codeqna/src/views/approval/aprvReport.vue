<template>
  <div class="aprvReport">
    <el-tabs
      v-model="activeName"
      type="border-card"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="(tab, index) in tabs"
        :key="index"
        :label="tab.label"
        :name="tab.name"
        :value="tab.value"
      >
        <!--- 举报数据表格 -->
        <div class="aprvReport-table">
          <el-table :data="aprvReportList" stripe>
            <el-table-column
              prop="targetType"
              label="举报类型"
              width="150"
              #default="scope"
            >
              {{
                scope.row.targetType == 0
                  ? '用户类'
                  : scope.row.targetType == 1
                  ? '知识类'
                  : '评论类'
              }}
            </el-table-column>
            <el-table-column prop="targetId" label="举报目标ID" width="150" />
            <el-table-column
              prop="reporterUserName"
              label="举报人"
              width="180"
            />
            <el-table-column
              prop="reportReason"
              label="举报原因"
              min-width="150"
              show-overflow-tooltip
            />
            <el-table-column prop="reportTime" label="举报时间" width="260" />
            <el-table-column
              label="操作"
              align="center"
              width="240"
              #default="scope"
            >
              <div v-if="scope.row.status === 0" class="btns-pending">
                <el-button
                  type="primary"
                  size="small"
                  @click="
                    getReportedInfo(scope.row.targetType, scope.row.targetId)
                  "
                >
                  查看
                </el-button>
                <el-button
                  type="warning"
                  size="small"
                  @click="aprvReportForFeedBack(scope.row)"
                >
                  审批
                </el-button>
                <el-button
                  type="danger"
                  size="small"
                  @click="rejectReport(scope.row)"
                >
                  拒绝
                </el-button>
              </div>
              <div v-else-if="scope.row.status === 1" class="btns-resolved">
                <el-button
                  type="success"
                  size="small"
                  @click="getResolvedAprvReport(scope.row)"
                >
                  处理结果
                </el-button>
              </div>
              <div v-else class="btns-rejected">
                <el-button
                  type="danger"
                  size="small"
                  @click="getRejectedAprvReport(scope.row)"
                >
                  拒绝原因
                </el-button>
              </div>
            </el-table-column>
          </el-table>
          <!-- 分页条 -->
          <el-pagination
            class="aprvReport-pagination"
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
      </el-tab-pane>
    </el-tabs>

    <!-- 举报信息对话框 -->
    <el-dialog
      v-model="reportDialogVisible"
      custom-class="ReportDialog"
      align-center
      center
    >
      <template #header>
        <div class="dialog-header">
          <h1>CodeQnA 举报对象信息</h1>
        </div>
      </template>
      <div v-if="reportInfo.content === undefined" class="reported-user">
        <el-form label-width="auto" class="report-form">
          <div class="top">
            <div class="left">
              <el-form-item label="用户名:">
                <el-input v-model="reportInfo.userName" disabled />
              </el-form-item>
              <el-form-item label="电话号码:">
                <el-input
                  v-model="reportInfo.phone"
                  placeholder="手机号码"
                  disabled
                />
              </el-form-item>
            </div>
            <div class="mid">
              <img :src="reportInfo.bgImgUrl" width="120" />
              <div>背景图</div>
            </div>
            <div class="right">
              <img :src="reportInfo.headImgUrl" width="70" />
              <div>用户头像</div>
            </div>
          </div>
          <div class="bottom">
            <el-form-item label="个性签名:">
              <el-input
                v-model="reportInfo.signture"
                style="margin-bottom: 8px"
                disabled
              />
            </el-form-item>
            <el-form-item label="自我介绍:" style="margin-bottom: 0;">
              <el-input
                type="textarea"
                class="report-textarea"
                v-model="reportInfo.selfIntro"
                disabled
              />
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div v-else class="reported-knowledgeOrComment">
        <el-form>
          <el-form-item>
            <el-input
              prefix-icon="User"
              v-model="reportInfo.userName"
              disabled
            />
          </el-form-item>
          <el-form-item v-if="reportInfo.title !== undefined">
            <el-input
              prefix-icon="Notebook"
              v-model="reportInfo.title"
              disabled
            />
          </el-form-item>
          <el-form-item v-if="reportInfo.tagNames !== undefined">
            <div class="tags-container">
              <span class="tag-label">相关标签：</span>
              <el-tag
                v-for="(item, index) in reportInfo.tagNames"
                :key="index"
                class="tag-atrr"
              >
                {{ item }}
              </el-tag>
            </div>
          </el-form-item>
          <el-form-item>
            <div v-html="reportInfo.content"></div>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="success" @click="reportDialogVisible = false">
            关闭
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 审批信息对话框 -->
    <el-dialog
      v-model="aprvReportDialogVisible"
      custom-class="aprvReportDialog"
      @closed="closeToInit"
      align-center
      center
    >
      <template #header>
        <div class="dialog-header">
          <h1>CodeQnA 审批回执反馈</h1>
        </div>
      </template>
      <div class="aprvReporter-container">
        <div v-if="reportedVisiable" class="reported-feedBack">
          <el-form label-width="auto">
            <el-form-item label="被举报人">
              <el-input v-model="reportProcess.reportedUserName" disabled />
            </el-form-item>
            <el-form-item label="处理措施" style="margin-bottom: 0;">
              <el-input
                type="textarea"
                v-model="aprvReportProcess.actionToken"
                :disabled="aprvReportProcess.id !== null"
              />
            </el-form-item>
          </el-form>
        </div>
        <div class="reporter-feedBack">
          <el-form label-width="auto">
            <el-form-item label="举报人">
              <el-input v-model="reportProcess.reporterUserName" disabled />
            </el-form-item>
            <el-form-item label="处理反馈" style="margin-bottom: 0;">
              <el-input
                type="textarea"
                v-model="aprvReportProcess.feedback"
                :disabled="aprvReportProcess.id !== null"
              />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="arpvReport-admin" v-if="aprvReportProcess.id !== null">
        <span>处理者：{{ aprvReportProcess.processorUserName }}</span>
        <span>处理时间：{{ aprvReportProcess.processTime }}</span>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            v-if="aprvReportProcess.id === null"
            type="success"
            @click="submit"
          >
            提交
          </el-button>
          <el-button type="primary" @click="close">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  GetAprvReportList,
  GetReportedUserInfo,
  GetResolvedReport,
  GetTargetInfo,
  ProcessReport,
} from '@/api/aprvReport'
import { GetUserinfo } from '@/api/login'
import { GetSysUserById } from '@/api/sysUser'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'

const tabs = ref([
  {
    label: '待处理',
    name: 'pending',
    value: 0,
  },
  {
    label: '已处理',
    name: 'resolved',
    value: 1,
  },
  {
    label: '已拒绝',
    name: 'rejected',
    value: -1,
  },
])

const activeName = ref(tabs.value[0].name)
const activeValue = ref(0)

// 分页条数据模型
const total = ref(0)

// 定义知识表格数据模型
const aprvReportList = ref([])

// 分页数据
const pageParamsForm = {
  pageNum: 1, // 当前页码
  pageSize: 10, // 每页记录数
}

// 将pageForms包装成支持响应式的对象
const pageParams = ref(pageParamsForm)

// 查看举报对象信息对话框
const reportDialogVisible = ref(false)

// 举报对象信息
const reportInfo = ref({})

// 审批举报对话框
const aprvReportDialogVisible = ref(false)

// 被举报者审批表
const reportedVisiable = ref(false)

const reportProcess = ref({
  reportedUserName: '',
  reporterUserName: '',
})

// 处理举报数据传递对象
const aprvReportProcess = ref({
  id: null,
  reportId: null,
  processorId: null,
  actionToken: '',
  feedback: '',
  processTime: '',
  // 其他信息
  processorUserName: '',
})

// 处理方式状态
const submitStatus = ref(0)

// 挂载
onMounted(() => {
  fetchData()
})

// 匹配页面数据
const fetchData = async () => {
  const { code, data, message } = await GetAprvReportList(
    pageParams.value.pageNum,
    pageParams.value.pageSize,
    activeValue.value
  )
  if (code === 200) {
    aprvReportList.value = data.list
    total.value = data.total
  } else {
    ElMessage.error(message)
  }
}

// tab选项点击事件
const handleClick = (tab, event) => {
  const selectTab = tabs.value.find(t => t.name === tab.props.name)
  activeValue.value = selectTab.value
  pageParams.value.pageNum = 1
  pageParams.value.pageSize = 10
  fetchData()
}

// 查看按钮功能
const getReportedInfo = async (targetType, targetId) => {
  const { code, data, message } = await GetTargetInfo(targetType, targetId)
  if (code === 200) {
    // 清空数据
    reportInfo.value = {}
    reportInfo.value = data
    // 打开对话框
    reportDialogVisible.value = true
  } else {
    ElMessage.error(message)
  }
}

// 获取被举报者信息
const getReportedUserInfo = async row => {
  const { code, data, message } = await GetReportedUserInfo(
    row.targetType,
    row.targetId
  )
  if (code !== 200) {
    throw new Error(message)
  }
  return data
}

// 获取当前举报处理的管理员信息
const getUserinfo = async () => {
  const { code, data, message } = await GetUserinfo()
  if (code != 200) {
    throw new Error(message)
  }
  return data
}

// 获取举报处理结果信息
const getResolvedReport = async id => {
  const { code, data, message } = await GetResolvedReport(id)
  if (code !== 200) {
    throw new Error(message)
  }
  return data
}

// 审批按钮功能
const aprvReportForFeedBack = async row => {
  try {
    // 获取被举报者信息
    reportProcess.value.reportedUserName = await getReportedUserInfo(row)
    // 获取当前举报处理的管理员信息
    aprvReportProcess.value.processorId = (await getUserinfo()).id
    reportProcess.value.reporterUserName = row.reporterUserName
    aprvReportProcess.value.reportId = row.id
    // 设置举报处理状态
    submitStatus.value = 1
    aprvReportDialogVisible.value = true
    reportedVisiable.value = true
  } catch (error) {
    ElMessage.error(error.message)
  }
}

// 取消按钮功能
const close = () => {
  aprvReportDialogVisible.value = false
}

// 关闭审批对话框完全消失后操作
const closeToInit = () => {
  reportedVisiable.value = false
  aprvReportProcess.value.id = null
  aprvReportProcess.value.reportId = null
  aprvReportProcess.value.processorId = null
  aprvReportProcess.value.actionToken = ''
  aprvReportProcess.value.feedback = ''
}

// 拒绝按钮功能
const rejectReport = async row => {
  try {
    // 获取当前举报处理的管理员信息
    aprvReportProcess.value.processorId = (await getUserinfo()).id
    reportProcess.value.reporterUserName = row.reporterUserName
    submitStatus.value = -1
    aprvReportProcess.value.reportId = row.id
    aprvReportDialogVisible.value = true
  } catch (error) {
    ElMessage.error(error.message)
  }
}

// 提交按钮功能
const submit = async () => {
  const { code, data, message } = await ProcessReport(
    submitStatus.value,
    aprvReportProcess.value
  )
  if (code === 200) {
    ElMessage.success('处理已提交')
    close()
    fetchData()
  } else {
    ElMessage.error(message)
  }
}

// 获取当时处理举报的管理员信息
const getSysUserById = async processorId => {
  const { code, data, message } = await GetSysUserById(processorId)
  if (code !== 200) {
    throw new Error(message)
  }
  return data
}

// 处理结果按钮功能
const getResolvedAprvReport = async row => {
  try {
    // 获取被举报者信息
    reportProcess.value.reportedUserName = await getReportedUserInfo(row)
    // 获取举报处理结果信息
    aprvReportProcess.value = await getResolvedReport(row.id)
    // 获取当时处理举报的管理员信息
    aprvReportProcess.value.processorUserName = (
      await getSysUserById(aprvReportProcess.value.processorId)
    ).userName
    reportProcess.value.reporterUserName = row.reporterUserName
    aprvReportDialogVisible.value = true
    reportedVisiable.value = true
  } catch (error) {
    ElMessage.error(error.message)
  }
}

// 拒绝原因按钮功能
const getRejectedAprvReport = async row => {
  try {
    // 获取举报处理结果信息
    aprvReportProcess.value = await getResolvedReport(row.id)
    // 获取当时处理举报的管理员信息
    aprvReportProcess.value.processorUserName = (
      await getSysUserById(aprvReportProcess.value.processorId)
    ).userName
    reportProcess.value.reporterUserName = row.reporterUserName
    aprvReportDialogVisible.value = true
  } catch (error) {
    ElMessage.error(error.message)
  }
}
</script>

<style lang="scss" scoped>
.aprvReport {
  .aprvReport-table {
    width: 100%;
    /* min-width: 720px; */
    border: 1px solid #ebeef5;
    border-radius: 3px;
    background-color: #fff;
    margin: 5px 0;
    /* 增加阴影效果 */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    /* 使子组件超出父组件范围的内容进行隐藏 */
    overflow: hidden;

    .aprvReport-pagination {
      margin: 5px 0;
      width: 100%;
      min-width: 700px;
      box-sizing: border-box;
    }
  }

  :deep(.ReportDialog) {
    min-width: 800px;

    .el-dialog__body {
      border-top: 1px solid #aaa;
      border-bottom: 1px solid #aaa;
      height: 500px;
      overflow: auto;
    }

    .top {
      display: flex;
      margin-bottom: 8px;

      .left {
        margin-right: 120px;
      }

      .mid {
        margin-right: 120px;

        div {
          text-align: center;
          font-weight: 900;
        }
      }

      .right {
        div {
          text-align: center;
          font-weight: 900;
        }
      }
    }

    .tags-container {
      // width: 100%;
      .tag-label {
        font-weight: 900;
      }

      .tag-atrr {
        margin-right: 8px;
      }
    }
  }

  :deep(.aprvReportDialog) {
    width: 800px;
    min-width: 600px;

    .el-dialog__body {
      border-top: 1px solid #aaa;
      border-bottom: 1px solid #aaa;
      height: 350px;
      overflow: auto;
    }

    .aprvReporter-container {
      display: flex;
      justify-content: space-between;

      .reported-feedBack {
        min-width: 350px;
        margin-right: 20px;
      }

      .reporter-feedBack {
        flex: 1;
      }
    }

    .arpvReport-admin {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      margin-top: 25px;
      // padding: 0 15px;
    }
  }

  .report-textarea :deep(textarea) {
    height: 330px;
    resize: none;
  }

  .reported-feedBack :deep(textarea) {
    background-color: #f5f7fa;
    height: 300px;
    resize: none;
  }

  .reporter-feedBack :deep(textarea) {
    background-color: #f5f7fa;
    height: 300px;
    resize: none;
  }
}
</style>
