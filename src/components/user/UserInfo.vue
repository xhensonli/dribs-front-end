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