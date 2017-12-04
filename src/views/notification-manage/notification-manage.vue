<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <Icon type="home" size="15" class="breadcrumb-icon"></Icon>
        <Breadcrumb-item href="#">通告管理</Breadcrumb-item>
      </Breadcrumb>
    </div>
    <div class="main">
      <Tabs class="stick-foot">
        <Tab-pane label="业务公告" icon="ios-pulse-strong">
          <Table border :columns="tableHeadData" :data="tableData" class="table"></Table>
        </Tab-pane>
        <Tab-pane label="系统公告" icon="speakerphone">
          <Table border :columns="tableHeadData" :data="tableData" class="table"></Table>
        </Tab-pane>
      </Tabs>
      <div class="page-warpper">
        <div style="float: right;">
          <Page :total="total" :current="current" :page-size="pageSize" :page-size-opts="pageSizeOpts"
                @on-change="changePage" @on-page-size-change="pageSizeChange" show-total show-elevator show-sizer
                placement="top"></Page>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="modal-warpper" v-show="detailShow">
        <div class="detailModal">
          <div class="title">
            <div>
              <h1>标题：</h1>
              <h2>这里是通知标题</h2>
            </div>
            <h1 class="close" @click="detailShow=false">x</h1>
          </div>
          <div class="other">
            <div class="time">发布时间：2017-06-27 10:00:00</div>
            <div class="publisher">发布人：总部</div>
          </div>
          <div class="push-title">发布详情</div>
          <div class="content">
            我是公布内容 我是公布内容 我是公布内容 我是公布内容 我是公布内容 我是公布内容 我是公布内容 我是公布内容 我是公布内容 我是公布内容 我是公布内容
            我是公布内容
            我是公布内容
            我是公布内容
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "notification-manage",
    data(){
      return {
        // 表数据
        tableHeadData: [
          {
            title: '标题',
            key: 'data1',
            align: "center",
          },
          {
            title: '发布时间',
            key: 'data2',
            align: "center",
          },
          {
            title: '公布内容',
            key: 'data3',
            align: "center",
            width: 160
          },
          {
            title: '发布方',
            key: 'data4',
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
                    letteSpacing: "1px"
                  },
                  on: {
                    click: () => {
                      this.detailShow=true
                    }
                  }
                }, '查看')
              ]);
            }
          }
        ],
        tableData: [
          {
            data1: '我是标题啊',
            data2: "2017-06-05 10:00:00",
            data3: '鹅鹅鹅鹅鹅鹅',
            data4: "hhh",
          },
          {
            data1: '我是标题啊',
            data2: "2017-06-05 10:00:00",
            data3: '鹅鹅鹅鹅鹅鹅',
            data4: "hhh",
          }],
        //分页
        total: 100,
        current: 1,
        pageSize: 15,
        pageSizeOpts: [15, 30, 50, 100],
        //详情显示隐藏
        detailShow: false
      }
    },
    methods: {
      // 分页
      changePage(current) {
        this.current = current;
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
    min-height: 80vh;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  .modal-warpper {
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    z-index: 999;
    backdrop-filter: blur(10px);
    opacity: 1;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    &.fade-enter-active, &.fade-leave-active {
      transition: all 0.5s;
    }
    &.fade-enter, &.fade-leave-active {
      opacity: 0;
      background: rgba(0, 0, 0, 0);
    }
    .detailModal {
      width: 40%;
      height: 50%;
      background: #ffffff;
      border-radius: 8px;
      color: #000000;
      padding: 0 10px;
      box-sizing: border-box;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid $border-color;
        h1, h2 {
          display: inline-block;
        }
        h2 {
          font-size: 16px;
        }
        .close{
          padding: 10px 20px;
          cursor: pointer;
        }
      }
      .other{
        display: flex;
        justify-content: space-between;
        margin: 10px 20px;
      }
      .push-title{
        margin-left: 20px;
      }
      .content{
        margin: 5px 20px;
        border: 1px solid #d1d1d1;
        background: #fff;
        height:70%;
        padding:10px 20px;
        overflow-y: auto;
      }
    }
  }
</style>
