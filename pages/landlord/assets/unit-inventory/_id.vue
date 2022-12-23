<template lang="html">
    <main>
        <LandlordHeader />
        <template v-if="loggedIn">
            <LandlordPortal> <UnitInventoryDetails /></LandlordPortal>
        </template>
    </main>
</template>

<script>
import LandingHeader from "~/components/shared/Header/LandingHeader.vue"
import LandingFooter from "~/components/shared/Footer/LandingFooter.vue"
import LandlordPortal from "~/components/components/Landlord/LandlordPortal.vue"
import LandlordHeader from "~/components/shared/Header/LandlordHeader.vue"
import { appSettings } from "~/app-settings"
import AssetInventory from "~/components/components/Landlord/AssetInventory/AssetInventory.vue"
import UnitInventoryDetails from "~/components/components/Landlord/AssetInventory/UnitInventoryDetails.vue"

export default {
    name: "landlord",
    components: {
        UnitInventoryDetails,
        AssetInventory,
        LandlordHeader,
        LandlordPortal,
        LandingFooter,
        LandingHeader
    },
    head: {
        title: `Landlord | ${appSettings.siteName}`
    },

    computed: {
        loggedIn() {
            return this.$auth.loggedIn
        }
    },
    created() {
        if (!this.loggedIn) {
            this.$router.push("/landlord/signin")
        }
    }
}
</script>
