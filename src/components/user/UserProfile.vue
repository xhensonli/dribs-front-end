<template>
    <div id="user-profile-wrap" v-if="user!=null">
        <div id="user-profile-head" class="clearfix" >
            <div id="user-profile-title">
                个人信息
            </div>

        </div>

        <div id="user-profile-avatar">
            <p>头像：</p>
            <el-avatar :src="resourcePath+user.userAvatar"/>
            <div id="user-profile-avatar-edit" @click="changeAvatar">
                <i class="icon-edit"></i> 更换头像
            </div>
        </div>
        <el-divider/>
        <div id="user-profile-username">
            <p>用户名：</p>
            {{user.userName}}
            <!--<div id="user-profile-username-edit" >-->
                <!--<i class="icon-edit"></i> 修改-->
            <!--</div>-->
        </div>
        <el-divider/>
        <div id="user-profile-desc">
            <p>简介：</p>
            {{user.userInfo.userDesc}}
            <div id="user-profile-desc-edit" @click="changeUserDesc">
                <i class="icon-edit"></i> 修改
            </div>
        </div>
        <el-divider/>
        <div id="user-profile-gender">
            <p>性别</p>
             <!--<span v-if="user.userInfo.male">男</span>-->
             <!--<span v-else>女</span>-->
            <el-switch :value="user.userInfo.male" active-text="男" inactive-text="女"
                active-color="dodgerblue" inactive-color="hotpink" @change="changeUserGender"
            />
        </div>
        <el-divider/>
        <div id="user-profile-password">
            <el-button @click="goChangePwd">修改密码</el-button>
        </div>
    </div>

</template>

<script>
    import {request} from "../../network/request";
    import UploadAvatar from "./UploadAvatar"
    export default {
        name: "UserProfile",
        data(){
            return {
                userId: this.$store.state.loginInfo.user.userId,
                user: null,
                avatarInfo:{avatar: null},
                userName: null,
                desc: null,
                gender: null
            }
        },
        components: {
            UploadAvatar
        },
        methods: {
            changeAvatar(){
                this.checkAndAction( () => {
                    this.$msgbox({
                        title: '更换头像',
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        center: true,
                        message: this.$createElement('UploadAvatar',{
                            on: {
                                success: this.onSuccess
                            },
                            props: {
                                avatarInfo: this.avatarInfo
                            }
                        })

                    }).then( d => {
                        this.checkAndAction( () => {
                            request({
                                url: 'user/updateAvatar',
                                params: {
                                    avatarURL: this.avatarInfo.avatar
                                }
                            }).then( res => {
                                if(res.statusCode === '000000'){
                                    this.user.userAvatar = this.avatarInfo.avatar;
                                    this.$store.commit('changeUserAvatar',this.avatarInfo.avatar);
                                    this.avatarInfo.avatar = null;
                                    this.$message.success('修改成功');
                                } else {
                                    this.$message.error(res.message);
                                }
                            }).catch( err => {
                                this.$message.error('系统错误');
                            })
                        },this.$route.path,this.$route.query)
                    }).catch( err => {
                        if(err==='cancel'){
                            this.cancel();
                        }
                    })
                },this.$route.path,this.$route.query)
            },
            onSuccess(v){
                this.avatarInfo.avatar = v;
                console.log(v);
            },
            cancel(){
                if(this.avatarInfo.avatar!=null){
                    request({
                        url: 'user/deleteAvatar',
                        params: {
                            avatarURL: this.avatarInfo.avatar
                        }
                    }).then( res => {
                        this.avatarInfo.avatar = null;
                    })
                }

            },
            changeUserDesc(){
                this.checkAndAction( () => {
                    this.desc = this.user.userInfo.userDesc;
                    this.$prompt('请输入简介', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        inputPattern: /^.{0,20}$/,
                        inputErrorMessage: '最多20个字符'
                    }).then(({ value }) => {
                        this.desc = value;
                        return request({
                            url: 'user/changeUserDesc',
                            method: 'POST',
                            data: {
                                'userInfo.userDesc': value
                            }
                        })
                    }).then( res => {
                        if(res.statusCode === '000000'){
                            this.user.userInfo.userDesc = this.desc;
                            this.$store.commit('changeUserDesc',this.desc);
                            this.$message.success('修改成功');
                        }else {
                            this.$message.error('修改失败');
                        }
                    }).catch(err => {
                        if(err!=='cancel'){
                            this.$message.error('系统错误');
                        }
                    });
                },this.$route.path,this.$route.query)
            },
            changeUserGender(v){
                this.checkAndAction( () => {
                           request({
                               url: 'user/updateUserGender',
                               method: 'POST',
                               data: {
                                   male: v
                               }
                           }).then( res => {
                               if(res.statusCode === '000000'){
                                   this.user.userInfo.male = v;
                                   this.$store.commit('changeUserGender',v);
                                   this.$message.success('修改成功');
                               }else {
                                   this.$message.error(res.message);
                               }
                           }).catch(err => {
                               this.$message.error('系统错误');
                           });
                       },this.$route.path,this.$route.query)
            },
            goChangePwd(){
                this.$router.push('/changePwd')
            }
        },
        created() {
            request({
                url: 'user/getProfile',
                params: {
                    userId: this.userId
                }
            }).then( res => {
                if(res.statusCode === '000000'){
                    this.user = res.data;
                } else {
                    this.$message.error(res.message);
                }
            }).catch( err => {
                this.$message.error('系统错误');
            })
        }
    }
</script>

<style scoped lang="less">
    #user-profile-wrap{
        width: 600px;
        margin: 15px auto;
        padding: 15px;
        background-color: #fff;
        #user-profile-head{
            margin: 15px;
            #user-profile-title{
                font-size: 32px;
                color: teal;
                text-shadow: 1px 1px 5px #000;
                font-weight: bold;
                float: left;
            }
            #user-profile-edit{
                float: right;
            }
        }

        #user-profile-avatar,#user-profile-username,#user-profile-desc,#user-profile-gender{
            margin: 20px;
            p{
                font-size: 24px;
                font-weight: bold;
                color: #666;
                margin-bottom: 10px;
            }
            #user-profile-avatar-edit,#user-profile-username-edit,#user-profile-desc-edit{
                float: right;
                cursor: pointer;
                &:hover{
                    color: teal;
                }
            }
        }

    }

    .el-upload {
         border: 1px dashed #d9d9d9;
         border-radius: 6px;
         cursor: pointer;
         position: relative;
         overflow: hidden;
     }

    .el-upload:hover {
        border-color: teal;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>