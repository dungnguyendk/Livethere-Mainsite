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
import InventoryUnits from "~/components/components/Landlord/Inventory/InventoryUnits.vue"
import { generateLandlordsSEOMetaTags } from "~/ultilities/seo-configs"

export default {
    layout: "landlord",
    components: {
        InventoryUnits,
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

    async asyncData({ route, store, app }) {
        app.head.meta = generateLandlordsSEOMetaTags(app.head.meta)
        try {
            const id = route.params.id
            await store.dispatch("inventory/getInventoryDetails", id)
        } catch (e) {
            console.log({ Error: e.message })
        }
    }
}
</script>
