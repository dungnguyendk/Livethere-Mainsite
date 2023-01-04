<template>
    <div>
        <LandlordRegisterBenefits />
    </div>
</template>

<script>
import LandlordSignIn from "~/components/components/Landlord/Auth/SignIn/LandlordSignIn.vue"
import LandlordHeader from "~/components/shared/Header/LandlordHeader.vue"
import LandlordRegisterBenefits from "~/components/components/Landlord/Auth/Register/LandlordRegisterBenefits.vue"

export default {
    components: {
        LandlordRegisterBenefits,
        LandlordHeader,
        LandlordSignIn
    },
    layout: "landlord"
}
</script>
