<template>
    <div>
        <LandlordVerificationForm />
    </div>
</template>

<script>
import LandlordTerms from "~/components/components/Landlord/Auth/Register/LandlordTerms.vue"
import { appSettings } from "~/app-settings"
import LandlordVerification from "~/components/components/Landlord/Auth/SignIn/LandlordVerification.vue"
import LandlordVerificationForm from "~/components/components/Landlord/Auth/SignIn/components/Form/LandlordVerificationForm.vue"

export default {
    components: {
        LandlordVerificationForm,
        LandlordVerification,
        LandlordTerms
    },
    layout: "landlord",
    head: {
        title: `Verify Sign in by OTP | ${appSettings.siteName}`
    }
}
</script>
