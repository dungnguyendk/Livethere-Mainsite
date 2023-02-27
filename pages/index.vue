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
import EnquiryForm from "~/archived/enquiry-form/index.vue"
import LandlordEnquiry from "~/components/components/Landlord/LandingPage/LandlordEnquiry.vue"
import { appSettings } from "~/app-settings"

export default {
    layout: "landlord",
    components: {
        LandlordEnquiry,
        EnquiryForm,
        LandlordLandingIntro,
        LandlordLandingServices,
        LandlordLandingCTA
    },
    head: {
        title: `Landlords | ${appSettings.siteName}`
    },
    data() {
        return {}
    }
}
</script>

<style lang="scss" scoped></style>
