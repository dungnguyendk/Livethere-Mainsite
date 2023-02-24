<template>
    <LandlordAuth>
        <LandlordChangePasswordForm />
    </LandlordAuth>
</template>

<script>
import LandlordChangePasswordForm from "~/components/components/Landlord/Auth/LandlordChangePasswordForm.vue"
import { appSettings } from "~/app-settings"
import LandlordAuth from "~/components/components/Landlord/LandlordAuth.vue"

export default {
    layout: "landlord",
    components: {
        LandlordAuth,
        LandlordChangePasswordForm
    },
    head: {
        title: `Change password | ${appSettings.siteName}`
    }
}
</script>
