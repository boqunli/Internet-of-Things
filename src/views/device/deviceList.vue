<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.gmtCreate }}
        </template>
      </el-table-column>
      <el-table-column label="设备名" width="180">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="序列号">
        <template slot-scope="scope">
          {{ scope.row.serial }}
        </template>
      </el-table-column>
      <el-table-column label="Key">
        <template slot-scope="scope">
          {{ scope.row.key }}
        </template>
      </el-table-column>
      <el-table-column label="Secret">
        <template slot-scope="scope">
          {{ scope.row.secret }}
        </template>
      </el-table-column>
      <el-table-column label="协议类型">
        <template slot-scope="scope">
          {{ protocolMap[scope.row.protocol] }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" align="center" width="180">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ statusMap[scope.row.status] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="110" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="deleteDevice(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="success" size="small" @click="fetchData()">刷新</el-button>
  </div>
</template>

<script>
import { getAllDevices, deleteDevice, getProtocols } from '@/api/device'

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
      list: null,
      listLoading: true,
      statusMap: {
        1: '在线',
        0: '未激活',
        2: '离线'
      },
      protocolMap: {
        0: 'MQTT',
      },
    }
  },
  created() {
    this.fetchData()
    this.fetchProtocol()
  },
  methods: {
    fetchProtocol() {
      getProtocols().then(response => {
        console.log(response)
        if (response.code !== 200 && response.code !== '200') {
          this.$message({
            type: 'warning',
            message: response.msg
          })
        } else {
          let protocolList = {}
          for (let i = 0; i < response.data.length; i++) {
            let tmp = response.data[i].split(':')
            protocolList[tmp[0]] = tmp[1]
          }
          this.protocolMap = protocolList
        }

      })
    },
    fetchData() {
      this.listLoading = true
      getAllDevices().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    deleteDevice(row) {
      console.log(row)
      deleteDevice(row.id).then(response => {
        if (response.code === "200" || response.code === 200) {
          this.$message({
            message: "操作成功",
            type: 'success'
          })
        } else {
          this.$message({
            message: response,
            type: 'warning'
          })
        }
        this.fetchData()
      })
    }
  }
}
</script>

<style scoped>

</style>
