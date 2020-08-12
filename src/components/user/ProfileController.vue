<template>
    <div id="profile-controller">
        <UserInfo :user="user"/>
        <AboutUser :user-id="user.userId" v-if="loaded"></AboutUser>
    </div>
</template>

<script>
    import UserInfo from "./UserInfo";
    import AboutUser from "./AboutUser";
    import {request} from "../../network/request"
    export default {
        name: "ProfileController",
        components: {
            UserInfo,
            AboutUser
        },
        props: {
            isProfile: {
                type: Boolean,
                default: false
            }
        },
        created(){
            if(!this.$store.state.loginInfo.isLogin){
                this.$alert("未登录");
                this.$router.push("/login");
            }
            request({
                url: '/user/getProfile',
            }).then( res => {
                if(res!=null&&res.statusCode === '000000'){
                    this.user = res.data;
                    this.loaded = true;
                } else {
                    this.$alert(res.message||"系统错误");
                }
            })
        },
        data() {
            return {
                user: {
                    userName: '',
                    userAvatar: 'default.jpg',
                    userLevel: 1,
                    userInfo: {
                        male: true,
                        userDesc: null,
                        followerCount: 0,
                        followCount: 0,
                        blogCount: 0
                    }
                },
                loaded: false
            }
        }

    }
</script>

<style scoped>

</style>