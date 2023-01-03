<template lang="html">
    <main>
        <LandlordHeader />
        <template v-if="loggedIn">
            <LandlordPortal>
                <TenancyAgreements />
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
import TenancyAgreements from "~/components/components/Landlord/Tenancy/TenancyAgreements"
import qs from "qs"

export default {
    components: {
        TenancyAgreements,
        TenancyDetails,
        InventoryDetails,
        AssetInventory,
        LandlordHeader,
        LandlordPortal
    },
    head: {
        title: `Tenancy Agreement | ${appSettings.siteName}`
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
            await store.dispatch("tenancy/getTenancyDetails", route.params.id)
            const documentQueries = qs.stringify({
                TenancyContractAgreementFID: store.state.tenancy.tenancyDetails.id,
                FileTypeFID: 1
            })
            console.log({ documentQueries })
            await store.dispatch("tenancy/getTenancyDocuments", documentQueries)
            //await store.dispatch("inventory/getInventoryDetails", route.params.id)
        } catch (e) {
            console.log({ Error: e.message })
        }
    }
}
</script>
