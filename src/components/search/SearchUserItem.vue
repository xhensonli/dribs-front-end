<template>
    <div class="search-user-item" @click="goUserInfo">
        <div class="search-user-item-avatar">
            <el-avatar :src="resourcePath+user.userAvatar" :size="64"/>
        </div>
        <p class="search-user-item-name">{{user.userName}}</p>
        <p class="search-user-item-desc">{{user.userInfo.userDesc}}</p>
    </div>
</template>

<script>
    export default {
        name: "SearchUserItem",
        props: ['user'],
        methods: {
            goUserInfo(){
                this.$router.push({
                    path: '/user',
                    query: {
                        userId: this.user.userId
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">

    .search-user-item{
        float: left;
        width: 180px;
        padding: 0 10px;
        background-color: #f7f7f7;
        height: 190px;
        margin: 5px;
        border-radius: 5px;
        box-shadow: 0 0 5px #999;
        cursor: pointer;
        &:hover{
            background-color: #eee;
        }
        .search-user-item-avatar{
            display: inline-block;
            margin: 5px 60px;
        }
        .search-user-item-name{
            text-align: center;
            padding-top: 8px;
            font-size: 18px;
            font-weight: bold;
            word-break: break-word;
        }
        .search-user-item-desc{
            padding-top: 8px;
            text-align: center;
            color: #666;
            line-height: 24px;
        }
    }
</style>