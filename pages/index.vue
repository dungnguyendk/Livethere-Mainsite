<template>
    <main>
        <HomeBannerSection />
        <HomeSearch />
        <HomeIntroSection />
        <HomePopularListingSection />
        <HomeLatestProjectsSection />
        <HomeCTASection />
    </main>
</template>

<script>
import HomeBannerSection from "~/components/components/Section/Home/HomeBannerSection.vue"
import HomeSearch from "~/components/components/Section/Home/HomeSearch.vue"
import HomeIntroSection from "~/components/components/Section/Home/HomeIntroSection.vue"
import HomePopularListingSection from "~/components/components/Section/Home/HomePopularListingSection.vue"
import HomeLatestProjectsSection from "~/components/components/Section/Home/HomeLatestProjectsSection.vue"
import HomeCTASection from "~/components/components/Section/Home/HomeCTASection.vue"
import { generateLandlordsSEOMetaTags } from "~/ultilities/seo-configs"
import { appSettings } from "~/app-settings"

export default {
    name: "LiveThereMainSiteHome",
    components: {
        HomeBannerSection,
        HomeSearch,
        HomeIntroSection,
        HomePopularListingSection,
        HomeLatestProjectsSection,
        HomeCTASection
    },
    head() {
        return {
            title: `${appSettings.siteName}`
        }
    },

    async asyncData({ app, store }) {
        app.head.meta = generateLandlordsSEOMetaTags(app.head.meta)
        try {
            // const params = 10;
            await store.dispatch("project/getHomePage")
            await store.dispatch("project/getLatestProject", 10)
        } catch (e) {
            console.log({ Error: e.message })
        }
    }
}
</script>

<style lang="scss" scoped></style>
