<template>
    <LandlordAuth>
        <LandlordVerificationSignInForm />
    </LandlordAuth>
</template>

<script>
import LandlordTerms from "~/components/components/Landlord/Auth/Register/LandlordTerms.vue"
import { appSettings } from "~/app-settings"
import LandlordVerificationSignInForm from "~/components/components/Landlord/Auth/SignIn/components/Form/LandlordVerificationSignInForm.vue"
import LandlordAuth from "~/components/components/Landlord/LandlordAuth.vue"
import { generateLandlordsSEOMetaTags } from "~/ultilities/seo-configs"

export default {
    components: {
        LandlordAuth,
        LandlordVerificationSignInForm,
        LandlordTerms
    },
    layout: "landlord",
    head: {
        title: `Verify Sign in by OTP | ${appSettings.siteName}`
    },
    async asyncData({ app }) {
        app.head.meta = generateLandlordsSEOMetaTags(app.head.meta)
    }
}
</script>
