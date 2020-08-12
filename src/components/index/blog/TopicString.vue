<template>
    <span class="topic-string">
        {{topicName}}
    </span>
</template>

<script>
    export default {
        name: "TopicString",
        props:['topicName'],
    }
</script>

<style scoped lang="less">
    .topic-string{
        color: teal;
        cursor: pointer;
        &:hover{
            text-decoration: underline;
        }

    }
</style>