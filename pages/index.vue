<template>
    <main>
        <HomeBannerSection v-if="topBanner" :source="topBanner" />
        <HomeSearch />
        <HomeIntroSection v-if="mainSiteIntroduction" :source="mainSiteIntroduction" />
        <HomePopularListingSection />
        <HomeLatestProjectsSection />
        <HomeCTASection v-if="mainSiteCta" :source="mainSiteCta" />
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
import qs from "qs"
import { mapState } from "vuex"
import LandingHeader from "~/components/shared/Header/LandingHeader.vue"

export default {
    name: "LiveThereMainSiteHome",
    components: {
        LandingHeader,
        HomeBannerSection,
        HomeSearch,
        HomeIntroSection,
        HomePopularListingSection,
        HomeLatestProjectsSection,
        HomeCTASection
    },
    computed: {
        ...mapState({
            pageDetails: (state) => state.page.pageDetails,
            sections: (state) => state.page.sections
        }),
        topBanner() {
            return this.sections.length > 0
                ? this.sections.find((section) => section.slug === "mainsite-top-banner")
                : null
        },
        mainSiteIntroduction() {
            return this.sections.length > 0
                ? this.sections.find((section) => section.slug === "mainsite-introduction")
                : null
        },
        mainSiteCta() {
            return this.sections.length > 0
                ? this.sections.find((section) => section.slug === "mainsite-call-to-action")
                : null
        }
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
            const pageParams = qs.stringify({
                SiteId: 1,
                LanguageId: 1,
                Slug: "mainsite"
            })
            await store.dispatch("page/getPageDetails", pageParams)
            await store.dispatch("project/getHomePage")
            await store.dispatch("project/getLatestProject", 10)
            //
        } catch (e) {
            console.log({ Error: e.message })
        }
    }
}
</script>

<style lang="scss" scoped></style>
