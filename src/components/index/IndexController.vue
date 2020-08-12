<template>
    <router-view/>
</template>

<script>
    import ViewBlogs from "./blog/ViewBlogs"
    import PublishBlog from "./blog/ViewBlogs"
    export default {
        name: "IndexController",
        components: {
            ViewBlogs,
            PublishBlog
        }

    }
</script>

<style scoped>

</style>