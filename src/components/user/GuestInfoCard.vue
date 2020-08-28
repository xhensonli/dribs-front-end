<template>
    <div id="quest-info-card">
        <div id="guest-info-title">
            未登录
        </div>
        <div id="guest-go-login" @click="toLogin">
            <el-link>去登录</el-link>
        </div>
        <div id="guest-go-register" @click="toRegister">
            <el-link>去注册</el-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GuestInfoCard",
        methods: {
            toLogin(){
                this.$router.push({
                    path: '/login',
                    query: {
                        nextPath: this.$route.path,
                        pathQuery: this.$route.query
                    }
                })
            },
            toRegister() {
                this.$router.push('/register')
            }
        }
    }
</script>

<style scoped lang="less">
    #quest-info-card{
        width: 200px;
        div{
            margin-top: 10px;
            text-align: center;
        }
        #guest-info-title{
            font-size: 18px;
            font-weight: bold;
        }
        /*#guest-go-login,#guest-go-register{*/
            /*cursor: pointer;*/
            /*&:hover{*/
                /*background-color: #eee;*/
            /*}*/
        /*}*/
    }
</style>