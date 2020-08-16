<template>
    <div id="home">
        <el-row >
            <el-col :span="4">

            </el-col>
            <el-col :span="16">
                <router-view/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data(){
          return {

          }
        },
        methods: {


        }
    }
</script>

<style scoped lang="less">
    #header-user-username{
        font-size: 16px;
        margin-left: 10px;
    }


    #header-wrap{
        height: 70px;
    }

</style>