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
    <LineChart id="0" v-if="listLoading" :line-chart-data ="lineChartData"/>
    <LineChart id="1" v-if="listLoading" :line-chart-data ="lineChartData2"/>
  </div>
</template>

<script>
  import LineChart from './components/LineChart'
  import {getDayData} from "@/api/sleep";
  import {date} from "mockjs/src/mock/random/date";
  import {format} from "/src/utils/util";
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
      default: '500px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
  },
  data() {
    let timeList = [];
    let values = [];
    for (let i = 0; i < 24; i++) {
      timeList.push("" + i + ":00")
      values.push(0)
    }
    return {
      lineChartData: {time: timeList, value: values},
      lineChartData2: {time: timeList, value: values},
      list: null,
      listLoading: false,
      form: {
        date: new Date(),
      }
    }
  },
  created() {
    this.fetchData();
  },
  mounted() {
  },
  methods: {
    fetchData() {
      this.listLoading = false
      getDayData(format(this.form.date, "yyyy-MM-dd")).then(response => {
        this.list = response.data
        this.listLoading = true
      })
    },
    handleRawData() {

      this.fetchData();
      let timeList2 = [];
      let values2 = [];
      let timeList = [];
      let values = [];
      for (let i = 0; i < 24; i++) {
        timeList.push("" + i + ":00")
        values.push(0)
      }
      for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 60; j++) {
          let s = "";
          s += i >= 10 ? i : "0" + i;
          s += ":"
          s += j >= 10 ? j : "0" + j;
          timeList2.push(s)
          values2.push(0)
        }
      }

      if(this.list !== null) {
        this.list.forEach((ele) => {
          if (parseInt(ele.accelMAX) >= 5000 && parseInt(ele.accelPeriod) > 1) {
            values2[parseInt(format(ele.messageTime, "HH")) * 60 + parseInt(format(ele.messageTime, "mm"))] += 1;
          }
        })
      }

      if (this.list !== null) {
        this.list.forEach((ele) => {
          if (parseInt(ele.accelMAX) >= 5000 && parseInt(ele.accelPeriod) > 1) {
            values[parseInt(format(ele.messageTime, "HH"))] += 1;
          }
        })
      }

      const findPos = (l) => {
        let index = 0
        let last = 0
        for(index = 0; index < l.length; index++) {
          if (l[index] !== 0) {
            break;
          }
        }
        for(last = l.length -1; last >= 0 ; last--) {
          if (l[last] !== 0) {
            break;
          }
        }
        return {index, last}
      }

      // timeList = timeList.slice(findPos(values).index, findPos(values).last)
      // values = values.slice(findPos(values).index, findPos(values).last)
      timeList2 = timeList2.slice(findPos(values2).index, findPos(values2).last)
      values2 = values2.slice(findPos(values2).index, findPos(values2).last)

      this.lineChartData = {
        time: timeList,
        value: values
      }

      this.lineChartData2 = {
        time: timeList2,
        value: values2
      }
    },
    onSubmit() {
      this.handleRawData()
      // console.log(this.lineChartData)
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

