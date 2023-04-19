<template>
    <div class="posts--item">
        <div class="posts__image">
            <NuxtLink to="/">
                <img :src="image" alt="" />
            </NuxtLink>
        </div>

        <div class="posts__info">
            <h3 class="posts__info__title">
                <NuxtLink :to="slug">{{ name }}</NuxtLink>
            </h3>

            <span class="posts__info__date">{{ date }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "PostItem",
    props: {
        source: {
            type: Object,
            default: () => {}
        },
        image: {
            type: String,
            default: () => ""
        },
        name: {
            type: String,
            default: () => ""
        },
        date: {
            type: String,
            default: () => ""
        },
        slug: {
            type: String,
            default: () => ""
        }
    }
}
</script>

<style lang="scss" scoped>
.posts--item {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 2.4rem;
}

.posts__image {
    width: 30%;

    img {
        width: 100%;

        border-radius: 10px;
    }

    &:hover {
        opacity: 0.8;
    }
}

.posts__info {
    width: calc(70% - 0.8rem);
    padding-top: 0.8rem;
    &__title {
        a {
            font-size: 1.6rem;
            font-weight: 700;
            line-height: 2.2rem;
            color: #0b0c0c;
            margin-bottom: 0;
            white-space: break-spaces;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;

            &:hover {
                color: var(--color-menu);
            }
        }
    }

    &__date {
        color: #828586;
        font-size: 1.6rem;
        line-height: 2.4rem;
    }
}
</style>
