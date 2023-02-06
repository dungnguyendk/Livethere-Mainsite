<template lang="html">
    <main>
        <!--        <template v-if="loggedIn">
            <LandlordPortal>
                <InventoryDetails />
            </LandlordPortal>
        </template>-->
    </main>
</template>

<script>
import { appSettings } from "~/app-settings"
import LandlordPortal from "~/components/components/Landlord/LandlordPortal.vue"
import AssetInventory from "~/components/components/Landlord/AssetInventory/AssetInventory.vue"
import InventoryDetails from "~/components/components/Landlord/Inventory/InventoryDetails.vue"

export default {
    components: {
        InventoryDetails,
        AssetInventory,
        LandlordPortal
    },
    layout: "landlord",
    head: {
        title: `Agreements | ${appSettings.siteName}`
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
            const internalID = route.params.id
            store.commit("inventory/setTenancyID", internalID)
            await store.dispatch("inventory/getInventoryDetails", internalID)
            const id = store.state.inventory.inventoryDetails.id
            await store.dispatch("inventory/getListTenancyAgreements", id)
        } catch (e) {
            console.log({ Error: e.message })
            return { listTenancyAgreements: null }
        }
    }
}
</script>
