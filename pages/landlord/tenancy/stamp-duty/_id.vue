<template lang="html">
    <main>
        <LandlordHeader />
        <template v-if="loggedIn">
            <LandlordPortal>
                <TenancyStampDuty />
            </LandlordPortal>
        </template>
    </main>
</template>

<script>
import { appSettings } from "~/app-settings"
import LandlordPortal from "~/components/components/Landlord/LandlordPortal.vue"
import LandlordHeader from "~/components/shared/Header/LandlordHeader.vue"
import AssetInventory from "~/components/components/Landlord/AssetInventory/AssetInventory.vue"
import InventoryDetails from "~/components/components/Landlord/Inventory/InventoryDetails.vue"
import TenancyDetails from "~/components/components/Landlord/Tenancy/TenancyDetails"
import TenancyStampDuty from "~/components/components/Landlord/Tenancy/TenancyStampDuty"

export default {
    components: {
        TenancyStampDuty,
        TenancyDetails,
        InventoryDetails,
        AssetInventory,
        LandlordHeader,
        LandlordPortal
    },
    head: {
        title: `Tenancy Stamp Duty | ${appSettings.siteName}`
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
    },
    async asyncData({ app, route, store }) {
        try {
            const id = route.params.id
            await store.dispatch("inventory/getInventoryDetails", id)
        } catch (e) {
            console.log({ Error: e.message })
        }
    }
}
</script>
