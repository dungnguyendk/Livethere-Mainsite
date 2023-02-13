<template>
    <LandlordAuth>
        <LandordSignInForm otp />
    </LandlordAuth>
</template>

<script>
import LandordSignInForm from "~/components/components/Landlord/Auth/SignIn/components/Form/LandordSignInForm.vue"
import { appSettings } from "~/app-settings"
import LandlordAuth from "~/components/components/Landlord/LandlordAuth.vue"

export default {
    layout: "landlord",
    components: {
        LandlordAuth,
        LandordSignInForm
    },
    head: {
        title: `Sign in | ${appSettings.siteName}`
    }
}
</script>
