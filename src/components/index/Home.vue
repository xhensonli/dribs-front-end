<template>
    <div id="home" class="clearfix">
        <div id="home-main">
            <router-view/>
        </div>
        <div id="home-topic-list">
            <topic-list/>
        </div>

    </div>
</template>

<script>
    import TopicList from "../topic/TopicList"
    export default {
        name: "Home",
        data(){
          return {

          }
        },
        components: {
            TopicList
        },
        methods: {


        }
    }
</script>

<style scoped lang="less">
    #header-user-username{
        font-size: 16px;
        margin-left: 10px;
    }


    #header-wrap{
        height: 70px;
    }

    #home-main{
        float: left;
        width: 1100px;
    }
    #home-topic-list{
        float: right;
        margin-right: 10px;
    }

</style>