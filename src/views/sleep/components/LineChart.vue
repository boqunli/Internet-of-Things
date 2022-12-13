<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  import {number} from "echarts/lib/export";
  import line from "echarts/src/chart/helper/Line";
  require('echarts')

  let timeList = [];
  let values = [];
  for (let i = 0; i < 24; i++) {
    timeList.push("" + i + ":00")
    values.push(0)
  }


export default {
  props: {
    lineChartData: {
      type: Object,
      default : function () {
        return  {time: timeList, value:values}
      }
    },
    id: {
      type: String,
      default: "0"
    },
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
    // chartData: {
    //   type: Object,
    //   required: true
    // }
  },
  data() {
    return {
      chart: null,
      form: {
        date: '',
      }
    }
  },
  // watch: {
  //   lineChartData: {
  //     deep: true,
  //     handler(data) {
  //       console.log("changed !")
  //       this.setOptions(data)
  //     }
  //   }
  // },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      console.log()
      this.chart = echarts.init(this.$el);
      this.setOptions();
    },
    setOptions() {
      this.chart.setOption({
        title: {
          text: this.id === "0"?'翻身次数统计': "翻身次数统计(分钟计数)"
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              width: 1,
              color: '#019680',
            },
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.lineChartData.time,
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              type: 'solid',
              color: 'rgba(226,226,226,0.5)',
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            type: 'value',
            max: this.lineChartData.max,
            splitNumber: 4,
            axisTick: {
              show: false,
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
              },
            },
          },
        ],
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        series: [{
          smooth: true,
          data: this.lineChartData.value,
          type: 'line',
          areaStyle: {},
          itemStyle: {
            color: '#5ab1ef',
          },
        }]
      })
    },
  },
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

