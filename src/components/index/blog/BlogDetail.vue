<template>
<div>
    <el-col :span="18" >
        <div id="blog-detail-display" v-if="blog!=null"  >
            <BlogBriefInfo :blog="blog" :is-detail="true"
                           :is-profile="$store.state.loginInfo.isLogin == true && blog.author.userId == $store.state.loginInfo.user.userId"
                           @toggleLike="toggleLike()"
            >
            </BlogBriefInfo>

        </div>
    </el-col>

    <el-divider/>
    <el-col :span="18" >
        <div id="blog-detail-comment">
            <div id="add-new-comment">

                    <el-input type="textarea" maxlength="300" show-word-limit placeholder="在这里评论" :rows="3" v-model="comment">
                    </el-input>
                    <div id="comment-commit-btn">
                        <el-button @click="submitComment"
                         :disabled="comment == null ||comment.length === 0|| comment.length>300"
                        >发表评论</el-button>
                    </div>

            </div>
            <div id="blog-detail-comment-list-wrap">
                <div v-if="commentList.length>0">
                    <Comment v-for="(item,index) in commentList" :key="item.commentId"
                             :comment="item" @deleteComment="deleteComment(index)"
                    />
                    <div class="comment-page-wrap clearfix">
                        <div class="comment-page">
                            <el-pagination
                                    layout="prev, pager, next"
                                    @current-change="changePage"
                                    :current-page.sync="currentPage"
                                    :page-size="30"
                                    :total="total">
                            </el-pagination>
                    </div>

                    </div>

                </div>
                <div class="comment-list-empty" v-else>
                    还没有任何评论
                </div>
            </div>

            <!--{{commentList}}-->
        </div>
    </el-col>
</div>
</template>

<script>
    import {request} from "../../../network/request";
    import BlogBriefInfo from "./BlogBriefInfo"
    import Comment from "../../comment/Comment"
    export default {
        name: "BlogDetail",
        // props: ['blogId'],
        data(){
            return {
                blogId: 0,
                blogLoading: false,
                blog: null,
                comment: null,
                commentList: [],
                currentPage: 1,
                total: 0
            }
        },
        methods: {
            loadBlogDetail(){
                this.blogLoading = true;
                request({
                    url: 'blog/getBlogDetail',
                    params: {
                        blogId: this.blogId
                    }
                }).then( res => {
                    this.blog = res.data;
                    this.blogLoading = false;
                })
            },
            changePage(){
               this.loadCommentList();
            },
            loadCommentList(){
                request({
                    url: 'comment/getCommentList',
                    params: {
                        blogId: this.blogId,
                        currentPage: this.currentPage
                    }
                }).then( res => {
                    this.commentList = res.data.list;
                    this.currentPage = res.data.pageNum;
                    this.total = res.data.total;
                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            submitComment(){
                if(this.comment == null ||this.comment.length === 0|| this.comment.length>300){
                    this.$message.warning("请输入1-300个字符");
                }
                request({
                    url: 'comment/addComment',
                    method: 'POST',
                    data: {
                        // comment: {
                            commentContent: this.comment,
                        // },
                        blogId: this.blogId
                    }
                }).then( res => {
                    if(res.statusCode === '000000'){
                        this.comment = null;
                        this.$message.success('评论成功');
                        this.loadCommentList();
                    } else {
                        this.$message.error(res.message);
                    }

                }).catch( err => {
                    this.$message.error(err.message);
                })
            },
            deleteComment(index){
                request({
                    url: 'comment/deleteComment',
                    params: {
                        blogId: this.blogId,
                        commentId: this.commentList[index].commentId
                    }
                }).then( res => {
                    if(res.statusCode === '000000'){
                        this.commentList.splice(index,1);
                        this.$message.success('删除成功');
                    } else {
                        this.$message.error(res.message);
                    }
                }).catch (err => {
                    this.$message.error('系统错误');
                })
            },
            toggleLike(){
                this.checkAndAction( () => {
                    let url = this.blog.isLiked?'blog/cancelLikeBlog':'blog/likeBlog';
                    request({
                        url,
                        params: {
                            blogId: this.blogId
                        }
                    }).then( res => {
                        if(res.statusCode === '000000'){
                            this.blog.isLiked = !this.blog.isLiked;
                            this.blog.isLiked?this.blog.likeCount++:this.blog.likeCount--;
                        } else {
                            this.$message.error(res.message);
                        }
                    }).catch (err => {
                        this.$message.error('系统错误');
                    })
                }, this.$route.path, this.$route.query)
            }
        },
        components: {
            BlogBriefInfo,
            Comment
        },
        created() {
            this.blogId = this.$route.query.blogId;
            this.loadBlogDetail();
            this.loadCommentList();
        }
    }
</script>

<style scoped>
#blog-detail-display{
    margin: 20px 0 0  50px;
}

    #blog-detail-comment{
        margin: 10px 0 0 50px;
    }

    #comment-commit-btn{
        margin-top: 10px;
    }

    #add-new-comment{
        padding-bottom: 25px;
    }
    #blog-detail-comment-list-wrap{
        border-top: 1px solid #ccc;
        padding-top: 20px;
    }

    .comment-list-empty{
        padding: 50px 0 0 300px;
        color: #ddd;
        font-size: 25px;
        text-shadow: 1px 1px 5px #ccc;
    }


    .comment-page{
       margin: 15px 250px ;
    }


</style>