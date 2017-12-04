<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <Icon type="home" size="15" class="breadcrumb-icon"></Icon>
        <Breadcrumb-item>权限管理</Breadcrumb-item>
        <Breadcrumb-item>账号列表</Breadcrumb-item>
      </Breadcrumb>
    </div>
    <explain :explainText="explainText" :addBtnShow="true" :addBtnText="'新增账号'"></explain>
    <div class="main">
      <div class="stick-foot">
        <Table border :columns="tableHeadData" :data="tableData" class="table"></Table>
      </div>
      <div class="page-warpper">
        <div style="float: right;">
          <Page :total="total" :current="current" :page-size="pageSize" :page-size-opts="pageSizeOpts"
                @on-change="changePage" @on-page-size-change="pageSizeChange" show-total show-elevator show-sizer
                placement="top"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Explain from "components/explain";
  export default {
    data(){
      return {
        explainText: "后台的管理账号，可视资源范围可根据组织范围和商圈的配置来管理账号能查看的门店、菜品和订单的信息。",
        tableHeadData: [
          {
            title: 'ID',
            key: 'data1',
            align: "center",
          },
          {
            title: '账号名称',
            key: 'data2',
            align: "center",
          },
          {
            title: '角色名称',
            key: 'data3',
            align: "center",
          },
          {
            title: '管理资源范围',
            key: 'data4',
            align: "center",
          },
          {
            title: '状态',
            key: 'data5',
            align: "center",
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'large'
                  },
                  style: {
                    letteSpacing: "1px",
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.$router.push("/account-add");
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'large'
                  },
                  style: {
                    letteSpacing: "1px"
                  },
                  on: {
                    click: () => {
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        tableData: [
          {
            data1: "1",
            data2: "nabie",
            data3: "南北区总经理",
            data4: "华南区【广州商圈、东莞商圈】、华北区【北京商圈、...】",
            data5: "启用"
          },
          {
            data1: "1",
            data2: "nabie",
            data3: "南北区总经理",
            data4: "华南区【广州商圈、东莞商圈】、华北区【北京商圈、...】",
            data5: "启用"
          },
          {
            data1: "1",
            data2: "nabie",
            data3: "南北区总经理",
            data4: "华南区【广州商圈、东莞商圈】、华北区【北京商圈、...】",
            data5: "启用"
          },
          {
            data1: "1",
            data2: "nabie",
            data3: "南北区总经理",
            data4: "华南区【广州商圈、东莞商圈】、华北区【北京商圈、...】",
            data5: "启用"
          },
          {
            data1: "1",
            data2: "nabie",
            data3: "南北区总经理",
            data4: "华南区【广州商圈、东莞商圈】、华北区【北京商圈、...】",
            data5: "启用"
          },
          {
            data1: "1",
            data2: "nabie",
            data3: "南北区总经理",
            data4: "华南区【广州商圈、东莞商圈】、华北区【北京商圈、...】",
            data5: "启用"
          },
          {
            data1: "1",
            data2: "nabie",
            data3: "南北区总经理",
            data4: "华南区【广州商圈、东莞商圈】、华北区【北京商圈、...】",
            data5: "启用"
          },
          {
            data1: "1",
            data2: "nabie",
            data3: "南北区总经理",
            data4: "华南区【广州商圈、东莞商圈】、华北区【北京商圈、...】",
            data5: "启用"
          },
          {
            data1: "1",
            data2: "nabie",
            data3: "南北区总经理",
            data4: "华南区【广州商圈、东莞商圈】、华北区【北京商圈、...】",
            data5: "启用"
          },
          {
            data1: "1",
            data2: "nabie",
            data3: "南北区总经理",
            data4: "华南区【广州商圈、东莞商圈】、华北区【北京商圈、...】",
            data5: "启用"
          },
          {
            data1: "1",
            data2: "nabie",
            data3: "南北区总经理",
            data4: "华南区【广州商圈、东莞商圈】、华北区【北京商圈、...】",
            data5: "启用"
          },
          {
            data1: "1",
            data2: "nabie",
            data3: "南北区总经理",
            data4: "华南区【广州商圈、东莞商圈】、华北区【北京商圈、...】",
            data5: "启用"
          },
          {
            data1: "1",
            data2: "nabie",
            data3: "南北区总经理",
            data4: "华南区【广州商圈、东莞商圈】、华北区【北京商圈、...】",
            data5: "启用"
          },
        ],
        // 分页部分
        total: 100,
        current: 1,
        pageSize: 15,
        pageSizeOpts: [15, 30, 50, 100]
      }
    },
    methods: {
      // 分页
      changePage(current) {
        this.current = current;
        $lm.print(current)
      },
      pageSizeChange(pageSize) {
        this.pageSize = pageSize;
      },
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
  }

  .ivu-breadcrumb {
    color: #495060;
  }
</style>
