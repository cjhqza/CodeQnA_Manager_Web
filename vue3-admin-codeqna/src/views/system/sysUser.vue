<template>
  <div class="sysUser">
    <!-- 搜索表单 -->
    <el-form label-width="70px" size="middle" class="search-form">
      <!-- 表单输入区 -->
      <div class="form-input">
        <el-form-item label="人员检索" class="input-name">
          <el-input
            style="width: 100%"
            placeholder="人员名称"
            v-model="userNameStore"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建时间" class="input-date">
          <el-date-picker
            v-model="createTimesStore"
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
        <el-button type="primary" size="middle" @click="searchSysUser">
          搜索
        </el-button>
        <el-button type="warning" size="middle" @click="reset">重置</el-button>
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
          @click="addSysUser"
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
        <el-upload
          class="upload-sysUser"
          action="http://localhost:8501/admin/system/sysUser/importData"
          :show-file-list="false"
          :on-success="importSysUserSuccess"
          :headers="headers"
        >
          <el-button type="warning" size="small" class="btns-import">
            <svg
              t="1745510016933"
              class="import-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3744"
              width="16"
              height="16"
            >
              <path
                d="M880.213333 870.4h-716.8V153.6h318.293334V85.333333H146.346667c-28.16 0-51.2 23.04-51.2 51.2v750.933334c0 28.16 23.04 51.2 51.2 51.2h750.933333c28.16 0 51.2-23.04 51.2-51.2v-346.88h-68.266667V870.4z"
                fill="#ffffff"
                p-id="3745"
              ></path>
              <path
                d="M914.346667 763.733333c-18.773333 0-34.133333-15.36-34.133334-34.133333v-200.533333c0-18.773333 15.36-34.133333 34.133334-34.133334s34.133333 15.36 34.133333 34.133334v200.533333c0 18.773333-14.933333 34.133333-34.133333 34.133333zM504.746667 153.6h-89.6c-18.773333 0-34.133333-15.36-34.133334-34.133333s15.36-34.133333 34.133334-34.133334h89.6c18.773333 0 34.133333 15.36 34.133333 34.133334s-14.933333 34.133333-34.133333 34.133333zM688.64 600.746667h-220.16c-19.2 0-34.986667-15.786667-34.986667-34.986667 0-19.2 15.786667-34.986667 34.986667-34.986667h220.16c19.2 0 34.986667 15.786667 34.986667 34.986667 0 19.2-15.36 34.986667-34.986667 34.986667z"
                fill="#ffffff"
                p-id="3746"
              ></path>
              <path
                d="M433.493333 565.76V345.6c0-19.2 15.786667-34.986667 34.986667-34.986667 19.2 0 34.986667 15.786667 34.986667 34.986667v220.16c0 19.2-15.786667 34.986667-34.986667 34.986667-19.2 0-34.986667-15.786667-34.986667-34.986667z"
                fill="#ffffff"
                p-id="3747"
              ></path>
              <path
                d="M444.16 590.506667l-0.426667-0.426667c-13.226667-13.226667-13.226667-34.56 0-47.786667L890.453333 95.146667c13.226667-13.226667 34.56-13.226667 47.786667 0l0.426667 0.426666c13.226667 13.226667 13.226667 34.56 0 47.786667L491.52 590.506667c-13.226667 13.226667-34.56 13.226667-47.36 0z"
                fill="#ffffff"
                p-id="3748"
              ></path>
            </svg>
            &nbsp;导 入
          </el-button>
        </el-upload>
        <el-button
          type="danger"
          size="small"
          @click="exportData"
          class="btns-export"
        >
          <svg
            t="1745509352882"
            class="export-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2365"
            width="16"
            height="16"
          >
            <path
              d="M959.96952 415.997629a31.970084 31.970084 0 0 0-63.940169 0v393.141729a86.153056 86.153056 0 0 1-25.43157 61.368112c-16.41131 16.41131-38.230441 25.377383-61.436749 25.377384H214.85703c-23.20992 0-45.0724-8.966073-61.483711-25.377384S127.880338 832.349278 127.880338 809.14297V214.85703a86.900831 86.900831 0 0 1 86.911668-86.850257L607.893997 129.325314h0.104761a32.020659 32.020659 0 0 0 0.101149-64.041318L214.961791 63.940169h-0.104761A150.96021 150.96021 0 0 0 63.940169 214.85703v594.28594A150.613416 150.613416 0 0 0 214.85703 959.825022h594.28594a150.570067 150.570067 0 0 0 150.82655-150.692889V415.997629z"
              fill="#ffffff"
              p-id="2366"
            ></path>
            <path
              d="M735.853809 128.241582h114.691324L233.392454 745.39426a31.970084 31.970084 0 0 0 45.213286 45.213286L895.884854 173.317595l0.057799 114.821371a31.944797 31.944797 0 0 0 31.970084 31.923123 31.937573 31.937573 0 0 0 31.955635-31.955635l-0.097536-191.849406a31.970084 31.970084 0 0 0-31.970085-31.952023H735.853809a31.970084 31.970084 0 0 0 0 63.936557z"
              fill="#ffffff"
              p-id="2367"
            ></path>
          </svg>
          &nbsp;导 出
        </el-button>
      </div>
      <span class="btns-flush" @click="flushSysUser">
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

    <!--- 人员数据表格 -->
    <div class="user-table">
      <el-table :data="userList" stripe>
        <el-table-column prop="userName" label="人员名称" width="150" />
        <el-table-column prop="name" label="姓名" width="150" />
        <el-table-column prop="phone" label="手机号码" width="150" />
        <el-table-column
          prop="avatar"
          label="头像"
          width="100"
          #default="scope"
        >
          <img :src="scope.row.avatar" width="30" />
        </el-table-column>
        <el-table-column
          prop="description"
          label="个人描述"
          min-width="100"
          show-overflow-tooltip
        />
        <el-table-column
          prop="status"
          label="状态"
          #default="scope"
          width="120"
        >
          {{ scope.row.status == 1 ? '正常' : '停用' }}
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column
          label="操作"
          align="center"
          width="280"
          #default="scope"
        >
          <el-button type="warning" size="small" @click="assignRole(scope.row)">
            分配角色
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="editSysUser(scope.row)"
          >
            修改
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click="deleteSysUser(scope.row)"
          >
            删除
          </el-button>
        </el-table-column>
      </el-table>
      <!-- 分页条 -->
      <el-pagination
        class="user-pagination"
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

    <!-- 新建或修改人员表单弹出框 -->
    <el-dialog
      v-model="dialogVisible"
      width="500px"
      class="sysUserDialog"
      align-center
      center
    >
      <template #header>
        <div class="dialog-header">
          <h1>{{ sysUserDialogTitle }}</h1>
        </div>
      </template>
      <el-form>
        <div class="form-top">
          <div class="form-left">
            <el-form-item>
              <el-input
                prefix-icon="User"
                v-model="sysUser.userName"
                placeholder="人员名称"
                clearable
              />
            </el-form-item>
            <el-form-item v-if="sysUser.id == null">
              <el-input
                prefix-icon="Lock"
                type="password"
                show-password
                v-model="sysUser.password"
                placeholder="设置密码"
                clearable
              />
            </el-form-item>
            <el-form-item>
              <el-input
                prefix-icon="UserFilled"
                v-model="sysUser.name"
                placeholder="姓名"
                clearable
              />
            </el-form-item>
            <el-form-item>
              <el-input
                prefix-icon="Iphone"
                v-model="sysUser.phone"
                placeholder="手机号码"
                clearable
              />
            </el-form-item>
          </div>
          <div class="form-right">
            <el-form-item>
              <el-upload
                drag
                class="avatar-uploader"
                action="http://localhost:8501/admin/system/avatarFileUpload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :headers="headers"
              >
                <img
                  v-if="sysUser.avatar"
                  :src="sysUser.avatar"
                  class="avatar"
                />
                <el-icon v-else class="avatar-uploader-icon">
                  <upload-filled />
                  <div class="avatar-uploader-text">
                    拖拽文件 或
                    <em>点击上传 头像</em>
                  </div>
                </el-icon>
                <template #tip>
                  <div class="avatar-uploader-tip">
                    * 未有头像文件上传将默认使用系统头像
                  </div>
                </template>
              </el-upload>
            </el-form-item>
          </div>
        </div>
        <el-form-item>
          <el-input
            prefix-icon="Document"
            v-model="sysUser.description"
            placeholder="人员描述"
            clearable
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 分配角色弹出框 -->
    <el-dialog v-model="dialogRoleVisible" width="600px" align-center center>
      <template #header>
        <div class="dialog-header">
          <h1>CodeQnA 分配角色</h1>
        </div>
      </template>
      <el-form class="user-form">
        <el-form-item class="form-item">
          <el-input
            prefix-icon="User"
            disabled
            :value="sysUser.userName"
          ></el-input>
        </el-form-item>
        <el-form-item class="form-item">
          <el-input
            prefix-icon="UserFilled"
            disabled
            :value="sysUser.name"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="role-border">
        <el-checkbox-group class="checkbox-group" v-model="roleSelectedIds">
          <el-checkbox
            class="checkbox"
            v-for="role in roles"
            :key="role.id"
            :label="role.id"
            border
          >
            {{ role.roleName }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <template #footer>
        <span class="dialogRole-footer">
          <el-button type="primary" @click="submitAssign">提交</el-button>
          <el-button @click="dialogRoleVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  AddSysUser,
  AssignRoleToUser,
  DeleteSysUser,
  EditSysUser,
  ExportSysUser,
  GetSysUserListByPage,
} from '@/api/sysUser'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, ref } from 'vue'
import { useApp } from '@/pinia/modules/app'
import { GetRolesList } from '@/api/sysRole'

