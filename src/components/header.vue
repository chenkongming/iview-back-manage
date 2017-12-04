<template>
  <div class="layout-header">
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
      <!--占位-->
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
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data(){
            return{
              spanLeft: 3,
              spanRight: 21,
            }
        },
      methods:{
        toggleClick(){
          if (this.spanLeft === 3) {
            this.spanLeft = 1;
            this.spanRight = 23;
          } else {
            this.spanLeft = 3;
            this.menuRightShow = false;
            this.spanRight = 21;
          }
        },
      }
    }
</script>

<style lang="scss" scoped>
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
</style>
