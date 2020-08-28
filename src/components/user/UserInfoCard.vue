<template>
    <div id="user-info-card">
        <div id="user-info-card-username">
            {{$store.state.loginInfo.user.userName}}
            <i class="icon-male" v-if="$store.state.loginInfo.user.userInfo.male" style="color: dodgerblue"></i>
            <i class="icon-female" v-else style="color: hotpink"></i>
        </div>

        <div id="info-card-user-level">
            Lv.{{$store.state.loginInfo.user.userLevel}}
        </div>
        <div id="info-card-exp">
            <el-progress :percentage="percent" :format="expFormat" :stroke-width="15" :text-inside="true"/>
        </div>
        <el-popover trigger="hover" width="50" placement="top-start"
                    >
            <span>发微博经验+10，评论经验+3，回复经验+3</span>
            <i class="el-icon-info" slot="reference"></i>
        </el-popover>
        <div id="info-card-counts" class="clearfix">
            <div id="info-card-blog-count">
                <p>微博</p>
                <p>{{$store.state.loginInfo.user.userInfo.blogCount}}</p>
            </div>
            <div id="info-card-followee-count">
                <p>关注</p>
                <p>{{$store.state.loginInfo.user.userInfo.followCount}}</p>
            </div>
            <div id="info-card-follower-count">
                <p>粉丝</p>
                <p>{{$store.state.loginInfo.user.userInfo.followerCount}}</p>
            </div>
        </div>
        <el-link @click="logout">注销登录</el-link>

    </div>
</template>

<script>
    import {request} from "../../network/request";

    export default {
        name: "UserInfoCard",
        data(){
            return {
                percent: 0
            }
        },
        methods: {
            expFormat(){
                let user = this.$store.state.loginInfo.user;
                this.percent = 100*user.userInfo.userExp/this.expPerLevel[user.userLevel-1];
                return user.userInfo.userExp+'/'+this.expPerLevel[user.userLevel-1];
            },
            logout(){
                request({
                    url: 'user/logout'
                }).then( res => {
                    if(res.statusCode === '000000'){
                        this.$store.commit('doLogout');
                        this.$router.push('/home/index');
                        this.$message.success("注销成功");
                    }else {
                        this.$message.warning(res.message);
                    }
                }).catch( err => {
                    this.$message.error('系统错误');
                })
            }
        }
    }
</script>

<style scoped lang="less">

    #user-info-card{
        width: 200px;

        #user-info-card-username{
           text-align: center;
            font-size: 18px;
            font-weight: bold;
            margin: 10px;
            word-wrap: break-word;
        }

        #info-card-user-level{
            display: inline-block;
        }
        #info-card-exp{
            display: inline-block;
            margin-left: 15px;
            width: 130px;
        }
        .el-icon-info{
            margin-left: 10px;
        }

        #info-card-counts{
            margin: 15px 5px;
            #info-card-blog-count, #info-card-followee-count, #info-card-follower-count{
                float: left;
                width: 60px;
                text-align: center;
            }
        }

    }
</style>