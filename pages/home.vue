<template>
    <main>
        <HomeBannerSection />
        <HomeSearch />
        <HomeIntroSection />
        <HomePopularListingSection/>
        <HomeLatestProjectsSection/>
        <HomeCTASection />
    </main>
</template>

<script>
import HomeBannerSection from "~/components/components/Section/Home/HomeBannerSection.vue"
import HomeSearch from "~/components/components/Section/Home/HomeSearch.vue"
import HomeIntroSection from "~/components/components/Section/Home/HomeIntroSection.vue"
import HomeCTASection from "~/components/components/Section/Home/HomeCTASection"
import HomePopularListingSection from '~/components/components/Section/Home/HomePopularListingSection'
import HomeLatestProjectsSection from '~/components/components/Section/Home/HomeLatestProjectsSection'

export default {
    components: { HomeIntroSection, HomeCTASection, HomeBannerSection,HomePopularListingSection, HomeLatestProjectsSection ,HomeSearch},
    head: {
        title: "Livethere"
    },

    methods: {}
}
</script>
