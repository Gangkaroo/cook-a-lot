<template>
    <div class="navbar-dropdown is-right" id="language-select">
        <a class="navbar-item" @click="setLanguage('de')" v-bind:class="{ 'is-hidden': isDE }">
            <label>
                <span class="fi fi-de"></span>
                deutsch
            </label>
        </a>
        <a class="navbar-item" @click="setLanguage('en')" v-bind:class="{ 'is-hidden': isEN }">
            <label>
                <span class="fi fi-us"></span>
                english
            </label>
        </a>
    </div>
</template>

<script>
    export default {
        name: "Language.vue",
        data: function() {
            return {
                isDE: true,
                isEN: false
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

<style scoped>

</style>
