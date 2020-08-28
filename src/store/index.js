import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loginInfo: {
            isLogin: false,
            user: null
        }
    },
    mutations: {
        doLogin(state,info){
            state.loginInfo.isLogin = true;
            state.loginInfo.user = info;
        },
        doLogout(state){
            state.loginInfo.isLogin = false;
            state.loginInfo.user = null;
        },
        updateExp(state,info){
            state.loginInfo.user.userLevel = info.level;
            state.loginInfo.user.userInfo.userExp = info.exp;
        },
        changeUserDesc(state,desc){
            state.loginInfo.user.userInfo.userDesc = desc;
        },
        changeUserGender(state,g){
            state.loginInfo.user.userInfo.male = g;
        },
        changeUserAvatar(state,avatar){
            state.loginInfo.user.userAvatar = avatar;
        },
        updateBlogCount(state,num){
            state.loginInfo.user.userInfo.blogCount += num;
        },
        updateFollowCount(state,num){
            state.loginInfo.user.userInfo.followCount += num;
        },
        updateFollowerCount(state,num){
            state.loginInfo.user.userInfo.followerCount += num;
        }
    },
    actions: {
    },
    modules: {
    }
})
