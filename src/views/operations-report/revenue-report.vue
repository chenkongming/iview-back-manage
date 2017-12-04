<template>
  <div >
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <Icon type="home" size="15" class="breadcrumb-icon"></Icon>
        <Breadcrumb-item >经营报表</Breadcrumb-item>
        <Breadcrumb-item >应收报表</Breadcrumb-item>
      </Breadcrumb>
    </div>
    <explain :explainText="explainText"></explain>
    <div class="main">
      <div class="search">
        <span class="search-label">交易时间</span>
        <Date-picker :value="searchDate" size="large" @on-change="seachDateChange" editable format="yyyy-MM-dd" :options="searchDataConf" type="daterange" placement="bottom-start" placeholder="选择日期" class="search-date"></Date-picker>
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
    name: 'revenue-report',
    components: {
      Explain
    },
    data(){
      return{
        explainText:"根据菜品的销售情况进行统计，仅统计已付款（含未完成）的订单【每天晚上1点-3点更新数据】",
        tableHeadData: [
          {
            title: '日期',
            key: 'data1',
            align: "center",
          },
          {
            title: '门店名称',
            key: 'data2',
            align: "center",
          },
          {
            title: '账单总数',
            key: 'data3',
            align: "center",
          },
          {
            title: '退菜数',
            key: 'data4',
            align: "center",
          },
          {
            title: '转菜数',
            key: 'data5',
            align: "center",
          },
          {
            title: '应收金额',
            key: 'data6',
            align: "center",
          },
          {
            title: '优惠金额',
            key: 'data7',
            align: "center",
          },
          {
            title: '实收金额',
            key: 'data8',
            align: "center",
          },
          {
            title: '微信收款/账单数',
            key: 'data9',
            align: "center",
          },
          {
            title: '支付宝收款/账单数',
            key: 'data10',
            align: "center",
          },
          {
            title: '现金收款/账单数',
            key: 'data11',
            align: "center",
          },
          {
            title: '刷卡收款/账单数',
            key: 'data12',
            align: "center",
          }
        ],
        tableData: [
          {
            data1: "2017-06-07",
            data2:"这里有所大所大所",
            data3: '100',
            data4: "234",
            data5: "100",
            data6: "￥55",
            data7: "￥54",
            data8: "￥4500.00",
            data9: "￥500.00/10",
            data10: "￥500.00/20",
            data11: "￥500.00/20",
            data12: "￥500.00/20",
          }],
        // 搜索部分
        searchDate: "", //搜索日期
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
    methods: {
      seachDateChange(date) {
        this.searchDate = date;
      },
      search() {
        $lm.print(this.searchDate);
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
      .search-btn {
        margin-left: 10px;
        letter-spacing: 1px;
        width: 80px;
        padding-left: 4px;
      }
    }
  }
  .ivu-breadcrumb{
    color: #495060;
  }
</style>
