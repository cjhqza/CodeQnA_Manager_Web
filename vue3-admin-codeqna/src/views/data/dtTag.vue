<template>
  <div class="dtTag">
    <!-- 搜索表单 -->
    <el-form label-width="70px" size="middle" class="search-form">
      <!-- 表单输入区 -->
      <div class="form-input">
        <el-form-item label="标签检索" class="input-item">
          <el-input
            placeholder="请输入相关标签名的内容"
            v-model="tagNameStore"
          ></el-input>
        </el-form-item>
      </div>
      <!-- 表单执行按钮区 -->
      <div class="form-btns">
        <el-button type="primary" size="middle" @click="searchDtTag">
          搜索
        </el-button>
        <el-button type="warning" size="middle" @click="reset">
          重置
        </el-button>
      </div>
    </el-form>

    <!-- 操作按钮区 -->
    <div class="tools-btns">
      <div class="btns-func">
        <svg
          t="1735394541511"
          class="btn-icon"
          viewBox="0 0 1102 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="15612"
          width="22"
          height="22"
        >
          <path
            d="M992.492308 244.184615h-157.538462V149.661538c0-39.384615-31.507692-78.769231-78.769231-78.76923H346.584615c-39.384615 0-78.769231 31.507692-78.76923 78.76923v94.523077h-157.538462c-23.630769 0-39.384615 15.753846-39.384615 39.384616v638.030769c0 23.630769 15.753846 39.384615 39.384615 39.384615h874.338462c23.630769 0 39.384615-15.753846 39.384615-39.384615V283.569231c7.876923-23.630769-7.876923-39.384615-31.507692-39.384616z m-638.03077 0V157.538462h385.969231v86.646153H354.461538zM472.615385 708.923077h157.538461c23.630769 0 39.384615-15.753846 39.384616-39.384615v-63.015385H945.230769v267.815385H157.538462V606.523077h283.56923v55.138461c-7.876923 23.630769 15.753846 47.261538 31.507693 47.261539z m157.538461-275.692308H472.615385c-15.753846 0-39.384615 15.753846-39.384616 39.384616v55.138461H157.538462V322.953846h787.692307v204.8H669.538462V472.615385c0-23.630769-23.630769-39.384615-39.384616-39.384616z m-47.261538 78.769231v110.276923h-63.015385V512h63.015385z"
            fill="#777E8C"
            p-id="15613"
          ></path>
        </svg>
        <el-button
          type="success"
          size="small"
          @click="addDtTag"
          class="btns-add"
        >
          <svg
            t="1735288207672"
            class="add-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2342"
            width="16"
            height="16"
          >
            <path
              d="M512 128a382.6 382.6 0 1 1-149.45 30.15A381.54 381.54 0 0 1 512 128m0-64C264.58 64 64 264.58 64 512s200.58 448 448 448 448-200.58 448-448S759.42 64 512 64z"
              p-id="2343"
              fill="#ffffff"
            ></path>
            <path
              d="M704 448H320a64 64 0 0 0 0 128h384a64 64 0 0 0 0-128z"
              p-id="2344"
              fill="#ffffff"
            ></path>
            <path
              d="M512 320v384-384m0-64a64 64 0 0 0-64 64v384a64 64 0 0 0 128 0V320a64 64 0 0 0-64-64z"
              p-id="2345"
              fill="#ffffff"
            ></path>
          </svg>
          &nbsp;新 建
        </el-button>
      </div>
      <span class="btns-flush" @click="flushDtTag">
        <svg
          t="1735391304416"
          class="flush-icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="13703"
          width="16"
          height="16"
        >
          <path
            d="M524.27 91.13C290.33 91.131 100 278.743 100 509.34c0 233.945 190.32 424.27 424.26 424.27 165.506 0 322.684-98.488 391.11-245.08 12.23-26.188 0.77-57.523-25.48-69.82-6.992-3.244-14.428-4.89-22.09-4.89-20.374 0-39.076 11.879-47.65 30.26-51.433 110.272-170.346 184.36-295.89 184.36-176.01 0-319.2-143.147-319.2-319.1 0-84.963 33.386-164.165 94.01-223.02 59.937-58.187 139.91-90.24 225.19-90.24 73.003 0 144.497 25.384 201.3 71.47l31.74 25.76-82.23 81.03c-2.779 2.776-1.777 6.211-1.22 7.56 0.662 1.598 2.308 4.28 5.95 4.28l120.72 0.18 113.3 0.18c1.855 0 3.464-0.969 4.52-1.83 1.629-1.475 2.475-3.245 2.52-5.26V344.7l0.74-199.29v-0.08c0.015-1.766-0.556-3.213-1.74-4.41-1.415-1.427-3.55-2.31-5.58-2.31l-82.74 81.54-25.14-22.08c-20.63-18.122-42.681-34.158-65.53-47.66l-0.2-0.12c-29.979-17.958-62.78-32.202-97.48-42.34-39.035-11.156-79.04-16.82-118.92-16.82z"
            p-id="13704"
            fill="#8a8a8a"
          ></path>
        </svg>
        刷新
      </span>
    </div>

    <!--- 标签表格数据 -->
    <div class="tag-table">
      <el-table :data="tagList" stripe>
        <el-table-column prop="img" label="代表图" width="100" #default="scope">
          <img v-if="scope.row.img" :src="scope.row.img" width="30" />
          <svg
            v-else
            t="1737119625611"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3392"
            width="24"
            height="24"
          >
            <path
              d="M857.316939 175.895145l-147.874802-76.33449L561.427699 23.27271C454.978322-31.790522 326.373325 14.475626 274.149363 126.510453l-33.978157 72.936675a199.12131 199.12131 0 0 1 21.178166-1.11709h329.541579c118.551187 0 214.66748 101.189745 214.66748 225.978017V800.069236l149.9228-321.815038c52.223962-112.034828 8.285085-247.435456-98.164292-302.359053z"
              fill="#BFC5D0"
              opacity=".5"
              p-id="3393"
            ></path>
            <path
              d="M805.558431 797.648874V424.308055c0-124.788273-96.116294-225.978017-214.66748-225.978017h-329.541579C142.798186 198.330038 46.588801 299.519782 46.588801 424.308055v373.340819c-2.792725 148.945346 62.557045 252.741634 177.244962 220.439113 60.509047-17.082169 147.036984-162.257337 202.193308-162.257337 60.927956-1.256726 141.498079 145.175167 202.193307 162.257337 114.781007 32.302522 180.084233-71.586857 177.338053-220.439113z m-379.43827-316.50886a74.472673 74.472673 0 1 1 74.472674-74.472673 74.472673 74.472673 0 0 1-74.472674 74.426127z"
              fill="#BFC5D0"
              p-id="3394"
            ></path>
          </svg>
        </el-table-column>
        <el-table-column prop="tagName" label="标签名" width="180" />
        <el-table-column
          prop="tagIntro"
          label="标签介绍"
          min-width="300"
          show-overflow-tooltip
        />
        <el-table-column prop="createTime" label="创建时间" width="160" />
        <el-table-column
          label="操作"
          align="center"
          width="240"
          #default="scope"
        >
          <el-button type="primary" size="small" @click="editDtTag(scope.row)">
            修改
          </el-button>
          <el-button type="danger" size="small" @click="deleteDtTag(scope.row)">
            删除
          </el-button>
        </el-table-column>
      </el-table>
      <!--分页条-->
      <el-pagination
        class="tag-pagination"
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

    <!-- 新建或修改标签表单弹出框 -->
    <el-dialog
      v-model="dialogVisible"
      width="400px"
      class="dtTagDialog"
      align-center
      center
    >
      <template #header>
        <div class="dialog-header">
          <h1>{{ dtTagDialogTitle }}</h1>
        </div>
      </template>
      <el-form>
        <el-form-item prop="tagName">
          <el-input
            prefix-icon="PriceTag"
            v-model="dtTag.tagName"
            placeholder="标签名"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-upload
            drag
            class="avatar-uploader"
            action="http://localhost:8501/admin/data/tagImgfileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :headers="headers"
          >
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
            <el-input
              type="textarea"
              resize="none"
              style="border: 0"
              :rows="5"
              v-model="dtTag.tagIntro"
              placeholder="可以输入给出更多标签详细介绍"
            />
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, ref } from 'vue'
import {
  AddDtTag,
  DeleteDtTag,
  EditDtTag,
  GetDtTagListByPage,
} from '@/api/dtTag'
import { useApp } from '@/pinia/modules/app'

