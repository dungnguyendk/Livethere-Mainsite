<template>
    <div>
        <LandlordRegisterVerificationForm />
    </div>
</template>

<script>
import { appSettings } from "~/app-settings"
import LandlordRegisterVerificationForm from "~/components/components/Landlord/Auth/Register/LandlordRegisterVerificationForm.vue"

export default {
    components: {
        LandlordRegisterVerificationForm
    },
    layout: "landlord",
    head: {
        title: `Verify Register | ${appSettings.siteName}`
    }
}
</script>
