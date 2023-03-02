<template>
    <main class="landlord--landing">
        <LandlordEnquiry />
        <LandlordLandingIntro />
        <LandlordLandingServices />
        <LandlordLandingCTA />
    </main>
</template>
<script>
import LandlordLandingIntro from "~/components/components/Landlord/LandingPage/LandlordLandingIntro"
import LandlordLandingServices from "~/components/components/Landlord/LandingPage/LandlordLandingServices.vue"
import LandlordLandingCTA from "~/components/components/Landlord/LandingPage/LandlordLandingCTA"
import LandlordEnquiry from "~/components/components/Landlord/LandingPage/LandlordEnquiry.vue"
import { appSettings } from "~/app-settings"
import { generateLandlordsSEOMetaTags } from "~/ultilities/seo-configs"

export default {
    layout: "landlord",
    components: {
        LandlordEnquiry,
        LandlordLandingIntro,
        LandlordLandingServices,
        LandlordLandingCTA
    },
    head: {
        title: `Landlords | ${appSettings.siteName}`
    },

    async asyncData({ app }) {
        app.head.meta = generateLandlordsSEOMetaTags(app.head.meta)
    }
}
</script>
