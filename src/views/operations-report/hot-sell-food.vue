<template>
    <div >
      <div class="layout-breadcrumb">
        <Breadcrumb>
          <Icon type="home" size="15" class="breadcrumb-icon"></Icon>
          <Breadcrumb-item >经营报表</Breadcrumb-item>
          <Breadcrumb-item >热销菜品</Breadcrumb-item>
        </Breadcrumb>
      </div>
      <explain :explainText="explainText"></explain>
      <div class="main">
        <div class="search">
          <span class="search-label">交易时间</span>
          <Date-picker :value="searchDate" size="large" @on-change="seachDateChange" editable format="yyyy-MM-dd" :options="searchDataConf" type="daterange" placement="bottom-start" placeholder="选择日期" class="search-date"></Date-picker>
          <Input size="large" placeholder="请输入菜品名称" class="search-input" v-model="searchVal"></Input>
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
      name: 'hot-sell-food',
      components: {
        Explain
      },
      data(){
          return{
            explainText:"根据菜品的销售情况进行统计，仅统计已付款（含未完成）的订单【每天晚上1点-3点更新数据】",
            tableHeadData: [
              {
                title: '菜品ID',
                key: 'id',
                align: "center",
              },
              {
                title: '菜品名称',
                key: 'foodName',
                align: "center",
              },
              {
                title: '销售量',
                key: 'sellQuantity',
                align: "center",
              },
              {
                title: '总交易额（单品/元）',
                key: 'allMoney',
                align: "center",
              },
              {
                title: '订单均价（每笔/元）',
                key: 'price',
                align: "center",
              },
              {
                title: '人均购买量',
                key: 'buyQuantity',
                align: "center",
              },
              {
                title: '状态',
                key: 'status',
                align: "center",
              },
              {
                title: '创建时间',
                key: 'createTime',
                align: "center",
              },
            ],
            tableData: [
              {
                id: 10001,
                foodName:"这里有五十个，分行吧啊大石大所大所大所",
                sellQuantity: '100',
                allMoney: "234",
                price: "100",
                buyQuantity: "55",
                status: "上架",
                createTime: "2017-06-05 10:00:00",
              }],
            // 搜索部分
            searchVal: "", //搜索值
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
  .ivu-breadcrumb{
    color: #495060;
  }
</style>
