<template>
    <div>
        <LandlordChangePasswordForm />
    </div>
</template>

<script>
import LandordSignInForm from "~/components/components/Landlord/Auth/SignIn/components/Form/LandordSignInForm.vue"
import LandlordChangePasswordForm from "~/components/components/Landlord/Auth/LandlordChangePasswordForm.vue"

export default {
    layout: "landlord",
    components: {
        LandlordChangePasswordForm,
        LandordSignInForm
    }
}
</script>
