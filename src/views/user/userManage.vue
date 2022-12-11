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
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="身份">
        <template slot-scope="scope">
          {{ roleMap[scope.row.role] }}
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="110" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="success" size="small" @click="addUserDialogShow = true">添加用户</el-button>

    <el-dialog
      title="添加用户"
      :visible.sync="addUserDialogShow"
      :modal="false"
      :close-on-click-modal="false"
      :show-close="false"
      :close-on-press-escape="false"
    >
      <div class="container">
        <div class="form-box">
          <el-form :model="regForm" ref="regForm" class="demo-ruleForm" :rules="regRules" label-width="80px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="regForm.username" placeholder="请输入用户名"/>
            </el-form-item>
            <el-form-item label="用户密码" prop="password">
              <el-input type="password" v-model="regForm.password" placeholder="请输入密码" show-password/>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="regForm.checkPass" placeholder="请输入密码" show-password/>
            </el-form-item>
            <el-form-item label="用户角色" prop="role">
              <el-radio-group v-model="regForm.role">
                <el-radio :label=0>ADMIN</el-radio>
                <el-radio :label=1>MANAGER</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="用户描述" prop="description">
              <el-input v-model="regForm.description" placeholder="请输入用户描述" type="textarea" rows="5" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUser">确认</el-button>
        <el-button @click="regForm = {}; addUserDialogShow = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAllUser, deleteUser, addUser } from '@/api/user'

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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.regForm.checkPass !== '') {
          this.$refs.regForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.regForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      list: null,
      listLoading: true,
      addUserDialogShow: false,
      roleMap: {
        0: 'ADMIN',
        1: 'USER',
      },
      regForm: {

      },
      regRules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getAllUser().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    deleteUser(row) {
      console.log(row)
      deleteUser(row.username).then(response => {
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
    },
    addUser(row) {
      console.log(row)
      addUser(this.regForm).then(response => {
        if (response.code === "200" || response.code === 200) {
          this.$message({
            message: "操作成功",
            type: 'success'
          })
          this.addUserDialogShow = false
        } else {
          this.$message({
            message: response,
            type: 'warning'
          })
          this.addUserDialogShow = false
        }
        this.fetchData()
      })
    }
  }
}
</script>

<style scoped>

</style>
