<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="card" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="1">
        <Base ref="form_base" :form_base="form_base" />
      </el-tab-pane>
      <el-tab-pane label="硬件信息" name="2">
        <Physical ref="form_physical" :form_base="form_base" />
      </el-tab-pane>
      <el-tab-pane label="软件信息" name="3">
      </el-tab-pane>
      <el-tab-pane label="变更记录" name="4">
      </el-tab-pane>
      <el-tab-pane label="附加信息" name="5">
      </el-tab-pane>
      <!-- <el-tab-pane v-if="checkPermission(['admin'])" label="密码信息" name="6">
        <Passwd ref="form_passwd"/>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import Base from './form_base'
import Passwd from './form_passwd'
import Physical from './form_physical'
export default {
  name: 'Tab',
  components: { Base, Passwd, Physical},
  data() {
    return {
      activeName: '1',
      dialog: false,
      loading: false,
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
    }
  },
  methods: {
    checkPermission,
    handleClick() {
      if (this.activeName === '6') {
        this.$refs['form_passwd'].host = this.$refs['form_base'].form_base.hostname
        this.$refs['form_passwd'].pinit()
      }
    }
  }
}
</script>

<style scoped>
  .tab-container{
    margin: 30px;
  }
</style>