// 分页条总记录数
let total = ref(0)

// 定义标签表格数据模型
let tagList = ref([])

// 分页数据
const pageParamsForm = {
  pageNum: 1, // 当前页码
  pageSize: 10, // 每页记录数
}

// 将pageForms包装成支持响应式的对象
const pageParams = ref(pageParamsForm)

// 搜索表单输入存储数据
const dtTagDto = ref({ tagName: '' })
// 搜索表单输入绑定数据
const tagNameStore = ref('')

// 标签对话框显示设置变量
const dialogVisible = ref(false)

// 设置存储标签信息的数据
const dtTagForm = {
  img: '',
  id: '', // 该id将用来区分管理员操作新建或是修改
  tagName: '', // 标签名称
  tagIntro: '', // 标签介绍
}

// 将dtTagForm包装成支持响应式的对象
const dtTag = ref(dtTagForm)

// 定义对话框标题数据
const dtTagDialogTitle = ref('')

// 挂载
onMounted(() => {
  fetchData()
})

// 页面匹配数据
const fetchData = async () => {
  const { code, data, message } = await GetDtTagListByPage(
    pageParams.value.pageNum,
    pageParams.value.pageSize,
    dtTagDto.value
  )
  if (code === 200) {
    tagList.value = data.list
    total.value = data.total
  } else {
    ElMessage.error(message)
  }
}

