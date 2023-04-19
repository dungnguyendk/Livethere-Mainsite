<template>
    <div class="blocks--list">
        <div class="block__item" v-if="(index + 1) <= productOnShow" v-for="(item, index) in source" :key="item.id">
            <div class="block__image">
                <nuxt-link to="/"> <img :src="item.image" :alt="source.image" /></nuxt-link>
            </div>
            <div class="block__content">
                <h4 class="content__header">
                    <a :href="item.link">
                        {{ item.name }}
                    </a>
                </h4>
                <p class="content__des line-clamp">
                    {{ item.description }}
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ListingSectionBlockItem",
    props: {
        source: {
            type: Array,
            default: () => []
        },
        productOnShow: {
            type: Number,
            default: 2,
        }
    }
}
</script>
<style lang="scss">
.blocks--list {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-column-gap: 1.6rem;

    @media screen and (max-width: 1024px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
.block__item {
    border: 1px solid var(--color-boder);
    border-radius: 20px;
    margin-bottom: 4rem;
}
.block__image {
    margin-bottom: 0.8rem;

    &:hover {
        opacity: 0.8;
    }

    img {
        width: 100%;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
    }
}
.block__content {
    padding: 0 2rem;
    @media screen and (max-width: 375px) {
        padding: 0 1rem;
    }
    .content__header {
        margin-bottom: 1.2rem;
        a {
            font-weight: 700;
            font-size: 1.6rem;
            line-height: 2.4rem;
            color: var(--color-text-black);

            &:hover {
                color: var(--color-menu);
            }

            &.line-clamp {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }
    }

    p {
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: var(--color-gray);
        margin-bottom: 0;

        &.line-clamp {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    }
}
</style>
