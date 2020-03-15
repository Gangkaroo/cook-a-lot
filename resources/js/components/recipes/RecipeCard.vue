<template>
    <div class="card recipe-card">
        <div class="card-image">
            <figure class="image is-3by1">
                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-5">Spaghetti Bolognese</p>
                </div>
            </div>

            <div class="content">
                <p>
                    Lecker schmecker!
                </p>
                <div class="content is-small">
                    <time datetime="2020-1-1">11:09 PM - 1 Jan 2020</time>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RecipeCard",
        data: function() {
            return {};
        }
    }
</script>

<style>
    .recipe-card {
        margin: 5px 10px 5px 0;
        width: 400px;
    }
</style>
