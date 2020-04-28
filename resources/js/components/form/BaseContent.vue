<template>
    <div class="form-content">
        <h5 v-if="hasTitle" class="subtitle is-5">{{title}}</h5>
        <div v-if="hasContent" class="content">{{content}}</div>
    </div>
</template>
<script>
    export default {
        name: "BaseContent",
        props: {
            title: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: ''
            }
        },

        computed: {
            hasContent: function() {
                return this.content.length;
            },
            hasTitle: function() {
                return this.title.length;
            }
        }
    }
</script>
