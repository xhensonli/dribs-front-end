<template>
    <div class="comment-content">
        {{commentContent}}
    </div>
</template>

<script>
    export default {
        name: "CommentContent",
        props: {
            commentContent: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>
    .comment-content{
        padding: 15px;
        min-height:70px;
        word-wrap:break-word;
        /*border-top: 1px solid #ddd;*/
        border-bottom: 1px solid #ddd;
        white-space: pre-wrap;
    }
</style>