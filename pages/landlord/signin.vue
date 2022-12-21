<template>
    <div>
        <LandlordHeader />
        <LandlordSignIn />
    </div>
</template>

<script>
import LandlordSignIn from "~/components/components/Landlord/Auth/SignIn/LandlordSignIn.vue"
import LandlordHeader from "~/components/shared/Header/LandlordHeader.vue"

export default {
    name: "",
    components: {
        LandlordHeader,
        LandlordSignIn
    }
}
</script>
