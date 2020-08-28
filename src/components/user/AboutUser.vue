<template>
    <div id="about-user-wrap">
        <el-tabs v-model="activeName" @tab-click="handleClick" id="user-info-about">
            <el-tab-pane label="微博" name="blogs" class="pane" @click="showBlogs">
                <!--<BlogListWithTime :blog-list="blogList"/>-->
                <!--<profile-blogs :user-id="userId"/>-->
            </el-tab-pane>
            <el-tab-pane label="关注" name="followee" class="pane" @click="showFollowee">
                <!--<followee-list :user-id="userId"/>-->
            </el-tab-pane>

            <el-tab-pane label="粉丝" name="follower" class="pane" @click="showFollower">
                <!--<follower-list :user-id="userId"/>-->
            </el-tab-pane>
        </el-tabs>
            <comment :is="currentComponent" :user-id="userId"/>

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
    import Comment from "../comment/Comment";
    export default {
        name: "AboutUser",
        data(){
            return {
                activeName: 'blogs',
                blogList: [],
                currentComponent: ProfileBlogs
            }
        },
        components: {
            Comment,
            BlogListWithTime,
            ProfileBlogs,
            FolloweeList,
            FollowerList
        },
        methods: {
            handleClick(data){
                if(data.name === 'blogs'){
                   this.showBlogs();
               } else if(data.name === 'followee'){
                   this.showFollowee();
               } else if(data.name === 'follower'){
                   this.showFollower()
               }
                this.activeName = data.name
            },
            showBlogs(){
                console.log(1);
                this.currentComponent = ProfileBlogs;
            },
            showFollowee(){
                console.log(2);
                this.currentComponent = FolloweeList;
            },
            showFollower(){
                console.log(3);
                this.currentComponent = FollowerList;
            }
        },
        watch: {
           // '$route.query.infoType'(type){
           //     console.log(type);
           //     this.activeName = type;
           // }
            userId(){
                this.activeName = 'blogs';
                this.currentComponent = ProfileBlogs;
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