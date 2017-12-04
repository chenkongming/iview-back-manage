<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <Icon type="home" size="15" class="breadcrumb-icon"></Icon>
        <Breadcrumb-item href="#">账单中心</Breadcrumb-item>
      </Breadcrumb>
    </div>
    <explain :explainText="explainText" ></explain>
    <div class="main">
      <div class="search">
        <span class="search-label">开单日期</span>
        <Date-picker :value="searchDate" size="large" @on-change="seachDateChange" editable format="yyyy-MM-dd" :options="searchDataConf" type="daterange" placement="bottom-start" placeholder="选择日期" class="search-date"></Date-picker>
        <Select v-model="selectWhich" size="large" clearable placeholder="结账方式" class="search-select">
          <Option v-for="item in selectList" :value="item.value" :key="item">{{ item.label }}</Option>
        </Select>
        <Input size="large" placeholder="请输入账号编号" class="search-input" v-model="searchVal"></Input>
        <Button type="primary" size="large" class="search-btn" @click="search()">搜索</Button>
      </div>
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
export default {
  data() {
    return {
      explainText: "管理门店里的所有订单，未结账的状态说明该笔账单还没结账。",
      // 表数据
      tableHeadData: [
        {
          title: '门店名称',
          key: 'shopName',
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
          title: '台尾号',
          key: 'tableId',
          align: "center",
          width: 160
        },
        {
          title: '日期',
          key: 'date',
          align: "center",
          width: 160
        },
        {
          title: '消费金额',
          key: 'money',
          align: "center",
          className: "money",
        },
        {
          title: '优惠金额',
          key: 'money1',
          align: "center",
        },
        {
          title: '实收金额3',
          key: 'money2',
          align: "center",
        },
        {
          title: '结账方式',
          key: 'payMode',
          align: "center",
        },
        {
          title: '状态',
          key: 'status',
          align: "center",
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div',[
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'large'
                },
                style: {
                  letteSpacing: "1px",
                },
                on: {
                  click: () => {
                   this.$router.push("/bill-detail");
                  }
                }
              }, '详细')
            ]);
          }
        }
      ],
      tableData: [
          {
        shopName: '海门鱼仔店',
        id: 1234567890123,
        tableId: '合：H1(B1001,B1002)',
        date: "2017-06-05 10:00:00",
        money: "100",
        money1: "55",
        money2: "45",
        payMode: "weixin",
        status: "payed"
      }, {
        shopName: '海门鱼仔店',
        id: 1234567890123,
        tableId: '合：H1(B1001,B1002)',
        date: "2017-06-05 10:00:00",
        money: "100",
        money1: "55",
        money2: "45",
        payMode: "weixin",
        status: "payed"
      }, {
        shopName: '海门鱼仔店',
        id: 1234567890123,
        tableId: '合：H1(B1001,B1002)',
        date: "2017-06-05 10:00:00",
        money: "100",
        money1: "55",
        money2: "45",
        payMode: "weixin",
        status: "payed"
      }, {
        shopName: '海门鱼仔店',
        id: 1234567890123,
        tableId: '合：H1(B1001,B1002)',
        date: "2017-06-05 10:00:00",
        money: "100",
        money1: "55",
        money2: "45",
        payMode: "weixin",
        status: "payed"
      }, {
        shopName: '海门鱼仔店',
        id: 1234567890123,
        tableId: '合：H1(B1001,B1002)',
        date: "2017-06-05 10:00:00",
        money: "100",
        money1: "55",
        money2: "45",
        payMode: "weixin",
        status: "payed"
      }, {
        shopName: '海门鱼仔店2',
        id: 1234567890123,
        tableId: '合：H1(B1001,B1002)',
        date: "2017-06-05 10:00:00",
        money: "100",
        money1: "55",
        money2: "45",
        payMode: "weixin",
        status: "payed"
      }, {
        shopName: '海门鱼仔店',
        id: 1234567890123,
        tableId: '合：H1(B1001,B1002)',
        date: "2017-06-05 10:00:00",
        money: "100",
        money1: "55",
        money2: "45",
        payMode: "weixin",
        status: "payed"
      }, {
        shopName: '海门鱼仔店',
        id: 1234567890123,
        tableId: '合：H1(B1001,B1002)',
        date: "2017-06-05 10:00:00",
        money: "100",
        money1: "55",
        money2: "45",
        payMode: "weixin",
        status: "payed"
      }, {
        shopName: '海门鱼仔店',
        id: 1234567890123,
        tableId: '合：H1(B1001,B1002)',
        date: "2017-06-05 10:00:00",
        money: "100",
        money1: "55",
        money2: "45",
        payMode: "weixin",
        status: "payed"
      }, {
        shopName: '海门鱼仔店',
        id: 1234567890123,
        tableId: '合：H1(B1001,B1002)',
        date: "2017-06-05 10:00:00",
        money: "100",
        money1: "55",
        money2: "45",
        payMode: "weixin",
        status: "payed"
      }, {
        shopName: '海门鱼仔店3',
        id: 1234567890123,
        tableId: '合：H1(B1001,B1002)',
        date: "2017-06-05 10:00:00",
        money: "100",
        money1: "55",
        money2: "45",
        payMode: "weixin",
        status: "payed"
      }, {
        shopName: '海门鱼仔店',
        id: 1234567890123,
        tableId: '合：H1(B1001,B1002)',
        date: "2017-06-05 10:00:00",
        money: "100",
        money1: "55",
        money2: "45",
        payMode: "weixin",
        status: "payed"
      }, {
        shopName: '海门鱼仔店',
        id: 1234567890123,
        tableId: '合：H1(B1001,B1002)',
        date: "2017-06-05 10:00:00",
        money: "100",
        money1: "55",
        money2: "45",
        payMode: "weixin",
        status: "payed"
      }, {
        shopName: '海门鱼仔店',
        id: 1234567890123,
        tableId: '合：H1(B1001,B1002)',
        date: "2017-06-05 10:00:00",
        money: "100",
        money1: "55",
        money2: "45",
        payMode: "weixin",
        status: "payed"
      }, {
        shopName: '海门鱼仔店3',
        id: 1234567890123,
        tableId: '合：H1(B1001,B1002)',
        date: "2017-06-05 10:00:00",
        money: "100",
        money1: "55",
        money2: "45",
        payMode: "weixin",
        status: "payed"
      }],
      // 搜索部分
      selectList: [
          {
        value: 'weixin',
        label: '微信'
      },
      {
        value: 'zhifubao',
        label: '支付宝'
      },
      {
        value: 'shuaka',
        label: '刷卡'
      },
      {
        value: 'cash',
        label: '现金'
      }
      ],
      searchVal: "", //搜索值
      searchDate: "", //搜索日期
      selectWhich: "", //搜索支付方式
      searchDataConf: {
        shortcuts: [{
          text: '最近一周',
          value() {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          }
        },
        {
          text: '最近一个月',
          value() {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          }
        },
        {
          text: '最近三个月',
          value() {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          }
        }
        ]
      },
      // 分页部分
      total: 100,
      current: 1,
      pageSize: 15,
      pageSizeOpts: [15, 30, 50, 100]
    }
  },
  components: {
    Explain
  },
  methods: {
    seachDateChange(date) {
      this.searchDate = date;
    },
    search() {
      $lm.print(this.searchDate);
      $lm.print(this.selectWhich);
      $lm.print(this.searchVal);
    },
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
  min-height: 74vh;
  padding: 10px;
  display: flex;
  flex-direction: column;

  .search {
    background: #fff;
    margin-bottom: 10px;
    .search-label {
      display: inline-block;
      margin-right: 5px;
    }
    .search-date {
      width: 220px;
    }
    .search-select {
      width: 150px;
      margin-left: 5px;
    }
    .search-btn {
      margin-left: 10px;
      letter-spacing: 1px;
      width: 80px;
      padding-left: 4px;
    }
    .search-input {
      margin-left: 50px;
      width: 250px;
      margin-top: 2px;
    }
  }
}

</style>
