<template>
  <div class="login-page">
    <el-card>
      <!-- title -->
      <template #header> 面经后台管理系统 </template>
      <!-- form -->
      <el-form ref="form" :model="user" status-icon label-width="60px" :rules="rules">
        <el-form-item label="账号" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { loginAPI } from '@/api/user'
export default {
  data() {
    return {
      user: {
        username: 'admin',
        password: 'admin'
      },
      rules: {
        username: [
          { required: true, message: '请输入账号名称', trigger: ['blur', 'change'] },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入账号密码', trigger: ['blur', 'change'] },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            const res = await loginAPI(this.user)
            this.$message.success('登陆成功')
            localStorage.setItem('mj-pc-token', res.data.token)
            this.$router.push('/dashboard')
          } catch (error) {
            if (error.response) {
              this.$message.error(error.response.data.message)
            } else {
              this.$message.error('登陆失败')
            }
          }
        }
      })
    },
    reset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background: url(@/assets/login-bg.svg) no-repeat center / cover;
  .el-card {
    width: 420px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    ::v-deep .el-card__header {
      text-align: center;
      background-color: #727cf5;
      color: #fff;
    }
  }
  .el-form {
    padding-right: 20px;
  }
}
</style>
