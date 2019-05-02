<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
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
</template>

<script>
    export default {
        methods: {
            close: function () {
                $emit('close');
            }
        }
    }
</script>
