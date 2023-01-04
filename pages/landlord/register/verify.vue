<template>
    <div>
        <LandlordHeader />
        <LandlordVerification />
    </div>
</template>

<script>
import LandlordHeader from "~/components/shared/Header/LandlordHeader.vue"
import LandlordTerms from "~/components/components/Landlord/Auth/Register/LandlordTerms.vue"
import { appSettings } from "~/app-settings"
import LandlordVerification from "~/components/components/Landlord/Auth/SignIn/LandlordVerification.vue"

export default {
    components: {
        LandlordVerification,
        LandlordTerms,

        LandlordHeader
    },
    head: {
        title: `Register Landlord | ${appSettings.siteName}`
    }
}
</script>
