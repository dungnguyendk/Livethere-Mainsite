<template lang="html">
    <main>
        <template v-if="loggedIn">
            <LandlordPortal>
                <InventoryUnits />
            </LandlordPortal>
        </template>
    </main>
</template>

<script>
import { appSettings } from "~/app-settings"
import LandlordPortal from "~/components/components/Landlord/LandlordPortal.vue"
import AssetInventory from "~/components/components/Landlord/AssetInventory/AssetInventory.vue"
import InventoryUnits from "~/components/components/Landlord/Inventory/InventoryUnits.vue"

export default {
    layout: "landlord",
    components: {
        InventoryUnits,
        AssetInventory,
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
            await store.dispatch("inventory/getInventoryDetails", id)
            //await store.dispatch("inventory/getUnitsByInventoryFID", id)
        } catch (e) {
            console.log({ Error: e.message })
        }
    }
}
</script>
