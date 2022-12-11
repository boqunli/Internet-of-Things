<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" style="margin-left: 10%; margin-right: 20%; margin-top: 2%">
      <el-form-item label="设备名" required>
        <el-input v-model="form.name" placeholder="请输入设备名" />
      </el-form-item>
      <el-form-item label="序列号" required>
        <el-input v-model="form.serial" placeholder="请输入序列号"  />
      </el-form-item>
      <el-form-item label="协议类型" required>
        <el-select v-model="form.protocol" placeholder="请选择协议">
          <el-option v-for="(item,index) in protocols" :key="index" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getProtocols, newDevice } from '@/api/device'

export default {
  data() {
    return {
      form: {
        name: '',
        serial: '',
        protocol: ''
      },
      protocols: [
        {
          name: 'MQTT',
          code: 0
        }
      ],
    }
  },
  mounted() {
    getProtocols().then(response => {
      console.log(response)
      if (response.code !== 200 && response.code !== '200') {
        this.$message({
          type: 'warning',
          message: response.msg
        })
      } else {
        let protocolList = []
        for (let i = 0; i < response.data.length; i++) {
          let tmp = response.data[i].split(':')
          protocolList.push({
            code: tmp[0],
            name: tmp[1],
            desc: tmp[2]
          })
        }
        this.protocols = protocolList
      }

    })
  },
  methods: {
    onSubmit() {
      // this.$message('submit!')
      newDevice(this.form).then(response => {
        console.log(response)
        if (response.code === "200" || response.code === 200) {
          this.$message({
            message: "创建成功",
            type: 'success'
          })
        } else {
          this.$message({
            message: response,
            type: 'warning'
          })
        }
      })
    },
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

