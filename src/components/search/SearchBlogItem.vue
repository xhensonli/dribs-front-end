<template>
    <div class="search-blog-item">
        <div class="search-blog-item-head clearfix">
            <div class="search-blog-item-avatar">
                <el-avatar  :src="resourcePath+blog.author.userAvatar"/>
            </div>
            <div class="search-blog-item-info">
                <p class="search-blog-username">{{blog.author.userName}}</p>
                <p class="search-blog-post-time">{{getStandardTime(blog.postTime)}}</p>
            </div>
        </div>
        <div class="search-blog-content" @click="goBlogDetail">
            <div v-if="!blog.repost" >
                <div class="blog-brief-info-content" >
                    <blog-content :content="blog.blogContent"></blog-content>
                </div>
                <BlogImgList :img-list="blog.imgs"></BlogImgList>
            </div>
            <div v-else>
                <div class="blog-brief-info-content"  @click.stop="">
                    <blog-content :content="blog.blogContent"></blog-content>
                    <el-link v-for="img in blog.imgs" type="primary" @click.stop="openImg(img)">[查看图片]</el-link>
                    <span v-for="item in blog.repostPath">
                            //<el-link type="primary" @click="toUser(item.userId)">{{item.userName}}</el-link>:
                            <blog-content :content="item.blogContent"></blog-content>
                            <el-link v-for="img in item.imgs" type="primary" @click.stop="openImg(img)">[查看图片]</el-link>
                        </span>
                </div>
                <OriginBlog :source-blog="blog.source"></OriginBlog>
            </div>
            <div @click.stop="">
                <el-dialog @click.stop=""
                           :visible.sync="showImg"
                >
                    <img :src="blogImgPath+imgUrl" width="100%"/>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    import BlogContent from "../index/blog/BlogContent";
    import BlogImgList from "../index/blog/BlogImgList"
    import OriginBlog from "../index/blog/OriginBlog"
    export default {
        name: "SearchBlogItem",
        props: ['blog'],
        components: {
            BlogContent,
            BlogImgList,
            OriginBlog
        },
        data(){
            return {
                showImg: false,
                imgUrl: null
            }
        },
        methods: {
            openImg(url){
                this.imgUrl = url;
                this.showImg = true;
            },
            goBlogDetail(){
                this.$router.push({
                    path: '/blogDetail',
                    query: {
                        blogId: this.blog.blogId
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .search-blog-item{
        padding: 5px;
        margin-bottom: 5px;
        background-color: #fff;
        cursor: pointer;
        &:hover{
            background-color: #f7f7f7;
        }
        .search-blog-item-head{
            padding: 5px;
            .search-blog-item-avatar{
                float: left;
            }
            .search-blog-item-info{
                float: left;
                margin-left: 10px;
                .search-blog-username{
                    margin-bottom: 8px;
                }
                .search-blog-post-time{
                    color: #999;
                    font-size: 15px;
                }
            }
        }

        .search-blog-content{
            padding: 10px;
        }
    }
</style>