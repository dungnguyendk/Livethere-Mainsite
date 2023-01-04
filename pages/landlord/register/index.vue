<template>
    <div>
        <LandlordTerms />
    </div>
</template>

<script>
import LandlordSignIn from "~/components/components/Landlord/Auth/SignIn/LandlordSignIn.vue"
import LandlordHeader from "~/components/shared/Header/LandlordHeader.vue"
import LandlordRegisterBenefits from "~/components/components/Landlord/Auth/Register/LandlordRegisterBenefits.vue"
import LandlordTerms from "~/components/components/Landlord/Auth/Register/LandlordTerms.vue"
import { appSettings } from "~/app-settings"

export default {
    components: {
        LandlordTerms,
        LandlordRegisterBenefits,
        LandlordHeader,
        LandlordSignIn
    },
    layout: "landlord",
    head: {
        title: `Landlord Register | ${appSettings.siteName}`
    }
}
</script>
