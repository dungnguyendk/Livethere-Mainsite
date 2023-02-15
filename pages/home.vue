<template>
    <v-app>
        <v-main>
            <LandlordHeader />
            <HomeBannerSection />
            <HomeSearch />
            <HomeIntroSection />
            <HomePopularListingSection />
            <HomeLatestProjectsSection />
            <HomeCTASection />
            <LandingFooter />
        </v-main>
    </v-app>
</template>

<script>
import LandingFooter from "~/components/shared/Footer/LandingFooter.vue"
import LandlordHeader from "~/components/shared/Header/LandlordHeader.vue"
import HomeBannerSection from "~/components/components/Section/Home/HomeBannerSection.vue"
import HomeSearch from "~/components/components/Section/Home/HomeSearch.vue"
import HomeIntroSection from "~/components/components/Section/Home/HomeIntroSection.vue"
import HomeCTASection from "~/components/components/Section/Home/HomeCTASection"
import HomePopularListingSection from "~/components/components/Section/Home/HomePopularListingSection"
import HomeLatestProjectsSection from "~/components/components/Section/Home/HomeLatestProjectsSection"

export default {
    components: {
        HomeIntroSection,
        HomeCTASection,
        HomeBannerSection,
        HomePopularListingSection,
        HomeLatestProjectsSection,
        HomeSearch,
        LandlordHeader,
        LandingFooter
    },
    head: {
        title: "Livethere"
    },

    methods: {}
}
</script>
