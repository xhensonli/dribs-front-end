<template>
    <div id="search-user" class="clearfix">
        <!--<p id="search-user-title">用户</p>-->
        <div v-if="userList.length>0">
            <div class="clearfix">
                <search-user-item v-for="(item,index) in userList" :user="item"/>
            </div>
            <div id="search-user-page">
                <el-pagination
                        layout="prev, pager, next"
                        @current-change="changePage"
                        :current-page.sync="currentPage"
                        hide-on-single-page
                        :total="total" />
            </div>
        </div>
        <div v-else>
            <p id="no-search-user">
                没有符合条件的用户
            </p>
        </div>
    </div>
</template>

<script>
    import {request} from "../../network/request";
    import SearchUserItem from "./SearchUserItem"
    export default {
        name: "SearchUser",
        data(){
            return {
                userList: [],
                total: 0,
                currentPage: 1
            }
        },
        components: {
            SearchUserItem
        },
        methods: {
            searchUser(){
                request({
                    url: 'user/searchUser',
                    params: {
                        keyWord: this.$route.query.searchKey,
                        currentPage: this.currentPage
                    }
                }).then( res => {
                    if(res.statusCode === '000000'){
                        this.userList = res.data.list;
                        this.total = res.data.total;
                    } else {
                        this.$message.error(res.message);
                    }
                }).catch( err => {
                    this.$message.error('系统错误');
                })
            },
            changePage(){
                this.searchUser();
            }
        },
        created() {
            this.searchUser();
        },
        watch: {
            "$route.query.searchKey"(){
                this.searchUser();
            },
            "$route.query.i"(){
                this.searchUser();
            }
        }
    }
</script>

<style scoped lang="less">

    #search-user{
        border-radius: 5px;
        /*background-color: #f7f7f7;*/
        padding: 25px 0;
        width: 1080px;
        margin: 0 auto;

        #search-user-page{
            width: 200px;
            margin: 10px auto;
        }

        #no-search-user{
            color: #aaa;
            font-size: 36px;
            text-align: center;
            font-weight: bold;
        }
    }

</style>