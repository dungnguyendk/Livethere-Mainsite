<template>
    <div> <LandlordResetPasswordForm /> </div>
</template>

<script>
import { appSettings } from "~/app-settings"
import LandlordResetPasswordForm from "~/components/components/Landlord/Auth/LandlordResetPasswordForm.vue"

export default {
    layout: "landlord",
    components: { LandlordResetPasswordForm },
    head: {
        title: `Forgot password | ${appSettings.siteName}`
    }
}
</script>
