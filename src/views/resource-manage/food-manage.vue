<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <Icon type="home" size="15" class="breadcrumb-icon"></Icon>
        <Breadcrumb-item >资源管理2</Breadcrumb-item>
        <Breadcrumb-item >菜品管理</Breadcrumb-item>
      </Breadcrumb>
    </div>
    <explain :explainText="explainText" :addBtnShow="true" :addBtnText="'新增菜品'"></explain>
    <div class="main">
      <div class="search">
        <Select v-model="selectWhich1" size="large" clearable placeholder="请选择一级品类" class="search-select">
          <Option v-for="item in selectList" :value="item.value" :key="item">{{ item.label }}</Option>
        </Select>
        <Select v-model="selectWhich2" size="large" clearable placeholder="请选择二级品类" class="search-select">
          <Option v-for="item in selectList" :value="item.value" :key="item">{{ item.label }}</Option>
        </Select>
        <Input size="large" placeholder="菜单ID/菜品名称" class="search-input" v-model="searchVal"></Input>
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
    <Modal
      v-model="modalShow"
      title="警告"
      width="350"
      >

      <p>确定删除该菜品吗？</p>
      <div slot="footer">
        <Button type="primary" size="large"  @click="delConfirm">确定</Button>
        <Button  size="large"   @click="cancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import Explain from "components/explain";
  export default {
    data() {
      return {
        explainText: "添加菜品时，只能添加期初库存，期初库存添加完成后不能修改，若需变更库存请通过库存管理的出/入库制单的方式进行库存的调整。",
        // 表数据
        tableHeadData: [
          {
            title: '菜品ID',
            key: 'data1',
            align: "center",
          },
          {
            title: '菜品名称',
            key: 'data2',
            align: "center",
          },
          {
            title: '所属品类',
            key: 'data3',
            align: "center",
          },
          {
            title: '销售价',
            key: 'data4',
            align: "center",
          },
          {
            title: '库存金额',
            key: 'data5',
            align: "center",
          },
          {
            title: '上架时间',
            key: 'data6',
            align: "center",
          },
          {
            title: '状态',
            key: 'data7',
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
                    marginRight:"10px"
                  },
                  on: {
                    click: () => {
                    alert("编辑")
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    size: 'large'
                  },
                  style: {
                    letteSpacing: "1px"
                  },
                  on: {
                    click: () => {
                      this.delModal();
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        tableData: [
          {
              data1:"P10001",
              data2:"123123123123123",
            data3:"主分类->二级分类",
            data4:"￥100",
            data5:"32",
            data6:"2017-05-01 04:44:33",
            data7:"上架"
          },
          {
            data1:"P10001",
            data2:"123123123123123",
            data3:"主分类->二级分类",
            data4:"￥100",
            data5:"32",
            data6:"2017-05-01 04:44:33",
            data7:"上架"
          },
          {
            data1:"P10001",
            data2:"123123123123123",
            data3:"主分类->二级分类",
            data4:"￥100",
            data5:"32",
            data6:"2017-05-01 04:44:33",
            data7:"上架"
          },
          {
            data1:"P10001",
            data2:"123123123123123",
            data3:"主分类->二级分类",
            data4:"￥100",
            data5:"32",
            data6:"2017-05-01 04:44:33",
            data7:"上架"
          },{
            data1:"P10001",
            data2:"123123123123123",
            data3:"主分类->二级分类",
            data4:"￥100",
            data5:"32",
            data6:"2017-05-01 04:44:33",
            data7:"上架"
          },{
            data1:"P10001",
            data2:"123123123123123",
            data3:"主分类->二级分类",
            data4:"￥100",
            data5:"32",
            data6:"2017-05-01 04:44:33",
            data7:"上架"
          },{
            data1:"P10001",
            data2:"123123123123123",
            data3:"主分类->二级分类",
            data4:"￥100",
            data5:"32",
            data6:"2017-05-01 04:44:33",
            data7:"上架"
          },{
            data1:"P10001",
            data2:"123123123123123",
            data3:"主分类->二级分类",
            data4:"￥100",
            data5:"32",
            data6:"2017-05-01 04:44:33",
            data7:"上架"
          },{
            data1:"P10001",
            data2:"123123123123123",
            data3:"主分类->二级分类",
            data4:"￥100",
            data5:"32",
            data6:"2017-05-01 04:44:33",
            data7:"上架"
          }
        ],
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
        selectWhich1: "", //
        selectWhich2:"",
        // 分页部分
        total: 100,
        current: 1,
        pageSize: 15,
        pageSizeOpts: [15, 30, 50, 100],
        modalShow:false
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
      },
      //删除菜品
      delModal(){
          this.modalShow=true;
      },
      delConfirm(){
        this.modalShow=false;
        this.$Message.success('删除成功');
//        this.$Message.error('删除失败');
      },
      cancel(){
        this.modalShow=false;
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
