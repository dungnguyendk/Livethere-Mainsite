<template lang="html">
    <main>
        <LandlordHeader />
        <template v-if="loggedIn">
            <LandlordPortal>
                <InventoryUnits />
            </LandlordPortal>
        </template>
    </main>
</template>

<script>
import LandlordPortal from "~/components/components/Landlord/LandlordPortal.vue"
import LandlordHeader from "~/components/shared/Header/LandlordHeader.vue"
import { appSettings } from "~/app-settings"
import AssetInventory from "~/components/components/Landlord/AssetInventory/AssetInventory.vue"
import InventoryUnits from "~/components/components/Landlord/Inventory/InventoryUnits.vue"

export default {
    name: "landlord",
    components: {
        InventoryUnits,
        AssetInventory,
        LandlordHeader,
        LandlordPortal
    },
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

    async asyncData({ route, store }) {
        try {
            const id = route.params.id
            const internalID = route.params.id
            await store.dispatch("inventory/getInventoryDetails", id)
            await store.dispatch("inventory/getUnitsByInventoryFID", id)
        } catch (e) {
            console.log({ Error: e.message })
        }
    }
}
</script>
