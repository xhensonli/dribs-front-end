<template>
    <div >
        <el-tabs v-model="activeName" @tab-click="handleClick" id="user-info-about">
            <el-tab-pane label="微博" name="blogs" class="pane">
                <!--<BlogListWithTime :blog-list="blogList"/>-->
            </el-tab-pane>
            <el-tab-pane label="关注" name="followee" class="pane"></el-tab-pane>
            <el-tab-pane label="粉丝" name="follower" class="pane"></el-tab-pane>
        </el-tabs>
        <router-view/>
    </div>
</template>

<script>
    import BlogListWithTime from "../index/blog/BlogListWithTime"
    export default {
        name: "AboutUser",
        data(){
            return {
                activeName: 'blogs',
                blogList: []
            }
        },
        components: {
            BlogListWithTime
        },
        methods: {
            handleClick(data){
                // console.log(data.name);
                this.$router.push({
                    path: '/user/'+data.name,
                    query: {
                        infoType: data.name,
                        currentPage: 1,
                        userId: this.userId
                    }
                })
            }
        },
        props: ['userId','isProfile'],
        created() {
            // request({
            //     url: 'blog/getBlogListByUser',
            //     method: 'POST',
            //     data: {
            //         userId: this.userId
            //     }
            // }).then( res => {
            //     if(res.statusCode === '000000'){
            //         this.blogList = res.data;
            //     } else {
            //         this.$message.error(res.message);
            //     }
            // })
            this.activeName = this.$route.query.infoType;
            if(this.$route.query.userId == null){
                this.$router.push("/home/index")
                return;
            }
            if(this.activeName == null){
                this.activeName = 'blogs';
                console.log(1);
                this.$router.push({
                    path: '/user/blogs',
                    query: {
                        infoType: 'blogs',
                        currentPage: 1,
                        userId: this.$route.query.userId
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
#user-info-about{
    width: 800px;

}
</style>