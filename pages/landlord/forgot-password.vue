<template>
    <LandlordAuth>
        <LandlordForgotPasswordForm />
    </LandlordAuth>
</template>

<script>
import { appSettings } from "~/app-settings"
import LandlordForgotPasswordForm from "~/components/components/Landlord/Auth/LandlordForgotPasswordForm.vue"
import LandlordAuth from "~/components/components/Landlord/LandlordAuth.vue"

export default {
    layout: "landlord",
    components: { LandlordAuth, LandlordForgotPasswordForm },
    head: {
        title: `Forgot password | ${appSettings.siteName}`
    }
}
</script>
