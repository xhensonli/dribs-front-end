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
        path: 'user',
        meta: { auth: true},
        // redirect: 'profile/blogs',
        component: () => import("../components/user/ProfileController")
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
        path: 'index',
        component: () => import("../components/index/IndexController"),
        redirect: 'index/viewBlogs',
        children: [
          {
            path: 'viewBlogs',
            meta: { auth: false},
            component: () => import('../components/index/blog/ViewBlogs')
          },
          {
            path: 'publishBlog',
            meta: { auth: true},
            component: () => import('../components/index/blog/PublishBlog')
          },
          {
            path: 'repostBlog/:blogId',
            meta: { auth: true},
            component: () => import('../components/index/blog/RepostBlog')
          },
          {
            path: 'editBlog',
            meta: {auth: true},
            component: () => import("../components/index/blog/EditBlog")
          }
        ]
      }
    ]
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
      path: '/blogDetail',
      meta: { auth: false},
      component: () => import("../components/index/blog/BlogDetail")
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
      store.commit("doLogin",res.data)
    } else {
      store.commit('doLogout');
    }
    if(to.matched.some( m => m.meta.auth)){
      if(!store.state.loginInfo.isLogin){
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
            }
          }
        });
      } else {
        window.pageYOffset = document.documentElement.scrollTop = 0;
        next();
      }
    } else {
      window.pageYOffset = document.documentElement.scrollTop = 0;
      next();
    }
  }).catch( ()=>{
    store.commit('doLogout');
    // Alert("系统错误");
    next();
  });
    // document.documentElement.scrollTop=document.body.scrollTop=0;
    // window.scrollTo(0,0);

});
export default router
