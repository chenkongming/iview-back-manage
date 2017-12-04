<template>
  <div class="layout">
    <!--头部-->
    <Row type="flex" class="layout-header">
      <!--logo-->
      <i-col :span="spanLeft" class="layout-logo">
        <span v-show="spanLeft>1"> 我是LOGO2</span>
        <i-button type="text" @click="toggleClick" class="toggle-btn" :class="{'toggle-btn-static':spanLeft<3}">
          <Icon type="navicon" size="32"></Icon>
        </i-button>
      </i-col>
      <!--占位-->
      <i-col :span="spanRight-2" class="layout-title">后台管理系统</i-col>
      <!--头部头像-->
      <i-col span="2" class="setting">
        <Dropdown @on-click="settingClick">
          <a href="javascript:void(0)">
            <span class="setting-text">头像</span>
            <Icon type="arrow-down-b" class="setting-icon"></Icon>
          </a>
          <Dropdown-menu slot="list">
            <Dropdown-item name="editPass">修改密码</Dropdown-item>
            <Dropdown-item name="signOut">退出</Dropdown-item>
          </Dropdown-menu>
        </Dropdown>
      </i-col>
    </Row>
    <Row type="flex">
      <i-col :span="spanLeft" class="layout-menu">
        <!--未折叠菜单-->
        <Menu :active-name="activeName" width="auto" :open-names="[openIndex]" v-show="spanLeft > 1" :accordion="true"
              @on-select="menuSelect" >
          <template v-for="(item,index) in firstMenuList">
            <Submenu :name="index" v-if="item.secondMenu" >
              <template slot="title">
                <Icon :type="menuIconMap[index]" size="15"></Icon>
                <span>{{item.title}}</span>
              </template>
              <Menu-item v-for="(secondItem,secondIndex) in item.secondMenu" :key="secondIndex" :name="secondItem.name">
                {{secondItem.title}}
              </Menu-item>
            </Submenu>
            <Menu-item v-else :name="item.name">
              <Icon :type="menuIconMap[index]" size="15"></Icon>
              {{item.title}}
            </Menu-item>
          </template>
        </Menu>
        <!--折叠后的菜单(图标)-->
        <div class="menu-right" v-show="spanLeft<3">
          <div class="menu-left-icon" v-for="(item,index) in firstMenuList" @mouseenter="menuHover(index)" :key="index">
            <Icon :type="menuIconMap[index]" size="30"></Icon>
          </div>
        </div>
      </i-col>
      <!--主体内容和折叠后的菜单-->
      <i-col :span="spanRight">
        <div class="layout-content">
          <!--折叠后的菜单-->
          <div class="menu-folded" v-show="spanLeft<3&&menuRightShow" ref="menuFoldedRef">
            <ul @click="menuRightShow=false">
              <li class="menu-right-item" @click="clickMenu(menuCur)">
                <div class="triangle-right"></div>
                {{firstMenuList[menuCur].title}}
              </li>
              <li class="menu-right-item" v-for="(secondItem,secondIndex) in firstMenuList[menuCur].secondMenu"
                  :class="{'check':activeName===secondItem.name}" @click="clickSecondMenu(secondIndex)"
                  :key="secondIndex">
                {{secondItem.title}}
              </li>
            </ul>
          </div>
          <!--主体内容-->
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
        <div class="layout-copy">
          2011-2016 &copy; komi2
        </div>
      </i-col>
    </Row>
  </div>
