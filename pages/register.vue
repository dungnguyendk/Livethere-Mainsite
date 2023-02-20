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

export default {
    components: {
        LandlordAuth,
        LandlordRegisterBenefits,
        LandlordSignIn
    },
    layout: "landlord",
    head: {
        title: `Register | ${appSettings.siteName}`
    }
}
</script>
