<template>
    <el-col :span="12" :push="2">
        <slot></slot>
        <el-form>
            <el-form-item label="内容">
                <el-input type="textarea" maxlength="10000" show-word-limit :rows="5" v-model="blog.blogContent"/>
            </el-form-item>
            <div id="publish-blog-img">
                <el-upload
                        class="upload-demo"
                        :limit="4"
                        drag
                        action="http://localhost:8080/dribs/blog/uploadBlogImg"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success="onSuccess"
                        name = "blogImg"
                        with-credentials
                        :file-list="fileList"
                        list-type="picture">
                    <!--<el-button size="small" type="primary">点击上传</el-button>-->
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    <!--{{fileList}}-->
                </el-upload>
            </div>

            <el-form-item>
                <el-button type="primary" plain @click="commitBlog">发布</el-button>
            </el-form-item>
        </el-form>
        {{blog.imgs}}
    </el-col>

</template>

<script>
    import {fileRequest} from "../../../network/fileRequest"
    import {request} from "../../../network/request"
    import draggable from "vuedraggable"
    export default {
        name: "PublishBlog",
        data(){
            return {
                blog: {
                    blogContent: '',
                    repostPath: [],
                    imgs: []
                },
                fileList: [],
                sourceId: 0,
                preBlogId: 0,
            }
        },
        props: {
          isRepost: {
              type: Boolean,
              default: false
          }  ,
            preBlog: {
              type: Object,
              default: null
            }
        },
        components: {
            draggable
        },
        created(){
          // if(!this.$store.state.loginInfo.isLogin){
          //     this.$alert("未登录");
          //     this.$router.push("/login");
          // }
        },
        methods: {
            commitBlog(){
                if(this.isRepost){
                    this.blog.repostPath = this.preBlog.repostPath == null?[]:this.preBlog.repostPath;
                    this.preBlogId = this.preBlog.blogId;
                    if(this.preBlog.source == null ||this.preBlog.source.blogId === 0){
                        this.sourceId = this.preBlog.blogId;
                    } else {
                        this.sourceId = this.preBlog.source.blogId;
                        this.blog.repostPath.unshift({
                            userId: this.preBlog.author.userId,
                            userName: this.preBlog.author.userName,
                            blogContent: this.preBlog.blogContent,
                            imgs: this.preBlog.imgs
                        });
                    }
                }
                request({
                    url: 'blog/publishBlog',
                    method: 'POST',
                    data: {
                        blog: this.blog,
                        isRepost: this.isRepost,
                        preBlogId: this.preBlogId,
                        sourceId: this.sourceId
                    }
                }).then( res => {
                    if(res.statusCode === '000000'){
                        this.$message({
                            message: "发布成功",
                            type: 'success'
                        });
                    } else {
                        this.$message.error(res.message);
                    }
                });
            },
            handleRemove(file, fileList) {
                console.log(file);
                request({
                    url: 'blog/deleteBlogImg',
                    method: 'POST',
                    data: {
                        fileName: file.name
                    }
                }).then( res =>{
                    let index = this.blog.imgs.indexOf(file.name);
                    if(index>-1){
                        this.blog.imgs.splice(index,1);
                    }
                }).catch( err => {
                    this.$alert("系统错误");
                });
            },
            handlePreview(file) {
                console.log(file);
            },
            onSuccess(response, file, fileList){
                file.name = response.data;
                file.url = this.blogImgPath+file.name;
                this.blog.imgs.push(response.data);
                console.log(fileList);
            },
            onChange(e){
                console.log(e);
            },
            sendFile(params){

                let formData = new FormData();
                let fl = params.file;
                formData.append("blogImg",fl);
                fileRequest({
                    url: 'blog/uploadBlogImg',
                    method: 'POST',
                    data: formData,
                }).then( res => {
                    if(res.statusCode === '000000'){
                        this.onSuccess(res,fl);
                    }
                })
            }
        }
    }
</script>

<style scoped>
#publish-blog-img{
    /*height: 300px;*/
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px dotted #ccc;
    margin-bottom: 15px;
}
</style>