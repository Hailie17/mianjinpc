<template>
  <div class="login-page">
    <el-card>
      <template #header> 面经后台管理系统 </template>
      登录框
    </el-card>
  </div>
</template>

<script setup></script>

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
}
</style>
