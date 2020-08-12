<template>
    <div id="follower-list">
        <div v-if="followerList.length>0">
            <div v-for="(item,index) in followerList" >
                <UserListItem :user="item" :is-profile="false"></UserListItem>
            </div>
            <div class="page-bar">
                <el-pagination

                        layout="prev, pager, next"
                        @current-change="changePage"
                        :current-page.sync="currentPage"
                        :total="totalCount">
                </el-pagination>
            </div>

        </div>
        <div v-else id="none-follower">
            <p>还没有粉丝</p>
        </div>
    </div>
</template>

<script>
    import {request} from "../../network/request"
    import UserListItem from "./UserListItem"
    export default {
        name: "FollowerList",
        data(){
            return {
                followerList: [],
                loading: false,
                currentPage: 1,
                totalCount: 0
            }
        },
        components: {
            UserListItem
        },
        methods: {
            loadFollowers(){
                this.loading = true;
                request({
                    url: '/user/getFollowerList',
                    params: {
                        currentPage: this.currentPage
                    }
                }).then( res => {
                    this.followerList = res.data.list;
                    this.currentPage = res.data.pageNum;
                    this.totalCount = res.data.total;
                })
            },
            changePage(data){
                this.$router.push({
                    url: '/home/profile/follower',
                    query: {
                        infoType: 'follower',
                        currentPage: this.currentPage
                    }
                });
                // this.currentPage = data;
                this.loadFollowers();
            }
        },
        created() {
            this.loadFollowers();
        }
    }
</script>

<style scoped>
    #none-follower{
        padding: 50px 0 0 300px;
        color: #ddd;
        font-size: 25px;
        text-shadow: 1px 1px 5px #ccc;
    }
    .page-bar{
        padding: 50px 0 50px 300px;

    }
</style>