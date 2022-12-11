<template>
  <div class="app-container">
    <el-select v-model="deviceIdx" placeholder="请选择设备" @change="fetchData()">
      <el-option v-for="(item,index) in deviceList" :key="index" :label="item.name" :value="index" />
    </el-select>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="接收时间">
        <template slot-scope="scope">
          {{ scope.row.gmtCreate }}
        </template>
      </el-table-column>
      <el-table-column label="设备名" width="180">
        <template slot-scope="scope">
          {{ device.name }}
        </template>
      </el-table-column>
      <el-table-column label="数据">
        <template slot-scope="scope">
          {{ scope.row.data }}
        </template>
      </el-table-column>
    </el-table>
    <el-button type="success" size="small" @click="fetchData()" :disabled="deviceIdx===null">刷新</el-button>
  </div>
</template>

<script>
import { getAllDevices, getAllDeviceData } from '@/api/device'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'gray',
        2: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      deviceIdx: null,
      device: null,
      deviceList: null,
      list: null,
      listLoading: true,
      statusMap: {
        1: '在线',
        0: '未激活',
        2: '离线'
      },
      protocolMap: {
        0: 'MQTT',
      }
    }
  },
  created() {
    this.fetchDevices()
  },
  methods: {
    fetchDevices() {
      this.listLoading = true
      getAllDevices().then(response => {
        this.deviceList = response.data
        this.listLoading = false
      })
    },
    fetchData() {
      this.listLoading = true
      this.device = this.deviceList[this.deviceIdx]
      getAllDeviceData(this.device.id).then((response => {
        this.list = response.data
        this.listLoading = false
      }))
    }
  }
}
</script>

<style scoped>

</style>
