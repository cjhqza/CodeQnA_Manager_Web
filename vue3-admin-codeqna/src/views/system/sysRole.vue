<template>
  <div class="sysRole">
    <!-- 搜索框 -->
    <el-form label-width="70px" size="middle" class="search-form">
      <el-row style="display: flex">
        <!-- 表单输入区 -->
        <el-col :span="20" class="form-input">
          <el-form-item label="角色名称">
            <el-input placeholder="请输入需要找的角色名称"></el-input>
          </el-form-item>
        </el-col>
        <!-- 表单执行按钮区 -->
        <el-col :span="4" class="form-btns">
          <el-button type="primary" size="middle">
            搜索
          </el-button>
          <el-button size="middle">重置</el-button>
        </el-col>
      </el-row>
    </el-form>

    <!-- 操作按钮区 -->
    <el-row class="tools">
      <el-button type="success" size="small">
        <svg
          t="1735288207672"
          class="new-icon"
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
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="roleName" label="角色名称" width="180" />
      <el-table-column prop="roleCode" label="角色编码" width="180" />
      <el-table-column prop="createTime" label="创建时间" width="200" />
      <el-table-column prop="description" label="职责描述" />
      <el-table-column label="操作" align="center" width="240">
        <el-button type="primary" size="small">
          修改
        </el-button>
        <el-button type="danger" size="small">
          删除
        </el-button>
      </el-table-column>
    </el-table>

    <!--分页条-->
    <el-pagination
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next"
      :total="total"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 分页条总记录数
let total = ref(0)

// 定义表格数据模型
let list = ref([
  {
    id: 9,
    roleName: '系统管理员',
    roleCode: 'xtgly',
    createTime: '2023-07-31',
    description: '管理系统的开发与测试',
  },
  {
    id: 10,
    roleName: '商品管理员',
    roleCode: 'spgly',
    createTime: '2023-07-31',
    description: '管理商品的运营与统计',
  },
])
</script>

<style scoped>
.sysRole {
  /* margin-bottom: 10px; */
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* 增加阴影效果 */
  .search-form {
    padding: 5px;
    .form-input {
      width: 100%;
    }
    .form-btns {
      text-align: center;
    }
  }
  .tools {
    display: flex;
    margin: 5px 0;
    padding: 10px;
    border: 1px solid #ebeef5;
    border-radius: 3px;
    background-color: #fff;
  }
}
</style>
