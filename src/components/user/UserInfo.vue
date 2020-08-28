<template>
    <div id="user-info-wrap" class="clearfix">
        <div id="user-info-bg" :style="bgStyle"></div>
        <div id="user-avatar">
            <img :src="resourcePath+user.userAvatar"/>
        </div>
        <div id="user-info-username">
            Lv.{{user.userLevel}} {{user.userName}}
            <i class="icon-male" v-if="user.userInfo.male" style="color: dodgerblue"></i>
            <i class="icon-female" v-else style="color: hotpink"></i>
            <span id="user-info-followed" v-if="!$store.state.loginInfo.isLogin||$store.state.loginInfo.user.userId !== user.userId">
                <el-button size="mini" type="primary" v-if="!user.isFollowed" @click="follow">
                    <i class="icon-friendadd"></i>
                    关注
                </el-button>
                <el-button size="mini" type="primary" v-else @click="cancelFollow">
                    <i class="icon-friendaddfill"></i>
                    取消关注
                </el-button>
            </span>

        </div>
        <div id="user-info-userdesc">{{desc}}</div>
        <el-row :gutter="10" class="user-info-detail">
            <el-col :span="6" :push="4">
                <el-link icon="icon-friendfavor" :underline="false" class="user-info-link">
                    关注：{{simplifyCount(user.userInfo.followCount)}}
                </el-link>
            </el-col>
            <el-col :span="6" :push="4">
                <el-link icon="icon-friend" :underline="false" class="user-info-link">
                    粉丝：{{simplifyCount(user.userInfo.followerCount)}}
                </el-link>
            </el-col>
            <el-col :span="6" :push="4">
                <el-link icon="icon-text" :underline="false" class="user-info-link">
                    微博：{{simplifyCount(user.userInfo.blogCount)}}
                </el-link>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {request} from "../../network/request";

    export default {
        name: "UserInfo",
        data(){
            return {
                
            }
        },
        props: ['user','isProfile'],
        methods: {
            simplifyCount(count){
                if(count<10000){
                    return count;
                } else if (count <100000000){
                    return (count/10000).toFixed(1)+'万';
                } else {
                    return (count/100000000).toFixed(1)+'亿';
                }
            },
            follow(){
                this.checkAndAction(() => {
                    request({
                        url: 'user/addFollow',
                        params: {
                            userId: this.user.userId
                        }
                    }).then( res => {
                        if(res.statusCode === '000000'){
                            this.user.isFollowed = true;
                            this.$message.success('关注成功');
                            this.$store.commit('updateFollowCount',1);
                        } else {
                            this.$message.error(res.message);
                        }
                    }).catch( err => {
                        this.$message.error('系统错误');
                    })
                },this.$route.path,this.$route.query)
            },
            cancelFollow(){
                this.checkAndAction(() => {
                    request({
                        url: 'user/removeFollow',
                        params: {
                            userId: this.user.userId
                        }
                    }).then( res => {
                        if(res.statusCode === '000000'){
                            this.user.isFollowed = false;
                            this.$message.success('取关成功');
                            this.$store.commit('updateFollowCount',-1);
                        } else {
                            this.$message.error(res.message);
                        }
                    }).catch( err => {
                        this.$message.error('系统错误');
                    })
                },this.$route.path,this.$route.query)
            }
        },
        computed: {
            desc(){
                let d = this.user.userInfo.userDesc;
                return d == null||d.length === 0 ? '该用户未填写简介': d;
            },
            bgStyle(){
                return {
                    'background-image': 'url('+this.resourcePath+this.user.userAvatar+')'
                }
            }
        }
    }
</script>

<style scoped lang="less">
#user-info-wrap{
    width: 800px;
    height: 300px;
    position: relative;
    overflow: hidden;
    background-color: rgba(0,0,0,.3);

    #user-info-bg{
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        left: 0;
        top: 0;
        position: absolute;
        z-index: -1;
        filter: blur(10px);
        background-size: 100% 100%;
    }

    #user-avatar{
        margin-left: 350px;
        margin-top: 25px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        img{
            width: 100px;
            height: 100px;
        }
    }
    #user-info-username{
        /*margin-left: 200px;*/
        margin-top: 20px;
        text-align: center;
        font-size: 24px;
        color: #eee;

        #user-info-followed{
            margin-left: 16px;
        }
    }

    #user-info-userdesc{
        /*margin-left: 200px;*/
        margin-top: 20px;
        text-align: center;
        color: #eee;
    }

    .user-info-detail{
        margin-top: 30px;
        .user-info-link{
            color: #eee;
            font-size: 15px;
            text-decoration: none;
            :hover{
                color: #ddd;
                text-decoration: none;
            }
        }
    }
}
</style>