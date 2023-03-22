<template>
    <LandlordAuth>
        <LandlordRegisterVerificationForm />
    </LandlordAuth>
</template>

<script>
import { appSettings } from "~/app-settings"
import LandlordRegisterVerificationForm from "~/components/components/Landlord/Auth/Register/LandlordRegisterVerificationForm.vue"
import LandlordAuth from "~/components/components/Landlord/LandlordAuth.vue"
import { generateLandlordsSEOMetaTags } from "~/ultilities/seo-configs"

export default {
    components: {
        LandlordAuth,
        LandlordRegisterVerificationForm
    },
    layout: "landlord",
    head: {
        title: `Verify Register | ${appSettings.siteName}`
    },
    async asyncData({ app }) {
        app.head.meta = generateLandlordsSEOMetaTags(app.head.meta)
    }
}
</script>
