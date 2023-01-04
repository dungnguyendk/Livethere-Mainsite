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
import { tenancyDocumentTypes } from "~/ultilities/tenancy-helpers"
import qs from "qs"

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
    async asyncData({ route, store }) {
        try {
            await store.dispatch("tenancy/getTenancyDetails", route.params.id)
            const documentType = tenancyDocumentTypes.stampDuty
            const documentQueries = qs.stringify({
                TenancyContractAgreementFID: store.state.tenancy.tenancyDetails.id,
                FileTypeFID: documentType.id
            })
            await store.dispatch("tenancy/getTenancyDocuments", documentQueries)
        } catch (e) {
            console.log({ Error: e.message })
        }
    }
}
</script>
