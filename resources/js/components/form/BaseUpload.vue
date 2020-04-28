<template>
    <div class="upload-container">
        <b-field>
            <b-upload
                v-model="files"
                multiple
                drag-drop>
                <section class="section">
                    <div class="content has-text-centered">
                        <p>
                            <b-icon icon="upload" size="is-large"></b-icon>
                        </p>
                        <p>
                            {{$t('upload')}}
                        </p>
                    </div>
                </section>
            </b-upload>
        </b-field>

        <div class="tags">
            <span v-for="(file, index) in dropFiles"
                  :key="index"
                  class="tag is-primary" >
                {{file.name}}
                <button class="delete is-small"
                        type="button"
                        @click="deleteFile(index)">
                </button>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BaseUpload",
        data() {
            return {
                files: []
            }
        },
        methods: {
            deleteFile(index) {
                this.files.splice(index, 1);
            }
        }
    }
</script>
