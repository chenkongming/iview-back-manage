<template>
  <div class="layout">
    <!--头部-->
    <div class="layout-header">
      <Menu mode="horizontal" theme="primary" :active-name="0" @on-select="selectFirstMenu">
        <Row type="flex">
          <!--logo-->
          <i-col :span="spanLeft">
            <div class="layout-logo">
              <span v-show="spanLeft>1"> 我是LOGO</span>
              <i-button type="text" @click="toggleClick" class="toggle-btn" :class="{'toggle-btn-static':spanLeft<3}">
                <Icon type="navicon" size="32"></Icon>
              </i-button>
            </div>
          </i-col>
          <!--头部菜单-->
          <i-col :span="spanRight-2">
            <div class="layout-nav">
              <Menu-item v-for="(item,index) in firstMenuList" :name="index" :key="index">
                <Icon :type="menuIconMap[index]"></Icon>
                <span>{{item.title}}</span>
              </Menu-item>
            </div>
          </i-col>
          <i-col :span="spanRight-2"></i-col>
          <!--头部头像-->
          <i-col span="2">
            <Dropdown @on-click="settingClick">
              <a href="javascript:void(0)">
                <span class="setting-text">头像2</span>
                <Icon type="arrow-down-b" class="setting-icon"></Icon>
              </a>
              <Dropdown-menu slot="list">
                <Dropdown-item name="editPass">修改密码</Dropdown-item>
                <Dropdown-item name="signOut">退出</Dropdown-item>
              </Dropdown-menu>
            </Dropdown>
          </i-col>
        </Row>
      </Menu>
    </div>
    <!--左边菜单和内容区域-->
    <div class="layout-content">
      <Row type="flex">
        <i-col :span="spanLeft" class="layout-menu-left">
          <Menu :active-name="0" width="auto" :open-names="[0]" v-show="spanLeft > 1" :accordion="true">
            <!--未收缩-->
            <Submenu v-for="(item,index) in secondMenuList" :name="index" :key="index" >
              <template slot="title">
                <Icon :type="menuIconMap[index]" size="15"></Icon>
                <span>{{item.title}}</span>
              </template>
              <Menu-item v-for="(secondItem,secondIndex) in item.thirdMenu" :key="secondIndex" :name="index-secondIndex">
                {{secondItem.title}}
              </Menu-item>
            </Submenu>
          </Menu>
          <div class="menu-right" v-show="spanLeft<3">
            <div class="menu-left-icon" v-for="(item,index) in secondMenuList" @mouseenter="menuHover(index)">
              <Icon type="ios-home" size="30"></Icon>
            </div>
          </div>
        </i-col>
        <i-col :span="spanRight">
          <div class="layout-content">
            <div class="menu-right-warpper" v-show="spanLeft<3&&menuRightShow" ref="menuRightWarpperRef">
              <ul @click="menuRightShow=false">
                <li class="menu-right-item">
                  <div class="triangle-right"></div>
                  {{secondMenuList[menuCur].title}}
                </li>
                <li class="menu-right-item" v-for="(thirdItem,thirdIndex) in secondMenuList[menuCur].thirdMenu">
                  {{thirdItem.title}}
                </li>
              </ul>
            </div>
            <div class="layout-content-main">内容区域4</div>
          </div>
        </i-col>
      </Row>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import ICol from "../../../node_modules/iview/src/components/grid/col";

  export default {
    components: {ICol},
    data() {
      return {
        firstMenuList: [
          {
            title: "首页",
            secondMenu: [
              {
                title: "首页1",
                thirdMenu: []
              },
              {
                title: "首页2",
                thirdMenu: [
                  {
                    title: "首页22"
                  }
                ]
              }
            ]
          },
          {
            title: "商品管理",
            secondMenu: [
              {
                title: "商品管理1",
              }
            ]
          },
          {
            title: "订单管理",
            secondMenu: [
              {
                title: "订单管理1",
                thirdMenu: [
                  {
                    title: "订单管理11"
                  }
                ]
              }
            ]
          },
          {
            title: "物流管理",
            secondMenu: [
              {
                title: "物流管理1",
                thirdMenu: [
                  {
                    title: "物流管理11"
                  }
                ]
              }
            ]
          },
          {
            title: "统计分析",
            secondMenu: [
              {
                title: "统计分析1",
                thirdMenu: [
                  {
                    title: "统计分析11"
                  }
                ]
              }
            ]
          },
          {
            title: "系统设置",
            secondMenu: [
              {
                title: "界面设置",
              }
            ]
          }
        ],
        menuIconMap: ["home", "ios-keypad", "ios-analytics", "ios-paper", "briefcase", "android-settings"],
        secondMenuList: [],
        spanLeft: 3,
        spanRight: 21,
        menuCur: 0,
        menuRightShow: false
      }
    },
    created() {
      this.secondMenuList = this.firstMenuList[0].secondMenu
    },
    methods: {
      selectFirstMenu(name) {
        this.secondMenuList = this.firstMenuList[name].secondMenu
      },
      toggleClick() {
        if (this.spanLeft === 3) {
          this.spanLeft = 1;
          this.spanRight = 23;
        } else {
          this.spanLeft = 3;
          this.menuRightShow = false;
          this.spanRight = 21;
        }
      },
      settingClick(name) {
        switch (name) {
          case "signOut":
            this.$router.push("/login");
            break;
        }
      },
      menuHover(index) {
        this.menuRightShow = true;
        this.menuCur = index;
        this.$refs.menuRightWarpperRef.style.top = (index * 60) + "px";
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/style';

  .layout {
    .layout-header {
      /*logo*/
      .layout-logo {
        height: 60px;
        display: flex;
        align-items: center;
        font-size: 20px;
        justify-content: center;
        color: #fff;
        position: relative;
        .toggle-btn {
          position: absolute;
          right: -14px;
          top: 7px;
          color: #f5f7f9;
          &.toggle-btn-static {
            position: static;
          }
        }
      }
      /*导航*/
      .layout-nav {
        margin: 0 auto;
      }
      .setting-text {
        margin-right: 5px;
        color: #f5f7f9;
        letter-spacing: 1px;
      }
      .setting-icon {
        color: #f5f7f9;
      }
    }
    .layout-content {
      background: #f5f7f9;
      position: relative;
      min-height: 93vh;
      .layout-menu-left {
        background: #fff;
        border-right: 1px solid #f5f7f9;
        .ivu-dropdown {
          width: 100%;
        }
        .menu-left-icon {
          height: 60px;
          width: 100%;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-bottom: 1px solid #f5f7f9;
          &:hover {
            background: #f5f7f9;
          }
        }
      }
    }
    .menu-right-warpper {
      position: absolute;
      width: 180px;
      background: #fff;
      left: 0;
      top: 0;
      .menu-right-item {
        padding: 5px 20px;
        font-size: 14px;
        cursor: pointer;
        height: 50px;
        display: flex;
        align-items: center;
        &:hover {
          background: #eee;
        }
        &:first-child {
          padding: 10px 14px;
          height: auto;
          line-height: normal;
          background: $theme-color;
          color: #ffffff;
          position: relative;
          &:hover {
            background: $theme-color;
          }
          .triangle-right {
            width: 0;
            height: 0;
            position: absolute;
            left: 0;
            top: 11px;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-left: 6px solid #fff;
          }
        }
      }
    }
    .ivu-col {
      transition: width .2s ease-in-out;
    }
  }

  /*左边子菜单的边框*/
  .ivu-menu-vertical.ivu-menu-light:after {
    background: none;
  }
</style>
