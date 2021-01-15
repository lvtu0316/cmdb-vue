<template>
  <div>
    <el-form ref="form" :model="form_base"  size="small" label-width="90px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="SN编号" prop="sn">
            <el-input v-model="form_base.sn" style="width: 300px;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="品牌" prop="brand">
            <el-input v-model="form_base.brand" style="width: 300px;"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备类型">
            <el-input v-model="form_base.device_model" style="width: 300px;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="供应商">
            <el-input v-model="form_base.supplier" style="width: 300px;"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="位置">
            <el-input v-model="form_base.location" style="width: 300px;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="机柜">
            <el-select v-model="form_base.cabinet" style="width: 300px;" placeholder="请选择">
              <el-option
                v-for="item in cabinet_list"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="CPU型号">
            <el-input v-model="form_base.sys_cpu_model" style="width: 300px;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="CPU颗数">
            <el-input v-model="form_base.cpu_number" style="width: 300px;"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="CPU核数">
            <el-input v-model="form_base.cpu_core" style="width: 300px;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="内存卡型号">
            <el-input v-model="form_base.memory_model" style="width: 300px;"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="内存卡品牌">
            <el-input v-model="form_base.memory_brand" style="width: 300px;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="内存卡条数">
            <el-input v-model="form_base.memory_num" style="width: 300px;"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="内存大小">
            <el-input v-model="form_base.memory_size" style="width: 300px;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="硬盘大小">
            <el-input v-model="form_base.disk_size" style="width: 300px;"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="硬盘个数">
            <el-input v-model="form_base.disk_num" style="width: 300px;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="网卡信息">
            <el-input v-model="form_base.net_card_info" style="width: 300px;"/>
          </el-form-item>
        </el-col>
      </el-row>
      
      
      <el-row>
        <el-form-item v-if="form_base.error_message" label="错误信息">
          <el-input v-model="form_base.error_message" style="width: 720px;" type="textarea"/>
        </el-form-item>
      </el-row>
      <el-form-item>
        <div style="display: inline-block;margin: 20px 0px;float: left">
          <el-button v-if="checkPermission(['admin','host_all','host_edit']) && button == 'edit'" type="primary" @click="edit">编辑</el-button>
          <el-button v-if="checkPermission(['admin','host_all','host_edit']) && button == 'save'" type="success" @click="doSubmit">保存</el-button>
          <el-button v-if="checkPermission(['admin','host_all','host_edit']) && button == 'save'" type="warning" @click="cancel">取消</el-button>
          <el-button v-if="checkPermission(['admin','host_all','host_edit']) && button == 'edit'" @click="closeTag">返回</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import { retrieve, edit } from '@/api/device'
import { getCabinets } from '@/api/cabinet'
export default {
  name: 'Physical',
  props: {
    form_base: {}
  },
  data() {
    return {
      loading: false,
      button: 'edit',
      // form_base: {
      //   id: '',
      //   brand: '',
      //   sn: '',
      //   device_model: '',
      //   supplier: '',
      //   position: '',
      //   cabinet: '',
      //   sys_cpu_model: '',
      //   cpu_number: '',
      //   cpu_core: '',
      //   memory_model: '',
      //   memory_brand: '',
      //   memory_num: '',
      //   memory_size: '',
      //   disk_size: '',
      //   disk_num: '',
      //   net_card_info: '',
      //   error_message: ''
      // },
      is_Readonly: true,
      cabinet_list: []
    }
  },

  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    checkPermission,
    init() {
      var pro
      retrieve(this.$route.query.id).then(res => {
        for (pro in this.form_base) {
          this.form_base[pro] = res[pro]
        }
        

      })
      this.getAllCabinets()
      
    },
    closeTag() {
      this.$store.dispatch('delView', this.$store.state.tagsView.visitedViews.slice(-1)[0])
      this.$router.go(-1)
    },
    cancel() {
      this.button = 'edit'
      this.is_Readonly = true
    },
    edit() {
      this.button = 'save'
      this.is_Readonly = false
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          edit(this.form_base.id, this.form_base).then(res => {
            // this.resetForm()
            this.$message({
              showClose: true,
              type: 'success',
              message: '修改成功!',
              duration: 2500
            })
            this.loading = false
            this.is_Readonly = true
            this.button = 'edit'
            this.init()
          }).catch(err => {
            this.loading = false
            console.log(err.response.data.data)
          })
        }
      })
    },
    resetForm() {
      // this.$refs['form_base'].resetFields()
      this.form_base = {
        brand: '',
        sn: '',
        device_model: '',
        supplier: '',
        position: '',
        cabinet: '',
        sys_cpu_model: '',
        cpu_number: '',
        cpu_core: '',
        memory_model: '',
        memory_brand: '',
        memory_num: '',
        memory_size: '',
        disk_size: '',
        disk_num: '',
        net_card_info: '',
        error_message: ''
      }
    },
    getAllCabinets() {
      if (Array.isArray(this.cabinet_list) && this.cabinet_list.length === 0) {
        getCabinets().then(res => {
          const _this = this
          res.results.forEach(function(data, index) {
            const cabinet = { value: data.id, label: data.num }
            _this.cabinet_list.push(cabinet)
          })
        })
      }
    },
    
    
  }
}
</script>

<style>
  .el-select__tags-text {
    color: #409EFF;
  }
  .el-input.is-disabled .el-input__inner {
    color: #606266;
  }
</style>