// 分页条数据模型
const total = ref(0)

// 定义人员表格数据模型
const userList = ref([])

// 分页数据
const pageParamsForm = {
  pageNum: 1, // 当前页码
  pageSize: 10, // 每页记录数
}

// 将pageForms包装成支持响应式的对象
const pageParams = ref(pageParamsForm)

// 搜索表单输入存储数据
const sysUserDto = ref({
  userName: '',
  beginCreateTime: '',
  endCreateTime: '',
})

// 搜索表单输入绑定数据
const userNameStore = ref('')
const createTimesStore = ref([])

// 定义弹出框变量，默认为false
const dialogVisible = ref(false)

// 设置存储人员信息的数据
const sysUserForm = {
  userName: '',
  name: '',
  phone: '',
  password: '',
  description: '',
  avatar: '',
}

// 将sysUserForm包装成支持响应式的对象
const sysUser = ref(sysUserForm)

// 定义对话框标题数据
const sysUserDialogTitle = ref('')

// 分配角色弹出框变量，默认为false
const dialogRoleVisible = ref(false)

// 选中角色id集合
const roleSelectedIds = ref([])

// 角色信息集合
const roles = ref([])

// 挂载
onMounted(() => {
  fetchData()
})

// 匹配当前页面数据
const fetchData = async () => {
  const { data, code, message } = await GetSysUserListByPage(
    pageParams.value.pageNum,
    pageParams.value.pageSize,
    sysUserDto.value
  )
  if (code === 200) {
    userList.value = data.list
    total.value = data.total
  } else {
    ElMessage.error(message)
  }
}

