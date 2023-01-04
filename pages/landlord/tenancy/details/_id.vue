<template lang="html">
    <main>
        <LandlordHeader />
        <template v-if="loggedIn">
            <LandlordPortal>
                <TenancyDetails />
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
import TenancyDetails from "~/components/components/Landlord/Tenancy/TenancyDetails.vue"
import qs from "qs"
export default {
    components: {
        TenancyDetails,
        InventoryDetails,
        AssetInventory,
        LandlordHeader,
        LandlordPortal
    },
    head: {
        title: `Details | ${appSettings.siteName}`
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
            // console.log("store.state::", store.state.tenancy.tenancyDetailByInternalID.id);
            // await store.dispatch("tenancy/getTenancyDetails", id)
            await store.dispatch("tenancy/getTenancyDetailsByInternalID", id)
            const paramId = qs.stringify({
                TenancyContractAgreementFID: store.state.tenancy.tenancyDetailByInternalID.id
            })
            await store.dispatch("tenancy/getTenancyInfosById", paramId)
        } catch (e) {
            console.log({ Error: e.message })
        }
    }
}
</script>
