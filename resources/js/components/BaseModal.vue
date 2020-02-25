<template>
    <transition name="fade">
        <div :id="name" v-if="isActive" class="modal is-active">
            <div class="modal-background" @click="close()"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">
                        <slot name="header"></slot>
                    </p>
                    <button class="delete" @click="close()"></button>
                </header>
                <section class="modal-card-body">
                    <slot></slot>
                </section>

                <footer class="modal-card-foot">
                    <slot name="footer">
                        <a class="button is-primary" @click="close()">OK</a>
                    </slot>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'Modal',
        props: {
            "name": {
                type: String,
                required: true
            },
            "isActive": {
                type: Boolean,
                required: true
            }
        },
        methods: {
            close: function() {
                this.$emit('close');
            }
        }
    }
</script>

<style>
    .modal:target {
        visibility: visible;
    }
</style>
