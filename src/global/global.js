
import {request} from "../network/request"
export default {
    install(Vue, options) {
        Vue.prototype.resourcePath = 'http://lhxserver.top/resources/dribs/avatars/';
        Vue.prototype.blogImgPath = 'http://lhxserver.top/resources/dribs/blog_imgs/';
        Vue.prototype.publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCmNx5eKyDWMDnxPLUTYmRWks5ieYeAoHu7UhZKUk0V1TguPH0S3z3qpz8CSqa/A5WhIGeos5CLMhs/bdkc5ZTWFojJWwcAOXo8h7PD96+LnvDcK2SxjQSz6GklOnWVwgaDseT6m7PMGHXXEWOdqLCd9LcEHXNuefjzB9YuhrrI3QIDAQAB';
        Vue.prototype.loginAndAction = function (callback) {
            if (!this.$store.state.loginInfo.isLogin) {
                this.$confirm("是否前往登录界面", "您尚未登录", {
                    callback: (action) => {
                        if (action === 'confirm') {
                            this.$router.push("/login");
                        }
                    }
                });
            } else {
                callback();
            }
        };
        Vue.prototype.checkLogin = function (callback) {
            request({
                url: 'user/checkLogin'
            }).then(res => {
                if (res.statusCode) {
                    this.$store.commit("doLogin", res.data)
                    callback();
                } else {
                    this.$store.commit('doLogout');
                }
            }).catch(() => {
                this.$store.commit('doLogout');
            });
        };

        Vue.prototype.pushRouter = function (dest) {
            request({
                url: 'user/checkLogin'
            }).then(res => {
                if (res.statusCode) {
                    this.$store.commit("doLogin", res.data)
                    this.$router.push(dest);
                } else {
                    this.$store.commit('doLogout');
                }
            }).catch(() => {
                this.$store.commit('doLogout');
            });
        };

        Vue.prototype.checkAndPushRouter = function (dest,query) {

            request({
                url: 'user/checkLogin'
            }).then(res => {
                if (res.statusCode === '000000') {
                    this.$store.commit("doLogin", res.data);
                } else {
                    this.$store.commit('doLogout');
                }
                if (!this.$store.state.loginInfo.isLogin) {
                    this.$confirm("是否前往登录界面", "您尚未登录", {
                        callback: (action) => {
                            if (action === 'confirm') {
                                this.$router.push({
                                    path: '/login',
                                    query: {
                                        nextPath: dest,
                                        pathQuery: query
                                    }
                                });
                            }
                        }
                    });
                } else {
                    this.$router.push({
                        path: dest,
                        query
                    });
                }
            }).catch(() => {
                this.$store.commit('doLogout');
                this.$message.error("系统错误");
            });
        };

        Vue.prototype.checkAndAction = function (callback, path, pathQuery) {
            request({
                url: 'user/checkLogin'
            }).then(res => {
                if (res.statusCode === '000000') {
                    this.$store.commit("doLogin", res.data);
                } else {
                    this.$store.commit('doLogout');
                }
                if (!this.$store.state.loginInfo.isLogin) {
                    this.$confirm("是否前往登录界面", "您尚未登录", {
                        callback: (action) => {
                            if (action === 'confirm') {
                                if (path == null)
                                    this.$router.push("/login");
                                else
                                    this.$router.push({
                                        path: '/login',
                                        query: {
                                            nextPath: path,
                                            pathQuery
                                        }
                                    });
                            }
                        }
                    });
                } else {
                    callback();
                }
            }).catch(() => {
                this.$store.commit('doLogout');
                this.$message.error("系统错误");
            });
        }

        Vue.prototype.getStandardTime = function (timestamp) {
            let date = new Date(timestamp);
            let YY = date.getFullYear() + '年';
            let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
            let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + "日";
            let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
            // let ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return YY + MM + DD + " " + hh + mm;
        }
    }


}