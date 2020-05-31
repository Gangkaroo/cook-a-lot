<template>
    <section>
        <b-rate custom-text="$t('rating')"></b-rate>
    </section>
</template>
<script>
    export default {
        name: "BaseRating",
        methods: {
            success() {
                this.$buefy.toast.open({
                    message: 'Thanks for rating!',
                    type: 'is-success'
                })
            }
        }
    }
</script>
