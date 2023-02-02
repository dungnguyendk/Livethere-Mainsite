<template>
    <main>
        <!-- <HomeIntroSection/> -->
        <!-- <HomeCTASection/> -->
        <HomeBannerSection/>
    </main>
</template>

<script>
import HomeBannerSection from '~/components/components/Section/Home/HomeBannerSection.vue';
// import HomeIntroSection from '~/components/components/Section/Home/HomeIntroSection.vue';
// import HomeCTASection from '~/components/components/Section/Home/HomeCTASection'

export default {
    components: { /*HomeIntroSection,*/ /*HomeCTASection,*/ HomeBannerSection},
    head: {
        title: "Livethere"
    },

    methods: {}
}
</script>
