<template>
  <div id="app">
      <!--<RegisterController/>-->
      <!--<LoginController/>-->
      <div id="header-wrap" class="clearfix">
          <el-header id="header" ref="fixedBar" :class="{'header-fix':isFix}">
              <!--{{resourcePath+$store.state.loginInfo.user.userAvatar}}-->
              <!--{{$store.state.loginInfo.isLogin}}-->
              <div id="menu-wrap">
                  <el-menu  mode="horizontal"
                            background-color="#008080"
                            text-color="#fff"
                            active-text-color="#ffd04b">
                      <el-menu-item @click="goIndex" >
                          <template slot="title">
                              <i class="icon-home"></i>
                              <span>首页</span>
                          </template>
                      </el-menu-item>
                      <el-menu-item index="2">
                          <template slot="title">
                              <i class="icon-friendfavor"></i>
                              <span>我的关注</span>
                          </template>
                      </el-menu-item>
                      <el-menu-item index="3" disabled>
                          <template slot="title">
                              <i class="icon-message"></i>
                              <span>消息</span>
                          </template>
                      </el-menu-item>
                      <el-submenu index="4">
                          <template slot="title">
                              <i class="icon-people"></i>
                              <span>个人中心</span>
                          </template>
                          <el-menu-item @click="goProfile" >
                              我的主页
                          </el-menu-item>
                          <el-menu-item @click="" >
                              个人信息
                          </el-menu-item>
                      </el-submenu>
                  </el-menu>
              </div>
              <el-col :span="3" :push="12">
                  <el-popover trigger="hover" v-if="$store.state.loginInfo.isLogin">
                      <div id="header-user-username">
                          Lv.{{$store.state.loginInfo.user.userLevel}}
                          {{$store.state.loginInfo.user.userName}}
                          <i class="icon-male" v-if="$store.state.loginInfo.user.userInfo.male" style="color: dodgerblue"></i>
                          <i class="icon-female" v-else style="color: hotpink"></i>
                          <el-link @click="logout">注销登录</el-link>
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
          <router-view />
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
import {request} from "./network/request";

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
      },
      goProfile(){
          // console.log("pro");
          this.checkAndAction( () => {
              this.$router.push({
                  path: '/user',
                  query: {
                      userId: this.$store.state.loginInfo.user.userId
                  }
              })
          }, this.$route.path, this.$route.query);
      },
      goIndex(){
          this.$router.push("/home/index")
      },
      logout(){
          request({
              url: 'user/logout'
          }).then( res => {
              console.log(res);
          }).catch( err => {
              console.log(err);
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
        #menu-wrap{
            width: 600px;
            float: left;
            [class^="icon-"]{
                margin-left: 5px;
                margin-right: 10px;
                color: #eee;
            }
        }
    }

    .header-fix{
        position: fixed;
    }
}
</style>