// 搜索按钮功能
const searchSysUser = () => {
  sysUserDto.value.userName = userNameStore.value
  if (createTimesStore.value.length == 2) {
    sysUserDto.value.beginCreateTime = createTimesStore.value[0]
    sysUserDto.value.endCreateTime = createTimesStore.value[1]
  }
  // 刷新页面
  fetchData()
}

// 重置按钮功能
const reset = () => {
  // 输入内容置空
  if (createTimesStore.value.length > 0) {
    createTimesStore.value = []
    sysUserDto.value.beginCreateTime = ''
    sysUserDto.value.endCreateTime = ''
  }
  userNameStore.value = ''
  sysUserDto.value.userName = ''
  // 刷新页面
  fetchData()
}

// 新建按钮功能
const addSysUser = () => {
  // 新建人员，则需要将人员信息的数据对象初始化
  sysUser.value = {}
  // 设置对应的标题
  sysUserDialogTitle.value = 'CodeQnA 新建人员数据'
  // 设置显示弹出框
  dialogVisible.value = true
}

// 刷新按钮功能
const flushSysUser = () => {
  // 刷新表格，保留的是最近一次搜索的人员数据
  fetchData()
}

// 修改按钮功能
const editSysUser = row => {
  // 使用对象拓展运算符，将当前角色数据回显
  sysUser.value = { ...row }
  // 设置对应的标题
  sysUserDialogTitle.value = 'CodeQnA 修改角色数据'
  // 设置显示弹出框
  dialogVisible.value = true
}

// 提交按钮功能
const submit = async () => {
  // 根据人员是否有id判断是新建操作还是修改操作
  if (!sysUser.value.id) {
    // 执行新建操作
    const { code, message, data } = await AddSysUser(sysUser.value)
    if (code === 200) {
      // 关闭弹出框
      dialogVisible.value = false
      // 返回提示信息
      ElMessage.success('新建成功')
      // 刷新页面
      fetchData()
    } else {
      ElMessage.error(message)
    }
  } else {
    // 执行修改操作
    const { code, message, data } = await EditSysUser(sysUser.value)
    if (code === 200) {
      // 关闭弹出框
      dialogVisible.value = false
      // 返回提示信息
      ElMessage.success('修改成功')
      // 刷新页面
      fetchData()
    } else {
      ElMessage.error(message)
    }
  }
}

