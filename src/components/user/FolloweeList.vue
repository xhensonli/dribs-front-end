<template>
    <div id="followee-list">
        <div v-if="followeeList.length>0">
            <div v-for="(item,index) in followeeList" >
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
        <div v-else id="none-followee">
            <p>未关注其他用户</p>
        </div>
    </div>
</template>

<script>
    import {request} from "../../network/request"
    import UserListItem from "./UserListItem"
    export default {
        name: "FolloweeList",
        data(){
            return {
                followeeList: [],
                loading: false,
                currentPage: 1,
                totalCount: 0,
                userId: 0
            }
        },
        components: {
            UserListItem
        },
        methods: {
            loadFollowees(){
                this.loading = true;
                request({
                    url: '/user/getFolloweeList',
                    params: {
                        currentPage: this.currentPage,
                        userId: this.userId
                    }
                }).then( res => {
                    this.followeeList = res.data.list;
                    this.currentPage = res.data.pageNum;
                    this.totalCount = res.data.total;
                })
            },
            changePage(data){
                this.$router.push({
                    url: '/home/profile/followee',
                    query: {
                        infoType: 'followee',
                        currentPage: this.currentPage,
                        userId: this.userId
                    }
                });
                // this.currentPage = data;
                this.loadFollowees();
            }
        },
        created() {
            if(this.$route.query.userId == null){
                this.$router.push('/home/index');
                return;
            }
            this.userId = this.$route.query.userId;
            this.loadFollowees();
        }
    }
</script>

<style scoped>

    #none-followee{
        padding: 50px 0 0 300px;
        color: #ddd;
        font-size: 25px;
        text-shadow: 1px 1px 5px #ccc;
    }
    .page-bar{
        padding: 50px 0 50px 300px;

    }
</style>