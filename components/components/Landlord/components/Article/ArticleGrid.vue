<template>
    <div class="card--article">
        <div class="card__header">
            <h3 class="card__title"
                ><a href="">{{ article.title }}</a></h3
            >
        </div>
        <div class="card__body">
            <div class="card__image">
                <img :src="article.urlImage" alt="" />
            </div>
            <div class="card__content">
                <p>{{ article.content }}</p>
                <a class="card__button">Read More</a>
            </div>
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
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .card__header {
        padding: 1.2rem 1.6rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        min-height: 8rem;
        .card__title {
            margin-bottom: 0;
            a {
                font-weight: 800;
                font-size: 2rem;
                line-height: 2.8rem;
                text-align: center;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                &:hover {
                    color: var(--color-primary);
                }
            }
        }
    }
    .card__body {
        width: 100%;
        .card__image {
            width: 100%;
            position: relative;
            padding-bottom: 53.4%;

            img {
                position: absolute;
                z-index: 10;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                max-width: 100%;
                object-fit: cover;
            }
        }
        .card__content {
            padding: 1.4rem 1.6rem 2.2rem;
            p {
                font-weight: 400;
                font-size: 1.8rem;
                line-height: 2.4rem;
                margin-bottom: 0;
                color: var(--color-black);
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                margin-bottom: 2.2rem;
                min-height: 4.8rem;
            }
            .card__button {
                text-decoration: underline;
                font-weight: 700;
                font-size: 1.6rem;
                color: var(--color-primary);
                transition: all 0.25s ease-in;
                &:hover {
                    color: #d97706;
                }
            }
        }
    }
}
@media screen and (max-width: 767px) {
    .card--article {
        .card__header {
            .card__title {
                a {
                    font-weight: 800;
                    font-size: 2rem;
                    line-height: 2.8rem;
                    text-align: center;
                    text-overflow: clip;

                }
            }
        }

    }
}
</style>