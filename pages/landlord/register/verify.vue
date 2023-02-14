<template>
    <LandlordAuth>
        <LandlordRegisterVerificationForm />
    </LandlordAuth>
</template>

<script>
import { appSettings } from "~/app-settings"
import LandlordRegisterVerificationForm from "~/components/components/Landlord/Auth/Register/LandlordRegisterVerificationForm.vue"
import LandlordAuth from "~/components/components/Landlord/LandlordAuth.vue"

export default {
    components: {
        LandlordAuth,
        LandlordRegisterVerificationForm
    },
    layout: "landlord",
    head: {
        title: `Verify Register | ${appSettings.siteName}`
    }
}
</script>
