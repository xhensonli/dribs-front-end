<template>
    <div class="user-info-tab" >
        <el-avatar :src="resourcePath+user.userAvatar" @click="goUser"/>
        <span >Lv.{{user.userLevel}} {{user.userName}}</span>



    </div>
</template>

<script>
    export default {
        name: "UserInfoTab",
        props: ['user','isProfile'],
        methods: {
            goUser(){
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
    .user-info-tab{
        height: 30px;
        margin-bottom: 15px;
        span{
            margin-left: 15px;
            font-size: 15px;
            color: #999;
            margin-bottom: -12px;
            cursor: pointer;

        }
    }

</style>