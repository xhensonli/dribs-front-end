<template>
    <div class="topic-list-item clearfix">
        <span class="topic-rank" :class="{hot:rank<=3}" >{{rank}}</span>
        <el-link type="primary" class="topic-name" :underline="false">#{{topic.topicName}}#</el-link>
        <span class="topic-heat">{{topic.heat}}</span>
    </div>
</template>

<script>
    export default {
        name: "TopicListItem",
        props: ['topic','rank']
    }
</script>

<style scoped>
    .topic-list-item{
        margin: 5px;
        background-color: #fff;
        border-radius: 3px;
    }
    .topic-rank{
        float: left;
        margin: 5px;
    }
    .topic-name{
        float: left;
        padding: 5px;
        white-space: nowrap;

        width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .topic-heat{
       float: right;
        padding: 5px;
    }
    .hot{
        color: #f9862c;
    }
</style>