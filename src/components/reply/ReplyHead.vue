<template>
    <div class="reply-head clearfix" >
        <div class="replyer-avatar">
            <el-avatar :src="resourcePath+replyer.userAvatar"/>
        </div>
        <div class="reply-info clearfix">
            <div class="user-and-time">
                <div class="replyer-info" @click="goUserInfo">
                    Lv. {{replyer.userLevel}} {{replyer.userName}}
                </div>
                <div class="reply-time">
                    {{getStandardTime(replyTime)}}
                </div>
            </div>
            <div class="reply-owner" v-if="$store.state.loginInfo.isLogin && replyer.userId === $store.state.loginInfo.user.userId">博主</div>
            <div class="reply-like-count">
                <span class="reply-like" v-if="dIsLiked" @click.stop="toggleLike">
                        <i class="icon-likefill " ></i>
                        <span v-if="dLikeCount>0">{{dLikeCount}}</span>
                    </span>
                <span class="reply-not-like" v-else @click.stop="toggleLike">
                        <i class="icon-like likeicon" ></i>
                        <span v-if="dLikeCount>0">{{dLikeCount}}</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import {request} from "../../network/request";

    export default {
        name: "ReplyHead",
        props: {
            replyer: {
                type: Object,
                default: {
                    userId: 0,
                    userName: '',
                    userLevel: 1,
                    userAvatar: ''
                }
            },
            replyTime: {
                type: Number,
                default: 0
            },
            isLiked: {
                type: Boolean,
                default: false
            },
            likeCount: {
                type: Number,
                default: 0
            },
            replyId: {
                type: Number,
                default: 0
            }
        },
        data(){
          return {
              dLikeCount: this.likeCount,
              dIsLiked: this.isLiked
          } ;
        },
        methods: {
            toggleLike(){
                this.checkAndAction( () => {
                    let url = this.dIsLiked?'reply/cancelLikeReply':'reply/likeReply';
                    request({
                        url,
                        params: {
                            replyId: this.replyId
                        }
                    }).then( res => {
                        if(res.statusCode === '000000'){
                            this.dIsLiked = !this.dIsLiked;
                            this.dIsLiked?this.dLikeCount++:this.dLikeCount--;
                        } else {
                            this.$message.error(res.message);
                        }
                    }).catch (err => {
                        this.$message.error('系统错误');
                    })
                }, this.$route.path, this.$route.query)
            },
            goUserInfo(){
                this.$router.push({
                    path: '/user/blogs',
                    query: {
                        userId: this.replyer.userId,
                        type: 'blogs',
                        currentPage: 1
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">

    .reply-head{
        padding: 5px;
        background-color: #eee;
    }
    .replyer-avatar{
        float: left;
    }
    .reply-info{
        float: left;
        width: 500px;

    }
    .user-and-time{
        float: left;
        margin-left: 15px;
        .replyer-info{
            color: #555;
            margin-bottom: 5px;
            cursor: pointer;
            &:hover{
                color: #999;
            }
        }
        .reply-time{
            font-size: 12px;
            color: #999;
        }

    }
    .reply-owner{
        float: left;
        font-size: 12px;
        padding: 2px;
        border-radius: 2px;
        background-color: teal;
        display: inline-block;
        margin-top: 2px;
        color: white;
    }
    .reply-like-count{
        float: right;
        color: #888;
        padding: 10px 10px 10px 10px;
        cursor: pointer;
        .reply-like{
            color: #f88;
        }
    }
</style>