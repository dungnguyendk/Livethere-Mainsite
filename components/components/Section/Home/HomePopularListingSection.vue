<template lang="html">
    <section class="section--home-popular-listing">
        <div class="container">
            <div class="section__container">
                <ProjectSwiper :Listing="this.popularListing" :title="'Popular Listing'" />
            </div>
        </div>
    </section>
</template>

<script>
import ProjectSwiper from '~/components/components/Projects/components/Slider/ProjectSwiper.vue'
import { mapState } from "vuex"
export default {
    name: "HomePopularListingSection",
    components: { ProjectSwiper },
    data(){
        return  {
            typeListing: "popularListing"
        }
    },
    computed: {
        ...mapState({
            popularListing: (state) => state.project.popularListings
        }),
    },
    created(){
    },
    methods: {}
}
</script>
<style lang="scss" scoped>
.section--home-popular-listing {
    padding: 4.3rem 0;
    background-color: var(--bg-color-white);

    @media screen and (max-width: 767px) {
        padding: 3.2rem 0;
    }
}
</style>
