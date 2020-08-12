<template>
    <el-col :span="12" :push="2">
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
                <el-button type="primary" plain @click="commitBlog">确定</el-button>
            </el-form-item>
        </el-form>
        {{blog.imgs}}
    </el-col>
</template>

<script>
    import BlogDisplay from "./BlogDisplay"
    import {request} from "../../../network/request"
    export default {
        name: "EditBlog",
        components: {
            BlogDisplay
        },
        created(){
          request({
              url: 'blog/getBlogDetail',
              params: {
                  blogId: Number(this.$route.query.blogId)
              }
          }).then( res => {
              this.blog = res.data;
              this.blog.imgs.forEach( item => {
                  this.fileList.push({
                      name: item,
                      url: this.blogImgPath+item
                  });
                  this.deletingImgs.push(item)
              });
          })
        },
        data(){
            return {
                blog: {
                    imgs: []
                },
                fileList: [],
                deletingImgs: []
            }
        },
        methods: {
            commitBlog(){
                request({
                    url: 'blog/editBlog',
                    method: 'POST',
                    data: {
                        blog: {
                            blogId: this.blog.blogId,
                            blogContent: this.blog.blogContent,
                            imgs: this.blog.imgs
                        },
                        deletingImgs: this.deletingImgs
                    }
                }).then( res => {
                    if(res.statusCode === '000000'){
                        this.$message({
                            message: "修改成功",
                            type: 'success'
                        });
                    }else {
                        this.$message.error(res.message);
                    }
                }).catch( err => {
                    this.$message.error("系统错误")
                })
            },
            handleRemove(file, fileList) {
                // console.log(file);
                // request({
                //     url: 'blog/deleteBlogImg',
                //     method: 'POST',
                //     data: {
                //         fileName: file.name
                //     }
                // }).then( res =>{
                //
                // }).catch( err => {
                //     this.$alert("系统错误");
                // });
                let index = this.blog.imgs.indexOf(file.name);
                if(index>-1){
                    this.blog.imgs.splice(index,1);
                }
            },
            handlePreview(file) {
                console.log(file);
            },
            onSuccess(response, file, fileList){
                file.name = response.data;
                file.url = this.blogImgPath+file.name;
                this.blog.imgs.push(response.data);
                console.log(fileList);
            }
        }
    }
</script>

<style scoped>

</style>