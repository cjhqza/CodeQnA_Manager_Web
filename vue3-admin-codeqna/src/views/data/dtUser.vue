<template>
  <div class="dtUser">
    <!-- 搜索表单 -->
    <el-form label-width="70px" size="middle" class="search-form">
      <!-- 表单输入区 -->
      <div class="form-input">
        <el-form-item label="用户检索" class="input-name">
          <el-input
            style="width: 100%"
            placeholder="用户昵称"
            v-model="dtUserDto.userName"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建时间" class="input-date">
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
        <el-button type="primary" size="middle" @click="searchDtUser">
          搜索
        </el-button>
        <el-button type="warning" size="middle" @click="reset">重置</el-button>
      </div>
    </el-form>
    <!--- 用户数据表格 -->
    <div class="user-table">
      <el-table :data="userList" stripe>
        <el-table-column prop="userName" label="用户昵称" width="140" />
        <el-table-column prop="phone" label="手机号码" width="140" />
        <el-table-column prop="sex" label="性别" width="80" #default="scope">
          {{ sexMap[scope.row.sex] }}
        </el-table-column>
        <el-table-column
          prop="headImgUrl"
          label="头像"
          width="100"
          #default="scope"
        >
          <img :src="scope.row.headImgUrl" width="30" />
        </el-table-column>
        <el-table-column
          prop="bgImgUrl"
          label="背景图"
          width="100"
          #default="scope"
        >
          <img :src="scope.row.bgImgUrl" width="30" />
        </el-table-column>
        <el-table-column
          prop="selfIntro"
          label="个人介绍"
          min-width="120"
          show-overflow-tooltip
        />
        <el-table-column
          prop="signture"
          label="个性签名"
          min-width="120"
          show-overflow-tooltip
        />
        <el-table-column prop="status" label="状态" #default="scope" width="80">
          {{ scope.row.status == 1 ? '正常' : '停用' }}
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="160" />
        <el-table-column
          label="操作"
          align="center"
          width="160"
          #default="scope"
        >
          <el-button
            v-if="scope.row.status == 1"
            type="warning"
            size="small"
            @click="editDtUser(scope.row.id)"
          >
            禁用
          </el-button>
          <el-button
            v-else
            type="success"
            size="small"
            @click="editDtUser(scope.row.id)"
          >
            解禁
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click="deleteDtUser(scope.row.id)"
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
  </div>
</template>

<script setup>
import { DeleteDtUser, EditDtUser, GetDtUserListByPage } from '@/api/dtUser'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, ref } from 'vue'

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

// // 搜索表单输入存储数据
const dtUserDto = ref({
  userName: '',
  beginCreateTime: '',
  endCreateTime: '',
})

// 开始和结束时间数据模型
const createTimes = ref([])

// 性别映射
const sexMap = {
  0: '男',
  1: '女',
  2: '保密',
}

// // 设置存储用户信息的数据
// const dtUserForm = {
//   userName: '',
//   phone: '',
//   sex: '',
//   headImgUrl: '',
//   bgImgUrl: '',
//   selfIntro: '',
//   signture: '',
// }

// // 将dtUserForm包装成支持响应式的对象
// const dtUser = ref(dtUserForm)

// 挂载
onMounted(() => {
  fetchData()
})

// 页面数据获取匹配
const fetchData = async () => {
  // 获取开始和结束时间
  if (createTimes.value.length == 2) {
    dtUserDto.value.beginCreateTime = createTimes.value[0]
    dtUserDto.value.endCreateTime = createTimes.value[1]
  }
  const { data, code, message } = await GetDtUserListByPage(
    pageParams.value.pageNum,
    pageParams.value.pageSize,
    dtUserDto.value
  )
  if (code === 200) {
    userList.value = data.list
    total.value = data.total
  } else {
    ElMessage.error(message)
  }
}

// 搜索按钮功能
const searchDtUser = () => {
  fetchData()
}

// 重置按钮功能
const reset = () => {
  if (createTimes.value.length > 0) {
    createTimes.value = []
    dtUserDto.value.beginCreateTime = ''
    dtUserDto.value.endCreateTime = ''
  }
  dtUserDto.value.userName = ''
  fetchData()
}

// 禁用 或 解禁按钮功能
const editDtUser = async id => {
  const { code, data, message } = await EditDtUser(id)
  if (code === 200) {
    ElMessage.success('操作成功')
    fetchData()
  } else {
    ElMessage.error(message)
  }
}

// 删除按钮功能
const deleteDtUser = id => {
  console.log(id)
  ElMessageBox.confirm('此操作将永久删除该记录，是否继续？', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const { code, data, message } = await DeleteDtUser(id)
    if (code === 200) {
      ElMessage.success('删除成功')
      fetchData()
    } else {
      ElMessage.error(message)
    }
  })
}
</script>

<style scoped>
.dtUser {
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

  .user-table {
    min-width: 720px;
    border: 1px solid #ebeef5;
    border-radius: 3px;
    background-color: #fff;
    margin: 5px 0;
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
}
</style>
