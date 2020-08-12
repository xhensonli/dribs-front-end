<template>
    <div class="comment-reply">
        <el-input  :placeholder="placeHolder == null ?'输入回复':'回复 '+placeHolder+':'" v-model="reply"
                   maxlength="300" show-word-limit
                   type="textarea" />
        <el-button @click="sendReply" class="reply-submit" :disabled="reply == null ||reply.length === 0 || reply.length > 300">发送</el-button>
        <el-button @click="reset" class="reply-reset">重置</el-button>
        <reply-item v-for="(item,index) in replyList" :reply="item" @readyReply="readyReply" />
    </div>
</template>

<script>
    import ReplyItem from "./ReplyItem"
    import {request} from "../../network/request";

    export default {
        name: "ReplyModule",
        components: {
            ReplyItem
        },
        data(){
            return {
                replyList: [],
                reply: '',
                replyeeId: 0,
                placeHolder: null
            }
        },
        props: ['commentId'],
        methods: {
            loadReplies(){
                request({
                    url: 'reply/getReplies',
                    params: {
                        commentId: this.commentId
                    }
                }).then( res => {
                    if(res.statusCode === '000000'){
                        this.replyList = res.data;
                    } else {
                        this.$message.error(res.message);
                    }
                }).catch (err => {
                    this.$message.error('系统错误');
                })
            },
            sendReply(){
                this.checkAndAction( () => {
                    if(this.reply == null ||this.reply.length === 0 || this.reply.length > 300){
                        this.$message.warning("请输1-300个字符");
                        return;
                    }
                    request({
                        url: 'reply/addReply',
                        method: 'POST',
                        data: {
                            commentId: this.commentId,
                            replyContent: this.reply,
                            replyeeId: this.replyeeId
                        }
                    }).then( res => {
                        if(res.statusCode === '000000'){
                            this.reply = '';
                            this.replyeeId = 0;
                            this.placeHolder = null;
                            this.$message.success("发送成功");
                            this.loadReplies();
                            this.$emit('incReply');
                        } else {
                            this.$message.error(res.message);
                        }
                    }).catch (err => {
                        this.$message.error('系统错误');
                    })
                }, this.$route.path, this.$route.query)
            },
            readyReply(replyee){
                this.replyeeId = replyee.userId;
                this.placeHolder = replyee.userName;
            },
            reset(){
                this.reply = '';
                this.placeHolder = null;
                this.replyeeId = 0;
            }
        },
        created() {
            this.loadReplies();
        }
    }
</script>

<style scoped>
.comment-reply{
    /*border-radius: 5px;*/
    /*border: 1px dotted #aaa;*/
    padding-bottom: 10px;
}

    .reply-submit, .reply-reset{
        margin: 10px;
    }
</style>