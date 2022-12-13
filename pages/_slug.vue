<template>
    <main v-if="sections.length > 0" class="page page--landing">
        <template v-for="section in sections">
            <LandingHeader
                v-if="section.active"
                :source="getSectionBySlug(section, 'landing-top-header')"
            />
            <LandingTopBanner
                v-if="section.active"
                :source="getSectionBySlug(section, 'landing-top-banner')"
            />
            <LandingIntroSection
                v-if="section.active"
                :source="getSectionBySlug(section, 'landing-intro')"
            />
            <LandingVideoSection
                v-if="section.active"
                :source="getSectionBySlug(section, 'landing-video')"
            />
            <LandingServicesSection
                v-if="section.active"
                :source="getSectionBySlug(section, 'landing-services')"
            />
            <LandingContactSection
                v-if="section.active"
                :source="getSectionBySlug(section, 'landing-contact-form')"
            />
            <LandingFooter
                v-if="section.active"
                :source="getSectionBySlug(section, 'landing-footer')"
            />
        </template>
        <StickyNav />
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
            pageDetails: (state) => state.page.pageDetails,
            sections: (state) => state.page.sections
        })
    },
    head: {
        title: "Landing page | Livethere"
    },

    created() {
        console.log({ pageDetails: this.pageDetails })
    },

    methods: {
        getSectionBySlug(section, slug) {
            return section.slug === slug ? section : null
        }
    },

    async asyncData({ store, params, error }) {
        try {
            const { slug } = params
            const pageParams = qs.stringify({
                siteId: 1,
                languageId: 1,
                slug: slug
            })
            await store.dispatch("page/getDetails", pageParams).then((response) => {
                if (!response) {
                    return error({ statusCode: 404, message: "404! Page not found." })
                }
            })
        } catch (e) {}
    }
}
</script>
