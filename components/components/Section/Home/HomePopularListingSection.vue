<template lang="html">
    <section class="section--home-popular-listing">
        <div class="container">
            <div class="section__container">
                <ProjectSwiper>
                    {{ titleSwiper }}
                </ProjectSwiper>
            </div>
        </div>
    </section>
</template>

<script>
import ProjectSwiper from '../../Projects/components/Slider/ProjectSwiper.vue';
export default {
    name: "HomePopularListingSection",
    components: {ProjectSwiper},
    data() {
        return {
            titleSwiper: "popular listings"
        }
    },
}
</script>
<style lang="scss" scoped>
.section--home-popular-listing {
    padding: 5.9rem 0;
    background-color: var(--bg-color-white);

    @media screen and (max-width: 767px) {
        padding: 3.2rem 0;
    }
}


</style>
