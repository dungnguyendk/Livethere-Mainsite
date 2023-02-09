<template>
    <div>
        <LandordSignInForm otp />
    </div>
</template>

<script>
import LandordSignInForm from "~/components/components/Landlord/Auth/SignIn/components/Form/LandordSignInForm.vue"
import { appSettings } from "~/app-settings"

export default {
    layout: "landlord",
    components: {
        LandordSignInForm
    },
    head: {
        title: `Sign in | ${appSettings.siteName}`
    }
}
</script>
