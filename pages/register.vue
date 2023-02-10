<template>
    <div>
        <LandlordRegisterBenefits />
    </div>
</template>

<script>
import LandlordSignIn from "~/components/components/Landlord/Auth/SignIn/LandlordSignIn.vue"
import LandlordRegisterBenefits from "~/components/components/Landlord/Auth/Register/LandlordRegisterBenefits.vue"
import { appSettings } from "~/app-settings"

export default {
    components: {
        LandlordRegisterBenefits,
        LandlordSignIn
    },
    layout: "landlord",
    head: {
        title: `Register | ${appSettings.siteName}`
    }
}
</script>
