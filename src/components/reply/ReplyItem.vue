<template>
    <div class="reply-item">
        <div class="reply-head-wrap">
            <reply-head :replyer="reply.replyer" :reply-id="reply.replyId" :reply-time="reply.replyTime"
                        :is-liked="reply.isLiked" :like-count="reply.likeCount"/>
            <p class="reply-content" @click="readyReply">
                <span @click.stop=""class="reply-content-word" >
                    <span class="reply-replyee" v-if="reply.replyee.userId!==0">
                        回复 {{reply.replyee.userName}}:
                    </span>
                    {{reply.replyContent}}
                </span>
            </p>
        </div>
    </div>
</template>

<script>
    import ReplyHead from "./ReplyHead"
    export default {
        name: "ReplyItem",
        components: {
            ReplyHead
        },
        props: ['reply'],
        methods: {
            readyReply(){
                this.$emit("readyReply", this.reply.replyer)
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
    border: 1px dotted #aaa;
}

    .reply-content{
        padding: 10px;
        font-size: 15px;
        word-wrap:break-word;
        cursor: pointer;
        white-space: pre;
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
</style>