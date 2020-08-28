<template>
    <div id="login-controller">
        <el-col :span="20" :push="2">
            <el-form :model="loginInfo" :rules="checkRule">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="loginInfo.userName"/>
                </el-form-item>
                <el-form-item label="密码"  prop="userInfo.userPassword" >
                    <el-input v-model="loginInfo.userInfo.userPassword" show-password/>
                    <el-link type="primary" id="forget-password-btn" @click="$router.push('/retrievePwd')">
                        忘记密码
                    </el-link>
                </el-form-item>

                <!--<el-col :span="24" >-->
                    <!--<el-button type="primary" :loading="loading" @click="login" >登录</el-button>-->
                <!--</el-col>-->
                <div id="login-submit" @click="login">
                    <i class="el-icon-loading" v-show="loading"></i>
                    登录
                </div>
                <div id="go-register-btn" @click="goRegister">
                    去注册
                </div>

            </el-form>
        </el-col>
        <!--<el-input v-model="raw"/>-->
        <!--<el-button @click="enc">加密</el-button>-->
        <!--加密结果:{{encRaw}}-->
        <!--<el-input v-model="poc"/>-->
        <!--<el-button @click="dec">解密</el-button>-->
        <!--解密结果:{{decPoc}}-->
    </div>
</template>

<script>
    import {request} from "../../network/request";
    export default {
        name: "LoginController",
        data(){
            return {
                loading: false,
                loginInfo: {
                    userName: '',
                    userInfo: {
                        userPassword: ''
                    }
                },
                rawPwd: '',
                checkRule: {
                    userName: [
                        {required: true ,message: "用户名不能为空" , trigger: "blur"}
                    ],
                    "userInfo.userPassword": [
                        {required: true ,message: "密码不能为空" , trigger: "blur"}
                    ]
                },
                jse: new this.$jsEncrypt(),

            }
        },
        methods: {
            login(){
                this.loading = true;
                this.jse.setPublicKey(this.publicKey);
                if(this.loginInfo.userName == null || this.loginInfo.userName.length === 0
                    || this.loginInfo.userInfo.userPassword == null || this.loginInfo.userInfo.userPassword.length === 0){
                    this.$message.error("信息不完整");
                    this.loading = false;
                    return;
                }
                console.log(this.loginInfo.userInfo.userPassword.length);
                request({
                    url: 'user/login',
                    method: 'POST',
                    data: {
                        userName: this.loginInfo.userName,
                        userInfo: {
                            userPassword: this.jse.encrypt(this.loginInfo.userInfo.userPassword)
                        }
                    }
                }).then( res => {
                    if(res!= null&&res.statusCode === '000000'){
                        this.$message({
                            message: "登录成功",
                            type: 'success'
                        });
                        this.$store.commit("doLogin",res.data);
                        if(this.$route.query.nextPath != null){
                            this.$router.push({
                                path: this.$route.query.nextPath,
                                query: this.$route.query.pathQuery
                            });
                        }else {
                            this.$router.push("/home/index");
                        }
                    } else {
                        this.$message.error("登陆失败");
                    }
                    this.loading = false;
                })
            },
            goRegister(){
                this.$router.push("/register");
            }
        }

    }
</script>

<style scoped lang="less">
    #login-controller{
        width: 400px;
        height: 500px;
        padding-top: 50px;
        box-sizing: border-box;
        background-color: #f7f7f7;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        border-radius: 5px;
        box-shadow: 0 0 100px #888;
        #login-submit{
            margin-top: 30px;
            width: 100%;
            height: 40px;
            color: #eee;
            text-align: center;
            line-height: 40px;
            background-color: teal;
            border-radius: 5px;
            cursor: pointer;
            &:hover{
                background-color: #007070;
            }
        }
        #go-register-btn{
            margin-top: 30px;
            width: 100%;
            height: 40px;
            color: #eee;
            text-align: center;
            line-height: 40px;
            background-color: #999;
            border-radius: 5px;
            cursor: pointer;
            &:hover{
                background-color: #aaa;
            }
        }
    }

</style>