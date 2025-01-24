<template>
  <div class="sysMenu">
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
          @click="addSysMenu"
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
      <span class="btns-flush" @click="flushSysMenu">
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

    <!-- 菜单数据列表 -->
    <div class="menu-table">
      <el-table :data="menuList" row-key="id" border stripe default-expand-all>
        <el-table-column prop="title" label="菜单标题" min-width="220" />
        <el-table-column prop="component" label="路由名称" min-width="180" />
        <el-table-column prop="sortValue" label="排序" min-width="120" />
        <el-table-column
          prop="status"
          label="状态"
          min-width="150"
          #default="scope"
        >
          {{ scope.row.status == 1 ? '正常' : '停用' }}
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200" />
        <el-table-column
          label="操作"
          align="center"
          width="300"
          #default="scope"
        >
          <el-button type="success" size="small" @click="addSysMenu(scope.row)">
            新建下级节点
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="editSysMenu(scope.row)"
          >
            修改
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click="deleteSysMenu(scope.row)"
          >
            删除
          </el-button>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新建或修改菜单组件弹出框 -->
    <el-dialog
      v-model="dialogVisible"
      width="400px"
      class="sysMenuDialog"
      align-center
      center
    >
      <template #header>
        <div class="dialog-header">
          <h1>{{ sysMenuDialogTitle }}</h1>
        </div>
      </template>
      <el-form>
        <el-form-item>
          <el-input
            prefix-icon="Menu"
            v-model="sysMenu.title"
            placeholder="菜单标题"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-input
            prefix-icon="MapLocation"
            v-model="sysMenu.component"
            placeholder="路由名称"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-input
            prefix-icon="Sort"
            v-model="sysMenu.sortValue"
            placeholder="排序"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <div class="center-item">
            <el-radio-group v-model="sysMenu.status">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="0">停用</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  AddSysMenu,
  DeleteSysMenuById,
  EditSysMenu,
  FindNodes,
} from '@/api/sysMenu'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, ref } from 'vue'

// 定义表格数据
const menuList = ref([])

// 定义表单数据
const menuForm = {
  id: '',
  parentId: 0,
  title: '',
  url: '',
  component: '',
  icon: '',
  sortValue: 1,
  status: 1,
}

// 将表单数据包装成支持响应式的对象
const sysMenu = ref(menuForm)

// 定义菜单弹出框，默认为false
const dialogVisible = ref(false)

// 定义对话框标题
const sysMenuDialogTitle = ref('')

// 挂载
onMounted(() => {
  fetchData()
})

// 匹配当前页面数据
const fetchData = async () => {
  const { code, data, message } = await FindNodes()
  if (code === 200) {
    menuList.value = data
  } else {
    ElMessage.error(message)
  }
}

// 新建按钮 / 新建子级节点 功能
const addSysMenu = row => {
  // 清空表单列表
  sysMenu.value = {}
  // 根据id判断新建的是新的父菜单还是子菜单，确定标题
  if (!row.id) {
    sysMenuDialogTitle.value = 'CodeQnA 新建菜单数据'
  } else {
    sysMenuDialogTitle.value = 'CodeQnA 新建子级菜单'
    // 设置父级id为当前的父菜单的id
    sysMenu.value.parentId = row.id
  }
  // 显示新建菜单弹出框
  dialogVisible.value = true
}

// 刷新按钮功能
const flushSysMenu = () => {
  fetchData()
}

// 修改按钮功能
const editSysMenu = row => {
  // 使用对象拓展运算符，将当前角色数据回显
  sysMenu.value = { ...row }
  // 设置对应标题
  sysMenuDialogTitle.value = 'CodeQna 修改菜单数据'
  // 显示菜单弹出框
  dialogVisible.value = 'true'
}

// 提交按钮功能
const submit = async () => {
  // 根据id判断是新建或修改
  if (!sysMenu.value.id) {
    // 新建，再判断新建是否为子级菜单
    if (!sysMenu.value.parentId) {
      // 不是则设置其父级菜单为0
      sysMenu.value.parentId = 0
    }
    const { code, data, message } = await AddSysMenu(sysMenu.value)
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
    // 修改
    const { code, data, message } = await EditSysMenu(sysMenu.value)
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
const deleteSysMenu = row => {
  ElMessageBox.confirm('此操作将永久删除该记录，是否继续？', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    // 执行删除角色操作
    const { code, message, data } = await DeleteSysMenuById(row.id)
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
</script>

<style scoped>
.sysMenu {
  .tools-btns {
    display: flex;
    justify-content: space-between;
    min-width: 700px;
    margin-bottom: 5px;
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

  .menu-table {
    min-width: 700px;
    border: 1px solid #ebeef5;
    border-radius: 3px;
    background-color: #fff;
    /* 增加阴影效果 */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    /* 使子组件超出父组件范围的内容进行隐藏 */
    overflow: hidden;
  }

  .center-item {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
}
</style>
