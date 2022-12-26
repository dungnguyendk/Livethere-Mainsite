<template>
    <div>
        <LandlordLandingIntro/>
        <LandlordLandingServices/>
        <LandlordLandingCTA />
    </div>
</template>

<script>
import LandlordLandingIntro from "~/components/components/Landlord/LandingPage/LandlordLandingIntro"
import LandlordLandingServices from "~/components/components/Landlord/LandingPage/LandlordLandingServices.vue"
import LandlordLandingCTA from "~/components/components/Landlord/LandingPage/LandlordLandingCTA"
export default {
    components: {
        LandlordLandingIntro,
        LandlordLandingServices,
        LandlordLandingCTA
    },
    data() {
        return {}
    }
}
</script>

<style lang="scss" scoped>
</style>