<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  require('echarts')

export default {
  props: {
    pieChartData: {
      type: Array,
      default: function () {
        return [0, 0, 0]
      }
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
      default: '600px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      chart: null,
    }
  },
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
      this.chart = echarts.init(this.$el);
      this.setOptions();
    },
    setOptions() {
      this.chart.setOption({
        title: {
          text: '睡眠质量统计'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['优质睡眠', '一般睡眠', '劣质睡眠']
        },
        series: [
          {
            name: 'WEEKLY WRITE ARTICLES',
            type: 'pie',
            roseType: 'radius',
            center: ['50%', '50%'],
            data: [
              { value: this.pieChartData[0], name: '优质睡眠' },
              { value: this.pieChartData[1], name: '一般睡眠' },
              { value: this.pieChartData[2], name: '劣质睡眠' },
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600,
            radius: [100, 200],
            itemStyle: {
              // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
              emphasis: {
                shadowBlur: 100,
                shadowOffsetX: 20,
                shadowColor: "black"
              },
            },
          }
        ]
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

