<template>
  <el-container>
    <el-aside width="200px">
      <!-- 左侧菜单 -->
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened background-color="purple" text-color="green" active-text-color="blue" @open="handleOpen" @close="handleClose">
        <el-menu-item index="/dashboard">
          <i class="el-icon-menu"></i>
          <span slot="title">数据看板</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">面经数据</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script></script>

<style lang="scss" scoped></style>
