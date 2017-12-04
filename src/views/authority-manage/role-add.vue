<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <Icon type="home" size="15" class="breadcrumb-icon"></Icon>
        <Breadcrumb-item>权限管理</Breadcrumb-item>
        <Breadcrumb-item>角色列表</Breadcrumb-item>
        <Breadcrumb-item>新增角色</Breadcrumb-item>
      </Breadcrumb>
    </div>
    <explain :explainText="explainText"></explain>
    <div class="main">
      <h2>基本信息</h2>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" class="form">
        <Form-item label="角色名称" prop="name">
          <Input v-model="formValidate.name" placeholder="请输入角色名称"></Input>
        </Form-item>
        <Form-item label="启用状态">
          <i-switch>
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
        </Form-item>
        <Form-item label="角色类型" prop="roleType" class="select-item">
          <Select v-model="formValidate.roleType" placeholder="请选择角色类型" style="width:200px">
            <Option value="1">类型1</Option>
            <Option value="2">类型2</Option>
            <Option value="3">类型3</Option>
          </Select>
        </Form-item>
        <Form-item label="角色授权" class="table-item">
          <ul class="role-table">
            <li class="header">
              <div class="left">菜单列表</div>
              <div class="right">功能权限</div>
            </li>
            <div class="vertical-line"></div>
            <li class="role-item" v-for="(item,index) in dataList" :key="item.id">
              <div class="left" :class="{'one':!item.second}" @click="fold(item)"  v-cloak>
                <Icon :type="item.folded?'arrow-right-b':'arrow-down-b'" size="16" v-if="item.second"
                      class="item-icon" ></Icon>
                <Checkbox @click.native="handleOneCheckAll($event,item)" v-cloak v-if="!item.second" :indeterminate="item.isIndeterminate" v-model="item.checkAll">  {{item.title}}</Checkbox>
                <span v-if="item.second" v-cloak>{{item.title}}</span>
              </div>
              <div class="right">
                  <Checkbox v-if="item.second" :indeterminate="item.isIndeterminate" @on-change="checkSecondAll(item)" v-model="item.firstCheckAll">所有</Checkbox>
                <Checkbox-group v-model="item.checkedCities" @on-change="handleOneCheckedCitiesChange(item)" v-else>
                  <Checkbox v-for="m in item.list" :label="m.id" :key="m.id" v-cloak>{{m.name}}</Checkbox>
                </Checkbox-group>
              </div>
              <div class="line"></div>
              <ul v-show="item.second&&!item.folded">
                <li class="role-item" v-for="(second,cur) in item.second" :key="second.id">
                  <div class="left">
                      <Checkbox v-model="second.checkAll" @on-change="handleCheckAllChange($event,item,second)" v-cloak>　{{second.title}}</Checkbox>
                  </div>
                  <div class="right">
                    <Checkbox-group v-model="second.checkedCities" @on-change="handleCheckedCitiesChange(item,second)">
                      <Checkbox v-for="p in second.list" :label="p.id" :key="p.id" v-cloak>{{p.name}}</Checkbox>
                    </Checkbox-group>
                  </div>
                  <div class="line"></div>
                </li>
              </ul>
            </li>
          </ul>
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
        explainText: "此处为设置管理后台的功能模块权限",
        formValidate: {
          name: '',
          status: "",
          roleType: '',
        },
        ruleValidate: {
          name: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
          ],
          roleType: [
            {required: true, message: '请选择角色类型', trigger: 'change'}
          ]
        },
        dataList: [
          {
            title: "概况",
            id: "0",
            checkedCities:[],
            list: [
              {
                name: "浏览",
                id: "10001"
              },
              {
                name: "修改",
                id: "11111"
              }
            ]
          },
          {
            title: "会员管理",
            id: "1",
            second: [
              {
                title: "会员列表",
                id: "11",
                list: [
                  {
                    name: "新增",
                    id: "10002"
                  },
                  {
                    name: "修改",
                    id: "10003"
                  }
                ],
                checkedCities: []
              },
              {
                title: "会员等级",
                id: "12",
                list: [
                  {
                    name: "新增",
                    id: "10004"
                  },
                  {
                    name: "修改",
                    id: "10005"
                  },
                  {
                    name: "删除",
                    id: "1006"
                  }

                ],
                checkedCities: []
              }
            ]
          },
          {
            title: "菜品管理",
            id: "2",
            second: [
              {
                title: "菜品列表",
                id: "21",
                list: [
                  {
                    name: "新增",
                    id: "10007"
                  },
                  {
                    name: "修改",
                    id: "10008"
                  }
                ],
                checkedCities: []
              },
              {
                title: "会员等级",
                id: "22",
                list: [
                  {
                    name: "浏览",
                    id: "10009"
                  },
                  {
                    name: "新增",
                    id: "10010"
                  },
                  {
                    name: "修改",
                    id: "10011"
                  },
                  {
                    name: "删除",
                    id: "10012"
                  }
                ],
                checkedCities: []
              }
            ]
          }
        ],
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

      fold: function (item) {
        if (typeof item.folded === "undefined") {
          this.$set(item, "folded", true);
        } else {
          item.folded = !item.folded;
        }
      },
      // 全选一项
      handleCheckAllChange(event, item, second) {
        let arr = [];
        for (let a = 0; a < second.list.length; a++) {
          arr.push(second.list[a].id)
        }
        if (typeof second.checkedCities === "undefined") {
          this.$set(second, "checkedCities", arr);
        }
        second.checkedCities = event.target.checked ? arr : [];
        // if (typeof second === "undefined") {
        //     this.$set(second, "isIndeterminate", false)
        // }
        // second.isIndeterminate = false;
        if (typeof second.checkAll === "undefined") {
          this.$set(second, "checkAll", true);
        }
        if (typeof item.isIndeterminate === "undefined") {
          this.$set(item, "isIndeterminate", true);
        }
        for (let a = 0; a < item.second.length; a++) {
          if (!item.second[a].checkAll) {
            item.isIndeterminate = true;
            for (let a = 0; a < item.second.length; a++) {
              if (item.second[a].checkAll) {
                break
              } else {
                item.isIndeterminate = false;
                item.firstCheckAll = false;
              }
            }
            break
          } else {
            item.isIndeterminate = false;
            item.firstCheckAll = true;
          }
        }

      },
      // 单选
      handleCheckedCitiesChange(item, second) {
        let checkedCount = second.checkedCities.length;
        if (typeof second.checkAll === "undefined") {
          this.$set(second, "checkAll", false);
        }
        if (typeof second.isIndeterminate === "undefined") {
          this.$set(second, "isIndeterminate", false);
        }
        if (typeof item.isIndeterminate === "undefined") {
          this.$set(item, "isIndeterminate", true);
        }
        second.isIndeterminate = checkedCount > 0 && checkedCount < second.list.length;
        second.checkAll = checkedCount === second.list.length;
        if (checkedCount === 0) {
          second.isIndeterminate = false
        }
        for (let a = 0; a < item.second.length; a++) {
          if (!item.second[a].checkAll) {
            item.isIndeterminate = true;
            for (let b = 0; b < item.second.length; b++) {
              if (item.second[b].checkedCities.length > 0) {
                break
              } else {
                item.isIndeterminate = false;
                item.firstCheckAll = false;
              }
            }
            break
          } else {
            item.isIndeterminate = false;
            item.firstCheckAll = true;
          }
        }

      },
      // 点击所有
      checkSecondAll(item) {
          console.log(item)
        if (typeof item.firstCheckAll === "undefined") {
          this.$set(item, "firstCheckAll", true);
        }
        for (let a = 0; a < item.second.length; a++) {
          this.checkItemAll(item.firstCheckAll, item.second[a])
        }
        item.isIndeterminate=false
      },
      checkItemAll (flag, item) {
        let arr = [];
        for (let a = 0; a < item.list.length; a++) {
          arr.push(item.list[a].id)
        }
        if (typeof item.checkedCities === "undefined") {
          this.$set(item, "checkedCities", arr);
        }
        item.checkedCities = flag ? arr : [];
        item.checkAll = flag;
      },

      // 没有二级菜单
      handleOneCheckedCitiesChange(item) {
        let checkedCount = item.checkedCities.length;
        if (typeof item.isIndeterminate === "undefined") {
          this.$set(item, "isIndeterminate", false);
        }
        if (typeof item.checkAll === "undefined") {
          this.$set(item, "checkAll", false);
        }
        item.isIndeterminate = checkedCount > 0 && checkedCount < item.list.length;
        item.checkAll = checkedCount === item.list.length;
      },
      handleOneCheckAll(event,item) {
        let arr = [];
        for (let a = 0; a < item.list.length; a++) {
          arr.push(item.list[a].id)
        }

        item.checkedCities = event.target.checked ? arr : [];
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
      width: 25%;
      .btn-warpper {
        position: absolute;
        bottom: 50px;
        left: 20px;
        .btn {
          width: 100px;
          &:last-child {
            margin-left: 30px;
          }
        }
      }
      .role-table {
        position: absolute;
        width: 200%;
        border: 1px solid #e0e0e0;
        border-bottom: none;
        .header {
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #e0e0e0;
          background: #F8F8F9;
          text-align: center;
          .left {
            float: left;
            width: 30%;
          }
          .right {
            float: left;
            width: 70%;
          }
        }
        .vertical-line {
          width: 1px;
          height: 100%;
          background: #ddd;
          position: absolute;
          left: 30%;
          top: 0
        }
        .role-item {
          .left {
            width: 30%;
            float: left;
            padding-left: 10px;
            user-select: none;
            cursor: pointer;
            &.one {
              padding-left: 20px;
            }
          }
          .right {
            width: 70%;
            float: left;
            padding-left: 10px;
          }
          .item-icon {
            margin-left: -5px;

            padding: 5px;
          }
        }
        .line {
          clear: both;
          width: 100%;
          height: 1px;
          background: #e0e0e0;
        }
      }
    }
  }

  .select-item.ivu-form-item.ivu-form-item-required {
    width: 70%;
  }

  .table-item.ivu-form-item.ivu-form-item-required {
    width: 70%;
    position: relative;
  }

  .ivu-form-item {
    margin-bottom: 16px;
  }

  .ivu-breadcrumb {
    color: #495060;
  }
</style>
