<template lang="html">
    <div class="block--posts">
        <h2 class="block__title">More Topics</h2>
        <div class="block__list">
            <PostItem
                v-for="item in source"
                :key="item.id"
                :image="itemThumbnails(item)"
                :name="itemName(item)"
                :date="dateUpdated(item)"
                :slug="itemSlug(item)"
            />
        </div>

        <button class="block--action">Read more</button>
    </div>
</template>

<script>
import PostItem from "./components/PostItem.vue"

export default {
    name: "SectionPosts",
    components: {
        PostItem
    },
    props: {
        source: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        dateUpdated() {
            return (item) => {
                return this.$dayjs(item.lastModifiedDate).format("DD-MMM-YYYY")
            }
        },
        itemThumbnails() {
            return (item) => {
                return item.thumbnailImageUrl
                    ? item.thumbnailImageUrl
                    : "https://fakeimg.pl/135x93/?text=No%20Image"
            }
        },
        itemName() {
            return (item) => {
                return item.defaultName ? item.defaultName : ""
            }
        },
        itemSlug() {
            return (item) => {
                return item.slug ? item.slug : "/"
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.block--posts {
    position: relative;
}

.block__title {
    color: var(--color-menu);
    font-weight: 700;
    line-height: 2.8rem;
    font-size: 2rem;
    margin-bottom: 1rem;

    @media screen and (max-width: 1279px) {
        margin-bottom: 1rem;
    }
}

.block__list {
    @media screen and (max-width: 1279px) {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        grid-column-gap: 2rem;
        margin-bottom: 1.5rem;
    }

    @media screen and (max-width: 767px) {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
    }
}

.block--action {
    font-size: 1.6rem;
    line-height: 2.4rem;
    font-weight: 700;
    color: var(--color-menu);
    position: absolute;
    top: 0;
    right: 0;
    padding-right: 1rem;

    @media screen and (max-width: 1279px) {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }

    &::before {
        content: "";
        border: 4px solid var(--color-menu);
        border-bottom: 4px solid transparent;
        border-left: 4px solid transparent;
        transform: translateY(-50%) rotate(45deg);
        position: absolute;
        top: 50%;
        right: 0;
    }
}
</style>
