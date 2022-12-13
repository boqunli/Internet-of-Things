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
    <PieChart v-if="listLoading" :pie-chart-data="pieChartData"/>
  </div>
</template>

<script>
  import PieChart from './components/PieChart'
  import {getDayData, getStatistic} from "@/api/sleep";
  import {format} from "@/utils/util";
  import {getdiffdate} from "@/utils/util"

export default {
  components: {
    PieChart,
  },
  data() {
    return {
      list: null,
      listLoading: true,
      pieChartData: [0, 0, 0],
      form: {
        date1: '',
        date2: '',
      }
    }
  },
  mounted() {
  },
  methods: {

    fetchData() {
      this.listLoading = false
      getStatistic(format(this.form.date1, "yyyy-MM-dd"), format(this.form.date2, "yyyy-MM-dd")).then(response => {
        this.list = response.data
        this.listLoading = true
      })
    },
    handleRawData() {

      this.fetchData();

      let counter = new Array()
      let update = [0,0,0]
      const dateList = getdiffdate(format(this.form.date1, "yyyy-MM-dd"), format(this.form.date2, "yyyy-MM-dd"))
      dateList.forEach(ele=>{counter[ele] = 0;})
      console.log(dateList)
      // if(this.list !== null) {
      //   this.list.forEach((ele) => {
      //     if (parseInt(ele.accelMAX) >= 5000 && parseInt(ele.accelPeriod) > 1) {
      //       counter[format(ele.messageTime, "yyyy-MM-dd")] = 0;
      //     }
      //   })
      // }
      if (this.list !== null) {
        this.list.forEach((ele) => {
          if (parseInt(ele.accelMAX) >= 5000 && parseInt(ele.accelPeriod) > 1) {
            counter[format(ele.messageTime, "yyyy-MM-dd")] += 1;
          }
        })
      }
      for (let k in counter){
        if (counter[k] <= 5) {
          update[0]++;
        } else if (counter[k] >5 && counter[k] <= 10) {
          update[1]++;
        } else {
          update[2]++;
        }
      }
      console.log(counter)
      this.pieChartData = update;
    },
    onSubmit() {
      this.handleRawData()
      // console.log(this.list)
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

