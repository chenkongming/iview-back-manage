<template>
  <div class="explain">
    <span>说明：{{explainText}}</span>
    <Button type="primary" class="btn" v-if="addBtnShow" url="url" @click="addBtnClick">{{addBtnText}}</Button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      explainText: {
        type: String,
        required: true,
        default: ""
      },
      addBtnShow: {
        type: Boolean,
        required:false,
        default: false
      },
      url: {
        type: String,
        required:false,
        default:""
      },
      addBtnText:{
        type: String,
        required:false,
        default:"新增"
      }
    },
    methods:{
      addBtnClick(){
          if (this.url){
              this.$router.push(`/${url}`)
          }else{
              console.log("不用跳转页面")
          }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .explain {
    height: 50px;
    align-items: center;
    display: flex;
    margin: 10px 0;
    background: #fff;
    padding-left: 10px;
    justify-content: space-between;
    .btn {
      background: #2d8cf0;
      border: none;
      margin-right: 20px;
      height: 36px;
      letter-spacing: 1px
    }
  }

</style>
