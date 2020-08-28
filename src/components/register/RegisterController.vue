<template>
    <div id="register-controller">
        <el-steps :active="active" finish-status="success">
            <el-step title="基本信息"></el-step>
            <el-step title="验证手机号"></el-step>
            <el-step title="设置密码"></el-step>
        </el-steps>
        <div id="register-info" class="clearfix">
            <el-form :model="user" v-show="active===0" :rules="baseRule">
                <el-form-item label="昵称" prop="userName">
                    <el-input id="register-username" v-model="user.userName" placeholder="昵称"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="userInfo.userDesc">
                    <el-input id="register-userdesc" v-model="user.userInfo.userDesc" placeholder="简介"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="userInfo.male">
                    <el-radio  v-model="user.userInfo.male" :label="1" checked>
                        男
                    </el-radio>
                    <el-radio v-model="user.userInfo.male" :label="0">
                        女
                    </el-radio>
                </el-form-item>
            </el-form>
            <el-form :model="user" v-show="active===1" :rules="phoneRule">
                <el-form-item label="手机号" prop="userInfo.userPhone">
                    <el-input placeholder="请输入手机号" v-model="user.userInfo.userPhone"/>
                </el-form-item>
                <el-form-item label="验证码" >
                    <el-input placeholder="请输入验证码" v-model="authCode" />
                </el-form-item>
                <el-button type="primary" v-text="waitCount===0?'获取验证码':'重新发送('+waitCount+')'" @click="sendCode"
                :disabled="waitCount>0"/>
            </el-form>
            <el-form :model="pwds" v-show="active===2" :rules="pwdRule">
                <el-form-item label="密码" prop="pwd1">
                    <el-input placeholder="请输入密码" v-model="pwds.pwd1" show-password=""/>
                </el-form-item>
                <el-form-item label="确认密码" prop="pwd2">
                    <el-input placeholder="请再次输入密码" v-model="pwds.pwd2" show-password/>
                </el-form-item>
            </el-form>
            <div id="register-result" v-show="active===3&&commited">
                <div id="register-success" v-if="registerSuccess">
                    <p>注册成功</p>
                    <el-link @click="goLogin">现在去登录</el-link>
                </div>
                <div id="register-fail" v-else>
                    <p>注册失败：{{failMsg}}</p>
                </div>
            </div>
            <div id="register-commiting" v-show="active===3&&!commited">
                <p>
                    <span>正在提交</span>
                    <i class="el-icon-loading"></i>
                </p>

            </div>
        </div>
        <div id="register-prev-btn">
            <el-button @click="prev" type="primary" v-if="active>0">
                上一步
            </el-button>
        </div>
        <div id="register-next-btn">
            <el-button @click="next" type="primary" v-if="active<3" :disabled="active>=3||active===0&&!userNameOK||active===1&&!phoneOk" v-text="active==2?'提交':'下一步'">

            </el-button>
        </div>
    </div>
</template>

