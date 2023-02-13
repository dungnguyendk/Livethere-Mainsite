<template>
    <LandlordAuth>
        <LandlordTerms />
    </LandlordAuth>
</template>

<script>
import LandlordTerms from "~/components/components/Landlord/Auth/Register/LandlordTerms.vue"
import { appSettings } from "~/app-settings"
import LandlordAuth from "~/components/components/Landlord/LandlordAuth.vue"

export default {
    components: {
        LandlordAuth,
        LandlordTerms
    },
    layout: "landlord",
    head: {
        title: `Landlord Register | ${appSettings.siteName}`
    }
}
</script>
