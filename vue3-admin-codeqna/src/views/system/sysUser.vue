<template>
  <div class="sysUser">
    <!-- 搜索表单 -->
    <el-form label-width="70px" size="middle" class="search-form">
      <!-- 表单输入区 -->
      <div class="form-input">
        <el-form-item label="人员检索" class="input-name">
          <el-input style="width: 100%" placeholder="人员名称"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" class="input-date">
          <el-date-picker
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
        <el-button type="primary" size="middle">
          搜索
        </el-button>
        <el-button type="warning" size="middle">重置</el-button>
      </div>
    </el-form>
  </div>

  <!--添加按钮-->
  <div class="tools-btns">
    <el-button type="success" size="small">添 加</el-button>
  </div>

  <!---数据表格-->
  <el-table :data="list" style="width: 100%">
    <el-table-column prop="userName" label="人员名称" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="phone" label="手机" />
    <el-table-column prop="avatar" label="头像" #default="scope">
      <img :src="scope.row.avatar" width="50" />
    </el-table-column>
    <el-table-column prop="description" label="描述" />
    <el-table-column prop="status" label="状态" #default="scope">
      {{ scope.row.status == 1 ? '正常' : '停用' }}
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column label="操作" align="center" width="280">
      <el-button type="primary" size="small">
        修改
      </el-button>
      <el-button type="danger" size="small">
        删除
      </el-button>
      <el-button type="warning" size="small">
        分配角色
      </el-button>
    </el-table-column>
  </el-table>

  <el-pagination
    :page-sizes="[10, 20, 50, 100]"
    layout="total, sizes, prev, pager, next"
    :total="total"
  />
</template>

<script setup>
import { ref } from 'vue'

// 表格数据模型
const list = ref([
  {
    id: 1,
    userName: 'admin',
    name: 'admin',
    phone: '13121034567',
    status: 1,
    createTime: '2023-05-11',
  },
  {
    id: 2,
    userName: 'admin',
    name: 'admin',
    phone: '13121034567',
    status: 1,
    createTime: '2023-05-11',
  },
])

// 分页条数据模型
const total = ref(0)
</script>

<style scoped>
.sysUser {
  min-width: 700px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
  /* 增加阴影效果 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  .search-form {
    display: flex;
    width: 100%;
    min-width: 700px;

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
}

.tools-btns {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
