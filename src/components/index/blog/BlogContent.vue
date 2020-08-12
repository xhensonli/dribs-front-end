<template>
<span class="blog-content-with-topic" >
    <span v-for="(item) in processContent(content)"  @click.stop="">
        <span v-if="item.isTopic === false">
            {{item.str}}
        </span>
        <topic-string :topic-name="item.str" v-else></topic-string>
    </span>
</span>
</template>

<script>
    import TopicString from "./TopicString"
    export default {
        name: "BlogContent",
        props: {
            content: {
                type: String,
                default: ''
            }
        },
        components: {
            TopicString
        },
        methods: {
            processContent(content){
                let left = 0,right = 0;
                let list = [];
                while(right<content.length){
                    let obj = /#([^#])+#/.exec(content.substr(left));
                    if(obj == null)
                        break;
                    right = obj.index;
                    let substr = content.substr(left,right);
                    // console.log(substr);
                    if(substr.length>0)
                        list.push({
                            str: substr,
                            isTopic: false
                        });
                    list.push({
                        str: obj[0],
                        isTopic: true
                    });
                    left = left+obj[0].length+substr.length;
                }
                right = content.length;
                let substr = content.substr(left,right);
                if(substr.length>0)
                    list.push({
                        str: substr,
                        isTopic: false
                    });
                return list;
            }
        }
    }
</script>

<style scoped>
.blog-content-with-topic{
    cursor: text;
    /*padding: 10px;*/
    white-space: pre;
    line-height: 25px   ;
    /*background-color: #fff;*/
}
</style>