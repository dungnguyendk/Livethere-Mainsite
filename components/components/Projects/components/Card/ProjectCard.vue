<template>
    <div class="card--project">
        <div class="card__header">
            <div class="card__header-logo">
                <img :src="require(`~/static/img/logos/logo-project.svg`)" alt="" />
                <span>premium</span>
            </div>
            <nuxt-link to="/" class="card__header-title">{{ project.title }}</nuxt-link>
            <div>&nbsp;</div>
        </div>
        <div class="card__image">
            <img :src="project.imgURL" alt="" />
        </div>
        <div class="card__content">
            <div class="card__content-fee">
                <h3 class="card__content-price">S$ {{ project.price }}/month</h3>
                <div class="card__content-emotions">
                    <img :src="require(`~/static/img/icon-export.svg`)" alt="">
                    <i class="ri-heart-3-line"></i>
                </div>
            </div>
            <div class="card__content-infor">
                <div class="card__content-location card__content-style ">
                    <img :src="require(`~/static/img/icon-location.svg`)" alt="" />
                    <span>{{ project.location }}</span>
                </div>
                <div class="card__content-bed-bath  ">
                    <div class="card__content-bed card__content-style">
                        <img :src="require(`~/static/img/icon-bedroom.svg`)" alt="" />
                        <span>{{ project.totalBed }}</span>
                    </div>
                    <div class="card__content-bath card__content-style ">
                        <img :src="require(`~/static/img/icon-bathroom.svg`)" alt="" />
                        <span>{{ project.totalBath }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProjectCard",
    props: {
        project: {
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style lang="scss" scoped>
.card--project {
    background-color: var(--color-white);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06);
    border-radius: 2rem;
}
.card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2.9rem 0.8rem;
    .card__header-logo {
        display: flex;
        justify-content: center;
        flex-direction: column;
        img {
            width: fit-content;
            margin: 0 auto 0.2rem;
        }
        span {
            font-weight: 800;
            font-size: 1rem;
            line-height: 1.4rem;
            color: var(--color-primary);
            text-transform: uppercase;
        }
    }
    .card__header-title {
        color: var(--color-title-black);
        font-weight: 800;
        font-size: 2rem;
        text-align: center;
        line-height: 2.8rem;
        margin-bottom: 0;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        overflow: hidden;
        -webkit-box-orient: vertical;
        &:hover {
            color: var(--color-primary);
        }
    }
}
.card__image {
    img {
        width: 100%;
        object-fit: cover;
    }
}
.card__content {
    padding: 2.2rem 1.6rem;
    .card__content-fee {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2rem;
        .card__content-price {
            font-weight: 800;
            font-size: 2.2rem;
            line-height: 2.6rem;
            color: #edb842;
            margin-bottom: 0;
        }
        .card__content-emotions{
            display: flex;
            align-items: center;
            img{
                margin-right: 1.6rem;
                cursor: pointer;
            }
            i{
                font-size: 2.4rem;
                color: var(--color-label);
                cursor: pointer;

            }
        }
    }
}
.card__content-infor {
    .card__content-location{
        margin-bottom: 1.4rem;
        span{
            text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        overflow: hidden;
        -webkit-box-orient: vertical;
        }
    }
    .card__content-bed-bath {
        display: flex;
        align-items: center;

    .card__content-bed{
        margin-right: 4.6rem;
    }
    }
}
.card__content-style {
    display: flex;
    align-items: center;

    img {
        filter: brightness(0) saturate(100%) invert(87%) sepia(13%) saturate(2665%)
            hue-rotate(332deg) brightness(103%) contrast(86%);
    }
    span {
        font-weight: 500;
        font-size: 1.8rem;
        line-height: 2.4rem;
        color: var(--color-title-black);
        padding-left: 1.25rem;
    }
}
</style>