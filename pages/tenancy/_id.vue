<template lang="html">
    <main>
        <template v-if="loggedIn">
            <LandlordPortal>
                <InventoryDetails />
            </LandlordPortal>
        </template>
    </main>
</template>

<script>
import { appSettings } from "~/app-settings"
import LandlordPortal from "~/components/components/Landlord/LandlordPortal.vue"
import InventoryDetails from "~/components/components/Landlord/Inventory/InventoryDetails.vue"
import { generateLandlordsSEOMetaTags } from "~/ultilities/seo-configs"

export default {
    components: {
        InventoryDetails,
        LandlordPortal
    },
    layout: "landlord",
    head: {
        title: `Contract Agreements | ${appSettings.siteName}`
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
    async asyncData({ route, store, app }) {
        app.head.meta = generateLandlordsSEOMetaTags(app.head.meta)
        try {
            const internalID = route.params.id
            store.commit("inventory/setTenancyID", internalID)
            await store.dispatch("inventory/getInventoryDetails", internalID)
            const id = store.state.inventory.inventoryDetails.id
            await store.dispatch("inventory/getListTenancyAgreements", id)
        } catch (e) {
            return { listTenancyAgreements: null }
        }
    }
}
</script>
