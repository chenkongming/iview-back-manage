<template>
  <div >
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <Icon type="home" size="15" class="breadcrumb-icon"></Icon>
        <Breadcrumb-item >经营报表</Breadcrumb-item>
        <Breadcrumb-item >营业概要</Breadcrumb-item>
      </Breadcrumb>
    </div>
    <explain :explainText="explainText"></explain>
  <div class="main" >
    <Table border :columns="tableHeadData" :data="tableData" class="table"></Table>
    <div id="echart"  ref="echartRef"></div>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Explain from "components/explain";
  import store from '../../vuex/store'
  export default {
    name: 'business-resume',
    components: {
      Explain
    },
    data () {
      return {
        explainText:"当前门店的营业概况，每小时更新一次。",
        charts: null,
        tableHeadData:[
          {
            title: '时间',
            key: 'time',
            width:100,
            align: "center",
            fixed: 'left'
          }
        ],
        tableData:[
          {
              time:"账单总数"
          }
        ],
        xAxisData:[],
        yAxisData:[]

      }
    },
    mounted(){
      this.resizeWorldMapContainer();
      this.$nextTick(()=>{
        this.drawChart();
      });
      for(let a=1;a<=24;a++){
          this.tableHeadData.push({
            title:a,
            key:`time${a}`,
            align:"center"
          });
        this.tableData[0][`time${a}`]=a*Math.round(Math.random()*10);
        this.xAxisData.push(`${a}`);
        this.yAxisData.push(`${a*Math.round(Math.random()*10)}`)
      }
    },
    computed:{
      menuFolded(){
        return store.state.menuFolded;
      }
    },
    watch:{
      menuFolded:"resizeWorldMapContainer"
    },
    methods:{
      resizeWorldMapContainer () {
        let per=this.menuFolded?0.95:0.87;
        let chart=this.$refs.echartRef;
        chart.style.width =( window.innerWidth*per)+'px';
        chart.style.height = '500px';
        if(this.charts){
          this.charts.resize();
        }
      },
      drawChart(){
        let echarts = require('echarts/lib/echarts');
        require('echarts/lib/chart/line');
        require('echarts/lib/component/tooltip');
        this.charts = echarts.init(this.$refs.echartRef);
        this.charts.setOption({
          tooltip: {
            trigger: 'none',
            axisPointer: {
              type: 'cross'
            }
          },
          xAxis: {
            type: 'category',
            name: '时间',
            splitLine: {show: false},
            data: this.xAxisData,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: "#666"
              }
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return '订单数  ' + params.value
                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                }
              }
            },
          },
          yAxis: {
            type: 'value',
            name: '账单总数',
            axisLine: {
              onZero: false,
              lineStyle: {
                color: "#666"
              }
            },
          },
          width:"auto",
          series: [
            {
              type: 'line',
              data:  this.yAxisData,
              itemStyle : { normal: {
                color:'#333333',
                label : {show: true},
                lineStyle:{
                  color:'#447dc0'
                }
              }}
            }
          ]
        })
      }
    },
  }
</script>

<style lang="scss" scoped >
  .main {
    background: #fff;
    margin: 10px 0;
    box-sizing: border-box;
    min-height: 74vh;
    padding: 10px;
    #echart{
      position: absolute;
      left: 0;
      bottom: 50px;
    }
  }
  .ivu-breadcrumb{
    color: #495060;
  }
</style>
