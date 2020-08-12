<template>
    <PublishBlog :is-repost="true" :pre-blog="blog">
        <span>转发:</span>
        <div id="repost-blog-display">
            <BlogDisplay :blog-content="blog.blogContent" :user="blog.author" :img-list="blog.imgs"
                         :is-repost="blog.repost" :repost-path="blog.repostPath" :source="blog.source"/>
        </div>
    </PublishBlog>
</template>

<script>
    import {request} from '../../../network/request'
    import PublishBlog from "./PublishBlog"
    import BlogDisplay from './BlogDisplay'
    export default {
        name: "RepostBlog",
        data(){
          return {
            blogId: this.$route.params.blogId,
            blog: {
                author: {
                  userAvatar: 'default.jpg'
                },
                blogContent: '',
                    imgs: []
            }
          }
        },
        created(){
            request({
                url: 'blog/getBlogDetail',
                params: {
                    blogId: this.blogId
                }
            }).then( res => {
                this.blog = res.data;
            })
        },
        components: {
            PublishBlog,
            BlogDisplay
        }
    }
</script>

<style scoped>
#repost-blog-display{
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    background-color: #fff;
    border: 1px dashed #ccc;
}
    span{
        font-size: 15px;
        color: #555;
    }
</style>