<template lang="html">
    <main>
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
import InventoryDetails from "~/components/components/Landlord/Inventory/InventoryDetails.vue"
import TenancyDetails from "~/components/components/Landlord/Tenancy/TenancyDetails"
import TenancyAgreements from "~/components/components/Landlord/Tenancy/TenancyAgreements"
import qs from "qs"
import { tenancyDocumentTypes } from "~/ultilities/tenancy-helpers"

export default {
    components: {
        TenancyAgreements,
        TenancyDetails,
        InventoryDetails,
        LandlordPortal
    },
    layout: "landlord",
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
            const documentType = tenancyDocumentTypes.agreement
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
