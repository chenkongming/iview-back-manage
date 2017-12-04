<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <Icon type="home" size="15" class="breadcrumb-icon"></Icon>
        <Breadcrumb-item>
          <router-link to="/bill-manage">账单中心</router-link>
        </Breadcrumb-item>
        <Breadcrumb-item>详细</Breadcrumb-item>
      </Breadcrumb>
    </div>
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
export default {
  data() {
    return {
      // 表数据
      tableHeadData: [
        {
          title: '日期',
          key: 'date',
          align: "center",
          width: 100
        },
        {
          title: '账单编号',
          key: 'id',
          align: "center",
          width: 140
        },
        {
          title: '品名',
          key: 'productName',
          align: "center",
          width: 160
        },
        {
          title: '单价',
          key: 'price',
          align: "center",
          width: 160
        },
        {
          title: '数量',
          key: 'quantity',
          align: "center",
        },
        {
          title: '操作类型',
          key: 'handleType',
          align: "center",
        },
        {
          title: '赠送',
          key: 'gift',
          align: "center",
        },
        {
          title: '实收金额',
          key: 'money',
          align: "center",
        },
        {
          title: '服务员',
          key: 'waiter',
          align: "center",
        },
        {
          title: '退/转原因',
          key: 'reason',
          align: "center",
        }
      ],
      tableData: [{
        date: '2017-06-05 10:00:00',
        id: 1234567890123,
        productName: '品名',
        price: "20",
        quantity: "100",
        handType: "操作类型",
        gift: "45",
        money: "10",
        waiter: "服务员",
        reason: "原因"
      }, {
        date: '2017-06-05 10:00:00',
        id: 1234567890123,
        productName: '品名',
        price: "20",
        quantity: "100",
        handType: "操作类型",
        gift: "45",
        money: "10",
        waiter: "服务员",
        reason: "原因"
      }],
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

    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/style';
.main {
  background: #fff;
  margin: 10px 0;
  box-sizing: border-box;
  min-height: 82vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

</style>
