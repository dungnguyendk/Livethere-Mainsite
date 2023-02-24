<template>
    <LandlordAuth>
        <LandlordResetPasswordForm />
    </LandlordAuth>
</template>

<script>
import { appSettings } from "~/app-settings"
import LandlordResetPasswordForm from "~/components/components/Landlord/Auth/LandlordResetPasswordForm.vue"
import LandlordAuth from "~/components/components/Landlord/LandlordAuth.vue"

export default {
    layout: "landlord",
    components: { LandlordAuth, LandlordResetPasswordForm },
    head: {
        title: `Reset your password | ${appSettings.siteName}`
    }
}
</script>
