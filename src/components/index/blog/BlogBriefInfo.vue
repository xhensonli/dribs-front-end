<template>
    <div class="blog-brief-info" @click="showBlogDetail(blog.blogId)">
        <el-card >
            <BlogDisplay :blog-id="blog.blogId" :user="blog.author" :blog-content="blog.blogContent" :img-list="blog.imgs" :is-profile="isProfile"

                         :is-repost="blog.repost" :repost-path="blog.repostPath" :source="blog.source" @onDelete="$emit('onDelete')">
                <blog-info :blog="blog" v-if="isDetail"/>
            </BlogDisplay>
            <el-divider/>
            <el-row class="blog-btn-tab">
                <el-col :span="8" :push="0.4">
                    <i class="icon-forward"></i>
                    <span v-if="blog.repostCount==0" class="opt-btn" @click.stop="repostBlog">转发</span>
                    <span v-else>{{blog.repostCount}}</span>
                </el-col>
                <el-col :span="8" :push="0.4">
                    <i class="icon-comment"></i>
                    <span v-if="blog.replyCount==0">评论</span>
                    <span v-else>{{blog.replyCount}}</span>
                </el-col>
                <el-col :span="8" :push="0.4">
                    <span @click.stop="toggleLike">
                         <i class="icon-like" v-if="!blog.isLiked"></i>
                         <i class="icon-likefill" style="color:#f88" v-else></i>
                        <span class="opt-btn" >
                        <span v-if="blog.likeCount==0">点赞</span>
                        <span v-else :style="blog.isLiked?'color:#f88':''">{{blog.likeCount}}</span>
                    </span>
                    </span>

                </el-col>
            </el-row>
        </el-card>

    </div>
</template>

<script>

    import BlogDisplay from "./BlogDisplay"
    import BlogInfo from "./BlogInfo"
    export default {
        name: "BlogBriefInfo",
        props: [
            // 'blogId','blogContent','repostCount','likeCount','replyCount','user','isLiked',
            // 'imgList','isRepost','repostPath','source',
            'isProfile','blog','isDetail'],
        components: {
            BlogDisplay,
            BlogInfo
        },
        methods: {
            toggleLike(){
                this.$emit("toggleLike")
            },
            log(){
                console.log('show2');
            },
            showBlogDetail(id){
                this.$router.push({
                    path: '/blogDetail',
                    query: {
                        blogId: this.blog.blogId,
                        currentPage: 1
                    }
                })
            },
            repostBlog(){
                this.$router.push("/home/index/repostBlog/"+this.blog.blogId)
            }
        }
    }
</script>

<style scoped lang="less">
    .blog-btn-tab{
        text-align: center;
    }
    .opt-btn{
        cursor: pointer;
        &:hover{
            color: #666;
         }
    }
    [class^='icon-']{
        margin-right: 5px;
    }
    .blog-brief-info{
        cursor: pointer;
    }
</style>