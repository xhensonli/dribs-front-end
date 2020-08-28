<template>
    <div id="retrieve-pwd-wrap">
        <p id="retrieve-pwd-title">找回密码</p>
        <el-divider/>
        <div id="retrieve-pwd-step">
            <el-steps :space="200" :active="active" finish-status="success">
                <el-step title="验证手机号"></el-step>
                <el-step title="输入新密码"></el-step>
            </el-steps>
        </div>

        <div id="validate-phone" v-if="active===0">
            <div id="phone-input">
                <el-input placeholder="输入手机号" v-model="phone" show-password=""/>
            </div>
            <div id="auth-code-input">
                <el-input v-model="authCode" placeholder="输入验证码"/>
            </div>
            <div id="validate-phone-confirm">
                <el-button type="primary" v-text="waitCount===0?'获取验证码':'重新发送('+waitCount+')'" @click="sendCode"
                           :disabled="waitCount>0"/>
            </div>
            <div id="check-phone-commit">
                <el-button @click="confirmPhone">确认</el-button>
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

        <div id="retrieve-pwd-result" v-if="active===2">
            <div id="retrieve-pwd-commiting" v-if="!completed">
                正在提交
                <i class="el-icon-loading"></i>
            </div>
            <div id="retrieve-result-msg" v-else>
                {{resultMsg}}
            </div>
        </div>
    </div>
</template>

<script>
    import {request} from "../../network/request";
    export default {
        name: "RetrievePassword",
        data(){
            return {
                active: 0,
                newPwd: '',
                jse: new this.$jsEncrypt(),
                newPwdConfirm: '',
                phone: '',
                authCode: '',
                waitCount: 0,
                resultMsg: '',
                completed: false
            }
        },
        methods: {
            sendCode(){
                request({
                    url: 'user/sendCode2CheckPhone',
                    method: 'POST',
                    data:{
                        phone: this.phone
                    }
                }).then( data => {
                    if(data.statusCode === '000000'){
                        this.waitCount = 60;
                        let id = setInterval(()=>{
                            this.waitCount--;
                            if(this.waitCount === 0){
                                clearInterval(id);
                            }
                        },1000);
                    } else {
                        this.$message.error(data.message)
                    }
                }).catch( err => {
                    this.$message.error('系统错误');
                });
            },
            confirmPhone(){
                if(!/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(this.phone)){
                    this.$message.warning('手机格式错误');
                    return;
                }
                request({
                    url: 'user/checkCode',
                    method: 'POST',
                    data: {
                        code: this.authCode
                    }
                }).then( res => {
                    if(res.statusCode === '000000'){
                        this.active++;
                    } else {
                        this.$message.error(res.message);
                    }
                }).catch( err => {
                    this.$message.error('系统错误');
                });
            },
            changePwd(){
                if(!/^[^\u4e00-\u9fa5\s]{8,16}$/.test(this.newPwd)){
                    this.$message.warning('密码由8-16位非中文和空格组成');
                } else if(this.newPwd!==this.newPwdConfirm){
                    this.$message.warning('两次密码不一致');
                } else {

                    this.jse.setPublicKey(this.publicKey)
                    request({
                        url: 'user/retrievePassword',
                        method: 'POST',
                        data: {
                            password: this.jse.encrypt(this.newPwd)
                        }
                    }).then( res => {
                        if(res.statusCode === '000000'){
                            this.resultMsg = '修改成功';
                        } else {
                            this.resultMsg = '修改失败：'+res.message
                        }
                        this.completed = true;
                    }).catch( err => {
                        this.$message.error('系统错误');
                        this.completed = true;
                    });
                    this.active++;
                }

            }
        }
    }
</script>

<style scoped lang="less">
    #retrieve-pwd-wrap{
        width: 800px;
        margin: 50px auto;
        height: 300px;
        background-color: #f7f7f7;
        padding: 75px;

        #retrieve-pwd-title{
            font-size: 36px;
            font-weight: bold;
            color: #666;
            width: 500px;
            text-align: center;
            margin: 5px auto;
        }

        #retrieve-pwd-step{
            width: 300px;
            margin: 0 auto;
        }

        #validate-phone{
            width: 400px;
            margin: 10px 0 0 150px;

            #auth-code-input{
                margin-top: 10px;
                margin-bottom: 10px;
                display: inline-block;
            }
            #validate-phone-confirm{
                display: inline-block;
                margin-left: 15px;
            }
        }

        #new-pwd{
            width: 400px;
            margin: 10px 0 0 150px;
            div{
                margin: 5px 0;
            }
        }

        #retrieve-pwd-result{
            width: 400px;
            margin: 50px 0 0 150px;

            #retrieve-pwd-commiting ,#retrieve-result-msg{
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