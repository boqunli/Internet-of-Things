<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="时间选择">
        <el-col :span="8">
          <el-date-picker v-model="form.date" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <LineChart />
  </div>
</template>

<script>
  import LineChart from './components/LineChart'

export default {
  components: {
    LineChart,
  },
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      form: {
        date: '',
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
  },
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

