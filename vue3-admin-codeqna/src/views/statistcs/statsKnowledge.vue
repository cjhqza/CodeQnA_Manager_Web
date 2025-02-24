<template>
  <div class="statsKnowledge">
    <!-- 搜索表单 -->
    <el-form label-width="70px" size="middle" class="search-form">
      <!-- 表单输入区 -->
      <div class="form-input">
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
        <el-button
          type="primary"
          size="middle"
          @click="searchStatsKnowledgeData"
        >
          搜索
        </el-button>
        <el-button type="warning" size="middle" @click="reset">重置</el-button>
      </div>
    </el-form>
    <!-- 可视化数据 -->
    <div ref="chart" class="statsKnowledge-chart"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { GetStatsKnowledgeData } from '@/api/statsKnowledge'
import { ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'

// 知识统计搜索数据传递对象
const statsKnowledgeDto = ref({
  beginCreateTime: '',
  endCreateTime: '',
})

// 搜索表单输入绑定数据
const createTimes = ref([])

// 统计图表对象
const chart = ref()

// 挂载
onMounted(() => {
  fetchData()
})

// 页面匹配数据
const fetchData = async () => {
  if (createTimes.value.length == 2) {
    statsKnowledgeDto.value.beginCreateTime = createTimes.value[0]
    statsKnowledgeDto.value.endCreateTime = createTimes.value[1]
  }
  const { code, data, message } = await GetStatsKnowledgeData(
    statsKnowledgeDto.value
  )
  if (code === 200) {
    setChartOption(data.dateList, data.numList)
  } else {
    ElMessage.error(message)
  }
}

const setChartOption = (dateList, numList) => {
  const knowledgeChart = echarts.init(chart.value)
  // 指定图表的配置项和数据
  const option = {
    title: {
      text: '知识产量统计',
    },
    tooltip: {},
    legend: {
      data: ['知识总产量（份）'],
    },
    xAxis: {
      data: dateList,
    },
    yAxis: {},
    series: [
      {
        name: '知识总产量（份）',
        type: 'bar',
        data: numList,
      },
    ],
  }
  // 使用刚指定的配置项和数据显示图表。
  knowledgeChart.setOption(option)
}

// 搜索按钮功能
const searchStatsKnowledgeData = () => {
  fetchData()
}

// 重置按钮功能
const reset = () => {
  createTimes.value = []
  statsKnowledgeDto.value.beginCreateTime = ''
  statsKnowledgeDto.value.endCreateTime = ''
  fetchData()
}
</script>

<style scoped>
.statsKnowledge {
  height: 100%;
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

      .input-date {
        width: 100%;
        min-width: 500px;
      }
    }

    .form-btns {
      flex: 1;
      min-width: 150px;
      display: flex;
      justify-content: center;
    }
  }

  .statsKnowledge-chart {
    margin-top: 20px;
    width: 100%;
    height: 88%;
  }
}
</style>
