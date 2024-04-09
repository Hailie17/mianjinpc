<template>
  <div class="article-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>面经后台</el-breadcrumb-item>
      <el-breadcrumb-item>面经管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never" border="false">
      <template #header>
        <div class="header">
          <span>共 {{ total }} 条记录</span>
          <el-button icon="el-icon-plus" size="small" type="primary" round @click="openDrawer('add')"> 添加面经 </el-button>
        </div>
      </template>
      <!-- table -->
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="stem" label="标题" width="400"> </el-table-column>
        <el-table-column prop="creator" label="作者"> </el-table-column>
        <el-table-column prop="likeCount" label="点赞"> </el-table-column>
        <el-table-column prop="views" label="浏览"> </el-table-column>
        <el-table-column prop="createdAt" label="更新日期" width="180"> </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <div class="actions">
              <i class="el-icon-edit" @click="openDrawer('edit', row.id)"></i>
              <i class="el-icon-view" @click="openDrawer('view', row.id)"></i>
              <i class="el-icon-delete" @click="del(row.id)"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="current" :page-size="pageSize" :page-sizes="[10, 15, 20, 30, 50]" layout="total, sizes, prev, pager, next" :total="total"> </el-pagination>
    </el-card>
    <!-- 抽屉 -->
    <el-drawer :title="drawerTitle" :visible.sync="drawer" size="50%" @close="handleClose">
      <el-form v-if="drawerType !== 'view'" :model="form" ref="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="stem">
          <el-input v-model="form.stem"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <quillEditor v-model="form.content" @blur="$refs.form.validateField('content')"></quillEditor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
      <div v-else class="article-preview">
        <h5>{{ form.stem }}</h5>
        <div v-html="form.content"></div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getArticleListAPI, addArticleAPI, deleteArticleAPI, getArticleAPI, updateArticleAPI } from '@/api/article'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'article-page',
  components: {
    quillEditor
  },
  data() {
    return {
      current: 1,
      pageSize: 10,
      list: [],
      total: 0,
      drawer: false,
      drawerType: '',
      form: {
        stem: '',
        content: ''
      },
      rules: {
        stem: [{ required: true, message: '标题必填', trigger: 'blur' }],
        content: [{ required: true, message: '内容必填', trigger: 'blur' }]
      } // 表单验证
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      const res = await getArticleListAPI({
        current: this.current,
        pageSize: this.pageSize
      })
      this.total = res.data.total
      this.list = res.data.rows
    },
    // 删除
    async del(id) {
      console.log(id)
      try {
        await deleteArticleAPI(id)
        this.initData()
        this.$message.success('删除成功')
      } catch (error) {
        if (error.response) {
          this.$message.error(error.response.data.message)
        } else {
          this.$message.error('删除失败')
        }
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.initData()
    },
    handleCurrentChange(val) {
      this.current = val
      this.initData()
    },
    handleClose() {
      this.drawer = false
      this.$refs.form?.resetFields() //重置表单  ?.可选链操作符
      delete this.form.id // 删除对象的属性
    },
    // 打开抽屉
    async openDrawer(type, id) {
      this.drawerType = type
      if (type !== 'add') {
        const res = await getArticleAPI(id)
        this.form.stem = res.data.stem
        this.form.content = res.data.content
        this.form.id = res.data.id
      }
      this.drawer = true
    },
    // 添加 / 修改操作
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          if (this.drawerType === 'add') {
            try {
              await addArticleAPI(this.form)
              this.handleClose()
              this.initData()
              this.$message.success('添加成功')
            } catch (error) {
              if (error.response) {
                this.$message.error(error.response.data.message)
              } else {
                this.$message.error('添加失败')
              }
            }
          } else {
            try {
              await updateArticleAPI(this.form)
              this.handleClose()
              this.initData()
              this.$message.success('编辑成功')
            } catch (error) {
              if (error.response) {
                this.$message.error(error.response.data.message)
              } else {
                this.$message.error('编辑失败')
              }
            }
          }
        }
      })
    }
  },
  computed: {
    drawerTitle() {
      if (this.drawerType === 'edit') {
        return '编辑面经'
      } else if (this.drawerType === 'add') {
        return '添加面经'
      } else {
        return '面经详情'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 25px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
  }
  .actions {
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    color: #666;
    > i:hover {
      color: rgba(114, 124, 245, 1);
      cursor: pointer;
    }
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-breadcrumb {
  margin-top: 10px;
}
.el-form {
  padding-right: 40px;
}
.quill-editor {
  ::v-deep .ql-editor {
    height: 300px;
  }
}
.el-rate {
  padding: 10px 0;
}
.article-preview {
  padding: 0 40px 40px 40px;
  > h5 {
    font-size: 20px;
    color: #666;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 30px;
    margin: 0 0 20px 0;
  }
}
</style>
