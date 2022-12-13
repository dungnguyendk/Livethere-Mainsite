<template>
    <main v-if="sections.length > 0" class="page page--landing">
        <template v-for="section in sections">
            <LandingHeader />
            <LandingTopBanner />
            <LandingIntroSection />
            <LandingVideoSection />
            <LandingContactSection title="Help Me Find My Ideal Home" />
            <LandingServicesSection />
            <LandingFooter />
            <StickyNav />
        </template>
    </main>
    <main v-else class="page--empty">
        <p>No content found</p>
    </main>
</template>

<script>
import { mapState } from "vuex"
import qs from "qs"
import LandingHeader from "~/components/shared/Header/LandingHeader.vue"
import LandingFooter from "~/components/shared/Footer/LandingFooter.vue"
import LandingVideoSection from "~/components/components/Section/LandingVideoSection.vue"
import LandingServicesSection from "~/components/components/Section/LandingServicesSection.vue"
import LandingContactSection from "~/components/components/Section/LandingContactSection.vue"
import LandingTopBanner from "~/components/components/Section/components/LandingTopBanner.vue"
import LandingIntroSection from "~/components/components/Section/components/LandingIntroSection.vue"
import StickyNav from "~/components/shared/nav/StickyNav.vue"

export default {
    components: {
        StickyNav,
        LandingIntroSection,
        LandingTopBanner,
        LandingContactSection,
        LandingServicesSection,
        LandingVideoSection,
        LandingFooter,
        LandingHeader
    },
    computed: {
        ...mapState({
            siteDetails: (state) => state.site.siteDetails,
            pageDetails: (state) => state.page.pageDetails,
            sections: (state) => state.page.sections
        })
    },
    head: {
        title: "Livethere landing page"
    },

    created() {
        console.log({ pageDetails: this.pageDetails })
    },

    async asyncData({ app, store }) {
        try {
            await store.dispatch("site/getDetails", 11)
            const pageParams = qs.stringify({
                siteId: 11,
                languageId: 1,
                slug: "landing-page"
            })

            await store.dispatch("page/getDetails", pageParams)
        } catch (e) {}
    }
}
</script>
