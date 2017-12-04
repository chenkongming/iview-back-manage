<template>
    <div >
      <div class="layout-breadcrumb">
        <Breadcrumb>
          <Icon type="home" size="15" class="breadcrumb-icon"></Icon>
          <Breadcrumb-item >资源管理</Breadcrumb-item>
          <Breadcrumb-item >品类管理</Breadcrumb-item>
        </Breadcrumb>
      </div>
      <explain :explainText="explainText" :addBtnShow="true" :addBtnText="'新增品类'"></explain>
      <div class="main">
        <div class="stick-foot">
          <Table border :columns="tableHeadData" :data="tableData" class="table"></Table>
        </div>
        <div class="page-warpper">
          <div style="float: right;">
            <Page :total="total" :current="current" :page-size="pageSize" :page-size-opts="pageSizeOpts" @on-change="changePage" @on-page-size-change="pageSizeChange" show-total show-elevator show-sizer placement="top"></Page>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Explain from "components/explain";
  import store from '../../vuex/store'
  export default {
    name: 'category-manage',
    components: {
      Explain
    },
    data () {
      return {
        explainText:"菜系分类是菜品管理的顶级分类，最多可做二级分类（仅在总部的帐号可以配置）。",
        tableHeadData: [
          {
            title: '展开/收起',
            key: 'data1',
            align: "center",
          },
          {
            title: '分类名称',
            key: 'data2',
            align: "center",
          },
          {
            title: '操作',
            key: 'data3',
            align: "center",
          },
        ],
        tableData: [],
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

      }
    }
  }
</script>

<style lang="scss" scoped >
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
  .ivu-breadcrumb{
    color: #495060;
  }
</style>
