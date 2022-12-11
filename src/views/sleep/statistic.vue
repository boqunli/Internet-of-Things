<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="时间选择">
        <el-col :span="8">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a start date" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="8">
          <el-date-picker v-model="form.date2" type="date" placeholder="Pick a end time" style="width: 100%;" />
        </el-col>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <PieChart />
  </div>
</template>

<script>
  import PieChart from './components/PieChart'

export default {
  components: {
    PieChart,
  },
  data() {
    return {
      form: {
        date1: '',
        date2: '',
      }
    }
  },
  mounted() {
  },
  methods: {
    onSubmit() {
      //TODO
      this.$message('submit!')
    },
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

