<template>
    <div class="card--article">
        <div class="card__header">
            <h3 class="card__title">{{ article.title }}</h3>
        </div>
        <div class="card__body">
            <img :src="article.urlImage" alt="" class="card__image" />
            <p class="card__content">{{article.content}}</p>
            <v-btn class="btn btn--ghost btn--green card__button">Read More</v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: "ArticleGrid",
    props: {
        article: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {}
    }
}
</script>

<style lang="scss" scoped>
.card--article {
    box-sizing: border-box;
    background-color: var(--color-white);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06);
    width: 37.4rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .card__header {
        padding: 1.2rem 1.6rem;
        .card__title {
            font-weight: 800;
            font-size: 2rem;
            line-height: 2.8rem;
            margin-bottom: 0;
        }
    }
    .card__body {
        .card__image {
            width: 37.4rem;
            height: 20rem;
            object-fit: cover;
        }
        .card__content {
            padding: 1.4rem 1.6rem 2.2rem;
            font-weight: 400;
            font-size: 1.8rem;
            line-height: 2.4rem;
            margin-bottom: 0;
        }
        .card__button{
            text-decoration: underline;
            margin: 0 1.6rem 2.5rem;
        }
    }
    .card__footer {
    }
}
</style>