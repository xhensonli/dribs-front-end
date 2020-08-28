<template>
    <div id="change-pwd-wrap">
        <p id="change-pwd-title">更换密码</p>
        <el-divider/>
        <div id="change-pwd-step">
            <el-steps :space="200" :active="active" finish-status="success">
                <el-step title="验证旧密码"></el-step>
                <el-step title="输入新密码"></el-step>
            </el-steps>
        </div>

        <div id="validate-old-pwd" v-if="active===0">
            <el-input placeholder="输入旧密码" v-model="oldPwd" show-password=""/>
            <el-link type="primary" @click="$router.push('/retrievePwd')">忘记密码？</el-link>
            <div id="validate-pwd-confirm">
                <el-button @click="checkPwd">确认</el-button>
            </div>
        </div>

        <div id="new-pwd" v-if="active===1">
            <div>
                <el-input placeholder="输入新密码" v-model="newPwd" show-password/>
            </div>
            <div>
                <el-input placeholder="重新输入新密码" v-model="newPwdConfirm" show-password/>
            </div>
            <div id="new-pwd-commit">
                <el-button @click="changePwd">确认</el-button>
            </div>
        </div>

        <div id="change-pwd-result" v-if="active===2">
            <div id="change-pwd-commiting" v-if="!completed">
                正在提交
                <i class="el-icon-loading"></i>
            </div>
            <div id="change-result-msg" v-else>
                {{resultMsg}}
            </div>
        </div>
    </div>
</template>

<script>
    import {request} from "../../network/request";
    export default {
        name: "ChangePassword",
        data(){
            return {
                active: 0,
                jse: new this.$jsEncrypt(),
                oldPwd: '',
                newPwd: '',
                newPwdConfirm: '',
                completed: false,
                resultMsg: ''
            }
        },
        methods: {
            checkPwd(){
                this.checkAndAction( () => {
                    this.jse.setPublicKey(this.publicKey);
                    request({
                        url: 'user/checkPassword',
                        method: 'POST',
                        data: {
                            password: this.jse.encrypt(this.oldPwd)
                        }
                    }).then( res => {
                        if(res.statusCode === '000000'){
                            this.active++;
                        } else {
                            this.$message.error(res.message);
                        }
                    }).catch( err => {
                        this.$message.error('系统错误');
                    })
                },this.$route.path,this.$route.query);
            },
            changePwd(){
                if(!/^[^\u4e00-\u9fa5\s]{8,16}$/.test(this.newPwd)){
                    this.$message.warning('密码由8-16位非中文和空格组成');
                } else if(this.newPwd!==this.newPwdConfirm){
                    this.$message.warning('两次密码不一致');
                } else {
                    this.checkAndAction( () => {
                        this.jse.setPublicKey(this.publicKey)
                        request({
                            url: 'user/changePassword',
                            method: 'POST',
                            data: {
                                password: this.jse.encrypt(this.newPwd)
                            }
                        }).then( res => {
                            if(res.statusCode === '000000'){
                                this.resultMsg = '修改成功，请重新登录';
                                request({
                                    url: 'user/logout'
                                });
                                this.$store.commit('doLogout');
                            } else {
                                this.resultMsg = '修改失败：'+res.message
                            }
                            this.completed = true;
                        }).catch( err => {
                            this.$message.error('系统错误');
                            this.completed = true;
                        });
                        this.active++;
                    },this.$route.path,this.$route.query)
                }
            }
        }
    }
</script>

<style scoped lang="less">
    #change-pwd-wrap{
        width: 800px;
        margin: 50px auto;
        height: 300px;
        background-color: #f7f7f7;
        padding: 75px;

        #change-pwd-title{
            font-size: 36px;
            font-weight: bold;
            color: #666;
            width: 500px;
            text-align: center;
            margin: 5px auto;
        }

        #change-pwd-step{
            width: 300px;
            margin: 0 auto;
        }
        #validate-old-pwd,#new-pwd{
            width: 400px;
            margin: 50px 0 0 150px;
            div{
                margin-top: 5px;
            }
            #validate-pwd-confirm,#new-pwd-commit{
                margin-top: 15px;
            }
        }

        #change-pwd-result{
            width: 400px;
            margin: 50px 0 0 150px;

            #change-pwd-commiting ,#change-result-msg{
                padding: 15px;
                width: 150px;
                text-align: center;
                margin: 0 auto;
                font-size: 24px;
                font-weight: bold;
            }
        }
    }
</style>