<script>
    // let intervalId = setInterval(()=>{
    //     let tdate = new Date;
    //     let tmin = tdate.getMinutes();
    //     let tsec = tdate.getSeconds();
    //     let tmil = tdate.getMilliseconds();
    //     if(tmin==59&&tsec>=58){
    //         console.log(tmin.tsc,tmil);
    //     }
    // },100);
    const resourceURL = 'http://lhxserver.top/resources/dribs/';
    import {request} from "../../network/request";
    export default {
        name: "RegisterController",
        data(){
            return {
                active : 3,
                commited: false,
                waitCount: 0,
                userNameOK: false,
                phoneOk: false,
                fileList: [
                    {name: '1590922324658.png', url: resourceURL+'test/1590922324658.png'},
                    {name: '1590924038973.png', url: resourceURL+'test/1590924038973.png'}
                    ],
                authCode: '',
                registerSuccess: false,
                failMsg: '',
                pwds: {
                    pwd1: '',
                    pwd2: ''
                },
                jse: new this.$jsEncrypt(),
                user:{
                    userName: '',
                    userInfo: {
                        userPhone: '',
                        userDesc: '',
                        male: 1,
                        userPassword: ''
                    }
                },
                baseRule:{
                    userName:[
                        {required: true, validator: this.checkName, trigger: 'blur'},
                    ],
                    "userInfo.userDesc": [
                        {required: true, message: '请输入简介', trigger: 'blur'},
                        { min: 0, max: 18, message: '长度在 0 到 18 个字符', trigger: 'blur' }
                    ],
                    "userInfo.male":[
                        {required: true, message: '请选择性别', trigger: 'load'}
                    ]
                },
                phoneRule:{
                    "userInfo.userPhone":[
                        {required: true, validator: this.checkPhone, trigger: 'blur'},
                        {pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,message: '请输入正确的手机号',trigger:'change'}
                    ]
                },
                pwdRule: {
                    pwd1: [
                        {required: true, validator: this.checkPwd, trigger: 'blur'}
                    ],
                    pwd2: [
                        {required: true, validator: this.checkPwd, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            next(){

                if(this.active === 0){
                    if(this.user.userName == null ||this.user.userName.length === 0){
                        this.$message.error('用户名不能为空');
                        return;
                    } else if(this.user.userName.length<1||this.user.userName.length>18){
                        this.$message.error("昵称长度为1-18个字符");
                        return;
                    }
                }
                if(this.active === 1){
                    if(this.user.userInfo.userPhone == null ||this.user.userInfo.userPhone.length === 0||
                        !/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(this.user.userInfo.userPhone)
                        ){
                        this.$message.error('手机号码格式错误');
                        return;
                    } else if(this.authCode == null || this.authCode.length === 0 ||
                        !/^[0-9]{6}$/.test(this.authCode)
                        ){
                        this.$message.error('验证码格式错误');
                        return;
                    } else {
                        let needReturn = false;
                        request({
                            url: 'user/checkCode',
                            method: 'POST',
                            data: {
                                code: this.authCode
                            }
                        }).then( res => {
                            if(res.statusCode !== '000000'){
                                this.$message.error(res.message);
                                needReturn = true;
                            }
                        }).catch( err => {
                            this.$message.error('系统错误');
                            needReturn = true;
                        });
                        if(needReturn)
                            return;
                    }

                }
                if(this.active === 2){
                    if(!/^[^\u4e00-\u9fa5\s]{8,16}$/.test(this.pwds.pwd1)){
                        this.$message.error('请输入8-16位数字字母符号，不包含中文和空格');
                        return;
                    } else if(this.pwds.pwd1 !== this.pwds.pwd2){
                        this.$message.error('两次密码不一致');
                        return;
                    }

                    this.authCode = '';
                    this.jse.setPublicKey(this.publicKey);
                    this.user.userInfo.userPassword = this.jse.encrypt(this.pwds.pwd1);
                    request({
                        url: 'user/register',
                        method: 'POST',
                        data:  this.user
                    }).then(res => {
                        if(res.statusCode === '000000'){
                            this.registerSuccess = true
                        } else {
                            this.failMsg = res.message;
                        }
                        this.commited = true;
                    }).catch( err => {
                        this.$message.error('系统错误');
                        this.commited = true;
                    })
                }

                if(this.active<=3)
                    this.active++;
            },
            prev(){
                if(this.active>=0)
                    this.active--;
            },
            checkPwd(rule, value, callback){
                if(/^[^\u4e00-\u9fa5\s]{8,16}$/.test(value)){
                    callback();
                } else {
                    callback(new Error('请输入8-16位数字字母符号，不包含中文和空格'));
                }
            },
            checkName(rule, value, callback){
                this.userNameOK = false;
                if(value == null ||value.length == 0){
                    callback(new Error("不能为空"));
                } else if(value.length<1||value.length>18){
                    callback(new Error("昵称长度为1-18个字符"));
                } else {
                    request({
                        url: 'user/existUserName',
                        method: 'POST',
                        data: {
                            userName: this.user.userName
                        }
                    }).then( res => {
                        if(res.data ){
                            callback(new Error("该昵称已被使用"));
                        } else {
                            this.userNameOK = true;
                            callback();
                        }
                    })
                }
            },
            checkPhone(rule, value, callback){
                let reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
                if(reg.test(value)){
                    request({
                        url: 'user/checkPhone',
                        method: 'POST',
                        data: {
                            phone: this.user.userInfo.userPhone
                        }
                    }).then( res => {
                        if(res.statusCode!=='000000'){
                            callback(new Error(res.message));
                        } else {
                            callback();
                            this.phoneOk = true
                        }
                    })
                } else {
                    callback(new Error("手机号格式错误"));
                }
            },
            sendCode(){
                request({
                    url: 'user/sendCode2CheckPhone',
                    method: 'POST',
                    data:{
                        phone: this.user.userInfo.userPhone
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
            goLogin(){
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped lang="less">
    #register-controller{
        width: 600px;
        height: 450px;
        padding: 40px 20px 20px 80px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        border-radius: 5px;
        box-shadow: 0 0 500px #888;
        #register-info{
            width: 400px;
            height: 300px;
            margin-left: 50px;
            margin-top: 50px;
            /*#register-username,#register-userdesc{*/
                /*margin: 15px 15px;*/
            /*}*/

        }
        #register-prev-btn{
            float: left;
            width: 100px;
        }
        #register-next-btn{
            float: right;
            width: 100px ;
            margin-right: 50px  ;
        }

        #register-result{
            font-size: 30px;
            font-weight: bold;
            color: teal;
            text-align: center;
            div{
                padding: 50px;
            }
        }

        #register-commiting{
            margin: 100px 0 0 150px;
            height: 200px;
            color: teal;
            font-size: 30px;
            font-weight: bold;
        }
    }
</style>