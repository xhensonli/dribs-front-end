<template>
    <div class="blog-comment clearfix">
        <div class="blog-comment-avatar-wrap">
            <div class="blog-comment-avatar">
                <el-avatar :src="resourcePath+comment.user.userAvatar" :size="60"/>
            </div>
        </div>
        <div class="blog-comment-other">
            <div class="blog-comment-head clearfix">

                <div class="blog-comment-like" @click="toggleLike">
                    <span class="comment-like " v-if="comment.isLiked">
                        <i class="icon-likefill " ></i>
                        <span v-if="comment.likeCount>0">{{comment.likeCount}}</span>
                    </span>
                    <span class="comment-not-like" v-else>
                        <i class="icon-like likeicon" ></i>
                        <span v-if="comment.likeCount>0">{{comment.likeCount}}</span>
                    </span>
                </div>
                <div class="blog-comment-delete"
                     v-if="$store.state.loginInfo.isLogin && comment.user.userId === $store.state.loginInfo.user.userId"
                >
                    <i class="icon-delete" @click.stop="deleteComment"></i>
                </div>
                <div class="blog-comment-info">
                    <comment-user :user="comment.user"/>
                    <div class="blog-comment-time">
                        {{getStandardTime(comment.commentTime)}}
                    </div>
                </div>
            </div>
            <comment-content :comment-content="comment.commentContent"/>
            <div class="blog-comment-reply" >
                   <span class="comment-reply-head" @click="showReply = ! showReply"
                         v-if="!showReply&&comment.replyCount>0">
                          共{{comment.replyCount}}条回复
                   </span>
                <span class="comment-reply-head" @click="showReply = ! showReply"
                      v-if="!showReply&&comment.replyCount===0">
                          添加回复
                   </span>
                    <span  class="comment-reply-head"
                            v-if="showReply"
                          @click="showReply = ! showReply" >收起</span>
            </div>
            <el-collapse-transition>
                <div class="reply-module-wrap" v-if="showReply">
                    <reply-module :comment-id="comment.commentId"   @incReply="comment.replyCount++" />
                </div>
            </el-collapse-transition>
        </div>
    </div>
</template>

<script>
    import CommentUser from "./CommentUser"
    import CommentContent from "./CommentContent"
    import ReplyModule from "../reply/ReplyModule"
    import {request} from "../../network/request";

    export default {
        name: "Comment",
        components: {
            ReplyModule,
            CommentUser,
            CommentContent
        },
        data(){
          return {
              showReply: false
          }
        },
        methods: {
            toggleLike(){
                this.checkAndAction( ()=>{
                    let url = this.comment.isLiked?'comment/cancelLikeComment':'comment/likeComment'
                    request({
                        url,
                        params: {
                            commentId: this.comment.commentId
                        }
                    }).then( res => {
                        if(res.statusCode === '000000'){
                            this.comment.isLiked = !this.comment.isLiked;
                            this.comment.isLiked? this.comment.likeCount++: this.comment.likeCount--;
                        } else {
                            this.$message.error(res.message);
                        }
                    }).catch (err => {
                        this.$message.error('系统错误');
                    })
                }),this.$route.path, this.$route.query
            },
            deleteComment(){
                this.checkAndAction( () => {
                    this.$confirm('确定删除吗',{
                        callback: action => {
                            if(action === 'confirm'){
                                this.$emit('deleteComment')
                            }
                        }
                    });
                }, this.$route.path, this.$route.query)
            }
        },
        props: {
            comment: {
                type: Object,
                default: {
                    user: {
                        userAvatar: ''
                    }
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .blog-comment{
        background-color: #fff;
        border-radius: 5px;
        margin-top: 15px;
        box-shadow: 0 0 5px #aaa;
        .blog-comment-other{
            float: left;
            width: 600px;

            .blog-comment-time{
                color: #aaa;
                font-size: 12px;
                padding-left: 10px;
                padding-bottom: 5px;
            }

            .blog-comment-delete{
               i{
                   float: right;
                   color: #888;
                   padding: 25px 10px 10px 10px;
                   cursor: pointer;
               }
            }

            .blog-comment-like{
                float: right;
                color: #888;
                padding: 25px 10px 10px 10px;
                cursor: pointer;
                .comment-like{
                    color: #f88;
                }
            }
            .blog-comment-info{
                float: left;
            }

            .blog-comment-reply{

                .comment-reply-head{
                    padding: 10px;
                    display: inline-block;
                    cursor: pointer;
                    color: #888;
                    &:hover{
                        color: #bbb;
                    }
                }
            }

            .reply-module-wrap{
                overflow: hidden;
                /*transition: 1s;*/
            }
        }
        .blog-comment-avatar-wrap{
            float: left;
            padding: 10px;
        }


    }



</style>