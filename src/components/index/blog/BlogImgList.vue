<template>
    <div class="blog-img-list clearfix">
        <div class="blog-img-item" v-for="(item,index) in imgList" @click.stop="openImg(item)">
            <el-image :src="blogImgPath+item" fit="cover" >
                <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                </div>
            </el-image>
        </div>
        <div @click.stop="">
            <el-dialog
                    :visible.sync="showImg"
            >
                <img :src="blogImgPath+imgUrl" width="100%"/>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BlogImgList",
        props: ['imgList'],
        data(){
            return {
               showImg: false,
               imgUrl: ''
            }
        },
        methods: {
            openImg(url){
                this.imgUrl = url;
                this.showImg = true;
            }
        }
    }
</script>

<style scoped lang="less">

    .blog-img-list{
        width: 300px;
        /*height: 300px;*/
        .blog-img-item{
            width: 90px;
            height: 90px;
            padding: 5px;
            float: left;
            cursor: pointer;
            img{
                width: 95px;
                height: 95px;

            }
        }
    }

</style>