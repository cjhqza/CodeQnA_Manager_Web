<template>
  <div class="sysRole">
    <!-- 搜索表单 -->
    <el-form label-width="70px" size="middle" class="search-form">
      <!-- 表单输入区 -->
      <div class="form-input">
        <el-form-item label="角色名称" class="input-item">
          <el-input
            placeholder="请输入需要找的角色名称"
            v-model="roleNameStore"
          ></el-input>
        </el-form-item>
      </div>
      <!-- 表单执行按钮区 -->
      <div class="form-btns">
        <el-button type="primary" size="middle" @click="searchSysRole">
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
          @click="addSysRole"
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
      <span class="btns-flush" @click="flushSysRole">
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

    <!--- 角色表格数据 -->
    <div class="role-table">
      <el-table :data="roleList" stripe>
        <el-table-column prop="roleName" label="角色名称" width="180" />
        <el-table-column prop="roleCode" label="角色编码" width="180" />
        <el-table-column prop="createTime" label="创建时间" width="200" />
        <el-table-column
          prop="description"
          label="职责描述"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          label="操作"
          align="center"
          width="280"
          #default="scope"
        >
          <el-button type="warning" size="small" @click="assignMenu(scope.row)">
            分配菜单
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="editSysRole(scope.row)"
          >
            修改
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click="deleteSysRole(scope.row)"
          >
            删除
          </el-button>
        </el-table-column>
      </el-table>
      <!--分页条-->
      <el-pagination
        class="role-pagination"
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

    <!-- 新建或修改角色表单弹出框 -->
    <el-dialog
      v-model="dialogVisible"
      width="400px"
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

    <!-- 分配菜单弹出框 -->
    <el-dialog v-model="dialogMenuVisible" width="400px" align-center center>
      <template #header>
        <div class="dialog-header">
          <h1>CodeQnA 分配菜单</h1>
        </div>
      </template>
      <el-tree
        :data="sysMenuTreeList"
        ref="tree"
        show-checkbox
        default-expand-all
        :check-on-click-node="true"
        node-key="id"
        :props="menuTreeProps"
      />
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitAssign">提交</el-button>
          <el-button @click="dialogMenuVisible = false">取消</el-button>
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
  FindMenuIdByRoleId,
  DoAssign,
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

// 搜索表单输入存储数据
const sysRoleDto = ref({ roleName: '' })
// 搜索表单输入绑定数据
const roleNameStore = ref('')

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

// 定义分配菜单弹出框显示变量，默认为false
const dialogMenuVisible = ref(false)

// 分配菜单弹出框树型数据
const sysMenuTreeList = ref([])

// 树对象变量
const tree = ref()

// 自定义树节点的属性
const menuTreeProps = {
  children: 'children',
  label: 'title',
}

// 默认选中的菜单数据集合对应角色id
const roleId = ref('')

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
  if (code === 200) {
    roleList.value = data.list
    total.value = data.total
  } else {
    ElMessage.error(message)
  }
}

// 搜索按钮功能
const searchSysRole = () => {
  // 将输入角色名称内容封装到搜索表单输入存储数据
  sysRoleDto.value.roleName = roleNameStore.value
  // 刷新页面
  fetchData()
}

// 重置按钮功能
const reset = () => {
  // 输入内容重置为空
  roleNameStore.value = ''
  sysRoleDto.value.roleName = ''
  // 刷新页面
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

// 刷新按钮功能
const flushSysRole = () => {
  // 刷新表格，保留的是最近一次搜索的角色数据
  fetchData()
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

// 新建或修改提交按钮功能
const submit = async () => {
  // 首先区分该提交是为了新建角色还是修改角色：判断当前存储角色信息是否有id（新建对象信息不包含id）
  if (!sysRole.value.id) {
    // 执行新建角色操作
    const { code, message, data } = await AddSysRole(sysRole.value)
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
    // 执行新建角色操作
    const { code, message, data } = await EditSysRole(sysRole.value)
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
const deleteSysRole = row => {
  ElMessageBox.confirm('此操作将永久删除该记录，是否继续？', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    // 执行删除角色操作
    const { code, message, data } = await DeleteSysRole(row.id)
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

// 分配菜单按钮功能
const assignMenu = async row => {
  roleId.value = row.id
  // 打开分配菜单弹出框
  dialogMenuVisible.value = true
  const { code, data, message } = await FindMenuIdByRoleId(row.id)
  if (code === 200) {
    sysMenuTreeList.value = data.sysMenuList
    // 数据回显
    tree.value.setCheckedKeys(data.menuIds)
  } else {
    ElMessage.error(message)
  }
}

// 分配菜单提交按钮功能
const submitAssign = async () => {
  const checkedNodes = tree.value.getCheckedNodes() // 获取选中的节点
  const checkedNodesIds = checkedNodes.map(node => {
    // 获取选中的节点的id
    return {
      id: node.id,
      isHalf: 0,
    }
  })

  // 获取半选中的节点数据，当一个节点的子节点被部分选中时，该节点会呈现出半选中的状态
  const halfCheckedNodes = tree.value.getHalfCheckedNodes()
  const halfCheckedNodesIds = halfCheckedNodes.map(node => {
    // 获取半选中节点的id
    return {
      id: node.id,
      isHalf: 1,
    }
  })

  // 将选中的节点id和半选中的节点的id进行合并
  const menuIds = [...checkedNodesIds, ...halfCheckedNodesIds]

  // 构建请求数据
  const assignMenuDto = {
    roleId: roleId.value,
    menuIdList: menuIds,
  }

  // 发送请求
  const { code, data, message } = await DoAssign(assignMenuDto)
  if (code === 200) {
    ElMessage.success('分配成功')
  } else {
    ElMessage.error(message)
  }
  // 关闭分配菜单弹出框
  dialogMenuVisible.value = false
}
</script>

<style scoped>
.sysRole {
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

  .role-table {
    min-width: 300px;
    border: 1px solid #ebeef5;
    border-radius: 3px;
    background-color: #fff;
    /* 增加阴影效果 */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    /* 使子组件超出父组件范围的内容进行隐藏 */
    overflow: hidden;

    .role-pagination {
      margin: 5px 0;
      width: 100%;
      min-width: 700px;
      box-sizing: border-box;
    }
  }
}
</style>
