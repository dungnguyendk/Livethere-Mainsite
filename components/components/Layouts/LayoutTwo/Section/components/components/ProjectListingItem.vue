<template lang="html"> 
    <div class="card--project">
        <h2 class="card__title">
            <NuxtLink to="/">{{ title }} </NuxtLink>
        </h2>

        <div class="card__image">
            <NuxtLink to="/">
                <img :src="imgUrl" alt="">
            </NuxtLink>
        </div>
    </div>

</template>

<script>
    export default {
        name: "ProjectListingItem",

        props: {
            title: {
                type: String,
                default: 'Cape Royale is nestled within the prestigious Sentosa Cove'
            },

            imgUrl: {
                type: String,
                default: "~/static/img/projectlist-sections/block-5.png"
            }
        }
    }
</script>

<style lang="scss" scoped>
    .card--project {
        border: 1px solid #e5e5e5;
        border-radius: 2rem;
        margin-bottom: 1.5rem;
        display: grid;

        &:hover {
            opacity: 0.8;

        }

        &:hover a {
            color: var(--color-menu);
        }
    }

    .card__title {
        margin-bottom: 0;
        padding: 2.6rem 1.6rem;
        min-height: 10.8rem;

        a {
            font-weight: 800;
            font-size: 2rem;
            line-height: 2.8rem;
            text-align: center;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;  
            overflow: hidden;
        }
    }

    .card__image {
        img {
            width: 100%;
            height: 100%;
            border-bottom-left-radius: 2rem;
            border-bottom-right-radius: 2rem;
        }
    }
</style>