// 搜索按钮功能
const searchDtTag = () => {
  dtTagDto.value.tagName = tagNameStore.value
  fetchData()
}

// 重置按钮功能
const reset = () => {
  tagNameStore.value = ''
  dtTagDto.value.tagName = ''
  fetchData()
}

// 新建按钮功能
const addDtTag = () => {
  // 新建标签，存储数据初始化
  dtTag.value = {}
  // 设置对应的标题
  dtTagDialogTitle.value = 'CodeQnA 新建标签数据'
  // 设置显示弹出框
  dialogVisible.value = true
}

// 刷新按钮功能
const flushDtTag = () => {
  fetchData()
}

// 修改按钮功能
const editDtTag = row => {
  // 使用对象拓展运算符，将当前标签数据回显
  dtTag.value = { ...row }
  // 设置对应的标题
  dtTagDialogTitle.value = 'CodeQnA 修改标签数据'
  // 设置显示弹出框
  dialogVisible.value = true
}

// 新建或修改提交按钮功能
const submit = async () => {
  if (!dtTag.value.id) {
    // 执行新建标签数据操作
    const { code, data, message } = await AddDtTag(dtTag.value)
    if (code === 200) {
      // 关闭弹出框
      dialogVisible.value = false
      // 提示信息
      ElMessage.success('新建成功')
      // 刷新页面
      fetchData()
    } else {
      ElMessage.error(message)
    }
  } else {
    // 执行修改标签数据操作
    const { code, data, message } = await EditDtTag(dtTag.value)
    if (code === 200) {
      // 关闭弹出框
      dialogVisible.value = false
      // 提示信息
      ElMessage.success('修改成功')
      // 刷新页面
      fetchData()
    } else {
      ElMessage.error(message)
    }
  }
}

// 删除按钮功能
const deleteDtTag = row => {
  ElMessageBox.confirm('此操作将永久删除该记录，是否继续？', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    // 执行删除标签数据操作
    const { code, data, message } = await DeleteDtTag(row.id)
    if (code === 200) {
      // 提示信息
      ElMessage.success('删除成功')
      // 刷新页面
      fetchData()
    } else {
      ElMessage.error(message)
    }
  })
}

// 文件上传功能
// 从pinia中获取token，在进行文件上传的时候将token设置到请求头中
const headers = {
  token: useApp().authorization.token,
}
// 图像上传成功以后的事件处理函数
const handleAvatarSuccess = (response, uploadFile) => {
  dtTag.value.img = response.data
}
</script>

<style scoped>
.dtTag {
  .search-form {
    display: flex;
    min-width: 300px;
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
      width: 85%;
      min-width: 150px;
      margin-right: 10px;
    }

    .form-btns {
      flex: 1;
      min-width: 150px;
      display: flex;
      justify-content: center;
    }
  }

  .tools-btns {
    display: flex;
    justify-content: space-between;
    min-width: 300px;
    margin: 5px 0;
    padding: 10px;
    border: 1px solid #ebeef5;
    border-radius: 3px;
    background-color: #fff;
    /* 增加阴影效果 */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

    .btns-func {
      display: flex;

      .btn-icon {
        margin-right: 10px;
      }

      .btns-add {
        width: 60px;
      }
    }

    .btns-flush {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      color: #8a8a8a;
      font-weight: 400;

      .flush-icon {
        margin-right: 2px;
      }
    }
  }

  .tag-table {
    min-width: 300px;
    border: 1px solid #ebeef5;
    border-radius: 3px;
    background-color: #fff;
    /* 增加阴影效果 */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    /* 使子组件超出父组件范围的内容进行隐藏 */
    overflow: hidden;

    .tag-pagination {
      margin: 5px 0;
      width: 100%;
      min-width: 700px;
      box-sizing: border-box;
    }
  }

  .avatar-uploader {
    .avatar {
      width: 150px;
      height: 150px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .avatar-uploader-icon {
      display: flex;
      flex-direction: column;
      font-size: 30px;
      color: #8c939d;
      width: 150px;
      height: 150px;
      text-align: center;

      .avatar-uploader-text {
        margin-top: 5px;
        font-size: 12px;
      }
    }

    .avatar-uploader-tip {
      font-size: 10px;
      color: #8c939d;
    }
  }

  .tagIntro-border {
    width: 100%;
    padding: 10px 5px;
    position: relative;
    font-size: 15px;
    color: #aaa;
    font-weight: 500;
    text-align: center;
    border: 2px solid #ebeef5;
    border-radius: 8px;

    :deep(textarea) {
      border: none;
      box-shadow: none;
    }
  }

  .tagIntro-border::before {
    content: '标签介绍';
    position: absolute;
    top: -15px;
    left: 13%;
    transform: translateX(-50%);
    background: white;
    padding: 0 5px;
  }
}

/* ::v-deep(.el-textarea__inner) {
  border: 0;
} */
</style>
