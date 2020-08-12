<template>
    <div id="home">


        <el-row >
            <el-col :span="4">
                <el-menu  >
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
                    <el-menu-item @click="goProfile" >
                        <template slot="title">
                            <i class="icon-people"></i>
                            <span>个人中心</span>
                        </template>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="16">
                <router-view/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data(){
          return {

          }
        },

        methods: {
            goProfile(){
                this.checkAndPushRouter(  "/user/blogs", {
                            userId: this.$store.state.loginInfo.user.userId,
                            infoType: 'blogs',
                            currentPage: 1
                        }
                    )
            },
            goIndex(){
                this.$router.push("/home/index")
            }



        }
    }
</script>

<style scoped lang="less">
    #header-user-username{
        font-size: 16px;
        margin-left: 10px;
    }

    [class^="icon-"]{
        margin-left: 5px;
        margin-right: 10px;
    }
    #header-wrap{
        height: 70px;
    }

</style>