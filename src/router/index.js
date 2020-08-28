import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/index/Home'
import store from "../store/index"
import {request} from "../network/request"
import {MessageBox,Alert} from "element-ui"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect :'/home/index'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [
            {
                path: 'followeeBlogs',
                meta: { auth: true},
                // redirect: 'profile/blogs',
                component: () => import("../components/index/blog/FolloweeBlogs")

            },
            {
                path: 'index',
                meta: { auth: false},
                component: () => import('../components/index/blog/ViewBlogs')
            }
            // {
            //     path: 'index',
            //     component: () => import("../components/index/IndexController"),
            //     redirect: 'index/viewBlogs',
            //     children: [
            //         ,
            //
            //     ]
            // }
        ]
    },
    {
        path: '/publishBlog',
        meta: { auth: true},
        component: () => import('../components/index/blog/PublishBlog')
    },
    {
        path: '/repostBlog/:blogId',
        meta: { auth: true},
        component: () => import('../components/index/blog/RepostBlog')
    },
    {
        path: '/editBlog',
        meta: {auth: true},
        component: () => import("../components/index/blog/EditBlog")
    },

    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/login',
        meta: { auth: false},
        name: 'Login',
        component: () => import('../components/login/LoginController')
    },
    {
        path: '/register',
        meta: { auth: false},
        name: 'Register',
        component: () => import('../components/register/RegisterController')
    },
    {
        path: '/user',
        meta: { auth: false},
        name: 'User',
        component: () => import("../components/user/UserController"),
        // children: [
        //   {
        //     path: 'blogs',
        //     component: () => import("../components/user/ProfileBlogs")
        //   },
        //   {
        //     path: 'followee',
        //     component: () => import('../components/user/FolloweeList')
        //   },
        //   {
        //     path: 'follower',
        //     component: () => import('../components/user/FollowerList')
        //   }
        // ]
    },
    {
        path: '/profile',
        meta: {auth: true},
        component: () => import("../components/user/UserProfile")
    },
    {
        path: '/blogDetail',
        meta: { auth: false},
        component: () => import("../components/index/blog/BlogDetail")
    },
    {
        path: '/changePwd',
        meta: {auth: true},
        component: () => import("../components/user/ChangePassword")
    },
    {
        path: '/retrievePwd',
        meta: {auth: false},
        component: () => import("../components/user/RetrievePassword")
    },
    {
        path: '/searchResult',
        meta: {auth: false},
        component: () => import("../components/search/SearchResult")
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});
router.beforeEach( (to, from ,next) => {

    request({
        url: 'user/checkLogin'
    }).then( res => {

        if(res.statusCode === '000000'){
            if(!store.state.loginInfo.isLogin){//前后端不一致，同步
                // console.log(123);
                request({
                    url: 'user/getLoginInfo'
                }).then( r => {
                    if(r.statusCode === '000000'){
                        store.commit("doLogin",r.data)
                        window.pageYOffset = document.documentElement.scrollTop = 0;
                        next();
                    } else {
                        store.commit('doLogout');
                        this.$message.error(r.message)
                    }
                }).catch( err => {
                    this.$message.error('系统错误');
                    store.commit('doLogout');
                })
            } else {
                next();
            }
        } else {
            store.commit('doLogout');
            if(to.matched.some( m => m.meta.auth)){
                MessageBox.confirm("是否前往登录界面", "您尚未登录", {
                    callback: (action) => {
                        if (action === 'confirm') {
                            window.pageYOffset = document.documentElement.scrollTop = 0;
                            next({
                                path: '/login',
                                query:{
                                    nextPath:  to.fullPath
                                }
                            });
                        } else {
                            // next('/home');
                        }
                    }
                });
            } else {
                window.pageYOffset = document.documentElement.scrollTop = 0;
                next();
            }
        }

    }).catch( err =>{

        store.commit('doLogout');
        // Alert("系统错误");
        next();
    });
    // document.documentElement.scrollTop=document.body.scrollTop=0;
    // window.scrollTo(0,0);

});
export default router
