<template>
    <div class="blog-display-wrap" >
        <div >
            <slot>
                <UserInfoTab :user="user" :is-profile="isProfile"/>
            </slot>
            <el-popover v-if="isProfile">
                <div>
                    <div @click.stop="editBlog" class="popover-item">编辑</div>
                    <!--<el-popconfirm-->
                            <!--@onConfirm="deleteBlog"-->
                            <!--title="这是一段内容确定删除吗？"-->
                    <!--&gt;-->
                        <div @click.stop="deleteBlog" class="popover-item">删除</div>
                    <!--</el-popconfirm>-->
                </div>
                <div class="info-operation"  v-if="isProfile" slot="reference" @click.stop="">
                    <i class="el-icon-s-operation" ></i>
                </div>
            </el-popover>
        </div>

        <el-divider/>

        <div v-if="!isRepost" >
            <div class="blog-brief-info-content" >
                <blog-content :content="blogContent"></blog-content>
            </div>
            <BlogImgList :img-list="imgList"></BlogImgList>
        </div>
        <div v-else>
            <div class="blog-brief-info-content"  @click.stop="">
                <blog-content :content="blogContent"></blog-content>
                <el-link v-for="img in imgList" type="primary" @click.stop="openImg(img)">[查看图片]</el-link>
                <span v-for="item in repostPath">
                    //<el-link type="primary" @click="toUser(item.userId)">{{item.userName}}</el-link>:
                    <blog-content :content="item.blogContent"></blog-content>
                    <el-link v-for="img in item.imgs" type="primary" @click.stop="openImg(img)">[查看图片]</el-link>
                </span>
            </div>
            <OriginBlog :source-blog="source"></OriginBlog>
        </div>
        <div @click.stop="">
            <el-dialog @click.stop=""
                       :visible.sync="showImg"
            >
                <img :src="blogImgPath+imgUrl" width="100%"/>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import UserInfoTab from "../../user/UserInfoTab"
    import BlogImgList from "./BlogImgList"
    import OriginBlog from './OriginBlog'
    import BlogContent from "./BlogContent"
    export default {
        name: "BlogDisplay",
        components: {
            UserInfoTab,
            BlogImgList,
            OriginBlog,
            BlogContent
        },
        data(){
            return {
                showImg: false,
                imgUrl: ''
            }
        },
        // computed: {
        //   contentWithTopic(){
        //       return this.content;
        //   }
        // },
        props: ['user','blogId','blogContent','imgList','isRepost','repostPath','source','isProfile'],
        methods: {
            openImg(url){
                this.imgUrl = url;
                this.showImg = true;
            },

            editBlog(blogId){
                this.$router.push({
                    path: '/home/index/editBlog',
                    query: {
                        blogId: this.blogId
                    }
                })
            },
            deleteBlog(){
                this.$confirm('确定删除吗',{
                    callback: (action) =>{
                        if(action === 'confirm'){
                            this.$emit("onDelete");
                        }
                    }
                })
            },
            toUser(id){
                this.$router.push({
                    path: '/user',
                    query: {
                        userId: id
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .blog-display-wrap{
        cursor: pointer;
    }
    .blog-brief-info-content{
        padding: 10px 20px 20px 20px;
        word-wrap:break-word;
    }

    .blog-brief-info-content{
        cursor: pointer;
    }

    .popover-item{
        cursor: pointer;
    }

    .info-operation{
        float: right;
        margin: 10px;
        padding: 5px;
        font-size: 18px;
        cursor: pointer;

        &:hover{
            color: #666;
        }
    }

</style>