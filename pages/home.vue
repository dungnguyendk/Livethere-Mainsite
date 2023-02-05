<template>
    <main>
        <HomeBannerSection />
        <HomeIntroSection />
        <HomePopularListingSection/>
        <HomeCTASection />
    </main>
</template>

<script>
import HomeBannerSection from "~/components/components/Section/Home/HomeBannerSection.vue"
import HomeIntroSection from "~/components/components/Section/Home/HomeIntroSection.vue"
import HomeCTASection from "~/components/components/Section/Home/HomeCTASection"
import HomePopularListingSection from '~/components/components/Section/Home/HomePopularListingSection'

export default {
    components: { HomeIntroSection, HomeCTASection, HomeBannerSection,HomePopularListingSection },
    head: {
        title: "Livethere"
    },

    methods: {}
}
</script>
