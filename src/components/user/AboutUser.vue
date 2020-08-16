<template>
    <div id="about-user-wrap">
        <el-tabs v-model="activeName" @tab-click="handleClick" id="user-info-about">
            <el-tab-pane label="微博" name="blogs" class="pane">
                <!--<BlogListWithTime :blog-list="blogList"/>-->
                <profile-blogs :user-id="userId"/>
            </el-tab-pane>
            <el-tab-pane label="关注" name="followee" class="pane">
                <followee-list :user-id="userId"/>
            </el-tab-pane>

            <el-tab-pane label="粉丝" name="follower" class="pane">
                <follower-list :user-id="userId"/>
            </el-tab-pane>
        </el-tabs>

        <!--<transition name="el-fade-in-linear">-->
            <!--<router-view/>-->
        <!--</transition>-->
    </div>
</template>

<script>
    import BlogListWithTime from "../index/blog/BlogListWithTime"
    import ProfileBlogs from "./ProfileBlogs"
    import FolloweeList from "./FolloweeList"
    import FollowerList from "./FollowerList"
    export default {
        name: "AboutUser",
        data(){
            return {
                activeName: 'blogs',
                blogList: []
            }
        },
        components: {
            BlogListWithTime,
            ProfileBlogs,
            FolloweeList,
            FollowerList
        },
        methods: {
            handleClick(data){
                // console.log(data.name);
                // this.$router.push({
                //     path: '/user/'+data.name,
                //     query: {
                //         infoType: data.name,
                //         currentPage: 1,
                //         userId: this.userId
                //     }
                // })
                this.activeName = data.name
            }
        },
        watch: {
           // '$route.query.infoType'(type){
           //     console.log(type);
           //     this.activeName = type;
           // }
            userId(){
                this.activeName = 'blogs';
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
            // this.activeName = this.$route.query.infoType;
            if(this.$route.query.userId == null){
                this.$router.push("/home/index");
            }
            // if(this.activeName == null){
            //     this.activeName = 'blogs';
            //     this.$router.push({
            //         path: '/user/blogs',
            //         query: {
            //             infoType: 'blogs',
            //             currentPage: 1,
            //             userId: this.$route.query.userId
            //         }
            //     })
            // }
        }
    }
</script>

<style scoped lang="less">
    #user-info-about{
        width: 800px;

    }

    #about-user-wrap{
        width: 800px;
    }
</style>