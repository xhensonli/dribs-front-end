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
                      <el-menu-item @click="goIndex" index="1" >
                          <template slot="title">
                              <i class="icon-home"></i>
                              <span>首页</span>
                          </template>
                      </el-menu-item>
                      <el-menu-item index="2" @click="$router.push('/home/followeeBlogs')">
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
                          <el-menu-item @click="$router.push('/profile')" >
                              个人信息
                          </el-menu-item>
                      </el-submenu>
                  </el-menu>
              </div>
              <div id="add-blog-btn-bar">
                  <div id="add-blog-btn" @click="gePublish">
                      <i class="icon-add"></i>
                      写微博
                  </div>
              </div>
              <div id="home-search">
                  <div id="home-search-input">
                      <el-input placeholder="输入搜索内容" prefix-icon="el-icon-search"    v-model="searchKey"/>
                  </div>
                  <div id="home-search-btn" @click="doSearch">
                      <i class="icon-search"></i>
                      搜索
                  </div>
              </div>
              <el-col :span="3" :push="12">
                  <el-popover trigger="hover" v-if="$store.state.loginInfo.isLogin">
                      <user-info-card/>
                      <el-avatar :size="48" slot="reference" :src="resourcePath+$store.state.loginInfo.user.userAvatar" style="margin-top:5px;"/>
                  </el-popover>
                  <el-popover trigger="hover" v-else>
                      <guest-info-card/>
                      <el-avatar :size="48" slot="reference" :src="resourcePath+'default.jpg'" style="margin-top:5px;"/>
                  </el-popover>
              </el-col>
          </el-header>
      </div>
      <div id="app-content" class="clearfix">
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
import UserInfoCard from "./components/user/UserInfoCard"
import GuestInfoCard from "./components/user/GuestInfoCard"
import {request} from "./network/request";

export default {
  name: 'app',
  components: {
    UserController,
    HelloWorld,
    RegisterController,
    LoginController,
    UserInfoCard,
    GuestInfoCard
  },
    created(){
        this.searchKey = this.$route.query.searchKey;
    },
    mounted(){
        window.addEventListener("scroll",this.handleScroll);
        this.offsetTop = this.$refs.fixedBar.offsetTop;
    },
    destroyed(){
        window.removeEventListener("scroll",this.handleScroll);
    },
    watch: {
      "$route.query.searchKey"(v){
          this.searchKey = v;
      }
    },
  data() {
    return {
        value1: '',
        isFix: false,
        searchKey: '',
        i:0
    }
  },
  methods: {
      handleScroll(){
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          // console.log(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
          this.isFix = scrollTop > 0;
      },
      gePublish(){
          this.checkAndAction(() =>{
              this.$router.push('/publishBlog')
          }, this.$route.path, this.$route.query)
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
      doSearch(){
          if(this.searchKey == null || this.searchKey.length === 0){
              return;
          }
          this.$router.push({
              path: '/searchResult',
              query: {
                  searchKey: this.searchKey,
                  i: ++this.i
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
        /*background: url("http://lhxserver.top/resources/dribs/background/background.jpg");*/
        background-color: rgba(0,128,128,.08);
        padding-top: 10px;
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
        /*margin-bottom: 10px;*/
        #menu-wrap{
            width: 600px;
            float: left;
            [class^="icon-"]{
                margin-left: 5px;
                margin-right: 10px;
                color: #eee;
            }
        }

        #add-blog-btn-bar{
            float: left;
            padding-top: 10px;
            display: inline-block;
            #add-blog-btn{
                width: 90px;
                height: 30px;
                display: inline-block;
                padding: 5px;
                text-align: center;
                line-height: 30px;
                color: #eee;
                border-radius: 5px;
                cursor: pointer;
                background-color: #006666;
                &:hover{
                    background-color: #006f6f;
                }
            }

        }

        #home-search{
            padding-top: 10px;
            display: inline-block;
            #home-search-input{
                display: inline-block;
                margin-right: 15px;
            }
            #home-search-btn{
                width: 70px;
                height: 30px;
                display: inline-block;
                padding: 5px;
                text-align: center;
                line-height: 30px;
                color: #eee;
                border-radius: 5px;
                cursor: pointer;
                background-color: #006666;
                &:hover{
                    background-color: #006f6f;
                }
            }
        }
    }

    .header-fix{
        position: fixed;
    }
}
</style>
