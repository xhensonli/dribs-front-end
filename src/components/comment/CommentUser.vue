<template>
    <div class="comment-user clearfix" >

        <!--<div class="comment-user-level"></div>-->
        <div class="comment-user-name" @click="goUserInfo">Lv. {{user.userLevel}} {{user.userName}}</div>
        <div class="comment-user-owner" v-if="$store.state.loginInfo.isLogin &&
                        user.userId === $store.state.loginInfo.user.userId">博主</div>
    </div>
</template>

<script>
    export default {
        name: "CommentUser",
        props: {
            user: {
                type: Object,
                default: {
                    'userId': 0,
                    'userAvatar': '',
                    'userName': '',
                    'userLevel': 1
                }
            }
        },
        methods: {
            goUserInfo(){
                this.$router.push({
                    path: '/user/blogs',
                    query: {
                        userId: this.user.userId,
                        type: 'blogs',
                        currentPage: 1
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .comment-user{
        height: 50px;
        /*background-color: #eee;*/
        float: left;
        div{
            float: left;
            margin-left: 10px;
            color: #555;
            &.comment-user-level,&.comment-user-name{
                line-height: 50px;
                cursor: pointer;
                &:hover{
                    color: #999;
                }
            }

            &.comment-user-owner{
                font-size: 12px;
                padding: 2px;
                border-radius: 2px;
                background-color: teal;
                display: inline-block;
                margin-top: 18px;
                color: white;
            }
        }
    }
</style>