<template>
    <div id="followee-blog-wrap">
        <!--<BlogDisplay v-for="(blog,index) in blogList" :blog-id="blog.blogId" :user="blog.author" :blog-content="blog.blogContent" :img-list="blog.imgs" :is-profile="false"-->
                     <!--:is-repost="blog.repost" :repost-path="blog.repostPath" :source="blog.source" >-->
            <!--<blog-info :blog="blog" />-->
        <!--</BlogDisplay>-->
        <div class="followee-blog-item"  v-for="(blog,index) in blogList">
            <blog-brief-info :blog="blog" :is-detail="true" @toggleLike="toggleLike(blog)" />
        </div>

    </div>
</template>

<script>
    import {request} from "../../../network/request";
    import BlogDisplay from "./BlogDisplay";
    import BlogInfo from "./BlogInfo";
    import BlogBriefInfo from "./BlogBriefInfo"
    export default {
        name: "FolloweeBlogs",
        data(){
            return {
                currentPage: 1,
                total: 0,
                blogList: []
            }
        },
        components: {
            BlogDisplay,
            BlogInfo,
            BlogBriefInfo
        },
        methods: {
            loadBlogs(){
                request({
                    url: 'blog/getBlogListByFollow',
                    params: {
                        currentPage: this.currentPage
                    }
                }).then( res => {
                    if(res.statusCode === '000000'){
                        this.blogList = res.data.list;
                        this.total = res.data.total;
                    } else {
                        this.$message.error(res.message)
                    }
                }).catch( err => {
                    this.$message.error('系统错误');
                })
            },
            toggleLike(blog){
                this.checkAndAction( () => {
                    let url = blog.isLiked?'blog/cancelLikeBlog':'blog/likeBlog';
                    request({
                        url,
                        params: {
                            blogId: blog.blogId
                        }
                    }).then( res => {
                        if(res.statusCode === '000000'){
                            blog.isLiked = !blog.isLiked;
                            blog.isLiked?blog.likeCount++:blog.likeCount--;
                        } else {
                            this.$message.error(res.message);
                        }
                    }).catch (err => {
                        this.$message.error('系统错误');
                    })
                }, this.$route.path, this.$route.query)
            }
        },
        created() {
            this.loadBlogs();
        }
    }
</script>

<style scoped lang="less">

    #followee-blog-wrap{
        width: 800px;
        margin: 0 25px 0 auto;
        .followee-blog-item{

            margin-top: 5px;
            margin-bottom: 5px;
        }
    }
</style>