<template>
    <LandlordAuth>
        <LandlordRegisterBenefits />
    </LandlordAuth>
</template>

<script>
import LandlordSignIn from "~/components/components/Landlord/Auth/SignIn/LandlordSignIn.vue"
import LandlordRegisterBenefits from "~/components/components/Landlord/Auth/Register/LandlordRegisterBenefits.vue"
import { appSettings } from "~/app-settings"
import LandlordAuth from "~/components/components/Landlord/LandlordAuth.vue"
import { generateLandlordsSEOMetaTags } from "~/ultilities/seo-configs"

export default {
    components: {
        LandlordAuth,
        LandlordRegisterBenefits,
        LandlordSignIn
    },
    layout: "landlord",
    head: {
        title: `Register | ${appSettings.siteName}`
    },
    async asyncData({ app }) {
        app.head.meta = generateLandlordsSEOMetaTags(app.head.meta)
    }
}
</script>
