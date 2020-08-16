<template>
    <div class="user-list-item" @click="goUserInfo">
        <div class="user-item-avatar">
            <el-avatar :src="resourcePath+user.userAvatar"/>
        </div>

        <div class="user-item-info" >
            <span class="user-item-username">Lv.{{user.userLevel}} {{user.userName}}</span>
            <i class="icon-male icon" v-if="user.userInfo.male" style="color: dodgerblue"></i>
            <i class="icon-female icon" v-else style="color: hotpink"></i>
            <span class="user-item-followee-count">关注：{{user.userInfo.followCount}}</span>
            <span class="user-item-follower-count">粉丝：{{user.userInfo.followerCount}}</span>
            <span class="user-item-blog-count">微博：{{user.userInfo.blogCount}}</span>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "UserListItem",
        data(){
            return {

            }
        },
        props: ['user'],
        methods: {
            goUserInfo(){
                this.$router.push({
                    path: '/user/blogs',
                    query: {
                        userId: this.user.userId,
                        infoType: 'blogs',
                        currentPage: 1
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .user-list-item{
        /*margin: 5px 0 5px 30px;*/
        margin: 5px auto;
        border-radius: 5px;
        height: 40px;
        width: 700px;
        padding: 5px;
        box-shadow: 0 0 10px #ccc;
        line-height: 40px;
        cursor: pointer;
        transition: 0.5s;
        &:hover{
            zoom: 1.02;
        }
        &:hover{
            background-color: rgba(0,128,128,.2);
            /*color: #f7f7f7;*/
        }
        .user-item-avatar{
            height: 100%;
            float: left;
            margin-left: 15px;
        }
        .user-item-info{
            height: 100%;
            float: left;
            margin-left: 15px;
           span{
                line-height: 40px;
                color: #777;
               margin-left: 25px;
                padding: 0 0 5px 10px;
            }


        }
        .icon{
            margin-left: 5px;
        }
    }
</style>