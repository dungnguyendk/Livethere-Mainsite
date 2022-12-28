<template lang="html">
    <main>
        <LandlordHeader />
        <template v-if="loggedIn">
            <LandlordPortal>
                <InventoryDetails/>
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
import { httpEndpoint } from "~/services/https/endpoints"

export default {
    components: {
        InventoryDetails,
        AssetInventory,
        LandlordHeader,
        LandlordPortal
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
    },
    async asyncData({ app, route, store }) {
        try {
            const internalID = route.params.id
            await store.dispatch("inventory/getInventoryDetails", internalID)
            // const id = store.state.inventory.inventoryDetails.id
            // console.log("id: ", id)
            // await store.dispatch("inventory/getListTenancyAgreements", id)
        } catch (e) {
            console.log({ Error: e.message })
            // return {listTenancyAgreements: null}
        }
    }
}
</script>
