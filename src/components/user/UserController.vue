<template>
    <div id="user-controller">
        <UserInfo :user="user" :is-profile="$store.state.loginInfo.isLogin &&
        user.userId === $store.state.loginInfo.user.userId" v-if="user!=null"/>
        <AboutUser :user-id="user.userId" v-if="user!=null"></AboutUser>
    </div>
</template>

<script>
    import UserInfo from "./UserInfo";
    import AboutUser from "./AboutUser";
    import {request} from "../../network/request"
    export default {
        name: "UserController",
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
            // console.log(this.$store.state.loginInfo.isLogin);
            // if(!this.$store.state.loginInfo.isLogin){
            //     this.$alert("未登录");
            //     this.$router.push("/login");
            // }
            if(this.$route.query.userId == null){
                this.$router.push("/home/index");
                return;
            }
          request({
              url: '/user/getUserInfo',
              params: {
                  userId: this.$route.query.userId
              }
          }).then( res => {
              if(res!=null&&res.statusCode === '000000'){
                  this.user = res.data;
                  this.loaded = true;
              } else {
                  this.$alert(res.message||"系统错误");
              }
          }).catch( err => {
              this.$message.error("系统错误")
          })
        },
        data(){
            return{
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
                loaded : false
            }
        }
    }
</script>

<style scoped>
    #user-controller{
        margin: 0 300px;
    }
</style>