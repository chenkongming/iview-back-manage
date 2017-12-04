<template>
  <div class="login">
    <!--头部-->
    <div class="header">
      <img src="./logo.png" width="170" height="80">
      <h1 class="header-text">欢迎登录</h1>
    </div>
    <!--内容-->
    <div class="content">
      <div class="banner">
        <img src="./banner.jpg">
      </div>
      <div class="login-panel">
        <h2 class="title">账号登录</h2>
        <form @submit.prevent="onSubmit">
          <div class="login-item">
            <input type="text" class="login-input" required placeholder="账号" v-model="username" @input="watchInput()" ref="userNameRef">
            <span class="clear-icon" v-show="username!==''" @click="clearUserName()">x</span>
          </div>
          <div class="login-item">
            <input type="password" class="login-input" required placeholder="密码" v-model="password" :class="{'error-active':errorShow}" @input="watchInput()" ref="passWordRef" @keyup.20="capsWatch()" @keypress="detectCapsLock($event)">
            <img src="./caps.png" width="14" height="14" class="caps-icon" :class="{'right30':password!==''}" v-show="capsIconShow">
            <span class="clear-icon" v-if="password!==''" @click="clearPassWord()">x</span>
          </div>
          <div class="login-item error-item" v-show="errorShow">
            <img src="./error.png" width="14" height="14" class="error-icon">
            <span>{{errorText}}</span>
          </div>
          <div class="login-item btn-item">
            <button type="submit" class="login-btn" @keyup.enter="onSubmit">登　录</button>
          </div>
          <div class="login-item label-item">
            <label class="login-label">忘记密码请联系管理员</label>
          </div>
        </form>
      </div>
    </div>
    <!--页脚-->
    <div class="footer">
      <span> 技术支持：莱麦科技 Copyright &copy; 2014-2017 批发宝（店脑） XXX.com 版权所有 </span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      errorShow: false, //是否显示错误信息
      errorText: "用户名或密码不正确", //错误提示文字
      username: "",
      password: "",
      capsIconShow: false
    }
  },
  created() {},
  methods: {
    onSubmit() {
      if (this.username !== "admin") {
        this.errorShow = true;
        this.$refs.passWordRef.focus();
      } else {
        $lm.setToken("345353");
        this.$router.push('/home');
      }
    },
    //监听输入
    watchInput() {
      if (this.errorShow) {
        this.errorShow = false
      }
    },
    //清空操作
    clearUserName() {
      this.username = "";
      this.watchInput();
      this.$refs.userNameRef.focus();
    },
    clearPassWord() {
      this.password = "";
      this.watchInput();
      this.$refs.passWordRef.focus();
    },
    //监听大小写键
    capsWatch() {
      this.capsIconShow = !this.capsIconShow;
    },
    detectCapsLock(e) {
      let capsLockKey = e.keyCode ? e.keyCode : e.which;
      this.capsIconShow=capsLockKey >= 65 && capsLockKey <= 90
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../common/style';
/*头部*/
.header {
  width: 1000px;
  max-width: 100%;
  height: 76px;
  margin: 10px auto;
  display: flex;
  align-items: center;
  .header-text {
    color: #000;
    font-size: 30px;
    font-weight: normal;
    margin-left: 20px;
    letter-spacing: 2px;
    font-family: "幼圆";
  }
}
.content {
  height: 500px;
  position: relative;
  .banner {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 100%;
    overflow-x: hidden;
    z-index: -1;
  }
  .login-panel {
    width: 350px;
    min-height: 330px;
    background: #ffffff;
    min-width: 320px;
    position: absolute;
    right: 20%;
    top: 75px;
    padding: 0 20px;
    border-radius: 4px;
    .title {
      height: 60px;
      line-height: 60px;
      font-size: 24px;
      color: #000000;
      font-family: "幼圆";
      margin-bottom: 10px;
      border-bottom: 1px solid $border-color;
    }
    .login-item {
      margin-bottom: 15px;
      position: relative;
      &.label-item {
        text-align: right;
      }
      &.btn-item {
        margin-top: 30px;
      }
      &.error-item {
        margin-bottom: -20px;
        color: #ff0000;
        .error-icon {
          position: relative;
          top: 2px;
          left: 0;
        }
      }
      .login-input {
        width: 100%;
        height: 50px;
        line-height: 50px;
        display: block;
        color: #333;
        border: 1px solid $border-color;
        padding-left: 15px;
        font-size: 14px;
        &.error-active {
          border: 1px solid #ff0000;
        }
      }
      .login-btn {
        background: $theme-color;
        height: 50px;
        color: #ffffff;
        font-size: 16px;
        border: none;
        cursor: pointer;
        width: 100%;
        &:hover {
          background: #1B6AAA;
        }
      }
      .login-label {
        font-size: 13px;
      }
      .clear-icon {
        position: absolute;
        color: #989898;
        right: 6px;
        font-size: 14px;
        top: 0;
        padding: 14px 8px;
        cursor: pointer;
      }
      .caps-icon {
        position: absolute;
        right: 12px;
        top: 18px;
        &.right30 {
          right: 30px;
        }
      }
    }
  }
}

.footer {
  font-size: 14px;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
  color: #5d5d5d;

}
</style>
