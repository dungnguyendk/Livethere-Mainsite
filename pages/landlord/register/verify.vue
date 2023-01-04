<template>
    <div>
        <LandlordHeader />
        <LandlordTerms />
    </div>
</template>

<script>
import LandlordHeader from "~/components/shared/Header/LandlordHeader.vue"
import LandlordTerms from "~/components/components/Landlord/Auth/Register/LandlordTerms.vue"
import { appSettings } from "~/app-settings"

export default {
    components: {
        LandlordTerms,

        LandlordHeader
    },
    head: {
        title: `Register Landlord | ${appSettings.siteName}`
    }
}
</script>