</template>
<script type="text/ecmascript-6">
  import ICol from "../../../node_modules/iview/src/components/grid/col";
  import store from '../../vuex/store'
  export default {
    components: {
      ICol,
    },
    data() {
      return {
        firstMenuList: [
          {
            title: "账单中心",
            name: "bill-manage"
          },
          {
            title: "经营报表",
            secondMenu: [
              {
                title: "营业概要",
                name: "business-resume"
              },
              {
                title: "热销菜品",
                name: "hot-sell-food"
              },
              {
                title: "营收报表",
                name: "revenue-report"
              }
            ]
          },
          {
            title: "资源管理",
            secondMenu: [
              {
                title: "品类管理",
                name: "category-manage"
              },
              {
                title: "菜品管理",
                name: "food-manage"
              },
              {
                title: "台位管理",
                name: "table-manage"
              },
              {
                title: "外设管理",
                name: "peripheral-manage"
              }

            ]
          },
          {
            title: "通告管理",
            name: "notification-manage"
          },
          {
            title: "权限管理",
            secondMenu: [
              {
                title: "账号列表",
                name: "account-list"
              },
              {
                title: "角色列表",
                name: "role-list"
              }
            ]
          },
        ],
        menuIconMap: ["home", "ios-keypad", "ios-analytics", "ios-paper", "briefcase", "android-settings"],
        spanLeft: 3,
        spanRight: 21,
        menuCur: 0,
        menuRightShow: false,
        activeName: "",
        openIndex: 0
      }
    },
    created() {
      let path = sessionStorage.getItem("path");
      if (!path) {
        path = this.firstMenuList[0].name;
        if (typeof this.firstMenuList[0].secondMenu !== "undefined") {
          path = this.firstMenuList[0].secondMenu[0].name;
        }
      }
      this.activeName = path;
      for (let a = 0; a < this.firstMenuList.length; a++) {
        if (typeof this.firstMenuList[a].name !== "undefined") {
          if (this.firstMenuList[a].name === path) {
            this.openIndex = a;
            break;
          }
        } else {
          for (let b = 0; b < this.firstMenuList[a].secondMenu.length; b++) {
            if (this.firstMenuList[a].secondMenu[b].name === path) {
              this.openIndex = a;
              break
            }
          }
        }
      }
      this.$router.push(`/${path}`);
    },
    methods: {
      // 折叠菜单
      toggleClick() {
        let flag = false;
        if (this.spanLeft === 3) {
          this.spanLeft = 1;
          this.spanRight = 23;
          flag = true;
        } else {
          this.spanLeft = 3;
          this.menuRightShow = false;
          this.spanRight = 21;
          flag = false;
        }
        store.dispatch('setMenuFolded', flag);
      },
      // 折叠后的菜单hover展示右边菜单
      menuHover(index) {
        this.menuRightShow = true;
        this.menuCur = index;
        this.$refs.menuFoldedRef.style.top = (index * 60) + "px";
      },
      // 退出/修改密码
      settingClick(name) {
        switch (name) {
          case "signOut":
            this.$router.push("/login");
            sessionStorage.clear();
            break;
        }
      },
      // 未折叠后菜单点击
      menuSelect(name) {
        this.$router.push(`/${name}`);
        this.activeName = name;
      },
      // 折叠后菜单点击
      clickMenu(menuCur) {
        let path = "";
        if (!this.firstMenuList[menuCur].secondMenu) {
          path = this.firstMenuList[menuCur].name;
          this.activeName = path;
          this.$router.push(`/${path}`);
        }
      },
      clickSecondMenu(secondMenuCur){
        let path = this.firstMenuList[this.menuCur].secondMenu[secondMenuCur].name;
        this.activeName = path;
        this.$router.push(`/${path}`);
      },
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/style';
  .layout {
    /*头部*/
    .layout-header {
      background: $theme-color;
      height: 60px;
      display: flex;
      align-items: center;
      font-size: 14px;
      justify-content: center;
      /*logo*/
      .layout-logo {
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        text-align: center;
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
      .layout-title {
        font-size: 18px;
        color: #fff;
        padding-left: 50px;
        letter-spacing: 1px;
      }
      /*导航*/
      .layout-nav {
        margin: 0 auto;
      }
      .setting {
        display: flex;
        justify-content: center;
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
    /*菜单*/
    .layout-menu {
      background: #fff;
      border-right: 1px solid #f5f7f9;
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
    /*主体内容*/
    .layout-content {
      position: relative;
      min-height: 87vh;
      background: #f5f7f9;
      padding: 10px 20px 10px 15px;
      box-sizing: border-box;
      .menu-folded {
        position: absolute;
        width: 180px;
        background: #fff;
        left: 0;
        top: 0;
        z-index: 999;
        border: 1px solid #f5f7f9;
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
              top: 5px;
              border-top: 8px solid transparent;
              border-bottom: 8px solid transparent;
              border-left: 6px solid #fff;
            }
          }
          &.check {
            background: red;
          }
        }
      }
    }
    /*页脚*/
    .layout-copy {
      text-align: center;
      padding: 20px;
      color: #9ea7b4; // background: #f5f7f9;
      font-size: 14px;
    }
  }

  //改写iview默认css
  .ivu-dropdown {
    width: 70%;
  }

  .ivu-col {
    transition: width .2s ease-in-out;
  }

  .ivu-menu-vertical.ivu-menu-light:after {
    background: none;
  }
</style>
