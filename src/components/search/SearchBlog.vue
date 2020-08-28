<template>
    <div id="search-blog" class="clearfix">
        <div v-if="blogList.length>0">
            <div class="clearfix">
                <search-blog-item v-for="(item,index) in blogList" :blog="item"/>
            </div>
            <div id="search-blog-page">
                <el-pagination
                        layout="prev, pager, next"
                        @current-change="changePage"
                        :current-page.sync="currentPage"
                        hide-on-single-page
                        :total="total" />
            </div>
        </div>
        <div v-else>
            <p id="no-search-blog">
                没有符合条件的微博
            </p>
        </div>
    </div>
</template>

<script>
    import {request} from "../../network/request";
    import SearchBlogItem from "./SearchBlogItem"
    export default {
        name: "SearchBlog",
        data(){
            return {
                currentPage: 1,
                total: 0,
                blogList: []
            }
        },
        components: {
            SearchBlogItem
        },
        methods: {
            searchBlog(){
                request({
                    url: 'blog/searchBlog',
                    params: {
                        keyWord: this.$route.query.searchKey,
                        currentPage: this.currentPage
                    }
                }).then( res => {
                    if(res.statusCode === '000000'){
                        this.blogList = res.data.list;
                        this.total = res.data.total;
                    } else {
                        this.$message.error(res.message);
                    }
                }).catch( err => {
                    this.$message.error('系统错误');
                })
            },
            changePage(){
                this.searchBlog();
            }
        },
        created() {
            this.searchBlog();
        },
        watch: {
            "$route.query.searchKey"(){
                this.searchBlog();
            },
            "$route.query.i"(){
                this.searchBlog();
            }
        }
    }
</script>

<style scoped lang="less">
    #search-blog{
        border-radius: 5px;
        /*background-color: #f7f7f7;*/
        padding: 25px 0;
        width: 1080px;
        margin: 0 auto;

        #search-blog-page{
            width: 200px;
            margin: 10px auto;
        }

        #no-search-blog{
            color: #aaa;
            font-size: 36px;
            text-align: center;
            font-weight: bold;
        }
    }
</style>