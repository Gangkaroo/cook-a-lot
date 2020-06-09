<template>
    <router-link :to="{ path: linkURL, params: { recipe } }">
        <div class="card recipe-card">
            <div class="card-image">
                <figure class="image is-3by1">
                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                </figure>
            </div>
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-5">{{recipe.title}}</p>
                    </div>
                </div>

                <div class="content">
                    <div class="description" v-html="recipe.description"></div>
                    <div class="content is-small">
                        <time datetime="2020-1-1">{{ recipe.created_at | datetime }}</time>
                    </div>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
    export default {
        name: "RecipeCard",
        props: {
            recipe: {
                type: Object,
                required: true
            }
        },
        data: function() {
            return {
                linkURL: '/recipe/' + this.recipe.id
            }
        }
    }
</script>

<style>
    .recipe-card {
        cursor: pointer;
        margin: 5px 10px 5px 0;
        width: 400px;
    }

    .recipe-card:hover {
        box-shadow: 5px 5px 15px 0 rgba(0,0,0,0.5);
        transition: box-shadow 0.3s;
    }
</style>
