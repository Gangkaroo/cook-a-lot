<template>
    <div>
        <a class="button is-light" @click="showModal()">
            {{$t('log_in')}}
        </a>

        <modal>
            <p>Here is the modal content</p>
        </modal>
    </div>
</template>

<script>
    export default {
        name: "Login.vue",
        data: function() {
            return {
                loggedIn: false,
                modalIsActive: false
            }
        },
        methods: {
            setLanguage: function(locale) {
                if (locale !== "de" && locale !== "en") {
                    console.error("This locale is not supported");
                    return;
                }

                this.isDE = locale === "de";
                this.isEN = locale === "en";
                this.$i18n.locale = locale;
            }

        }
    }
</script>