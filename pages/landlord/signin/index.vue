<template>
    <div>
        <LandordSignInForm otp />
    </div>
</template>

<script>
import LandordSignInForm from "~/components/components/Landlord/Auth/SignIn/components/Form/LandordSignInForm.vue"

export default {
    layout: "landlord",
    components: {
        LandordSignInForm
    }
}
</script>
