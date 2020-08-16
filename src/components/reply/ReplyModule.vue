<template>
    <div class="comment-reply">
        <el-input  placeholder="输入回复" v-model="reply"
                   maxlength="300" show-word-limit
                   type="textarea" />
        <el-button @click="sendReply(0)" class="reply-submit" :disabled="reply == null ||reply.length === 0 || reply.length > 300">发送</el-button>
        <reply-item v-for="(item,index) in replyList" :reply="item" :blog-owner-id="blogOwnerId" :comment-id="commentId"
            @deleteReply="deleteReply(index)"
                    @addReply="addReply"
        />
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
            }
        },
        props: ['commentId','blogOwnerId'],
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
            sendReply(id,content){

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
                            replyeeId: 0
                        }
                    }).then( res => {
                        if(res.statusCode === '000000'){
                            this.reply = '';
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
            addReply(){
                this.loadReplies();
                this.$emit('incReply');
            },
            deleteReply(index){
                request({
                    url: 'reply/deleteReply',
                    params: {
                        commentId: this.commentId,
                        replyId: this.replyList[index].replyId
                    }
                }).then( res => {
                    if(res.statusCode === '000000'){
                        this.$message.success("删除成功");
                        this.replyList.splice(index,1);
                    } else {
                        this.$message.error(res.message);
                    }
                }).catch( err => {
                    this.$message.error('系统错误');
                })
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