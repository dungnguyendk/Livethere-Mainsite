<template>
    <LandlordAuth>
        <LandlordVerificationForm />
    </LandlordAuth>
</template>

<script>
import LandlordTerms from "~/components/components/Landlord/Auth/Register/LandlordTerms.vue"
import { appSettings } from "~/app-settings"
import LandlordVerificationForm from "~/components/components/Landlord/Auth/SignIn/components/Form/LandlordVerificationForm.vue"
import LandlordAuth from "~/components/components/Landlord/LandlordAuth.vue"

export default {
    components: {
        LandlordAuth,
        LandlordVerificationForm,
        LandlordTerms
    },
    layout: "landlord",
    head: {
        title: `Verify Sign in by OTP | ${appSettings.siteName}`
    }
}
</script>
