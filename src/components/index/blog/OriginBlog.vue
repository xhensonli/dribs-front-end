<template>
    <div class="source-blog-wrap">
        <div class="source-blog"  @click.stop="showBlogDetail"  v-if="sourceBlog!=null" >
            <div class="origin-username">
                <el-link type="primary" @click.stop="toUser">{{sourceBlog.author.userName}}</el-link>
                :</div>
            <div class="origin-content" @click.stop="">
                <BlogContent :content="sourceBlog.blogContent"></BlogContent>
            </div>
            <BlogImgList :img-list="sourceBlog.imgs"/>
        </div>
        <div class="source-blog-deleted" v-else>
            该微博已被删除
        </div>
    </div>

</template>

<script>
    import BlogImgList from './BlogImgList'
    import BlogContent from './BlogContent'
    export default {
        name: "OriginBlog",
        props: ['sourceBlog'],
        components: {
            BlogImgList,
            BlogContent
        },
        methods: {
            showBlogDetail(){
                this.$router.push({
                    path: '/blogDetail',
                    query: {
                        blogId: this.sourceBlog.blogId
                    }
                })
            },
            toUser(){
                this.$router.push({
                    path: 'user',
                    query: {
                        userId: this.sourceBlog.author.userId
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
.source-blog{
    padding: 10px;
    border-radius: 5px;
    background-color: #eee;
    cursor: pointer;
    .origin-username{
        margin: 10px;
        font-size: 16px;
    }
    .origin-content{
        margin: 15px 15px 20px 15px;
        font-size: 15px;
    }

}
    .source-blog-deleted{
        background-color: #eee;
        padding: 15px;
        border-radius: 5px;
    }
</style>