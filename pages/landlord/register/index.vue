<template>
    <LandlordAuth>
        <LandlordTerms />
    </LandlordAuth>
</template>

<script>
import LandlordTerms from "~/components/components/Landlord/Auth/Register/LandlordTerms.vue"
import { appSettings } from "~/app-settings"
import LandlordAuth from "~/components/components/Landlord/LandlordAuth.vue"
import { generateLandlordsSEOMetaTags } from "~/ultilities/seo-configs"

export default {
    components: {
        LandlordAuth,
        LandlordTerms
    },
    layout: "landlord",
    head: {
        title: `Landlord Register | ${appSettings.siteName}`
    },
    async asyncData({ app }) {
        app.head.meta = generateLandlordsSEOMetaTags(app.head.meta)
    }
}
</script>
