<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增机柜' : '编辑机柜'" width="480px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="机柜编号" prop="num">
        <el-input v-model="form.num" style="width: 300px;"/>
      </el-form-item>
      <el-form-item label="品牌" prop="brand">
        <el-input v-model="form.brand" style="width: 300px;"/>
      </el-form-item>
      <el-form-item label="位置">
        <el-input v-model="form.location" style="width: 300px;" rows="5" type="textarea"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/cabinet'

export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: { num: '', brand: '', location: '' },
      rules: {
        num: [
          { required: true, message: '请输入机柜编号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.isAdd) {
            this.doAdd()
          } else this.doEdit()
        } else {
          return false
        }
      })
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$message({
          showClose: true,
          type: 'success',
          message: '添加成功!',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    doEdit() {
      edit(this.form.id, this.form).then(res => {
        this.resetForm()
        this.$message({
          showClose: true,
          type: 'success',
          message: '修改成功!',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { num: '', brand: '', location: '' }
    }
  }
}
</script>

<style scoped>

</style>
