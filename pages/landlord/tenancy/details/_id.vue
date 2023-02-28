<template lang="html">
    <main>
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
import InventoryDetails from "~/components/components/Landlord/Inventory/InventoryDetails.vue"
import TenancyDetails from "~/components/components/Landlord/Tenancy/TenancyDetails.vue"
import qs from "qs"
import { generateLandlordsSEOMetaTags } from "~/ultilities/seo-configs"

export default {
    components: {
        TenancyDetails,
        InventoryDetails,
        LandlordPortal
    },
    layout: "landlord",
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
        app.head.meta = generateLandlordsSEOMetaTags(app.head.meta)
        try {
            const id = route.params.id
            await store.dispatch("tenancy/getTenancyDetails", id)
            const paramId = qs.stringify({
                TenancyContractAgreementFID: store.state.tenancy.tenancyDetails.id
            })
            await store.dispatch("tenancy/getTenancyInfosById", paramId)
        } catch (e) {
            console.log({ Error: e.message })
        }
    }
}
</script>
