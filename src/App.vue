<template>
  <div id="app">
      <!--<RegisterController/>-->
      <!--<LoginController/>-->
      <div id="header-wrap" class="clearfix">
          <el-header id="header" ref="fixedBar" :class="{'header-fix':isFix}">
              <!--{{resourcePath+$store.state.loginInfo.user.userAvatar}}-->
              <!--{{$store.state.loginInfo.isLogin}}-->
              <el-col :span="3" :push="21">
                  <el-popover trigger="hover" v-if="$store.state.loginInfo.isLogin">
                      <div id="header-user-username">
                          Lv.{{$store.state.loginInfo.user.userLevel}}
                          {{$store.state.loginInfo.user.userName}}
                          <i class="icon-male" v-if="$store.state.loginInfo.user.userInfo.male" style="color: dodgerblue"></i>
                          <i class="icon-female" v-else style="color: hotpink"></i>
                      </div>
                      <el-avatar :size="48" slot="reference" :src="resourcePath+$store.state.loginInfo.user.userAvatar" style="margin-top:5px;"/>
                  </el-popover>
                  <el-popover trigger="hover" v-else title="未登录">
                      <el-link @click="toLogin">去登录</el-link>
                      <el-avatar :size="48" slot="reference" :src="resourcePath+'default.jpg'" style="margin-top:5px;"/>
                  </el-popover>
              </el-col>
          </el-header>
      </div>
      <div id="app-content">
          <router-view :key="$route.fullPath"/>
      </div>

      <el-footer id="app-footer" class="clearfix" height="50px">
          <div id="app-footer-info">粤ICP备20033137号</div>
      </el-footer>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import RegisterController from "./components/register/RegisterController.vue"
import LoginController from "./components/login/LoginController"
import UserController from "./components/user/UserController"
export default {
  name: 'app',
  components: {
    UserController,
    HelloWorld,
    RegisterController,
    LoginController,

  },
    mounted(){
        window.addEventListener("scroll",this.handleScroll);
        this.offsetTop = this.$refs.fixedBar.offsetTop;
    },
    destroyed(){
        window.removeEventListener("scroll",this.handleScroll);
    },
  data() {
    return {
        value1: '',
        isFix: false
    }
  },
  methods: {
      handleScroll(){
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          // console.log(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
          this.isFix = scrollTop > 0;
      },
      toLogin(){
          this.$router.push({
              path: '/login',
              query: {
                  nextPath: this.$route.path,
                  pathQuery: this.$route.query
              }
          })
      }
  }
}
</script>

<style lang="less">
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
    overflow-x: hidden;
    #app-content {
        min-height: 705px;
    }
    #app-footer{
        background-color: teal;
        #app-footer-info{
            /*color: #ccc;*/
            font-size: 15px;
            margin-top: 10px;
            margin-left: 650px;
        }
    }

    #header{
        width: 100%;
        z-index: 5;
        background-color: teal;
        margin-bottom: 10px;
    }

    .header-fix{
        position: fixed;
    }
}
</style>
