<template lang="html">
    <main>
        <template v-if="loggedIn">
            <LandlordPortal>
                <TenancyWrapper>
                    <template slot="content">
                        <TenancyUnitInventory />
                    </template>
                </TenancyWrapper>
            </LandlordPortal>
        </template>
    </main>
</template>

<script>
import { appSettings } from "~/app-settings"
import LandlordPortal from "~/components/components/Landlord/LandlordPortal.vue"
import InventoryDetails from "~/components/components/Landlord/Inventory/InventoryDetails.vue"
import TenancyDetails from "~/components/components/Landlord/Tenancy/TenancyDetails"
import TenancyWrapper from "~/components/components/Landlord/Tenancy/TenancyWrapper.vue"
import TenancyUnitInventory from "~/components/components/Landlord/Tenancy/TenancyUnitInventory.vue"
import { generateLandlordsSEOMetaTags } from "~/ultilities/seo-configs"

export default {
    components: {
        TenancyUnitInventory,
        TenancyWrapper,
        TenancyDetails,
        InventoryDetails,
        LandlordPortal
    },
    layout: "landlord",
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
    async asyncData({ route, store, app }) {
        app.head.meta = generateLandlordsSEOMetaTags(app.head.meta)
        try {
            //await store.dispatch("inventory/getInventoryDetails", route.params.id)
            await store.dispatch("tenancy/getTenancyDetails", route.params.id)
            await store.dispatch("inventory/getUnitsByContractInternalID", route.params.id)
        } catch (e) {
            console.log({ Error: e.message })
        }
    }
}
</script>
