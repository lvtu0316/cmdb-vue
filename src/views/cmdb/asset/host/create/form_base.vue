<template>
  <div>
    <el-form ref="form" :model="form_base" :rules="rules" size="small" label-width="90px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="名称">
            <el-input v-model="form_base.name" style="width: 300px;" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="IP" prop="ip">
            <el-input v-model="form_base.ip" style="width: 300px;"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备类型">
            <el-select v-model="form_base.device_type" style="width: 300px;" placeholder="请选择设备类型">
              <el-option v-for="item in device_types" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="系统类型">
            <el-select v-model="form_base.os_type"  style="width: 300px;" placeholder="请选择认证类型">
              <el-option v-for="item in os_types" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row>
        
        <el-col :span="12">
          <el-form-item label="状态">
            <el-select v-model="form_base.status"  style="width: 300px;" placeholder="请选择设备状态">
              <el-option v-for="item in status_list" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="系统版本">
            <el-input v-model="form_base.os_version" style="width: 300px;"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="网络类型">
            <el-select v-model="form_base.network_type"  style="width: 300px;" placeholder="请选择网络类型">
              <el-option v-for="item in network_types" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标签">
            <el-select v-model="form_base.labels"  multiple style="width: 300px;" placeholder="请选择">
              <el-option
                v-for="item in label_list"
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
          <el-form-item label="关联业务">
            <el-select v-model="form_base.businesses"  multiple style="width: 300px;" placeholder="请选择">
              <el-option
                v-for="item in business_list"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备组">
            <el-select v-model="form_base.groups"  multiple style="width: 300px;" placeholder="请选择">
              <el-option
                v-for="item in group_list"
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
          <el-form-item label="使用部门">
            <el-input v-model="form_base.use_department" style="width: 300px;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="责任人">
            <el-input v-model="form_base.leader" style="width: 300px;"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="责任人电话">
            <el-input v-model="form_base.leader_phone" style="width: 300px;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="运维部门">
            <el-input v-model="form_base.ops_department" style="width: 300px;"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="运维责任人">
            <el-input v-model="form_base.ops_leader"  style="width: 300px;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="运维电话">
            <el-input v-model="form_base.ops_leader_phone" style="width: 300px;"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="上架日期">
            <el-date-picker
              v-model="form_base.online_date"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width: 300px;">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="下架日期">
            <el-date-picker
              v-model="form_base.offline_date"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width: 300px;">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="过保日期">
            <el-date-picker
              v-model="form_base.warranty_date"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width: 300px;">
            </el-date-picker>
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
          <el-button v-if="checkPermission(['admin','host_all','host_create']) && button == 'save'" type="success" @click="doSubmit">保存</el-button>
          <el-button v-if="checkPermission(['admin','host_all','host_create']) && button == 'save'" @click="closeTag">返回</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import { add } from '@/api/device'
import { getBusinesses } from '@/api/business'
import { getGroups } from '@/api/group'
import { getLabels } from '@/api/label'
import { parseTime } from '@/utils/index'
export default {
  name: 'Base',
  props: {
    form_base:{
        name: '',
        ip: '',
        use_department: '',
        leader: '',
        leader_phone: '',
        ops_department: '',
        ops_leader: '',
        ops_leader_phone: '',
        status: '',
        os_version: '',
        os_type: '',
        device_type: '',
        warranty_date: null,
        online_date: null,
        offline_date: null,
        businesses: [],
        groups: [],
        labels: [],
        brand: '',
        sn: '',
        device_model: '',
        supplier: '',
        position: '',
        cabinet: '',
        sys_cpu_model: '',
        cpu_number: 0,
        cpu_core: 0,
        memory_model: '',
        memory_brand: '',
        memory_num: 0,
        memory_size: 0,
        disk_size: 0,
        disk_num: 0,
        net_card_info: '',
        error_message: ''
      }

  },
  data() {
    return {
      loading: false,
      button: 'save',
      group_list: [],
      label_list: [],
      business_list: [],
      is_Readonly: true,
      status_list: [{ value: 'using', label: '使用中'}, {value: 'stopping', label: '已停用'}, {value: 'repairing', label: '维修中'}, {value: 'reserve', label: '备用'}, {value: 'dumping', label: '报废'}],
      network_types: [{ value: 'gongan', label: '公安'}, {value: 'internet', label: '互联网'}, {value: 'shipin', label: '视频专网'}],
      device_types: [{ value: 'virtual', label: '虚拟机'}, {value: 'physical', label: '物理机'}, {value: 'other', label: '其他'}],
      os_types: [{ value: 'linux', label: 'Linux系统' }, { value: 'windows', label: 'Windows系统' }, { value: 'other', label: '其他系统' }],
      rules: {
        ip: [
          { required: true, message: '请输入主机IP', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入主机名称', trigger: 'blur' }
        ]
      }
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
      
      this.getAllBusiness()
      this.getAllGroup()
      this.getAllLable()
    },
    closeTag() {
      this.$store.dispatch('delView', this.$store.state.tagsView.visitedViews.slice(-1)[0])
      this.$router.go(-1)
    },
    
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          add(this.form_base).then(res => {
            // this.resetForm()
            this.$message({
              showClose: true,
              type: 'success',
              message: '添加成功!',
              duration: 2500
            })
            this.loading = false
            this.$router.push('/cmdb/asset/hosts')
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
        id: '',
        name: '',
        sn: '',
        add_time: '',
        modify_time: '',
        hostname: '',
        port: '',
        username: '',
        password: '',
        key_filename: '',
        auth_type: '',
        status: '',
        sys_hostname: '',
        mac_address: '',
        sn_number: '',
        os_version: '',
        os_type: '',
        device_type: '',
        warranty_date: '',
        buy_date: '',
        businesses: [],
        groups: [],
        labels: [],
        error_message: ''
      }
    },
    getAllGroup() {
      if (Array.isArray(this.group_list) && this.group_list.length === 0) {
        getGroups().then(res => {
          const _this = this
          res.results.forEach(function(data, index) {
            const group = { value: data.id, label: data.name }
            _this.group_list.push(group)
          })
        })
      }
    },
    getAllLable() {
      if (Array.isArray(this.label_list) && this.label_list.length === 0) {
        getLabels().then(res => {
          const _this = this
          res.results.forEach(function(data, index) {
            const label = { value: data.id, label: data.name }
            _this.label_list.push(label)
          })
        })
      }
    },
    getAllBusiness() {
      if (Array.isArray(this.business_list) && this.business_list.length === 0) {
        getBusinesses().then(res => {
          const _this = this
          res.results.forEach(function(data, index) {
            const business = { value: data.id, label: data.name }
            _this.business_list.push(business)
          })
        })
      }
    }
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
