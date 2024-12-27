<template>
  <div class="sysRole">
    <!-- 搜索表单 -->
    <el-form label-width="70px" size="middle" class="search-form">
      <el-row style="display: flex">
        <!-- 表单输入区 -->
        <el-col :span="20" class="form-input">
          <el-form-item label="角色名称">
            <el-input
              placeholder="请输入需要找的角色名称"
              v-model="sysRoleDto.roleName"
            ></el-input>
          </el-form-item>
        </el-col>
        <!-- 表单执行按钮区 -->
        <el-col :span="4" class="form-btns">
          <el-button type="primary" size="middle" @click="searchSysRole">
            搜索
          </el-button>
          <el-button type="warning" size="middle" @click="reset">
            重置
          </el-button>
        </el-col>
      </el-row>
    </el-form>

    <!-- 操作按钮区 -->
    <el-row class="tools-btns">
      <el-button type="success" size="small" @click="addSysRole">
        <svg
          t="1735288207672"
          class="icon"
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
    </el-row>

    <!--- 角色表格数据 -->
    <el-table :data="roleList" style="width: 100%">
      <el-table-column prop="roleName" label="角色名称" width="180" />
      <el-table-column prop="roleCode" label="角色编码" width="180" />
      <el-table-column prop="createTime" label="创建时间" width="200" />
      <el-table-column prop="description" label="职责描述" />
      <el-table-column label="操作" align="center" width="240" #default="scope">
        <el-button type="primary" size="small" @click="editSysRole(scope.row)">
          修改
        </el-button>
        <el-button type="danger" size="small" @click="deleteSysRole(scope.row)">
          删除
        </el-button>
      </el-table-column>
    </el-table>

    <!--分页条-->
    <el-pagination
      v-model:current-page="pageParams.pageNum"
      v-model:page-size="pageParams.pageSize"
      @size-change="fetchData"
      @current-change="fetchData"
      :page-sizes="[5, 10, 20, 50]"
      layout="sizes, prev, pager, next, total"
      :total="total"
    />

    <!-- 添加或修改角色表单弹出框 -->
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      class="sysRoleDialog"
      align-center
      center
    >
      <template #header>
        <div class="dialog-header">
          <h1>{{ sysRoleDialogTitle }}</h1>
        </div>
      </template>
      <el-form>
        <el-form-item prop="roleName">
          <el-input
            prefix-icon="User"
            v-model="sysRole.roleName"
            placeholder="角色名称"
            clearable
          />
        </el-form-item>
        <el-form-item prop="roleCode">
          <el-input
            prefix-icon="CollectionTag"
            v-model="sysRole.roleCode"
            placeholder="角色编码"
            clearable
          />
        </el-form-item>
        <el-form-item prop="description">
          <el-input
            prefix-icon="Document"
            v-model="sysRole.description"
            placeholder="职责描述"
            clearable
          />
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
import {
  AddSysRole,
  EditSysRole,
  GetSysRoleListByPage,
  DeleteSysRole,
} from '@/api/sysRole'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, ref } from 'vue'

// 分页条总记录数
let total = ref(0)

// 定义角色表格数据模型
let roleList = ref([])

// 分页数据
const pageParamsForm = {
  pageNum: 1, // 当前页码
  pageSize: 10, // 每页记录数
}

// 将pageForms包装成支持响应式的对象
const pageParams = ref(pageParamsForm)

// 搜索表单输入数据
const sysRoleDto = ref({ roleName: '' })

// 定义弹出框变量，默认为false
const dialogVisible = ref(false)

// 设置存储角色信息的数据
const sysRoleForm = {
  id: '', // 该id将用来区分管理员操作新建或是修改
  roleName: '', // 角色名称
  roleCode: '', // 角色编码
  description: '', // 职责描述
}

// 将sysRoleForm包装成支持响应式的对象
const sysRole = ref(sysRoleForm)

// 定义对话框标题数据
const sysRoleDialogTitle = ref('')

// 挂载
onMounted(() => {
  fetchData()
})

// 匹配当前页面数据
const fetchData = async () => {
  const { data, code, message } = await GetSysRoleListByPage(
    pageParams.value.pageNum,
    pageParams.value.pageSize,
    sysRoleDto.value
  )
  roleList.value = data.list
  total.value = data.total
}

// 搜索按钮功能
const searchSysRole = async () => {
  fetchData()
}

// 重置按钮功能
const reset = async () => {
  sysRoleDto.value.roleName = ''
  fetchData()
}

// 新建按钮功能
const addSysRole = () => {
  // 新建角色，则需要将角色信息的数据对象初始化
  sysRole.value = {}
  // 设置对应的标题
  sysRoleDialogTitle.value = 'CodeQnA 新建角色数据'
  // 设置显示弹出框
  dialogVisible.value = true
}

// 修改按钮功能
const editSysRole = row => {
  // 使用对象拓展运算符，将当前角色数据回显
  sysRole.value = { ...row }
  // 设置对应的标题
  sysRoleDialogTitle.value = 'CodeQnA 修改角色数据'
  // 设置显示弹出框
  dialogVisible.value = true
}

// 提交按钮功能
const submit = async () => {
  // 首先区分该提交是为了新建角色还是修改角色：判断当前存储角色信息是否有id（新建对象信息不包含id）
  if (!sysRole.value.id) {
    // 执行新建角色操作
    const { code } = await AddSysRole(sysRole.value)
    if (code === 200) {
      // 关闭弹出框
      dialogVisible.value = false
      // 提示信息
      ElMessage.success('新建成功')
      // 刷新页面
      fetchData()
    }
  } else {
    // 执行新建角色操作
    const { code } = await EditSysRole(sysRole.value)
    if (code === 200) {
      // 关闭弹出框
      dialogVisible.value = false
      // 提示信息
      ElMessage.success('修改成功')
      // 刷新页面
      fetchData()
    }
  }
}

// 删除按钮功能
const deleteSysRole = row => {
  ElMessageBox.confirm('此操作将永久删除该记录，是否继续？', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    // 执行删除角色操作
    const { code } = await DeleteSysRole(row.id)
    if (code === 200) {
      // 提示信息
      ElMessage.success('删除成功')
      // 刷新页面
      fetchData()
    }
  })
}
</script>

<style scoped>
.sysRole {
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
  /* 增加阴影效果 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  .search-form {
    padding: 5px;

    .form-input {
      width: 100%;
    }

    .form-btns {
      text-align: center;
    }
  }

  .tools-btns {
    display: flex;
    margin: 5px 0;
    padding: 10px;
    border: 1px solid #ebeef5;
    border-radius: 3px;
    background-color: #fff;
  }
}
</style>
