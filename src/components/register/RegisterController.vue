<template>
    <div id="register-controller">
        <el-steps :active="active" finish-status="success">
            <el-step title="基本信息"></el-step>
            <el-step title="验证手机号"></el-step>
            <el-step title="注册成功"></el-step>
        </el-steps>
        <div id="register-info">
            <el-form :model="user" v-show="active==0" :rules="baseRule">
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
            <el-form :model="user" v-show="active==1" :rules="phoneRule">
                <el-form-item label="手机号" prop="userInfo.userPhone">
                    <el-input placeholder="请输入手机号" v-model="user.userInfo.userPhone"/>
                </el-form-item>
                <el-form-item label="验证码" >
                    <el-input placeholder="请输入验证码" />
                </el-form-item>
                <el-button type="primary" v-text="waitCount==0?'获取验证码':'重新发送('+waitCount+')'" @click="sendCode"
                :disabled="waitCount>0"/>
            </el-form>
            <el-upload v-show="active==2"
                    class="upload-demo"
                    :limit="1"
                    action="http://localhost:8080/dribs/test/testUpload"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="onSuccess"
                    name = "myFile"
                    :file-list="fileList"
                    list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                <!--{{fileList}}-->
            </el-upload>
        </div>
        <div id="register-prev-btn">
            <el-button @click="prev" type="primary" :disabled="active<=0">
                上一步
            </el-button>
        </div>
        <div id="register-next-btn">
            <el-button @click="next" type="primary" :disabled="active>=3||active==0&&!userNameOK">
                下一步
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
                active : 0,
                waitCount: 0,
                userNameOK: false,
                fileList: [
                    {name: '1590922324658.png', url: resourceURL+'test/1590922324658.png'},
                    {name: '1590924038973.png', url: resourceURL+'test/1590924038973.png'}
                    ],
                user:{
                    userName: '',
                    userInfo: {
                        userPhone: '',
                        userDesc: '',
                        male: 1
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
                        {pattern: /^1[345789]\d{9}$/,message: '请输入正确的手机号',trigger:'change'}
                    ]
                }
            }
        },
        methods: {
            next(){
                if(this.active<=3)
                    this.active++;
            },
            prev(){
                if(this.active>=0)
                    this.active--;
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
                    this.waitCount = 60;
                    let id = setInterval(()=>{
                        this.waitCount--;
                        if(this.waitCount == 0){
                            clearInterval(id);
                        }
                    },1000);
                });
            },
            handleRemove(file, fileList) {
                console.log(file);
                request({
                    url: 'test/deleteFile',
                    method: 'POST',
                    data: {
                        fileName: file.name
                    }
                }).then( res =>{

                });
            },
            handlePreview(file) {
                console.log(file);
            },
            onSuccess(response, file, fileList){
                file.name = response.data;
                file.url = resourceURL+'test/'+file.name;
            }
        }
    }
</script>

<style scoped lang="less">
    #register-controller{
        width: 600px;
        height: 500px;
        padding: 40px 20px 20px 80px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        border-radius: 5px;
        box-shadow: 0 0 100px #888;
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
    }
</style>