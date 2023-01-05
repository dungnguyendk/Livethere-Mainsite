<template lang="html">
    <main>
        <template v-if="loggedIn">
            <LandlordPortal>
                <TenancyUnits />
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
import TenancyUnits from "~/components/components/Landlord/Tenancy/TenancyUnits"

export default {
    components: {
        TenancyUnits,
        TenancyDetails,
        InventoryDetails,
        AssetInventory,
        LandlordHeader,
        LandlordPortal
    },
    layout: "landlord",
    head: {
        title: `Unit Inventory | ${appSettings.siteName}`
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
