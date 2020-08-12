<template>
    <div id="view-blogs-controller">
        <el-header>
            <el-col :span="8" :push="2">
                <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="search">
                </el-input>
            </el-col>

            <el-col :span="4" :push="3" >
                <el-button icon="el-icon-plus" type="primary" plain @click="publishBlog">
                    写微博
                </el-button>
            </el-col>
        </el-header>
    </div>
</template>

<script>
    export default {
        name: "viewBlogs",
        data(){
            return {
                search: ''
            }
        },
        methods: {
            publishBlog(){
                // this.checkAndPushRouter("/home/index/publishBlog");
                this.$router.push("/home/index/publishBlog");
            }
        }
    }
</script>

<style scoped>

</style>