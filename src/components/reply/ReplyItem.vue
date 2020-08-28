<template>
    <div class="reply-item">
        <div class="reply-head-wrap">
            <reply-head :replyer="reply.replyer" :reply-id="reply.replyId" :reply-time="reply.replyTime"
                        :blog-owner-id="blogOwnerId" @deleteReply="$emit('deleteReply')"
                        :is-liked="reply.isLiked" :like-count="reply.likeCount"
                        @addReply="showReply = true"/>

        </div>
        <p class="reply-content" >
                <span @click.stop=""class="reply-content-word" >
                    <span class="reply-replyee" v-if="reply.replyee.userId!==0">
                        回复 {{reply.replyee.userName}}:
                    </span>
                    {{reply.replyContent}}
                </span>
        </p>
        <el-collapse-transition>
            <div class="reply-add-reply" v-show="showReply" >
                <div class="add-reply-content">
                    <el-input maxlength="300" show-word-limit v-model="replyContent"
                              type="textarea"/>
                </div>
                <div class="reply-btn-bar">
                    <el-button :disabled="replyContent == null ||replyContent.length === 0 || replyContent.length > 300"
                               @click="sendReply"
                    >回复</el-button>
                    <el-button @click="showReply = false"> 关闭</el-button>
                </div>

            </div>
        </el-collapse-transition>

    </div>
</template>

<script>
    import {request} from "../../network/request";
    import ReplyHead from "./ReplyHead"
    import ElCollapseTransition from "element-ui/lib/transitions/collapse-transition";
    export default {
        name: "ReplyItem",
        components: {
            ElCollapseTransition,
            ReplyHead
        },
        data(){
          return {
              showReply: false,
              replyContent: ''
          }
        },
        props: ['reply','blogOwnerId','commentId'],
        methods: {
            sendReply(){
                this.checkAndAction( () => {
                    if(this.replyContent == null || this.replyContent.length === 0 || this.replyContent.length>300){
                        this.$message.warning("请输1-300个字符");
                        return;
                    }
                    request({
                        url: 'reply/addReply',
                        method: 'POST',
                        data: {
                            commentId: this.commentId,
                            replyContent: this.replyContent,
                            replyeeId: this.reply.replyer.userId
                        }
                    }).then( res => {
                        if(res.statusCode === '000000'){
                            this.$message.success("发送成功");
                            this.replyContent = '';
                            this.incExp(3);
                            this.$emit('addReply');
                        } else {
                            this.$message.error(res.message);
                        }
                    }).catch (err => {
                        this.$message.error('系统错误');
                    })
                }, this.$route.path, this.$route.query)
            }
        }
    }
</script>

<style scoped lang="less">
.reply-item{
    padding: 5px;
    background-color: #f8f8f8;
    border-radius: 5px;
    margin-top: 5px;
    border-bottom: 1px dotted #aaa;
}

    .reply-content{
        padding: 10px;
        font-size: 15px;
        word-wrap:break-word;
        cursor: pointer;
        white-space: pre-wrap;
        .reply-content-word{
            cursor: text;
            padding: 0 10px 0 10px;
            line-height: 24px;
        }
    }

    .reply-replyee{
        color: teal;
        cursor: pointer;
        &:hover{
            color: #008888
        }
    }

    .add-reply-content{
        width: 500px;
        margin: 10px;
    }

    .reply-btn-bar{
        margin-left: 10px;
    }
</style>