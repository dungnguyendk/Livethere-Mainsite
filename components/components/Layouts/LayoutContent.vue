<template lang="html">
    <main v-if="sections.length > 0" class="page page--landing">
        <template v-for="section in sections">
            <LandingHeader
                v-if="section.active"
                :source="getSectionBySlug(section, 'campaign-header')"
            />
            <LandingTopBanner
                v-if="section.active"
                :source="getSectionBySlug(section, 'campaign-banner')"
            />
            <LandingLifeStyleSection
                v-if="section.active"
                :source="getSectionBySlug(section, 'campaign-lifestyle')"
            />
            <LandingListingSection
                v-if="section.active"
                :source="getSectionBySlug(section, 'campaign-listing')"
            />
            <LandingIntroSection
                v-if="section.active"
                :source="getSectionBySlug(section, 'campaign-introduction')"
            />
            <LandingVideoSection
                v-if="section.active"
                :source="getSectionBySlug(section, 'campaign-video')"
            />
            <LandingServicesSection
                v-if="section.active"
                :source="getSectionBySlug(section, 'campaign-features')"
            />
            <LandingContactSection
                v-if="section.active"
                :source="getSectionBySlug(section, 'campaign-contact-form')"
            />
            <LandingFooter
                v-if="section.active"
                :source="getSectionBySlug(section, 'campaign-footer')"
            />
            <ProjectsSection
                v-if="section.active"
                :source="getSectionBySlug(section, 'campaign-project-and-banner')"
            />
            <ProjectLaunchesSection
                v-if="section.active"
                :source="getSectionBySlug(section, 'campaign-project-lauches')"
            />
            <BannerSection
                v-if="section.active"
                :source="getSectionBySlug(section, 'campaign-banner-carousel')"
            />
            <StickyNav
                v-if="pageDetails.layoutFID === 1 && section.active"
                :source="getSectionBySlug(section, 'right-sticky-menu')"
            />
            <LandingCallToActions
                v-if="section.active"
                :source="getSectionBySlug(section, 'call-to-action')"
            />
            <MainSiteSinglePageSection
                v-if="section.active"
                :source="getSectionBySlug(section, 'mainsite-single-page')"
            />
        </template>
    </main>
    <main v-else class="page--empty">
        <NotFoundFrame />
    </main>
</template>

<script>
import LandingVideoSection from "~/components/components/Section/LandingVideoSection.vue"
import LandingListingSection from "~/components/components/Layouts/LayoutOne/Section/LandingListingSection.vue"
import LandingHeader from "~/components/shared/Header/LandingHeader.vue"
import LandingFooter from "~/components/shared/Footer/LandingFooter.vue"
import LandingServicesSection from "~/components/components/Section/LandingServicesSection.vue"
import StickyNav from "~/components/shared/nav/StickyNav.vue"
import NotFoundFrame from "~/components/shared/Frame/NotFoundFrame.vue"
import LandingContactSection from "~/components/components/Section/LandingContactSection.vue"
import LandingIntroSection from "~/components/components/Section/components/LandingIntroSection.vue"
import ProjectLaunchesSection from "~/components/components/Layouts/LayoutTwo/Section/ProjectLaunchesSection.vue"
import LandingLifeStyleSection from "~/components/components/Layouts/LayoutOne/Section/LandingLifeStyleSection.vue"
import ProjectsSection from "~/components/components/Layouts/LayoutTwo/Section/ProjectsSection.vue"
import BannerSection from "~/components/components/Layouts/LayoutTwo/Section/BannerSection.vue"
import LandingTopBanner from "~/components/components/Section/components/LandingTopBanner.vue"
import { mapState } from "vuex"
import LandingCallToActions from "~/components/components/Layouts/SharedLayout/LandingCallToAction.vue"
import MainSiteSinglePageSection from "~/components/components/Layouts/SharedLayout/MainSiteSinglePageSection.vue"

export default {
    name: "LayoutContent",
    components: {
        MainSiteSinglePageSection,
        LandingCallToActions,
        LandingTopBanner,
        BannerSection,
        ProjectsSection,
        LandingLifeStyleSection,
        ProjectLaunchesSection,
        LandingIntroSection,
        LandingContactSection,
        NotFoundFrame,
        StickyNav,
        LandingServicesSection,
        LandingFooter,
        LandingHeader,
        LandingListingSection,
        LandingVideoSection
    },
    computed: {
        ...mapState({
            pageDetails: (state) => state.page.pageDetails,
            sections: (state) => state.page.sections
        })
    },
    methods: {
        getSectionBySlug(section, slug) {
            return section.slug === slug ? section : null
        }
    }
}
</script>
