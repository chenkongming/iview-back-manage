<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <Icon type="home" size="15" class="breadcrumb-icon"></Icon>
        <Breadcrumb-item>权限管理</Breadcrumb-item>
        <Breadcrumb-item>账号列表</Breadcrumb-item>
        <Breadcrumb-item>新增账号</Breadcrumb-item>
      </Breadcrumb>
    </div>
    <explain :explainText="explainText"></explain>
    <div class="main">
      <h2>基本信息</h2>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" class="form">
        <Form-item label="登录账号" prop="name">
          <Input v-model="formValidate.name" placeholder="可使用英文或者数字"></Input>
        </Form-item>
        <Form-item label="手机号码" prop="phone">
          <Input v-model="formValidate.phone" placeholder="将用于接收密码用2"></Input>
        </Form-item>
        <Form-item label="角色类型" prop="roleType" class="select-item">
          <Select v-model="formValidate.roleType" placeholder="请选择角色类型" style="width:200px">
            <Option value="1">类型1</Option>
            <Option value="2">类型2</Option>
            <Option value="3">类型3</Option>
          </Select>
        </Form-item>
        <Form-item label="选择角色" prop="role" class="select-item">
          <Select v-model="formValidate.role" placeholder="请选择角色" style="width:200px" @on-change="selectRole">
            <Option v-for="(item,index) in roleList" :value="`${item.name}-${item.id}`" :key="index">{{item.name}}
            </Option>
          </Select>
          <div class="role-warpper">
            <div class="role-item" v-for="(item,index) in checkedRoleList">
              <div>{{item.name}}</div>
              <div class="role-icon" @click="delRole(index)">
                <img src="./del-icon.png" width="15" height="15">
              </div>
            </div>
          </div>
        </Form-item>
        <Form-item label="备注说明">
          <Input v-model="formValidate.textarea" type="textarea" :autosize="{minRows: 3,maxRows: 6}"
                 placeholder="请输入..."></Input>
        </Form-item>
        <Form-item class="btn-warpper">
          <Button type="primary" @click="handleSubmit('formValidate')" size="large" class="btn">提交</Button>
          <Button type="ghost" @click="handleCancel()" size="large" class="btn">取消</Button>
        </Form-item>
      </Form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Explain from "components/explain";
  export default {
    data(){
      return {
        explainText: "后台的管理账号，可视资源范围可根据组织范围和商圈的配置来管理账号能查看的门店、菜品和订单的信息。",
        formValidate: {
          name: '',
          phone: '',
          roleType: '',
          role: '',
          textarea: ""
        },
        ruleValidate: {
          name: [
            {required: true, message: '登录账号不少于3个字符', trigger: 'blur'},
            {pattern: /[A-Za-z0-9]$/, message: "登录账号格式错误", trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '手机不能为空', trigger: 'blur'},
            {pattern: /^1[34578]\d{9}$/, message: "手机格式错误", trigger: 'blur'}
          ],
          roleType: [
            {required: true, message: '请选择角色类型', trigger: 'change'}
          ],
          role: [
            {required: true, message: '请选择角色', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请输入个人介绍', trigger: 'blur'},
            {type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur'}
          ]
        },
        //角色
        checkedRoleList: [],
        roleList: [
          {
            id: 1,
            name: "角色1"
          },
          {
            id: 2,
            name: "角色2"
          }
        ],
        roleIds: []
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      handleCancel () {
        this.$router.push("/account-list")
      },
      selectRole(str){
        let arr = str.split("-");
        this.roleIds=[];
        for(let a=0;a<this.checkedRoleList.length;a++){
          this.roleIds.push(this.checkedRoleList[a].id);
        }
        if(this.roleIds.includes(arr[1])) return;
        this.checkedRoleList.push({
          name: arr[0],
          id: arr[1]
        });
      },
      delRole(index){
        this.checkedRoleList.splice(index, 1);
        $lm.JSON(this.checkedRoleList)
        if(this.checkedRoleList.length===0){
          this.formValidate.role=null;
        }
//        this.formValidate.role=this.checkedRoleList[this.checkedRoleList.length-1].name;
      }
    },
    components: {
      Explain
    },
  }
</script>

<style lang="scss" scoped>
  @import '../../common/style';

  .main {
    background: #fff;
    margin: 10px 0;
    box-sizing: border-box;
    min-height: 74vh;
    padding: 10px;
    display: flex;
    flex-direction: column;
    h2 {
      font-size: 20px;
      border-bottom: 1px solid $border-color;
      margin-bottom: 10px;
    }
    .form {
      width: 50%;
      .btn-warpper {
        margin-top: 50px;
        .btn {
          width: 100px;
          &:last-child {
            margin-left: 30px;
          }
        }
      }
      .role-warpper {
        position: absolute;
        top: 0;
        left: 105%;
        display: flex;
        .role-item {
          min-width: 80px;
          border: 1px solid $border-color;
          border-radius: 4px;
          height: 100%;
          padding: 0 10px;
          margin-right: 10px;
          box-sizing: border-box;
          position: relative;
          .role-icon {
            cursor: pointer;
            position: absolute;
            top: -7px;
            right: -2px;
            padding: 10px;
            box-sizing: border-box;
            
          }
        }
      }
    }
  }

  .select-item.ivu-form-item.ivu-form-item-required {
    width: 35%;
    position: relative;
  }

  .ivu-breadcrumb {
    color: #495060;
  }
</style>
