<template lang="html">
    <main>
        <LandingHeader />
        <LandlordPortal/>
        <LandingFooter />
    </main>
</template>

<script>
import LandingHeader from "~/components/shared/Header/LandingHeader.vue"
import LandingFooter from "~/components/shared/Footer/LandingFooter.vue"
import LandlordPortal from "~/components/components/Landlord/LandlordPortal.vue"

export default {
    name: "landlord",
    components: { LandlordPortal, LandingFooter, LandingHeader }
}
</script>
