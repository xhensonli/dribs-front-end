<template>
    <div id="profile-upload-avatar">
        <el-upload
                class="avatar-uploader"
                :action="apiPath+'user/uploadAvatar'"
                :show-file-list="false"
                name="avatar"
                with-credentials
                :on-success="handleSuccess"
                :before-upload="beforeUpload">
            <img v-if="avatarInfo.avatar" :src="resourcePath+avatarInfo.avatar" class="avatar"/>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <!--tx:{{avatar}}-->
        </el-upload>
    </div>
</template>

<script>
    export default {
        name: "UploadAvatar",
        data(){
            return {
                trueAvatar: null
            }
        },
        watch: {
            // avatar(v){
            //     this.trueAvatar = v;
            // }
        },
        props: ['avatarInfo'],
        methods: {
            handleSuccess(response,file,fileList){
                file.name = response.data;
                file.url = this.resourcePath+file.name;
                this.$emit('success',response.data)
            },
            beforeUpload(file){
                // const isJPG = file.type === 'image/jpeg';
                this.checkAndAction( () => {
                    if(file.type!=='image/png'&&file.type!=='image/jpeg'){
                        this.$message.error('只能上传jpg或png文件');
                        return false;
                    }
                },this.$route.path,this.$route.query);
            }
        }
    }
</script>

<style scoped>
    .avatar-uploader{
        display: inline-block;
        background-color: #eee;
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