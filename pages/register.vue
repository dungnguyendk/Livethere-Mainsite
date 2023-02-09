<template>
    <div>
        <LandlordRegisterBenefits />
    </div>
</template>

<script>
import LandlordSignIn from "~/components/components/Landlord/Auth/SignIn/LandlordSignIn.vue"
import LandlordRegisterBenefits from "~/components/components/Landlord/Auth/Register/LandlordRegisterBenefits.vue"

export default {
    components: {
        LandlordRegisterBenefits,
        LandlordSignIn
    },
    layout: "landlord"
}
</script>
