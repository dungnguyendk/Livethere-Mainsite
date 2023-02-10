<template>
    <div>
        <LandlordForgotPasswordForm />
    </div>
</template>

<script>
import { appSettings } from "~/app-settings"
import LandlordForgotPasswordForm from "~/components/components/Landlord/Auth/LandlordForgotPasswordForm.vue"

export default {
    layout: "landlord",
    components: { LandlordForgotPasswordForm },
    head: {
        title: `Forgot password | ${appSettings.siteName}`
    }
}
</script>
