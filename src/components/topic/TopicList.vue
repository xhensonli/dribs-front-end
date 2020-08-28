<template>
    <div id="topic-list">
        <div id="topic-list-title">
            话题榜
        </div>
        <div id="topic-list-items">
            <topic-list-item v-for="(item,index) in topicList" :topic="item" :rank="index+1"/>
        </div>
    </div>
</template>

<script>
    import {request} from "../../network/request";
    import TopicListItem from "./TopicListItem"
    export default {
        name: "TopicList",
        components: {
            TopicListItem
        },
        methods: {
            loadTopicList(){
                request({
                    url: 'blog/getTopicList',
                }).then( res => {
                    if(res.statusCode === '000000'){
                        this.topicList = res.data;
                    } else {
                        this.$message.error(res.message);
                    }
                }).catch (err => {
                    this.$message.error('系统错误');
                })
            }
        },
        created() {
            this.loadTopicList();
        },
        data(){
            return {
                topicList: []
            }
        }
    }
</script>

<style scoped lang="less">
    #topic-list{
        width: 300px;
        /*background-color: #bed6f9;*/
        background-color: rgba(0,128,128,0.08);
        padding: 5px;
        height: 500px;
        #topic-list-title{
            text-align: center;
            padding: 10px;
            background-color: #fff;
            color: darkorange;
            border-radius: 5px;
        }
    }
</style>