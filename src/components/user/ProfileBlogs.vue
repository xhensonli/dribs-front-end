<template>
    <div id="profile-blogs" v-if="totalCount>0">
        <BlogListWithTime :blog-list="blogList" :is-profile="$store.state.loginInfo.isLogin&&userId===$store.state.loginInfo.user.userId" v-loading="loadingBlogs"/>
        <div class="page-bar" >
            <el-pagination

                    layout="prev, pager, next"
                    @current-change="changePage"
                    :current-page.sync="currentPage"
                    :total="totalCount">
            </el-pagination>
        </div>

    </div>
    <div v-else id="none-blog-display">
        <p>尚未发布任何动态</p>
    </div>

</template>

<script>
    import BlogListWithTime from '../index/blog/BlogListWithTime'
    import {request} from "../../network/request"
    export default {
        name: "ProfileBlogs",
        components: {
            BlogListWithTime
        },
        data(){
            return {
                blogList: [],
                currentPage: 1,
                totalCount: 0,
                // userId: 0,
                loadingBlogs: false
            }
        },
        props: ['userId'],
        watch: {
          userId(v){
              this.loadBLogs();
          }
        },
        methods: {
          changePage(data){
              this.loadBLogs();
              window.pageYOffset = document.documentElement.scrollTop = 0;
          },
            loadBLogs(){
              this.loadingBlogs = true;
                console.log("id"+this.userId);
                request({
                    url: 'blog/getBlogListByUser',
                    method: 'POST',
                    data: {
                        userId: this.userId,
                        currentPage: this.currentPage
                    }
                }).then( res => {
                    if(res.statusCode === '000000'){
                        this.blogList = res.data.list;
                        this.currentPage = res.data.pageNum;
                        this.totalCount = res.data.total;
                    } else {
                        this.$message.error(res.message);
                    }
                    this.loadingBlogs = false;
                }).catch( err => {
                    this.$message.error("系统错误");
                    this.loadingBlogs = false;
                })
            }
        },
        created() {
            this.loadBLogs();
        }
    }
</script>

<style scoped lang="less">

    .page-bar{
        padding: 50px 0 50px 300px;

    }

    #profile-blogs{
        width: 800px;
    }

    #none-blog-display{
        padding: 50px 0 0 300px;
        color: #ddd;
        font-size: 25px;
        text-shadow: 1px 1px 5px #ccc;
    }
</style>