<template>
    <div>
        <LandlordVerification />
    </div>
</template>

<script>
import LandlordTerms from "~/components/components/Landlord/Auth/Register/LandlordTerms.vue"
import { appSettings } from "~/app-settings"
import LandlordVerification from "~/components/components/Landlord/Auth/SignIn/LandlordVerification.vue"

export default {
    components: {
        LandlordVerification,
        LandlordTerms
    },
    layout: "landlord",
    head: {
        title: `Register Landlord | ${appSettings.siteName}`
    }
}
</script>
