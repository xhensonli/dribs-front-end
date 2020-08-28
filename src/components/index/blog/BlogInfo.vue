<template>
    <div id="blog-detail-info"   v-if="blog!=null" @click="goUserInfo">
        <div id="blog-info-head" class="clearfix">
            <div class="blog-info-avatar">
                <el-avatar :src="resourcePath+blog.author.userAvatar" :size="48"/>
            </div>
            <div class="blog-info-info">
                <div class="blog-info-username">
                    Lv.{{blog.author.userLevel}} {{blog.author.userName}}
                </div>
                <div class="blog-info-time">{{getStandardTime(blog.postTime)}}</div>

            </div>
            <div class="blog-info-view-count">
                被浏览{{blog.viewCount}}次
            </div>
        </div>
    </div>
</template>

<script>
    import BlogDisply from "./BlogDisplay"
    export default {
        name: "BlogInfo",
        props: ['blog'],
        methods: {
            goUserInfo(){
                this.$router.push({
                    path: '/user',
                    query: {
                        userId: this.blog.author.userId,
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    #blog-detail-info{
        height: 30px;
        margin-bottom: 15px;
        .blog-info-avatar{
            float: left;
        }
        .blog-info-info{
            float: left;
            margin-left: 15px;
            .blog-info-username{
                color: #555;
            }
            .blog-info-time{
                margin-top: 15px;
                color: #999;
                font-size: 12px;
            }
        }
        .blog-info-view-count{
            float: right;
            color: #999;
            font-size: 15px;
            margin-top: 10px;
        }
    }
   
</style>