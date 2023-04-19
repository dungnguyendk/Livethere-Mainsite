<template lang="html">
    <div class="section--project-listing">
        <ProjectListingItem
            v-for="item in source"
            :key="item.id"
            :title="item.title"
            :img-url="item.image"
        />
    </div>
</template>

<script>
import ProjectListingItem from "~/components/components/Layouts/LayoutTwo/Section/components/components/ProjectListingItem.vue"

export default {
    name: "SectionProjectListing",

    components: {
        ProjectListingItem
    },
    props: {
        source: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            /* projectList: [
                {
                    id: 1,
                    title: "Cape Royale is nestled within the prestigious Sentosa Cove 1",
                    imgUrl: require("~/static/img/projectlist-sections/block-1.png")
                },
                {
                    id: 2,
                    title: "Cape Royale is nestled within the prestigious Sentosa Cove 2",
                    imgUrl: require("~/static/img/projectlist-sections/block-2.png")
                },
                {
                    id: 3,
                    title: "Cape Royale is nestled within the prestigious Sentosa Cove 3",
                    imgUrl: require("~/static/img/projectlist-sections/block-3.png")
                },
                {
                    id: 4,
                    title: "Cape Royale is nestled within the prestigious Sentosa Cove 4",
                    imgUrl: require("~/static/img/projectlist-sections/block-4.png")
                }
            ]*/
        }
    }
}
</script>

<style lang="scss" scoped>
.section--project-listing {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-column-gap: 1.6rem;

    @media screen and (max-width: 767px) {
        grid-template-columns: minmax(0, 1fr);
    }
}
</style>
