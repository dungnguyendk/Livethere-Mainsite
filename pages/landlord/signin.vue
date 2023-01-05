<template>
    <div>
        <LandlordSignIn />
    </div>
</template>

<script>
import LandlordSignIn from "~/components/components/Landlord/Auth/SignIn/LandlordSignIn.vue"
import LandlordHeader from "~/components/shared/Header/LandlordHeader.vue"

export default {
    layout:'landlord',
    components: {
        LandlordHeader,
        LandlordSignIn
    }
}
</script>
