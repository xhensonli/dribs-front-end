<template>
    <div id="search-result">
        <search-user/>
        <el-divider/>
        <search-blog/>
    </div>
</template>

<script>
    import SearchUser from "./SearchUser"
    import SearchBlog from "./SearchBlog"
    export default {
        name: "SearchResult",
        components: {
            SearchUser,
            SearchBlog
        }
    }
</script>

<style scoped>

</style>