// 删除按钮功能
const deleteSysUser = row => {
  ElMessageBox.confirm('此操作将永久删除该记录，是否继续？', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    // 执行删除人员操作
    const { code, message, data } = await DeleteSysUser(row.id)
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

// excel数据导入成功以后的事件处理函数
const importSysUserSuccess = (response, uploadFile) => {
  ElMessage.success('导入完成')
  fetchData()
}

// 文件上传功能
// 从pinia中获取token，在进行文件上传的时候将token设置到请求头中
const headers = {
  token: useApp().authorization.token,
}
// 图像上传成功以后的事件处理函数
const handleAvatarSuccess = (response, uploadFile) => {
  sysUser.value.avatar = response.data
}

// 分配角色按钮功能
const assignRole = async row => {
  // 将人员数据回显
  sysUser.value = { ...row }
  // 设置显示分配角色弹出框
  dialogRoleVisible.value = true
  // 得到角色集合
  const { code, message, data } = await GetRolesList(row.id)
  if (code === 200) {
    // 所有角色信息集合
    roles.value = data.roles
    // 当前人员已分配到的所有角色的id集合
    roleSelectedIds.value = data.roleSelectedIds
  } else {
    ElMessage.error(message)
  }
}

// 分配角色弹出框提交按钮功能
const submitAssign = async () => {
  // 获取分配角色当前人员的id以及选中的角色id集合
  let assignRoleDto = {
    userId: sysUser.value.id,
    roleIdsList: roleSelectedIds.value,
  }
  // 进行人员分配角色
  const { code, message, data } = await AssignRoleToUser(assignRoleDto)
  if (code === 200) {
    // 返回提示信息
    ElMessage.success('分配成功')
    // 关闭分配角色弹出框
    dialogRoleVisible.value = false
    // 刷新页面
    fetchData()
  } else {
    ElMessage.error(message)
  }
}

// 导出功能
const exportData = () => {
  console.log('导出')
  ExportSysUser().then(res => {
    // 创建Blob对象
    const blob = new Blob([res])
    // 创建a标签，将Blob对象转换为url
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    // 设置下载文件名
    link.download = '管理员信息数据.xlsx'
    // 点击下载
    link.click()
  })
}
</script>

<style scoped>
.sysUser {
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

      .input-name {
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

  .tools-btns {
    display: flex;
    justify-content: space-between;
    min-width: 700px;
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

      .btns-add,
      .btns-import,
      .btns-export {
        width: 60px;
      }

      .upload-sysUser {
        display: flex;
        width: 60px;
        /* height: 100%; */
        justify-content: center;
        /* border: 1px solid red; */
        margin: 0 12px;
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

  .user-table {
    min-width: 720px;
    border: 1px solid #ebeef5;
    border-radius: 3px;
    background-color: #fff;
    /* 增加阴影效果 */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    /* 使子组件超出父组件范围的内容进行隐藏 */
    overflow: hidden;

    .user-pagination {
      margin: 5px 0;
      width: 100%;
      min-width: 700px;
      box-sizing: border-box;
    }
  }

  .form-top {
    display: flex;
    justify-content: space-between;

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
        width: 180px;
        height: 80px;
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
  }

  .user-form {
    display: flex;
    width: 100%;
    justify-content: space-between;

    .form-item {
      width: 48%;
    }
  }

  .role-border {
    display: flex;
    min-width: 505px;
    justify-content: center;
    position: relative;
    margin-top: 20px;
    padding-top: 5px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 15px;
    color: #aaa;
    font-weight: 500;
    text-align: center;
    border: 2px solid #ebeef5;
    border-radius: 8px;

    .checkbox-group {
      display: flex;
      width: 100%;
      /* 允许换行 */
      flex-wrap: wrap;

      .checkbox {
        /* 每行显示3个 checkbox，减去间距 */
        width: 27%;
        /* box-sizing: border-box; */
        /* margin: 15px; */
        margin-top: 15px;
        margin-left: 15px;
        margin-right: 15px;
      }
    }
  }

  .role-border::before {
    content: '职务选项';
    position: absolute;
    top: -10px;
    left: 10%;
    transform: translateX(-50%);
    background: white;
    padding: 0 5px;
  }
}
</style>
